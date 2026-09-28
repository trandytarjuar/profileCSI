# Indonesia map

Source: Natural Earth, Admin 0 Countries, 1:50m, v5.1.2.

- Data: https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_50m_admin_0_countries.geojson
- License: public domain, https://www.naturalearthdata.com/about/terms-of-use/
- Regenerate: `node scripts/generate-indonesia-map.mjs`

Only the Indonesian country outline is retained, without internal administrative
boundaries. Equirectangular projection: longitude 94–142 and latitude 7 to −12,
mapped to 1000 × 396. Path precision is rounded to two decimal SVG units.
The matching marker projection is in `data/chapter-map.ts`.

Chapter coordinates in `data/community.ts` are approximate geographic reference
points, rounded to two decimals. Deli Serdang uses the Lubuk Pakam area; Malang
Raya uses the Malang city area. They represent a chapter's general area, not
verified meeting places, secretariats, coverage boundaries, or navigation targets.
Callout labels are displaced for legibility and joined to their geographic dots.
At national scale, the eight western Java chapters are grouped into a zoom button.

This is an orientation map; small islands and coastlines are generalized at 1:50m.
