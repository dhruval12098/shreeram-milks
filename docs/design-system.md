# ShreeRam Milks — Shipped Design System

This document is the source of truth for visual implementation. The code lives
in `src/theme/`; components outside that folder import only from `@/theme`.
Never import an individual theme module outside `src/theme/`, and never use a
raw hex colour, arbitrary spacing value, font family, shadow, or z-index.

## Theme API

Use the context API inside visual components:

```tsx
import { useTheme } from '@/theme';

const theme = useTheme();
```

`ThemeProvider` is installed once in `AppProviders`. The theme object is stable
and light-mode only today; `SemanticTheme` fixes its shape so dark mode is a
future data change rather than a component rewrite.

## Colour system

Only `src/theme/primitives.ts` contains raw colour values. Its confirmed
values are the green, red, neutral, white, black, and transparent ramps.
`amber600`, `amber100`, `blue600`, `blue100`, and `neutral400` are marked
`TODO: confirm against Figma/brand guide` and must be confirmed before ship.

Components use `theme.colors`:

- Primary: `colorPrimary`, `colorPrimaryPressed`, `colorPrimaryTint`
- Danger: `colorDanger`, `colorDangerPressed`, `colorDangerTint`
- Warning: `colorWarning`, `colorWarningTint`
- Info: `colorInfo`, `colorInfoTint`
- Text: `colorTextPrimary`, `colorTextSecondary`, `colorTextDisabled`,
  `colorTextInverse`
- Borders: `colorBorder`, `colorBorderFocus`, `colorBorderError`
- Surfaces: `colorSurface`, `colorSurfaceMuted`, `colorSurfaceDisabled`,
  `colorBackground`
- Overlay: `colorOverlay`, used with `theme.opacity.overlay`

The application background is explicitly white through
`theme.colors.colorBackground`, and the Expo splash configuration uses
`#FFFFFF` as its background.

Use `theme.icons.iconPrimary`, `iconSecondary`, `iconOnPrimary`, and
`iconDisabled` for icons. Do not borrow ad-hoc text colours for icons.

## Spatial tokens

```ts
spacing: { none: 0, xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 }
radii: { none: 0, sm: 4, md: 8, lg: 16, pill: 9999 }
borderWidths: { none: 0, hairline: 1, medium: 2 }
```

All spacing uses the 8px scale (with `xs` as the intentional 4px half-step).
Screen horizontal padding is always `theme.layout.screenHorizontalPadding`
(`spacing.md`).

Component sizes are centralized in `theme.sizes`: button/input height 48,
icon sizes 16/24/32 with a 1.75 stroke width, avatar sizes 32/40/56,
slot-card height 72, product-card image size 96, and quantity-stepper height
36. The minimum touch target is
`theme.layout.touchTargetMin` (44).

## Typography and localization

`theme.typography` supplies `h1`, `h2`, `body`, `bodySmall`, and `caption`.
Every scale entry contains `fontSize`, `lineHeight`, and a tokenized weight.
The weight tokens are regular 400, medium 500, semibold 600, and bold 700.

Use `<ThemedText>` for all application text. It is the only component that
resolves the active English/Gujarati family through `fontFamilyForLocale()`.
Screens and feature components must never set `fontFamily` themselves.

The root layout loads both fonts with `useAppFonts()` and keeps the native
splash screen visible until loading succeeds or errors, preventing a fallback-
font flash. The splash is hidden in either outcome so startup cannot remain
blocked indefinitely.

## Motion, elevation, and layering

`theme.motion.duration` provides 150ms, 250ms, and 400ms timings. Use the
`standard`, `decelerate`, and `accelerate` Bezier arrays in
`theme.motion.easing`; these are reasonable Material-style defaults, not
brand-sampled values.

`theme.elevation` provides `none`, `sm`, `card`, and `lg`. Use `card` for
resting product/subscription cards and `lg` for modals, bottom sheets, and
delivery-slot overlays.

`theme.zIndex` is: base 0, card 1, stickyHeader 10, dropdown 20, overlay 30,
modal 40, toast 50. Do not introduce local z-index values.

## Foundational primitives

The foundational visual atoms are:

- `<ThemedText variant="h1 | h2 | body | bodySmall | caption">`
- `<ThemedView background="background | surface | muted | disabled">`
- `<AppIcon>` — the only renderer for Hugeicons UI icons

`ThemedView` owns surface/background colour selection. `AppIcon` resolves
tokenized size, colour, stroke width, and accessibility. Icon glyphs come only
from the curated `src/icons/appIcons.ts` catalogue. Feature atoms such as
Button, Input, Badge, and Avatar are built only after this foundation is
accepted, and must build on these primitives and `useTheme()`.

## Architecture rules

1. Dependency direction is atoms → molecules → organisms → screens.
2. Feature components receive data as typed props; they do not fetch data.
3. Network calls are domain services plus TanStack Query hooks, never direct
   `fetch()` in a component.
4. Zustand holds only client state; server data stays in TanStack Query.
5. Lists use FlashList or FlatList, not `ScrollView` with `.map()`.
6. Before creating a component, search for an existing component to extend.

## Completion checklist for visual work

- [ ] Imported theme values only from `@/theme`
- [ ] Used a semantic colour, not a primitive or raw hex
- [ ] Used the spacing/radius/size/motion/elevation/z-index scales
- [ ] Used `<ThemedText>` rather than `Text` for visible copy
- [ ] Used `<ThemedView>` for a background or surface
- [ ] Added translated copy and stable error codes where applicable
- [ ] Passed `npm run typecheck` and `npm run lint`
