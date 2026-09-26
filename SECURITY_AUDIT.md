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
| Dependency | `npm audit --omit=dev` reports two advisories through Next.js' bundled PostCSS dependency; npm currently reports no available fix. | Installed dependency tree. | No forced upgrade was performed. Monitor the Next.js release notes and update to a compatible release that resolves the transitive advisory. |

## CSP rationale

`default-src 'self'` is the baseline. Google Fonts is permitted only for `style-src` and `font-src`, matching `app/globals.css`. Images, scripts, and connections are restricted to the same origin. Plugins, frames, and unexpected form targets are blocked.

`'unsafe-inline'` remains required in `script-src` for Next.js static-page bootstrap/React Flight inline scripts, and in `style-src` because the interactive regional map uses React inline positioning. Removing either without refactoring those mechanisms would break client-side rendering or map markers. No `unsafe-eval`, wildcards, or external script hosts are permitted.

## Verification performed

- Source scan found no `dangerouslySetInnerHTML`, `innerHTML`, `eval`, dynamic script tags, iframes, or `javascript:` URLs in application code.
- Git tracked-file check found no tracked `.env`, `.env.local`, or `.env.production` files.
- Public assets contain only `hero.jpg` and `concept.png`; no source maps, keys, database exports, or environment files were found.
- `npm audit --omit=dev`: two transitive PostCSS advisories, no npm fix available at audit time.
- `npx tsc --noEmit`: use `cmd /c npx tsc --noEmit` on Windows where PowerShell execution policy blocks `npx.ps1`.
- `npm run lint`: cannot complete because the repository has no ESLint configuration and `next lint` opens an interactive setup prompt.
- `cmd /c npx tsc --noEmit`: passed.
- `npm run build`: passed with static export enabled; generated 54 files in `out/`, including `robots.txt`, `sitemap.xml`, and every regional route.

## Remaining operational work

1. In Vercel, confirm the production deployment uses the generated static output and inspect response headers with browser DevTools or `curl -I` after deployment.
2. Enable MFA on Vercel and GitHub, use least-privilege collaborators, protect the production branch, and require pull-request review. These account settings could not be verified from the repository.
3. Add a verified security-reporting contact to `SECURITY.md` only when CSI provides one.
4. Check image metadata before adding member/event photography, and secure permission before publishing it.
5. Consider local self-hosted fonts later to remove the Google Fonts CSP exception and external request.

## Supply-chain automation

`.github/dependabot.yml` schedules up to three monthly npm update pull requests. Review and test each pull request before merging; it does not grant workflows, publish packages, or access deployment credentials.
