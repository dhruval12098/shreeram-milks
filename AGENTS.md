# AGENTS.md — frontend/

This is the ShreeRam Milks customer app (Expo / React Native / TypeScript).

Before doing ANY work in this directory, read these two files in full:

1. `docs/design-system.md` — colors, spacing, typography, and component
   architecture rules. Governs every visual/UI decision.
2. `docs/development-plan.md` — data layer, state management, performance,
   and error-handling conventions. Governs every non-visual code decision.

Do not skip this even for a small change — a one-line "fix" that ignores
these conventions is how the codebase drifts.

## Quick rules (full detail in the two files above)
- TypeScript only, no `.js` files.
- No hardcoded colors, spacing, or fonts — always reference tokens in
  `src/theme/`.
- Atomic component structure: atoms → molecules → organisms → screens.
- All network calls go through `src/services/*.ts`, wrapped in TanStack
  Query hooks. Never `fetch()` directly inside a component.
- Zustand for client-only state, TanStack Query for server state. No Redux.
- Lists use FlashList/FlatList, never `.map()` in a ScrollView.

## Verification before finishing a task
```bash
npm run typecheck
npm run lint
npm run test
```
