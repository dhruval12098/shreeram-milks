export const motion = {
  duration: { fast: 150, normal: 250, slow: 400 },
  pressScale: { control: 0.98, compactControl: 0.96, card: 0.985 },
  easing: {
    standard: [0.4, 0, 0.2, 1],
    decelerate: [0, 0, 0.2, 1],
    accelerate: [0.4, 0, 1, 1],
  },
} as const;
