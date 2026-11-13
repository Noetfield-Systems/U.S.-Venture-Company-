# PREMIUM VISUAL REFINEMENT V4 — implementation reference
Date: 2026-11-13. Based on the latest founder-approved 1536 × 1024 landing-page image.

## Recreated elements
Hero copy ("Launch a U.S. company / and grow beyond / incorporation.") with custom underline; glossy violet pill CTA and nav CTA; white satin navigation; U.S. market eyebrow; standalone SVG light ribbons and violet/pink aurora; bright semi-translucent browser app; glowing border and rows; two frosted interactive floating cards; glass trust strip with 3D-style icons; pearly illustrated feature cards; stronger typographic rhythm and shadows.

## Working paths preserved
Founder assessment -> POST /api/intake -> durable queue; /operator protected separately; /demo remains the interactive eight-part application; herocard C-Corp/LLC preferences still prefill form. No changes to revenue/banking/legal execution behavior or user records.

## Responsive handling
Desktop (up to 1536) matches reference composition. On phones (<=600), artwork becomes a readable vertical composition with full-width workspace and cards instead of shrinking the entire application preview. Tablet keeps existing responsive adjustments. Reduced motion respects system settings.

## Acceptance
UI tests assert headline, art asset, trust elements and CTAs; smoke tests cover intake lifecycle. Validate live deployment and make no pixel-perfect claim without capture at each breakpoint.
