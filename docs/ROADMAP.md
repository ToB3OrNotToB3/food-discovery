# Product delivery roadmap

Planning baseline: 12 October 2026. This is proposed sequencing, not completed implementation or approval of new technology choices.

## Destination and ownership

The first public web release should let someone discover food in a Bangalore launch area, inspect verified restaurant/dish information, view a qualified Vibe Check where evidence supports it, and save, share, call, view a menu, open directions, or follow an external ordering link. Browsing remains anonymous. Accounts and public reviews arrive when their supporting controls are ready.

Satyam owns frontend, mobile UI, and frontend integration. Vansh owns backend, APIs, data, and ML. Both agree contracts and verify complete journeys. Assign restaurant outreach, content maintenance, and user feedback ownership when the pilot starts.

Mobile, external reviews, recommendations, and automated dish tagging extend the validated web product. Payments, delivery operations, social messaging, and user video uploads remain outside initial scope. Database, hosting, authentication, mobile framework, and future model choices remain open until recorded in `DECISIONS.md`.

## Current baseline

- Frontend: Next.js discovery with three fictional places, local filters/saves, restaurant pages, and a working stock-video feed. Screens directly import mock data; a shared API adapter is still needed.
- Backend: health and individual-review sentiment endpoints exist. Discovery endpoints, restaurant storage, and frontend integration remain unimplemented.
- ML: pretrained English binary DistilBERT runs on CPU. Thirty synthetic practice reviews also include a neutral label. No custom model or representative quality evaluation exists.
- Quality: frontend component/browser checks exist. Backend automated tests, deployment, and production operations remain to be built.

## 1. Agree the first API contract

**Owners:** both. **Dependency:** none.

- Start with restaurant list/search and restaurant details. Agree identifiers, fields, media metadata, filtering, pagination, errors, and how feed items link to restaurant records.
- Review the draft routes in `FRONTEND_ARCHITECTURE.md`; they are not yet implemented or agreed contracts.
- Specify demo provenance and available, insufficient-data, and unavailable Vibe Check states. Never substitute a single review's model confidence for a restaurant score.
- Commit example requests/responses, including empty results, an unknown restaurant, and failure. Agree environment configuration and how frontend requests reach FastAPI.

**Done when:** both developers have agreed the examples and exact response fields before either side depends on them.

## 2. Connect a local alpha

**Owners:** Vansh (endpoints), Satyam (client), both (integration). **Dependency:** stage 1.

**Backend:** implement the agreed endpoints with labelled seed fixtures, validation, bounded result sizes, stable errors, API schema documentation, and focused tests. Keep storage access separate from response shapes.

**Frontend:** build the shared mock/API adapter and environment configuration. Replace direct mock imports in discovery and detail pages; preserve local saves with stable IDs. Add asynchronous loading, empty, missing-record, error, and retry states. Put search/filter state in the URL and verify refresh/back navigation.

**ML:** keep synthetic scores visibly labelled, test inference boundaries/failures, and continue evaluation separately. A custom model is not required for this connection.

**Done when:** changing backend seed data changes the website; search, detail navigation, save/unsave, and failure recovery work through the running API. Frontend, backend, and integration checks pass.

**Temporary MVP shortcut:** seed fixtures prove the connection before persistent storage. They remain demo content and are replaced in stage 3; they do not establish real restaurant ratings.

## 3. Persist data and finish the discovery experience

**Owners:** Vansh (data/services), Satyam (experience). **Dependency:** stage 2. Content outreach can run alongside it.

**Backend:** select/document a simple database, migrations, relationships, repeatable imports/seeds, and query indexes where justified. Model restaurants, dishes, areas, media, and read-only reviews with provenance and timestamps. Complete search, cuisine, price, dietary, area/proximity, context filters, sorting, pagination, dish details, and feed metadata. Provide a restricted operator workflow for correcting listings.

**Frontend:** complete dish pages and practical restaurant details: verified address, hours, menu, prices, contact, directions, and external ordering links. Finish manual area selection, optional Near me, filters, saved navigation, sharing, and API-backed Clips metadata. Handle denied location, partial data, missing media, long text, slow/offline requests, and empty pages. Refine layout, navigation, readability, touch targets, and video behavior across target devices.

**ML/data:** preserve review source identifiers and prediction/model-version metadata for reproducibility. Keep synthetic reviews separate from real listings. Public review submission remains deferred.

**Done when:** data survives restarts; operators can correct it; browse/search → restaurant/dish → meaningful action works. Shared search URLs restore filters. Manual keyboard, screen-reader, and phone checks supplement automated tests.

## 4. Evaluate sentiment and implement trustworthy Vibe Checks

**Owner:** Vansh, with Satyam implementing display states. **Dependencies:** evaluation starts now and overlaps stages 2–3; serving restaurant scores depends on agreed contracts and stored review data.

1. Finish the reproducible 24/6 split as a learning exercise. Thirty synthetic examples cannot establish real-world accuracy.
2. Define supported languages and labels. Resolve the mismatch between the serving model's positive/negative labels and the practice dataset's neutral label. Uncertainty and neutrality are different concepts.
3. Obtain permitted, representative restaurant-review examples and document human annotation rules/checks. Include mixed opinions, negation, slang, short reviews, and language patterns expected from pilot users.
4. When training is needed, separate training, validation, and held-out testing. Keep duplicates/related examples from leaking across sets; use restaurant, source, or time grouping where appropriate. Do not tune on the final test set.
5. Evaluate the current model as the baseline. Report per-class precision/recall, macro-F1, confusion patterns, sample counts, and latency/memory. Agree release thresholds and unsupported cases before selecting a candidate.
6. Compare other pretrained candidates or fine-tune only if the baseline fails requirements and adequate data exists. Record dataset/model versions, settings, seeds, dependencies, and reproducible evaluation commands.
7. Agree eligible reviews, minimum evidence, freshness, treatment of neutral/unclassified reviews, and source inclusion before publishing percentages. Record changes to the existing positive-review-percentage definition in `DECISIONS.md`.
8. Persist versioned predictions/aggregates where useful; avoid reclassifying the same reviews on every page view. Handle edited/deleted reviews and inference failure. Provide rollback and evaluate sampled errors after release.

**Done when:** repeatable evaluation supports the stated language/domain scope; every score is traceable to included reviews and its model version; the UI shows count, provenance, calculation, and limitations. If quality/evidence is inadequate, real listings show unavailable/insufficient data while discovery remains usable.

## 5. Deploy a pilot with verified content

**Owners:** both; assign content/feedback responsibility. **Dependencies:** stage 3; stage 4 before showing real sentiment scores.

- Start with one college-centred area and approximately 5–10 partner restaurants, as planned in the product brief. Obtain media permission and verify menus, hours, pricing, location, and dietary information. Record provenance and refresh dates. Never transfer fictional reviews to real listings.
- Select/document hosting and media delivery. Configure HTTPS, environments, secrets, migrations, dependency/model versions, and repeatable deployment/rollback.
- Secure operator access and privileged endpoints. Review authorization, validation, API origins, frontend security headers, and exposure of costly inference operations. Apply limits appropriate to publicly reachable operations.
- Add useful logs without sensitive user/review content, error reporting, uptime checks, backups, and a tested restore procedure. Measure API/video behavior on slow phones and resource costs.
- Verify complete journeys against the deployed system and record actual device/browser checks. Invite a small pilot group and measure search success, detail visits, saves, shares, directions/menu actions, and repeat use.
- Interview users about failed searches and abandoned journeys; fix recurring problems before expanding.

**Done when:** invited users can use the hosted experience without a developer's laptop; verified content is maintained; recovery works; feedback drives the next iteration. Anonymous browsing and local saves need no account. Public review submission stays closed.

## 6. Release public web V1 and enable accounts/reviews when ready

**Owners:** Vansh (identity, review lifecycle, moderation), Satyam (UI), both (release). **Dependency:** stage 5; real scores also require stage 4.

**Backend:** select authentication and implement sessions, authorization, account deletion, synchronized saves/preferences, and migration of local saves as needed. Before public reviews, implement authenticated create/edit/delete, ownership checks, reporting, moderation, abuse controls, and eligibility rules. Recalculate scores when review content or visibility changes.

**Frontend:** add sign-in/recovery as required by the provider, account controls, synchronized saves, validated review forms, edit/delete/report flows, and clear moderation/error states. Preserve anonymous discovery.

**ML:** integrate the approved review pipeline, monitor failures/changing inputs, sample quality, and require held-out evaluation before model replacement. Assign model release and rollback ownership.

**Release:** automate critical checks/deployment as useful; review access boundaries and dependencies; verify expected-load performance, upgrades, rollback, backups, and recovery. Document support and content correction procedures. Improve based on meaningful-action and repeat-use metrics.

**Done when:** public users can reliably complete discovery, enabled account/review features have complete lifecycle/abuse handling, and operations have owners. Public reviews launch only after their prerequisites; a useful public discovery release can precede them.

## 7. Extend the validated product

These tracks depend on demand and data and do not block the first public discovery release.

| Track | Backend and ML — Vansh | Frontend/mobile — Satyam | Completion evidence |
| --- | --- | --- | --- |
| External reviews | Select permitted sources; add attribution, restaurant matching, deduplication, refresh/deletion handling. Agree inclusion/weighting before combining scores; assess training permission separately. | Show source coverage, freshness, limitations, and missing-source states. | Traceable, permitted data without double counting; reproducible score changes. |
| Recommendations | Start with area/cuisine/budget rules. Gather appropriate interaction data; define cold-start behavior. Compare later content-based/collaborative models with the baseline through offline evaluation and a controlled rollout. | Preference controls, useful explanations, and generic discovery fallback. | Better meaningful discovery actions without unacceptable latency, repetition, or loss of variety. |
| Dish tagging/recognition | Start with operator tags. If automation helps, obtain labelled permitted imagery, evaluate a pretrained candidate, and fine-tune if justified. Include unknown results and human correction. | Correctable dish tags and unknown states; no allergen/dietary safety claims inferred solely from images. | Held-out quality on launch dishes and a reliable correction workflow. |
| Native mobile | Preserve shared API contracts and support secure mobile sessions as needed; reuse backend services and models. | Choose a framework after scope review; implement core journeys; test Android/iOS playback, permissions, accessibility, poor networks, and store releases. | Real-device release passes the same core journey checks as web. |
| Commercial growth | Add sponsored campaigns/referrals when partner demand is validated; protect organic ranking and sentiment from paid influence. | Sponsorship disclosures and appropriate partner/user flows. | Measurable value and reliable attribution. |

Optimize queries and media first. Add jobs, caches, or separate model services when measured workload/reliability requires them; document the trigger and owner.

## Sequence and timing

The main path is **contract → connected alpha → persistent, complete discovery → deployed pilot → public web V1**. Model evaluation and content outreach can run alongside development. Real scores depend on stage 4; public reviews depend on stage 6 controls. Mobile and advanced ML follow validation.

Stages 1–2 have a provisional estimate of **5–10 combined developer-days** for the narrow list/detail connection. At about six productive hours per developer-day, this is 30–60 total hours across both developers, excluding coordination delays. A 1–2 week calendar target assumes sufficient availability, quick agreement, and the seeded scope above.

Estimate later dates after the first integration using weekly availability, content access, database/hosting choices, and model evaluation findings. No date is promised for the entire long-term product, and model quality is not guaranteed by completing training. Re-estimate at each completion gate.

## Immediate work queue

1. Both: agree the minimum list/detail contract and example responses.
2. Satyam: implement the agreed mock/API adapter, URL filters, and asynchronous screen states.
3. Vansh: implement/test matching discovery endpoints while continuing model evaluation.
4. Both: verify the first browser journey through FastAPI, then plan persistent storage.

`TASKS.md` tracks current ownership/status, `PROJECT_STATE.md` records what works, and `DECISIONS.md` records accepted choices. Update this roadmap when scope or dependencies change.
