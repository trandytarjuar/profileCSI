# Interactive chapter map

## Audit and integration

- Existing stack: Next.js 15 App Router, React 19, TypeScript, plain global CSS,
  static export and Vercel headers. Tailwind is not installed; CSS Modules extend
  the existing design without changing the styling architecture.
- The single chapter catalog is `data/community.ts`. Its slug is the stable ID
  and the profile path remains `/chapter/[slug]`.
- There are 11 existing chapters, including Malang Raya. It is preserved even
  though the initial map brief named only ten. Current terminology is Chapter,
  following the user's earlier naming request.
- Replaced the decorative territory map and chapter cards with a selectable map,
  equivalent chapter list, information panel and profile links in the same section.
  Navigation, hero, organization, footer and chapter profile pages are retained.

## Approach

`ChapterMap.tsx` uses native SVG, HTML buttons, React state and a CSS Module.
There is no map library, external map script, API key or runtime geocoding.
`public/maps/indonesia.svg` is about 52 KB, generated from public-domain Natural
Earth v5.1.2 country geometry. See `public/maps/README.md` for sources, license,
projection and regeneration instructions.

Coordinates are approximate geographic orientation points stored directly in
the chapter catalog. They are not secretariat addresses. Callout labels connect
to the actual coordinate dots. Eight close western Java chapters are grouped
on the national view; expanding the group exposes individual selectable markers.
Filters zoom to western Java where appropriate; independent chapters use the
national view. Reset restores all chapters and the national overview.

The map deliberately has no province/district boundaries. Natural Earth's 1:50m
coastline is generalized, so this is an orientation feature rather than a street
map or navigation tool. The two fixed views do not support free pan/pinch zoom.

## Data availability

- Logos: all 11 chapters.
- Named leaders and leader photos: Depok, Tangerang, Cikarang, Karawang,
  Deli Serdang. Other chapters show that leadership data is unavailable.
- Gallery and official contact: only Deli Serdang currently has supplied photos
  and an Instagram URL. The panel does not invent other contact details.
- Bespoke descriptions and coordinator identities still require approved data.
  The generic description only states the existing chapter name/location.
- Optional `description` can be added to a chapter later. The stable ID is its slug.

## Accessibility and behavior

- Native buttons support Tab, Enter and Space, with visible focus outlines.
- Cluster expansion transfers focus to its first marker. List selection keeps
  focus on the activated list button.
- Selected markers, filters and list buttons expose `aria-pressed`; a concise
  live status announces the selection without reading the whole panel.
- Group symbols and text labels supplement color. Labels appear on hover/focus.
- Reduced-motion preferences disable panel animation and transition effects.
- Static map load errors preserve marker/list selection and display a fallback.
- Desktop uses map/list on the left and the panel on the right; smaller screens
  stack the panel below the map/list. Contact handles wrap on narrow screens.

## Verification commands

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run test:security
# Uses an installed Google Chrome. Otherwise install Playwright Chromium and omit this variable.
$env:PLAYWRIGHT_CHANNEL = 'chrome'
npm.cmd run test:map
# Local static smoke test (run the server in a separate terminal):
node scripts/serve-export.mjs
$env:SITE_URL = 'http://127.0.0.1:4173'
npm.cmd run test:production
# When using an already running static server for browser tests:
$env:TEST_BASE_URL = 'http://127.0.0.1:4173'
npm.cmd run test:map
```

Playwright tests the built export, including every chapter list selection/profile
route, every marker, filter/reset synchronization, real/missing data, keyboard
focus, reduced motion, mobile widths 320/390/768, hydration/runtime errors and
failure to load the SVG. Axe runs automated WCAG A/AA checks on the territory
section in overview and selected states; automated checks do not replace a full
manual accessibility audit. The local static test server applies the existing Vercel
header settings; this verifies configuration and exported assets, not a live
deployment. Running `test:production` without `SITE_URL` checks the live site.

Production CSP and security headers are unchanged. Playwright is a development
dependency only, together with the axe accessibility test integration. Map changes
do not require a backend or database. Existing narrow-screen title overflow and
tablet navigation overflow were corrected without removing content or navigation.

## File inventory for this implementation

New files:

- `components/ChapterMap.tsx`: interactive map, filters, list and information panel.
- `components/ChapterMap.module.css`: scoped responsive map styling.
- `data/chapter-map.ts`: projection, view frames, group legend and label positions.
- `public/maps/indonesia.svg` and `public/maps/README.md`: local map and provenance.
- `scripts/generate-indonesia-map.mjs`: reproducible map asset generation.
- `scripts/serve-export.mjs`: local exported-site smoke-test server.
- `playwright.config.ts` and `tests/chapter-map.spec.ts`: browser/accessibility tests.
- `docs/chapter-map.md`: this audit, implementation and validation report.

Existing files updated:

- `components/CommunityClient.tsx`: integrate the explorer into Our Territory.
- `data/community.ts`: replace decorative percentages with geographic coordinates;
  add optional description support while preserving the existing chapter catalog.
- `app/globals.css`: fix existing narrow-screen overflow and territory kicker contrast.
- `package.json` and `package-lock.json`: development test dependencies and test command.
- `.gitignore`: ignore browser-test output.

Earlier gallery, chapter naming/routing and Next.js cache fixes in the workspace
are preserved; they are not new changes introduced by this map implementation.

## Recorded validation — 2026-09-28

- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; 18 static pages generated. Existing Autoprefixer warning
  about `align-items: end` remains in the global stylesheet.
- `npm run test:map`: **8 passed**, using Google Chrome and the production export.
- Automated axe WCAG A/AA checks: zero violations in the territory overview and
  selected-chapter states. This is not a complete accessibility certification.
- `npm run test:security`: passed.
- `npm run test:production` with local `SITE_URL`: passed for headers, all chapter
  routes and public assets. The production deployment itself was not modified.
- `git diff --check`: passed.

Remaining limitations: approximate coordinates, generalized coastline, two fixed
map views, incomplete chapter data as listed above, and live Vercel deployment
verification still needed after publishing.
