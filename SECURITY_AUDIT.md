# CSI Static Website Security Audit

Audit date: 2026-09-26  
Scope: repository source, dependencies, local build configuration, public assets, and Vercel deployment configuration. Production was not actively tested.

## Executive summary

CSI is a Next.js static profile website. It has no API routes, middleware, server actions, database access, authentication, user-submitted content, or third-party analytics. The attack surface is therefore small. Security headers and static export configuration have been added without changing the visual UI or content.

## Findings and remediations

| Severity | Finding | Evidence / root cause | Remediation |
| --- | --- | --- | --- |
| Medium | Static-export intent was not explicit and security headers were only in Next runtime configuration. | `next.config.ts` had no `output: 'export'`; a static deployment should not depend on Next `headers()`. | Added `output: 'export'`; moved headers to `vercel.json`. |
| Medium | CSP was absent. | No `Content-Security-Policy` header was configured. | Added a restrictive Vercel CSP. |
| Low | Example environment file suggested a public API and database for a site that has neither. | `.env.example` contained unused placeholders. | Replaced with a no-environment-variable notice. |
| Informational | Names, contact details, and documentation assets are intentionally absent or placeholders. | Local content is static and rendered by React escaping. | Do not add private member data or credentials to `data/`, `public/`, or `NEXT_PUBLIC_*`. |
| High (build-time) | Next.js 15.5.26 resolves `postcss@8.4.31`, which is within npm audit's affected range `<=8.5.22`. | Dependency path: `csi-community → next@15.5.26 → postcss@8.4.31`. | npm offers only `next@16.3.6`, a major upgrade. It was not applied automatically. |
| Low | No reusable lint configuration existed, so `next lint` opened an interactive prompt and could not be used in automated checks. | `package.json` used the deprecated `next lint` command without ESLint dependencies/configuration. | Added ESLint 9 flat config with `next/core-web-vitals` and `next/typescript`; fixed the linted home navigation. |

## CSP rationale

`default-src 'self'` is the baseline. Google Fonts is permitted only for `style-src` and `font-src`, matching `app/globals.css`. Images, scripts, and connections are restricted to the same origin. Plugins, frames, and unexpected form targets are blocked.

Production-static-output inspection found six inline script blocks. They contain Next.js bootstrap and React Flight payload calls (`self.__next_f.push(...)`), including build identifiers and serialized route metadata. They are required for App Router hydration and client navigation. Their content changes per build and page, so static hashes would need regeneration/deployment automation; a nonce requires a server response and is incompatible with this static export. `'unsafe-inline'` therefore remains required in `script-src`.

The build contains eleven inline `style` attributes for interactive regional-map marker positions, so `'unsafe-inline'` also remains required in `style-src`. The output contains no inline event handlers. `script-src-attr 'none'` was added to prohibit them explicitly, while preserving React's programmatic event listeners. No `unsafe-eval`, wildcard, or external script hosts are permitted.

## Production audit (2026-09-26)

The production domain was tested with read-only HTTPS requests from Node.js. The root page returned HTTP 200 with active `Content-Security-Policy`, `Strict-Transport-Security: max-age=31536000`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

All tested production pages returned HTTP 200: home, under-construction, and the 11 regional routes. `hero.jpg` and `concept.png` returned HTTP 200. The production CSP allows the only external resources found in source/output: Google Fonts CSS and font files.

The current production root response includes `Access-Control-Allow-Origin: *`. No CORS header is configured in this repository or `vercel.json`; this is therefore platform/proxy behavior rather than application CORS configuration. The site has no API, cookies, authenticated endpoint, or state-changing request, so wildcard CORS on its public static GET response does not expose private data or create a cross-origin write risk. Reassess this immediately if APIs, previews containing private material, or authenticated features are introduced.

Browser DevTools console and CSP-violation reporting could not be inspected from this non-browser environment. The route, asset, and header smoke tests are not a substitute for a final manual browser-console review after deployment.

## Verification performed

- Source scan found no `dangerouslySetInnerHTML`, `innerHTML`, `eval`, dynamic script tags, iframes, or `javascript:` URLs in application code.
- Git tracked-file check found no tracked `.env`, `.env.local`, or `.env.production` files.
- Public assets contain only `hero.jpg` and `concept.png`; no source maps, keys, database exports, or environment files were found.
- External resource review found only the same-origin application assets plus Google Fonts (`fonts.googleapis.com` and `fonts.gstatic.com`), both covered by CSP.
- `npm run lint`: passed with ESLint 9.39.5 and `eslint-config-next` 15.5.26.
- `cmd /c npx tsc --noEmit`: passed.
- `npm run build`: passed with static export enabled; generated 54 files in `out/`, including `robots.txt`, `sitemap.xml`, and every regional route.
- `npm run test:security`: passed. This parses `vercel.json`, verifies required CSP/header directives, and checks static HTML output for home, under-construction, and all 11 regional routes.
- `npm run test:production`: passed against `https://cbrsquadindonesia.vercel.app`; all tested pages and both public images returned HTTP 200, and required production response headers were present.
- `npm audit --omit=dev`: 2 vulnerability entries remain (1 moderate Next.js entry, 1 high PostCSS entry) with 4 PostCSS GHSA records: `GHSA-qx2v-qp2m-jg93` (moderate, `<8.5.10`), `GHSA-6g55-p6wh-862q` (high, `<=8.5.11`), `GHSA-fxqj-rqcc-2cmp` (moderate, `<=8.5.22`), and `GHSA-r28c-9q8g-f849` (high, `<=8.5.17`).
- `npm outdated --json`: current Next.js 15.5.26 and compatible ESLint 9.39.5 are at their configured wanted versions. The available Next.js 16.3.6 and ESLint 10 are major upgrades and were not adopted.

## Residual PostCSS risk

The affected PostCSS copy runs as a build dependency; the deployed static site does not process attacker-controlled CSS or source-map comments at runtime. That substantially reduces exposure for this repository, but does not eliminate build-environment risk if an untrusted contributor can change CSS input. Use reviewed pull requests and update to a tested compatible Next.js release when a non-breaking remediation becomes available.

## Remaining operational work

1. In Vercel, confirm the production deployment uses the generated static output and inspect response headers with browser DevTools or `curl -I` after deployment.
2. Enable MFA on Vercel and GitHub, use least-privilege collaborators, protect the production branch, and require pull-request review. These account settings could not be verified from the repository.
3. Add a verified security-reporting contact to `SECURITY.md` only when CSI provides one.
4. Check image metadata before adding member/event photography, and secure permission before publishing it.
5. Consider local self-hosted fonts later to remove the Google Fonts CSP exception and external request.
6. After the next Vercel production deploy, confirm `Content-Security-Policy`, HSTS, X-Frame-Options, nosniff, Referrer-Policy, and Permissions-Policy response headers; local configuration validation is not proof of production enforcement.
7. The `script-src-attr 'none'` CSP tightening is in `vercel.json` and requires a new Vercel deploy before it can be considered active in production. Run `npm run test:production` and inspect browser console after that deploy.

## Supply-chain automation

`.github/dependabot.yml` schedules up to three monthly npm update pull requests. Review and test each pull request before merging; it does not grant workflows, publish packages, or access deployment credentials.
