# Ross PDF Editor — Branding Asset Specification

## Source asset
The supplied square Ross PDF Editor logo is the visual reference for the production brand implementation. The repository contains a vectorized web-safe representation for application delivery.

## Assets
- `apps/web/public/assets/ross-pdf-editor-logo.svg` — primary square lockup.
- `apps/web/public/assets/ross-pdf-editor-mark.svg` — compact application mark.
- `apps/web/public/favicon.svg` — browser favicon.
- `apps/web/src/components/BrandLink.tsx` — reusable home-linked brand component.

## Global navigation behavior
Every application shell that imports `BrandLink` must render the logo as a semantic link to `/`. Clicking the logo is the canonical Home action and must work from every public and authenticated page.

## Usage
Primary header: `BrandLink` with the compact mark and ROSS PDF EDITOR wordmark.
Favicon: `ross-pdf-editor-mark.svg`.
Open Graph/social artwork may use the supplied square lockup as the visual foundation.

## Palette
- Midnight Navy: `#07152D`
- Deep Navy: `#0E2345`
- Gold: `#D9A83B`
- Silver: `#CFD2D7`
- White: `#FFFFFF`

## Accessibility
Logo links require an accessible name, visible focus state, keyboard activation, and meaningful tooltip/title text. Decorative repetitions must not create duplicate tab stops.

## Integrity
Do not alter the supplied logo to imply government affiliation, third-party certification, or an association that has not been authorized. Keep the parent-company/IP statement in legal/footer surfaces.
