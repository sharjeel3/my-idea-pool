import { css } from 'styled-components';

const breakpoints = {
  // Extra small devices (phones)
  xsm: {
    min: `376px`,
    max: `575px`
  },
  // Small devices (phones)
  sm: {
    min: `576px`,
    max: `767px`
  },
  // Medium devices (tablets)
  md: {
    min: `768px`,
    max: `991px`
  },
  // Large devices (desktops)
  lg: {
    min: `992px`,
    max: `1199px`
  },
  // Extra Large devices (large desktops)
  xlg: {
    min: `1200px`,
    max: Infinity
  }
};

const sizeOptions = {
  xsm: breakpoints.xsm.min,
  sm: breakpoints.sm.min,
  md: breakpoints.md.min,
  lg: breakpoints.lg.min,
  xlg: breakpoints.xlg.min
};

const getPixelSizeFromBreakpoint = (breakpoint, variance) => {
  const pixels = sizeOptions[breakpoint];
  if (!pixels) {
    throw new Error(`This breakpoint is not supported: ${breakpoint}`);
  }
  const numOfPixels = Number(pixels.substr(0, pixels.indexOf('px')));
  return `${numOfPixels + variance}px`;
};

const lessThan = breakpoint => (...args) => {
  return css`
    @media (max-width: ${getPixelSizeFromBreakpoint(breakpoint, -1)}) {
      ${css(...args)}
    }
  `;
};

// It behaves as greater than or equal to in practice
const greaterThan = breakpoint => (...args) => {
  return css`
    @media (min-width: ${getPixelSizeFromBreakpoint(breakpoint, 0)}) {
      ${css(...args)}
    }
  `;
};

export const media = { lessThan, greaterThan };
