import { css, FlattenSimpleInterpolation } from "styled-components";

const breakpoints = {
  desktop: 768,
  mobile: 767,
} as const;

type Breakpoints = keyof typeof breakpoints;

type MediaQuery = {
  [K in Breakpoints]: (
    literals: TemplateStringsArray,
    ...args: any[]
  ) => FlattenSimpleInterpolation;
};

export const media: MediaQuery = {} as MediaQuery;

Object.keys(breakpoints).forEach((label) => {
  const breakpoint = breakpoints[label as Breakpoints];

  media[label as Breakpoints] = (literals, ...args) => {
    if (breakpoint === breakpoints.mobile) {
      return css`
        @media (max-width: ${breakpoint}px) {
          ${css(literals, ...args)}
        }
      `;
    } else {
      return css`
        @media (min-width: ${breakpoint}px) {
          ${css(literals, ...args)}
        }
      `;
    }
  };
});
