export const easing= {
  linear: (t: number) => t,
  inQuad: (t: number) => t * t,
  outQuad: (t: number) => t * (2 - t ),
  inOutQuad: (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: (t: number) => t * t * t,
  outCubic: (t: number) => (--t) * t * t + 1,
  inOutCubic: (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * ( 2 * t - 2) * (2 * t - 2) + 1,
  inQuart: (t: number) => t * t * t * t,
  outQuart: (t: number) => 1 - (--t) * t * t * t,
  inOutQuart: (t: number) => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  inQuint: (t: number) => t * t * t * t * t,
  outQuint: (t: number) => 1 + (--t) * t * t * t * t,
  inOutQuint: (t: number) => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
};
