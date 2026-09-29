# Agent Coding Rules — ShreeRam Milks

This file is written **to the coding agent** (Claude Code, Codex, Cursor,
etc.), not to a human reviewer. Read it in full before writing or editing
any code in this repo, every session — not just the first time.

It has two phases because the app is currently in Phase 1
(`src/services/*.ts` return mock JSON, no real database yet). Check
`src/services/apiClient.ts` — if it's still a stub, you're in Phase 1.
Once it makes real HTTP calls, you're in Phase 2. Follow the section that
matches the current phase; don't skip ahead and don't regress backward.

---

## Phase 1 — Before the database exists (current phase)

The mock data phase is not a throwaway prototype — it is the contract the
real backend will be built against. Treat mock shapes as load-bearing.

1. **Never let a component or hook read `src/mock-data/*` directly.**
   Only a `src/services/*.ts` file may import from `mock-data/`. If you
   need data in a screen, add or extend a service function — this is the
   seam that becomes a real HTTP call later with zero changes above it.
2. **Define the return type in `src/types/models.ts` as if it were the
   real API response**, not as whatever shape is convenient for the mock
   JSON. If the mock JSON doesn't match the type you'd want from a real
   API, fix the mock JSON — the type is the source of truth, not the
   fixture.
3. **Every service function must already have the signature it will have
   in Phase 2** — same params, same return shape (including how errors
   surface), even though today it just resolves a local import. If a
   function will eventually need a `pincode` param for a real filtered
   query, add that param now, even if the mock ignores it.
4. **Don't hardcode UI copy.** Every user-facing string goes through
   `en.json`/`gu.json` via `react-i18next`, even for "placeholder"
   screens — placeholder screens have a way of shipping.
5. Before adding any new dependency, check `package.json` first — don't
   add a second library that does what an existing one already does
   (e.g. don't add another date library if one is already present).

---

## Phase 2 — Once the database/API is connected

### Query rules
- Never `SELECT *` — name the columns a query actually needs.
- Never write an N+1 pattern (a query inside a loop). Use a join, a
  batched `WHERE id IN (...)`, or a single aggregate query instead.
- Every list endpoint the agent writes or calls must be paginated
  (cursor or offset+limit) from the first version — never "add
  pagination later."
- Any new filtered/sorted column needs an index added in the same PR
  that introduces the query, not as a follow-up.

### How responses come back
- Wrap every service response in the same shape already established by
  `errorMapper.ts` — don't invent a new error/response envelope per
  feature.
- Validate every API response with `zod` **inside the service function**,
  before it reaches a hook or component. If validation fails, surface it
  as a typed error the existing error-mapping layer understands — never
  let an unvalidated shape reach a component.
- A service function returns typed data or throws a typed error. It
  never returns `null`/`undefined` to silently mean "something went
  wrong" — that pattern hides bugs.

### Nothing gets deleted
- **Never write a hard `DELETE` by default.** Use a soft-delete pattern
  (`deleted_at` timestamp or `is_active` flag) unless a human has
  explicitly asked for a hard delete in that specific task.
- **Never write or run a destructive migration** (`DROP TABLE`,
  `DROP COLUMN`, `TRUNCATE`, `DELETE FROM ... ` without a `WHERE`) without
  it being the explicit, stated task — not an inferred cleanup step.
- **Never execute a migration against a live database directly.** A
  migration is a committed file; a human or CI applies it. The agent's
  job stops at writing the migration file.
- If a task seems to require deleting data to "fix" something (e.g.
  clearing a bad row, resetting a table), stop and ask instead of doing
  it — this is one of the few cases where asking is correct even under
  time pressure.

### Don't multiply API/DB requests
- Never fetch inside a `.map()` or a loop — batch it into one request.
- Don't manually `fetch()`/refetch data that TanStack Query already
  caches — invalidate the specific query key instead of writing a
  parallel fetch path.
- Use optimistic updates (already the documented pattern for mutations)
  instead of firing an extra `GET` right after every mutation just to
  "confirm" it worked.
- Debounce anything tied to typing (search, address autocomplete) —
  never fire a request per keystroke.
- When one screen needs data from two endpoints, check whether the
  backend already exposes (or should expose) a combined endpoint before
  making two separate calls from the client on every render.

---

## App-size discipline (both phases, every function)

- Don't add a new npm package for something 20 lines of code covers.
- Import icons/functions individually — `import { X } from 'lib/x'`, never
  a whole default export you use 5% of.
- No embedded base64 images in source files — always a real asset file,
  and prefer WebP.
- Don't add a new font weight/family unless the design system
  (`docs/design-system.md`) actually defines a token for it.

## Every function, every time

- One function = one responsibility: a service function fetches and
  validates; a hook manages caching/staleness; a component renders and
  dispatches events. Don't blend these.
- No `any`. No `console.log` left in committed code.
- If a function's behavior changes in a way that affects another screen
  or another developer's assumptions, say so explicitly in the PR
  description — don't let a "small fix" silently change a contract
  another part of the app depends on.
