# Product Brief

Last updated: 3 October 2026

## Product Vision

Help college students and Bangalore residents decide what and where to eat through short food videos, purposeful search, practical local information, and transparent review sentiment.

## Initial Market

- Launch city: Bangalore
- Primary audience: college students
- Secondary audience: other Bangalore residents looking for restaurants and dishes
- Initial emphasis: affordable, nearby, trustworthy, and socially relevant food discovery

## Product Promise

> Discover what and where to eat in Bangalore through short food videos, practical filters, and transparent Vibe Checks.

## Core Discovery Modes

1. **Inspiration:** a mobile-first vertical food and restaurant video feed.
2. **Intent:** search and filtered restaurant or dish results.

## Primary V1 Journey

1. Open the product without signing in.
2. Select an area manually or optionally use **Near me**.
3. Browse the feed or search directly.
4. Filter by cuisine, price, distance, dietary needs, or dining context.
5. Open a restaurant or dish.
6. Review its details and Vibe Check.
7. Save, share, call, open directions, view the menu, or follow an external ordering link.

## Authentication

- Browsing, search, filtering, and restaurant details do not require an account.
- Initial saves may be stored locally on the device.
- Sign-in is introduced when users need cross-device synchronization, collections, preferences, or review submission.

## Prototype Content Strategy

The initial frontend will use:

- fictional Bangalore restaurant and dish data
- synthetic reviews and sentiment results
- properly licensed stock photos and vertical videos
- visible demo-content labels
- a media manifest recording source, creator, licence, and download date
- typed mock data shaped like the eventual FastAPI responses

Do not attach invented reviews, ratings, or claims to real restaurants. Do not use social-media media without permission.

## Location and Privacy

- Manual area or college selection is always available.
- **Near me** is optional and requested only after a user action.
- Ordinary discovery does not require precise location.
- The product will not continuously track users or store precise location history.

## Vibe Check

The Vibe Check represents the percentage of reviews classified as positive. It must show:

- positive-review percentage
- review count
- an explanation of how it is calculated
- limitations and an insufficient-data state

Model confidence for one review must never be presented as a restaurant rating.

### Planned Review Sources

Vibe Check will eventually use both reviews submitted through the app and reviews from external sources. External review integration is planned for a later stage; providers and access methods are not yet selected. The initial alpha continues to use labelled synthetic reviews.

Review records should preserve their source and source identifiers so reviews can be attributed, matched to the correct restaurant, updated, and deduplicated. Decide source inclusion and weighting before combining sources into a restaurant score. Access and permitted use must be confirmed for each provider; permission to analyze reviews does not automatically establish permission to use them for model training.

### Initial Alpha

- read-only synthetic reviews
- clearly labelled demo sentiment
- no public review submission

### Public Beta

Public review submission requires authenticated users, editing and deletion, reporting, moderation, abuse controls, and a minimum review threshold before publishing a Vibe Check. The interface must disclose that sentiment is automatically estimated and may be imperfect.

## Ordering Boundary

V1 is a discovery product, not a delivery platform. It may link to:

- directions
- telephone
- restaurant menus or websites
- external ordering services

It will not initially process payments, orders, refunds, or delivery tracking.

## V1 Scope

- responsive vertical discovery feed
- restaurant and dish search
- manual area and optional proximity selection
- cuisine, price, dietary, distance, and context filters
- restaurant details
- dish details
- transparent Vibe Check presentation
- device-local saving
- sharing
- directions, calling, menu, website, and external ordering actions
- complete loading, empty, offline, and error states
- accessibility and performance support

## Initial Non-Goals

- in-app ordering or payments
- delivery tracking
- multi-city support
- public reviews in alpha
- user video uploads
- restaurant-owner dashboard
- advanced AI personalization
- social following or direct messages
- native Android or iOS applications
- real-time reservations or menu availability
- paid promotions or sponsored rankings in the prototype

## Success Definition

The North Star metric is:

> Weekly users who discover at least one restaurant and take a meaningful action.

Meaningful actions include saving, sharing, opening directions, calling, viewing a menu, or opening an external ordering link.

Supporting measures include:

- feed or search to restaurant-detail conversion
- search success and no-result rates
- saves per active user
- restaurant-detail to action conversion
- seven-day retention
- frontend performance and error rates

The product should optimize useful decisions rather than watch time alone.

## Real-Content Transition

1. Select one college-centred launch area.
2. Partner with approximately 5–10 nearby restaurants.
3. Capture original vertical media with written permission.
4. Verify menu, pricing, hours, and dietary information.
5. Add real reviews only after moderation and deletion workflows exist.
6. Expand neighbourhood by neighbourhood.

## Monetization Direction

The consumer discovery experience will remain free during the initial stages. Early monetization may come from:

- optional restaurant content-production services
- clearly labelled sponsored campaigns
- student-deal campaigns
- restaurant subscriptions after product validation
- attributable referral revenue after reliable partner integration
- aggregated, privacy-conscious restaurant analytics at sufficient scale

Organic rankings, reviews, and Vibe Checks must never be purchasable or influenced by payment. Basic factual listings and corrections must remain free. The project will not sell individual users' personal data or location histories.

## Ownership

- Developer 1: Vansh — backend and ML work unless reassigned in `docs/TASKS.md`
- Developer 2: Satyam — frontend product and implementation work unless reassigned in `docs/TASKS.md`

## Next Phase

Phase 1 will define and document the frontend architecture, technology choices, API boundary, quality gates, and development workflow before frontend implementation begins.
