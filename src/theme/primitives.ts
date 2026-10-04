/** Raw colour values. No component may import this module directly. */
export const primitives = {
  warm900: '#302820',
  orange950: '#4A1F0A',
  orange900: '#BF520E',
  orange700: '#9E4208',
  orange100: '#FFF0E5',
  red600: '#C0392B',
  red100: '#FBEDEA',
  green800: '#245B3D',
  green100: '#EAF4ED',
  amber600: '#8A5A00', // TODO: confirm against Figma/brand guide.
  amber100: '#FBF3E1', // TODO: confirm against Figma/brand guide.
  blue600: '#2B6CB0', // TODO: confirm against Figma/brand guide.
  blue100: '#E9F1FA', // TODO: confirm against Figma/brand guide.
  neutral900: '#1F2421',
  neutral600: '#6B7268',
  neutral400: '#A5ACA4', // TODO: confirm against Figma/brand guide.
  neutral200: '#E7E4DE',
  neutral150: '#EFEEE9',
  neutral100: '#F4F2ED',
  neutral50: '#FBF9F5',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;
