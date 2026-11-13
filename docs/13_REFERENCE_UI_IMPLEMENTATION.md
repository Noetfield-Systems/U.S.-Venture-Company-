# Reference-faithful UI implementation — v3
Date: 2026-11-13 | Design input: user-approved bright-lilac landing page image supplied in the conversation.

## Hierarchy and fidelity
The website is implemented as real HTML/CSS/JS (not a static screenshot). Fidelity priorities: white navigation, purple gradient brand identity, 44px CTA, large tightly kerned left-aligned hero, layered lavender/pink polygon background, SaaS browser product preview, two independent floating founder/task cards, four-value trust strip, and three soft 3D product illustrations.

Desktop reference frame is approximately 1408 × 1056. At that viewport, the two-column hero, floating cards and feature section should appear in the first scrollful. Responsive breakpoints cover desktop, tablet and compact mobile (1270,1080,800,600,385 px); reduced-motion preference supported.

## Interactions
- Menu collapses on small screens, dropdown buttons toggle with keyboard support.
- Hero entity radio selects Delaware C-Corp / LLC / Not sure; value prefills the live three-step assessment form.
- Product preview sidebar is a real interactive narrative preview only, not a case portal.
- Checklist checkboxes are a local illustration, explicitly not a production filing case.
- Primary CTAs connect to the actual assessment form and backend.
- Legal privacy and terms routes continue to render.
- Operator route remains a token-protected separate operator surface.
- Intake remains a consented database record with entityType saved.

## Accuracy and trust
Product screenshots show illustrative case statuses, not fabricated legal filings, verified customers, endorsements or payments. The site discloses the founding stage and that official incorporation services are not active yet.

## Engineering and acceptance
npm test includes API lifecycle tests and reference landing static/syntax tests. Railway runs the tests before server startup. Manual browser review should check alignment at 1408/1440, 1024, 768, 390 and 360 pixels, verify no clipping, and confirm assessment submission with correct consent. This document is an implementation plan / acceptance record, not a claim of pixel-perfect browser validation.
