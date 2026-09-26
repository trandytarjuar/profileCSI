# Security Policy

## Supported versions

Security maintenance applies to the latest deployed version of this repository.

## Reporting a vulnerability

Do not publish vulnerabilities in public issues. Use a verified official CSI contact channel to report them privately. This repository deliberately does not list a contact address until CSI provides one.

Include a clear description, affected URL or file, reproduction steps, and potential impact. Do not include credentials or personal data.

## Maintenance

- Run `npm audit --omit=dev`, TypeScript checking, and a production build before deployment.
- Keep Next.js and its lockfile current through reviewed dependency updates.
- Review Vercel deployment access, GitHub branch protection, and MFA periodically.
- Revisit the Content Security Policy whenever a new external asset, analytics tool, or embed is introduced.
