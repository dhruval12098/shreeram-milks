# ShreeRam Milks — Design System Foundation Build Brief

Give this file to Codex as its FIRST task, before any screen work. Its job
is to produce `frontend/src/theme/` in full — tokens, provider, themed
primitives, and font loading — as one coherent, complete unit. Nothing in
`atoms/`, `molecules/`, or `screens/` should be written until this is done
and passes the checklist at the bottom.

This brief supersedes the earlier `tokens.ts` draft where they conflict —
that draft was incomplete (missing several token families this app needs).
Treat this file as the merged, authoritative version. Once built, update
`design-system.md` to match what actually ships, so the doc and the code
never diverge — that sync step is part of this task, not optional cleanup.

---

## 0. Why this matters before screen work starts

An AI agent (you, or a future Codex/Claude session) will keep building
screens for weeks. Every screen either:
- references a token that exists → consistent, safe to edit later, or
- can't find the token it needs → invents a hex value or a raw pixel
  number → the design system starts rotting on day one.

The fix isn't "be careful." It's: make the token set complete enough,
upfront, that inventing a value is never necessary. That's what this brief
is for. A missing `colorBorderFocus` token today means fifty inconsistent
focus-ring implementations across fifty form fields later.

---

## 1. File structure to create

```
frontend/src/theme/
  primitives.ts        # raw values — colors, only file that references hex
  semantic.ts           # semantic color mapping — light mode only for now,
                         # but structured so dark mode is a data change,
                         # not a rewrite (see §2.4)
  spacing.ts
  radii.ts
  borders.ts
  sizes.ts               # component sizing (button height, icon sizes, avatars)
  typography.ts          # scale + weights + families
  opacity.ts
  motion.ts               # durations + easing curves
  elevation.ts            # shadow levels
  zIndex.ts
  layout.ts
  fonts.ts                 # font loading (expo-font), locale → family map
  ThemeProvider.tsx        # React context exposing all of the above as one `theme` object
  useTheme.ts               # hook: const theme = useTheme()
  index.ts                  # re-exports everything; this is the ONLY import
                             # path components should use: `from '@/theme'`
```

Rule for Codex: components import from `@/theme` (the barrel file) only,
never from `theme/primitives` or any individual token file directly. This
is what makes the "one-line change to rebrand" property actually hold —
if components import individual files directly, you lose the enforcement
point.

---

## 2. Complete token set

### 2.1 Primitives (`primitives.ts`)

Keep exactly what's already sampled from the reference UI, but add the
missing rungs on ladders that are currently one step short:

```ts
export const primitives = {
  // Green ramp (brand)
  orange950: '#4A1F0A',
  orange900: '#C75B12',
  orange700: '#9E4208',
  orange100: '#FFF0E5',

  // Red ramp (destructive)
  red600: '#C0392B',
  red100: '#FBEDEA',

  // NEW — amber ramp (warning: slot cutoff approaching, payment retry, etc.)
  amber600: '#B8860B',   // placeholder — confirm against Figma/brand guide
  amber100: '#FBF3E1',   // placeholder

  // NEW — blue ramp (informational: e.g. "order placed", neutral info toast)
  blue600: '#2B6CB0',    // placeholder — confirm against Figma/brand guide
  blue100: '#E9F1FA',    // placeholder

  // Neutral ramp — added neutral400 (was missing; needed for disabled states)
  neutral900: '#1F2421',
  neutral600: '#6B7268',
  neutral400: '#A5ACA4', // placeholder — confirm against Figma
  neutral200: '#E7E9E5',
  neutral100: '#F6F7F5',

  white: '#FFFFFF',
  black: '#000000',      // NEW — needed for overlay/scrim, not for text
  transparent: 'transparent',
} as const;
```

Flag to the user (don't guess silently): any value marked `placeholder`
above needs confirming against the actual Figma/brand reference before
ship — Codex should not treat these as final, and should leave a `// TODO:
confirm against Figma` comment on each.

### 2.2 Semantic layer (`semantic.ts`)

This is where the earlier draft was thinnest. Every semantic token should
have a resting, pressed, and (where applicable) disabled state — don't
make components fall back to opacity tricks for pressed states, because
that's exactly the kind of local improvisation this system exists to
prevent.

```ts
export const semantic = {
  // Primary (brand green)
  colorNavigation: primitives.orange950,
  colorPrimary: primitives.orange900,
  colorPrimaryPressed: primitives.orange700,
  colorPrimaryTint: primitives.orange100,

  // Danger (destructive)
  colorDanger: primitives.red600,
  colorDangerPressed: primitives.red600, // TODO: needs its own pressed ramp step — currently reuses base, confirm with design
  colorDangerTint: primitives.red100,

  // NEW — Warning
  colorWarning: primitives.amber600,
  colorWarningTint: primitives.amber100,

  // NEW — Info
  colorInfo: primitives.blue600,
  colorInfoTint: primitives.blue100,

  // Text
  colorTextPrimary: primitives.neutral900,
  colorTextSecondary: primitives.neutral600,
  colorTextDisabled: primitives.neutral400,   // NEW
  colorTextInverse: primitives.white,          // NEW — text on dark/colored surfaces

  // Borders
  colorBorder: primitives.neutral200,
  colorBorderFocus: primitives.orange900,       // NEW — form field focus ring
  colorBorderError: primitives.red600,          // NEW — form field validation state

  // Surfaces
  colorSurface: primitives.white,
  colorSurfaceMuted: primitives.neutral100,     // NEW — cards-on-background distinction
  colorSurfaceDisabled: primitives.neutral100,  // NEW
  colorBackground: primitives.white,

  // Overlay
  colorOverlay: primitives.black,               // paired with opacity.overlay when used

  colorTransparent: primitives.transparent,
} as const;
```

### 2.3 Icon color tokens

Add a small `iconColors` export (or fold into `semantic`) so icons don't
silently borrow text colors and drift:

```ts
export const iconColors = {
  iconPrimary: semantic.colorTextPrimary,
  iconSecondary: semantic.colorTextSecondary,
  iconOnPrimary: semantic.colorTextInverse,
  iconDisabled: semantic.colorTextDisabled,
} as const;
```

### 2.4 Dark-mode readiness (structure only — do not implement dark mode now)

Don't ship a dark theme. Do structure `semantic.ts` so adding one later is
a data change, not an architecture change:

```ts
// Shape every theme must satisfy — enforced by TypeScript, not convention
export type SemanticTheme = typeof semantic;

// Later: export const semanticDark: SemanticTheme = { ...different values }
// ThemeProvider would then pick semantic vs semanticDark based on
// Appearance.getColorScheme() — but that wiring is NOT part of this task.
```

This one decision (typing the shape now) is the difference between "add
dark mode in an afternoon" and "audit every component in six months."

### 2.5 Spacing, radii, borders, sizes — keep as designed, two additions

The spacing/radii/borderWidths/componentSizes from the earlier draft were
solid. Two additions:

```ts
export const radii = { none: 0, sm: 4, md: 8, lg: 16, pill: 9999 } as const;

export const borderWidths = { none: 0, hairline: 1, medium: 2 } as const;

export const componentSizes = {
  buttonHeight: 48,
  inputHeight: 48,
  iconSm: 16, iconMd: 24, iconLg: 32,
  avatarSm: 32, avatarMd: 40, avatarLg: 56,
  // NEW — this app has slot pickers, quantity steppers, product cards;
  // give those a home now instead of ad-hoc sizing per screen later
  slotCardHeight: 72,
  productCardImageSize: 96,
  quantityStepperHeight: 36,
} as const;
```

### 2.6 Typography — add weight and family, not just size

The earlier draft's biggest functional gap: no `fontFamily`, no
`fontWeight` as a token. A component needing `typography.h1.fontWeight`
had nowhere to get it.

```ts
export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const typeScale = {
  h1: { fontSize: 28, lineHeight: 34, weight: fontWeights.bold },
  h2: { fontSize: 22, lineHeight: 28, weight: fontWeights.bold },
  body: { fontSize: 16, lineHeight: 22, weight: fontWeights.regular },
  bodySmall: { fontSize: 14, lineHeight: 20, weight: fontWeights.regular },
  caption: { fontSize: 12, lineHeight: 16, weight: fontWeights.medium },
} as const;
```

Font *family* is intentionally kept separate from `typeScale` — see
§3 (fonts.ts), because family depends on active locale, not on which
scale step is being rendered. A themed `<Text variant="h1">` component
combines `typeScale.h1` with the locale-resolved family at render time.

### 2.7 Opacity — keep, unchanged

```ts
export const opacity = { disabled: 0.48, subdued: 0.72, overlay: 0.56, full: 1 } as const;
```

### 2.8 Motion — add easing, not just duration

Durations alone are unusable without a curve. Add:

```ts
export const motion = {
  duration: { fast: 150, normal: 250, slow: 400 },
  easing: {
    standard: [0.4, 0.0, 0.2, 1],   // Bezier control points, for Reanimated/Moti
    decelerate: [0.0, 0.0, 0.2, 1],
    accelerate: [0.4, 0.0, 1, 1],
  },
} as const;
```

(Exact curve values aren't precious — flag to the user that these are
reasonable Material-style defaults, not sampled from a spec, and can be
swapped later without touching any component.)

### 2.9 Elevation — add levels, not just one

```ts
const shadowColor = primitives.neutral900;

export const elevation = {
  none: { shadowColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
  sm:   { shadowColor, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
  card: { shadowColor, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  lg:   { shadowColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 6 },
} as const;
```

Map roughly: `sm` → list-item hover/press states, `card` → ProductCard/
SubscriptionCard at rest, `lg` → modals, bottom sheets, the delivery-slot
picker overlay.

### 2.10 z-index — new, was entirely missing

```ts
export const zIndex = {
  base: 0,
  card: 1,
  stickyHeader: 10,
  dropdown: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const;
```

### 2.11 Layout — keep, unchanged

```ts
export const layout = {
  screenHorizontalPadding: spacing.md,
  contentMaxWidth: 640,
  touchTargetMin: 44,
} as const;
```

---

## 3. Fonts (`fonts.ts`)

Implements what `design-system.md` §1.3 already specifies — this is the
concrete build task, not a new decision:

- Load `Plus Jakarta Sans` (regular/medium/semibold/bold) and
  `Noto Sans Gujarati` via `expo-font` + `useFonts()`.
- Export a `fontFamilyForLocale(locale: 'en' | 'gu')` function returning
  the correct family name string.
- The app root (likely `app/_layout.tsx`) blocks render behind
  `useFonts()` and shows the splash screen (via `expo-splash-screen`)
  until fonts resolve — this is the actual mechanism connecting font
  loading to the splash screen the user mentioned building next.
- The themed `<Text>` atom (built in the next task, not this one) is the
  ONLY place `fontFamilyForLocale` gets called. Screens never call it
  directly.

---

## 4. ThemeProvider and `useTheme()`

```ts
// ThemeProvider.tsx
const theme = {
  colors: semantic,
  icons: iconColors,
  spacing,
  radii,
  borderWidths,
  sizes: componentSizes,
  typography: typeScale,
  fontWeights,
  opacity,
  motion,
  elevation,
  zIndex,
  layout,
} as const;

export type Theme = typeof theme;
```

Expose via a plain React Context (no need for a theming library at this
app's scope — Zustand is already the client-state tool per
`development-plan.md`; don't introduce a second state mechanism just for
theme, a Context is the right weight here since theme rarely changes at
runtime).

`useTheme()` returns `theme`. Components do:

```tsx
const { colors, spacing, typography } = useTheme();
```

never `import { semantic } from '@/theme/semantic'` directly.

---

## 5. Themed primitives to build alongside the theme (still atoms, but foundational)

Two atoms are foundational enough that Codex should build them in the
*same* task as the theme, before moving to the general atoms backlog,
because nothing else can be built correctly without them:

1. **`<ThemedText>`** (or a themed wrapper the design-system.md calls
   "themed `<Text>` component") — takes a `variant` prop
   (`h1 | h2 | body | bodySmall | caption`), resolves size/weight from
   `typography`, resolves family from active `react-i18next` locale via
   `fontFamilyForLocale`. This is the ONLY component in the app allowed
   to touch `fontFamily` directly.
2. **`<ThemedView>`** — thin wrapper applying `colors.colorBackground` or
   `colors.colorSurface` as a `background` prop rather than every screen
   hardcoding `style={{ backgroundColor: '#FFFFFF' }}`.

Everything else (Button, Input, Icon, Badge, Avatar) is the next task,
built strictly on top of what this task produces.

---

## 6. Update `design-system.md` to match

Once the above is built, the task isn't done until `design-system.md` is
edited so its code samples match the real `tokens.ts`/theme files exactly
— including the new warning/info colors, the pressed/disabled states, font
weights, elevation levels, z-index, and motion easing. The doc's opening
line says every visual decision must trace back to a token *defined in
this file* — so an out-of-sync doc actively works against the project.

---

## 7. Acceptance checklist (do not consider this task done until all pass)

- [ ] `frontend/src/theme/index.ts` is the single import surface; no other
      file under `theme/` is imported directly from outside `theme/`
- [ ] Every primitive with a `// TODO: confirm against Figma` comment is
      called out explicitly to the user in the task summary, not buried
- [ ] `SemanticTheme` type exists and `semantic.ts` satisfies it (sets up
      painless dark mode later without being dark mode now)
- [ ] `typeScale` entries all carry `fontSize`, `lineHeight`, AND `weight`
- [ ] `elevation` has at least `sm`, `card`, `lg` levels, not just one
- [ ] `zIndex` scale exists and covers at minimum: card, stickyHeader,
      overlay, modal, toast
- [ ] `motion` has both `duration` and `easing`
- [ ] `<ThemedText>` and `<ThemedView>` exist, are typed, and are the only
      two components using `useFonts`/family resolution or raw background
      colors respectively
- [ ] App root wires `useFonts()` to `expo-splash-screen`'s
      `preventAutoHideAsync` / `hideAsync`, so the splash screen the user
      builds next has real font-loading to key off of
- [ ] `design-system.md` updated to match the shipped code exactly
- [ ] `npm run typecheck && npm run lint` pass (per `development-plan.md` §6)

---

## 8. What Codex should explicitly NOT do in this task

- Don't build any atom beyond `ThemedText`/`ThemedView` yet — Button,
  Input, Icon, Badge, Avatar are the next task, scoped separately, so
  review stays reviewable.
- Don't implement dark mode — only its type-level scaffolding (§2.4).
- Don't guess the amber/blue/neutral400 hex values as final — placeholder
  + flag, per §2.1.
- Don't add a theming library (e.g. `react-native-paper`,
  `tamagui`, `restyle`) — this app's token set is small enough that a
  plain Context is the right complexity level, and `development-plan.md`
  already made the "smallest tool that does the job" call for state
  (Zustand over Redux); the same philosophy applies here.
