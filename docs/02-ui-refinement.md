# 02 — Customer Frontend UI Refinement Standard

## Purpose

This document defines **how every ShreeRam Milks customer screen must look, feel, and respond** before the frontend can be frozen.

Use together with:

- `AGENTS.md`
- `docs/design-system.md`
- `docs/development-plan.md`
- `docs/frontend/01-screen-completion.md`
- `docs/frontend/frontend-progress.md`

This is not a redesign brief.

Preserve the existing visual identity and architecture.

The goal is to convert the current good coded UI into a polished, consistent, mobile-native product.

---

# 1. Core UI Quality Target

The app should feel:

```text
clean
calm
premium
fresh
trustworthy
fast
native
consistent
```

Avoid:

```text
visual clutter
oversized badges
tiny unreadable labels
random shadows
gratuitous animation
different interaction behavior per screen
dead taps
boxed-everything layouts
giant headings
inconsistent colors
```

---

# 2. Design System Is Mandatory

Use:

```text
useTheme()
theme.colors
theme.spacing
theme.radii
theme.sizes
theme.layout
theme.borderWidths
theme.typography
theme.motion
theme.elevation
theme.zIndex
```

Do not introduce raw:
- colors
- font families
- z-index values
- arbitrary shadow recipes
- repeated spacing values

If a recurring UI role cannot be expressed correctly, add an intentional semantic token rather than screen-level hacks.

---

# 3. Typography Refinement

Current base scale is good:

```text
H1       28 / 34
H2       22 / 28
Body     16 / 22
BodySm   14 / 20
Caption  12 / 16
```

The app now needs two additional semantic compact roles.

Recommended:

```text
overline:
11 / 14
600

badgeLabel:
10–11 / 13–14
600–700
```

Use them for:
- compact section labels
- discount labels
- tiny status badges
- overlines

Do not shrink typography using arithmetic such as:

```ts
caption.fontSize * 0.6
```

Typography sizes must be intentional tokens.

---

# 4. Product Details Discount/Badge Fix

Inspect:

```text
app/product-details.tsx
```

and any plan-card components.

The current badge calculation produces approximately 7px text and is too small.

Fix labels like:

```text
10% OFF
MOST POPULAR
SAVE 10%
```

Target:
- font size about 10–11px
- line-height about 13–14px
- semibold/bold
- compact horizontal padding
- small vertical padding
- enough offset from card edges
- readable contrast

No arbitrary multiplication.

The badge must be:
- readable
- compact
- non-dominant
- visually balanced

---

# 5. Bottom Navigation Cart Badge Fix

Inspect:

```text
src/components/organisms/BottomNavigation.tsx
```

Current badge is visually oversized.

Target:

Single digit:
```text
16–17px minimum diameter
9–10px text
11–12px line height
semibold/bold
```

Two digits:
- allow small horizontal expansion
- retain compact pill

High values:
- use `99+` or product-approved cap
- never let badge grow indefinitely

Badge must:
- not cover the cart icon
- not increase nav bar height
- remain aligned across Android/iOS
- remain readable

---

# 6. Motion System Must Actually Be Used

Existing motion tokens:

```text
fast    ~150ms
normal  ~250ms
slow    ~400ms
```

Use subtle motion consistently.

## Button press
- scale around `0.98`
- ~150ms
- return smoothly

## Clickable card
- scale around `0.985` or subtle opacity/surface response
- ~100–150ms

## Selection state
- border/fill/indicator transition
- ~150–250ms

## Navigation
- active indicator transition
- subtle icon emphasis
- avoid bouncing

Do not animate everything.

Motion must communicate:
- press
- selection
- success
- navigation hierarchy

---

# 7. Bottom Navigation Refinement

Bottom nav should feel stable.

Recommended:
- active icon opacity 1
- inactive opacity around 0.7–0.8
- active icon may scale subtly to ~1.04–1.06
- active indicator animates from width 0 to tokenized width
- no cartoon bounce

Labels:
- remain legible
- do not wrap
- Gujarati labels must be tested

Tap targets must remain >= design-system minimum.

---

# 8. Press Feedback Consistency

Every interactive element needs immediate acknowledgment.

Audit:
- Product cards
- Add buttons
- Account menu rows
- Settings rows
- Category chips
- Plan cards
- Subscription options
- Day selectors
- Delivery slots
- Address cards
- FAQ rows
- Payment methods
- Calendar dates

Use one of:
- subtle scale
- tint/surface change
- opacity change

Do not use aggressive combinations.

A tap should never feel ignored while waiting for navigation.

---

# 9. Touch Target Audit

Minimum practical target:

```text
44x44
```

The visible control may remain smaller if hitSlop/wrapper provides the required touch area.

Audit:
- ProductCard `+ ADD`
- quantity plus/minus
- back buttons
- edit/delete icons
- category filters
- calendar arrows
- day circles
- FAQ chevrons
- tab items
- radio controls
- language rows

Do not enlarge the visible UI unnecessarily just to achieve touch size.

---

# 10. Selection-State Color Refinement

Current UI relies heavily on solid primary orange.

Use hierarchy:

## Primary action
```text
solid primary
inverse text
```

## Strong selected state
```text
solid primary
inverse text
```

## Secondary selected state
Prefer:
```text
primary tint
primary border/text
```

## Informational accent
```text
primary text/icon only
```

Do not fill every selected chip/day/card with solid orange.

This is especially important on:
- subscription day selectors
- filter chips
- calendar
- settings
- plan cards

---

# 11. Color Roles

Before frontend freeze, verify that final product identity accepts:
- `colorPrimary`
- `colorPrimaryPressed`
- `colorPrimaryTint`
- `colorNavigation`
- danger
- warning
- info

Do not change the brand palette casually.

Any currently unconfirmed supporting color token must be explicitly resolved before production release.

---

# 12. Surface & Background Hierarchy

Avoid screens becoming repeated:

```text
grey background
white card
grey background
white card
```

Use semantic hierarchy:
- app background
- primary surface
- subtle/muted surface
- disabled surface

If current background/muted/disabled values are identical, verify whether this causes hierarchy problems.

Do not add shadows everywhere.

Prefer:
- whitespace
- subtle surface shifts
- selective borders

---

# 13. Border Discipline

Not every container needs a border.

Use:
- whitespace for loose grouping
- muted surface for grouping
- border for interactive/structural separation
- strong border for active selection/error/focus

Avoid "boxed UI" where every section is outlined.

---

# 14. Radius Consistency

Keep tokenized radii.

Recommended semantic use:
- inputs: `md`
- small selectors: `md`
- major cards: `lg`
- buttons: `lg`
- chips/badges: `pill`

Do not randomly switch radii per screen.

---

# 15. Product Card Polish

Product cards should include:
- stable image area
- expo-image
- image transition
- one-line product name handling
- unit metadata
- price hierarchy
- clear Add/Added state
- press feedback
- accessible Add tap target

When Add changes to Added:
- use subtle transition
- avoid layout jump

---

# 16. Product Details Hierarchy

Product Details is dense.

The user must visually perceive:

```text
1. Product
2. Purchase Type
3. Schedule
4. Delivery
5. Quantity
6. Primary Action
```

Do not let every section have equal visual weight.

Use spacing rhythm:
- small gap inside component
- medium gap between related controls
- large gap between conceptual sections

Reduce redundant borders/cards where possible.

---

# 17. Bottom CTA Area

Where two actions exist:
- one must clearly be primary
- the other must be lighter

Avoid two visually equal full-width buttons unless product requires it.

Sticky bottom actions:
- respect safe area
- do not cover scroll content
- include enough bottom padding
- handle keyboard correctly

---

# 18. Header Consistency

Standardize:
- header height
- back button size
- back hit area
- title typography
- horizontal padding
- right action position
- safe-area behavior

If repetition warrants it, create a reusable `ScreenHeader`.

Do not abstract prematurely if the screens genuinely differ.

---

# 19. Bottom Sheet Consistency

All bottom sheets must use consistent:
- top radius
- overlay
- elevation
- internal spacing
- close behavior
- keyboard handling
- safe-area padding
- animation duration

Dismiss behavior should be predictable.

Destructive confirmation sheets/dialogs must clearly distinguish destructive CTA.

---

# 20. Loading States

Use `StateMessage` where sufficient.

For high-value list screens consider lightweight skeletons:
- Home product sections
- Products
- Orders
- Subscriptions

Skeletons must:
- match final layout dimensions
- not shimmer aggressively
- not be added everywhere

---

# 21. Empty States

Key empty states should have:
- small contextual icon
- clear title
- one supporting sentence
- useful CTA

Required examples:
- Empty cart
- No orders
- No subscriptions
- No search results
- No addresses
- No delivery on selected date

Avoid giant decorative illustrations.

---

# 22. Error States

Error states must:
- explain failure in user language
- allow retry if applicable
- not expose raw API/internal errors
- use centralized translated copy

Network failure must not look like an empty result.

---

# 23. Success Feedback

Actions such as:
- Save instructions
- Save address
- Edit profile
- Pause subscription
- Add to cart
- Change schedule

must produce feedback.

Use:
- inline success
- button state
- toast
- state transition

Do not show a modal for every success.

Example:

```text
Save
→ Saving…
→ Saved
```

---

# 24. Haptics

Use only when valuable.

Candidates:
- Add to cart
- Important save success
- destructive confirmation
- invalid limit/error

Do not vibrate on every navigation tap.

If adding haptics requires a dependency, check existing Expo capabilities/package first.

---

# 25. Screen Transitions

Prefer native navigation behavior.

Guideline:
- normal screen push: native/default
- bottom sheet: slide/spring
- tab switch: minimal/no full-screen animation
- success state: restrained entrance if used

Avoid custom animation on every route.

Performance is more important than decoration.

---

# 26. Scroll & Gesture Smoothness

Audit:
- nested ScrollViews
- expensive inline list render logic
- list key stability
- unnecessary rerenders
- image sizes
- sticky CTA overlap

Use:
- FlatList/FlashList for growing lists
- memoized list rows where useful
- `useCallback` for stable handlers passed to memoized children

Avoid premature micro-optimization.

---

# 27. Keyboard UX

Form screens must:
- keep focused field visible
- keep primary CTA accessible
- dismiss predictably
- avoid content jump
- use correct keyboard type
- use next/done behavior where possible

Audit:
- Sign In
- Address form
- Edit Profile
- Doorstep instructions
- Support/report issue forms
- Farm visit if retained

---

# 28. Accessibility

For interactive elements:
- role
- label
- state
- hit target

Do not rely only on color to communicate:
- selected
- error
- delivered
- paused

Ensure text contrast remains readable.

Test font scaling where practical.

---

# 29. Android / Play Store Visual & Interaction Readiness

The UI must not depend on iOS-only conventions.

Audit on Android:
- back button
- status bar
- keyboard
- bottom inset
- modal presentation
- notification permission UX
- permission rationale UX
- touch feedback

Avoid requesting Android permissions at startup.

Permission requests must follow an in-app explanation when appropriate.

---

# 30. Notification UX Readiness

If notifications are added later, the UI should support:
- delivery updates
- order updates
- payment updates
- subscription reminders
- optional marketing

Settings should allow meaningful user control.

Do not conflate:
- transactional notifications
- promotional notifications

Do not build notification UI that implies messages are guaranteed if permission is denied.

---

# 31. Privacy UX Readiness

Before Play Store submission, Settings/Profile should provide easy routes to:
- Privacy Policy
- Terms / Legal if applicable
- Support
- Account deletion
- Notification preferences

These can be wired later, but visual architecture should accommodate them.

Never claim account/data deletion is completed unless backend confirms it.

---

# 32. Small-Screen & Localization QA

Test representative Android widths.

Verify:
- Gujarati text
- long product names
- long address lines
- two-digit/99+ cart badge
- buttons with long labels
- nav labels
- payment methods
- support categories

Never solve overflow by globally shrinking text too far.

Prefer wrapping/layout adaptation.

---

# 33. Perceived Performance

Improve perceived speed through:
- immediate tap feedback
- stable image containers
- cached images
- sensible loading states
- no unnecessary page flashes
- no full-screen loaders for tiny local changes

Avoid long blocking animation.

---

# 34. Visual QA Checklist

Before marking refinement complete:

```text
[ ] Typography roles are consistent.
[ ] Product discount badges are fixed.
[ ] Cart badge is compact.
[ ] Primary/secondary color use is balanced.
[ ] Tap feedback is consistent.
[ ] Touch targets pass.
[ ] Bottom nav feels polished.
[ ] Headers are aligned.
[ ] Cards are not over-bordered.
[ ] Surface hierarchy is clear.
[ ] Product Details hierarchy is clear.
[ ] Sticky CTAs respect safe area.
[ ] Loading/empty/error states are intentional.
[ ] Save/success feedback exists.
[ ] Bottom sheets are consistent.
[ ] Keyboard behavior is clean.
[ ] Android hardware back is clean.
[ ] Gujarati does not visibly break layouts.
[ ] No unnecessary permission prompts exist.
```

---

# 35. Final Rule

Do not mark UI refinement complete because the app "looks fine" in screenshots.

The app must also feel correct when:
- tapped
- scrolled
- changed
- submitted
- returned to
- backgrounded/resumed
- used on Android
- used in Gujarati
- used with empty/error states

When this document, `01-screen-completion.md`, and the final QA in `frontend-progress.md` are complete, the customer frontend can be frozen for admin/API integration.
