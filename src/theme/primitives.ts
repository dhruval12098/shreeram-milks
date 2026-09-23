/** Raw colour values. No component may import this module directly. */
export const primitives = {
  orange950: '#4A1F0A',
  orange900: '#C75B12',
  orange700: '#9E4208',
  orange100: '#FFF0E5',
  red600: '#C0392B',
  red100: '#FBEDEA',
  amber600: '#B8860B', // TODO: confirm against Figma/brand guide.
  amber100: '#FBF3E1', // TODO: confirm against Figma/brand guide.
  blue600: '#2B6CB0', // TODO: confirm against Figma/brand guide.
  blue100: '#E9F1FA', // TODO: confirm against Figma/brand guide.
  neutral900: '#1F2421',
  neutral600: '#6B7268',
  neutral400: '#A5ACA4', // TODO: confirm against Figma/brand guide.
  neutral200: '#E7E9E5',
  neutral100: '#F6F7F5',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;
