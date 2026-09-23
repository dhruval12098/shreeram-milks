import { primitives } from './primitives';

export const semantic = {
  colorNavigation: primitives.orange950,
  colorPrimary: primitives.orange900,
  colorPrimaryPressed: primitives.orange700,
  colorPrimaryTint: primitives.orange100,
  colorDanger: primitives.red600,
  colorDangerPressed: primitives.red600, // TODO: add a confirmed pressed red ramp step.
  colorDangerTint: primitives.red100,
  colorWarning: primitives.amber600,
  colorWarningTint: primitives.amber100,
  colorInfo: primitives.blue600,
  colorInfoTint: primitives.blue100,
  colorTextPrimary: primitives.neutral900,
  colorTextSecondary: primitives.neutral600,
  colorTextDisabled: primitives.neutral400,
  colorTextInverse: primitives.white,
  colorBorder: primitives.neutral200,
  colorBorderFocus: primitives.orange900,
  colorBorderError: primitives.red600,
  colorSurface: primitives.white,
  colorSurfaceMuted: primitives.neutral100,
  colorSurfaceDisabled: primitives.neutral100,
  colorBackground: primitives.neutral100,
  colorOverlay: primitives.black,
  colorTransparent: primitives.transparent,
} as const;

export type SemanticTheme = typeof semantic;

export const iconColors = {
  iconPrimary: semantic.colorTextPrimary,
  iconSecondary: semantic.colorTextSecondary,
  iconOnPrimary: semantic.colorTextInverse,
  iconDisabled: semantic.colorTextDisabled,
} as const;
