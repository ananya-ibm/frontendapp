/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable prefer-destructuring */

import { FontVariant, ResponsiveFont, Theme } from '@exo/frontend-theme-base-theme';
import { css, DefaultTheme, ThemedStyledProps } from 'styled-components';

type Breakpoint = keyof Theme<any>['breakpoints'];

export const media = {
  greaterThan: <Props>(props: ThemedStyledProps<Props, DefaultTheme>, breakpoint: Breakpoint) => ({
    then: (r: any) => css`
      @media (min-width: ${props.theme.breakpoints[breakpoint]}) {
        ${r}
      }
    `
  }),

  lessThan: <Props>(props: ThemedStyledProps<Props, DefaultTheme>, breakpoint: Breakpoint) => ({
    then: (r: any) => css`
      @media (max-width: ${props.theme.breakpoints[breakpoint]}) {
        ${r}
      }
    `
  }),

  between: <Props>(
    props: ThemedStyledProps<Props, DefaultTheme>,
    first: Breakpoint,
    second: Breakpoint
  ) => ({
    then: (r: any) => css`
      @media (min-width: ${props.theme.breakpoints[first]}) and (max-width: ${props.theme
          .breakpoints[second]}) {
        ${r}
      }
    `
  })
};

export const evaluateBreakpoint = (
  cond: 'greaterThan' | 'lessThan',
  bp: Breakpoint,
  theme: Theme<any>
) => {
  if (typeof window !== 'undefined') {
    if (window?.matchMedia) {
      if (cond === 'greaterThan') {
        return window.matchMedia(`(min-width: ${theme.breakpoints[bp]})`).matches;
      } else {
        return window.matchMedia(`(max-width: ${theme.breakpoints[bp]})`).matches;
      }
    }
  }
  return undefined;
};

export const ifProp = <Props>(props: ThemedStyledProps<Props, DefaultTheme>, prop: keyof Props) => {
  return {
    then: (r: any, o?: Otherwise) => (props[prop] ? r : o?.eval() ?? ''),

    isTruthy: () => ({
      then: r => (props[prop] ? r : '')
    }),
    isFalsy: () => ({
      then: r => (props[prop] ? '' : r)
    }),
    eq: (value: any) => ({
      then: r => (props[prop] === value ? r : '')
    }),
    neq: (value: any) => ({
      then: r => (props[prop] !== value ? r : '')
    }),
    switch: (cases: Case[]) => {
      const v = props[prop];
      const matchingCase = cases.find(c => c.matches(v));
      if (!matchingCase) return '';
      else return matchingCase.eval();
    }
  };
};

type Case = {
  matches(v: any): boolean;
  eval(): any;
};

type Otherwise = Case & { tag: 'otherwise' };

const makeCase = (fn: (v: any) => boolean) => ({
  then: r => ({
    matches: fn,
    eval: () => r
  })
});

export const when = {
  isTruthy: () => makeCase((v: any) => !!v),
  isFalsy: () => makeCase((v: any) => !v),
  eq: (value: any) => makeCase((v: any) => v === value),
  neq: (value: any) => makeCase((v: any) => v !== value),
  otherwise: () => makeCase(() => true)
};

export const otherwise = (r: any): Otherwise => ({
  matches: () => true,
  eval: () => r,
  tag: 'otherwise'
});

export const font = (f: ResponsiveFont, o?: Partial<ResponsiveFont>) => {
  return `${o?.weight ?? f.weight!} ${o?.size ?? f.size}/${o?.lineHeight ?? f.lineHeight} ${
    o?.family ?? f.family
  }`;
};

const fontVariantBlock = (f: FontVariant) => {
  return css`
    ${f.lineHeight &&
    css`
      line-height: ${f.lineHeight};
    `}
    ${f.size &&
    css`
      font-size: ${f.size};
    `}
    ${f.weight &&
    css`
      font-weight: ${f.weight};
    `}
    ${f.letterSpacing &&
    css`
      letter-spacing: ${f.letterSpacing};
    `}
  `;
};

export const responsiveFontBlock = (
  f: ResponsiveFont,
  o?: Partial<ResponsiveFont>,
  responsive = true
) => {
  if (f.breakpoints) {
    return css`
      font: ${font(f, o)};
      ${(o?.letterSpacing ?? f.letterSpacing)?.toString() !== '0' &&
      `letter-spacing: ${o?.letterSpacing ?? f.letterSpacing};`}
      ${props =>
        responsive &&
        f.breakpoints?.small &&
        media.greaterThan(props, 'small').then(css`
          ${fontVariantBlock(f.breakpoints.small)}
        `)}
    ${props =>
        responsive &&
        f.breakpoints?.medium &&
        media.greaterThan(props, 'medium').then(css`
          ${fontVariantBlock(f.breakpoints.medium)}
        `)}
    ${props =>
        responsive &&
        f.breakpoints?.large &&
        media.greaterThan(props, 'large').then(css`
          ${fontVariantBlock(f.breakpoints.large)}
        `)}
    ${props =>
        responsive &&
        f.breakpoints?.xLarge &&
        media.greaterThan(props, 'xLarge').then(css`
          ${fontVariantBlock(f.breakpoints.xLarge)}
        `)}
    ${props =>
        responsive &&
        f.breakpoints?.max &&
        media.greaterThan(props, 'max').then(css`
          ${fontVariantBlock(f.breakpoints.max)}
        `)}
    `;
  } else {
    return css`
      font: ${font(f, o)};
      ${(o?.letterSpacing ?? f.letterSpacing)?.toString() !== '0' &&
      `letter-spacing: ${o?.letterSpacing ?? f.letterSpacing};`}
    `;
  }
};

const applyOverride = (override?: string | number, fallback?: string) => {
  if (override === 'invert') return `-${fallback}`;
  return (override ?? fallback)!;
};

export const spacing = (
  base: string,
  override: {
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    horizontal?: string | number;
    vertical?: string | number;
  }
): string => {
  let left = base;
  let right = base;
  let bottom = base;
  let top = base;
  const arr = base.split(' ');
  if (arr.length === 2) {
    left = arr[1];
    right = arr[1];
    top = arr[0];
    bottom = arr[0];
  } else if (arr.length === 4) {
    top = arr[0];
    right = arr[1];
    bottom = arr[2];
    left = arr[3];
  }

  top = applyOverride(override.vertical ?? override.top, top).toString();
  bottom = applyOverride(override.vertical ?? override.bottom, bottom).toString();
  right = applyOverride(override.horizontal ?? override.right, right).toString();
  left = applyOverride(override.horizontal ?? override.left, left).toString();

  return `${top} ${right} ${bottom} ${left}`;
};

export const getTop = (s: string) => s.split(' ')[0];
export const getRight = (s: string) => s.split(' ')[1];
export const getBottom = (s: string) => s.split(' ')[2];
export const getLeft = (s: string) => s.split(' ')[3];
