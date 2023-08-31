/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type ColProps = {
  sm?: number | string | { span?: number | string; offset?: number | string };
  md?: number | string | { span?: number | string; offset?: number | string };
  lg?: number | string | { span?: number | string; offset?: number | string };
  xl?: number | string | { span?: number | string; offset?: number | string };
  max?: number | string | { span?: number | string; offset?: number | string };
};

export const SIZES = ['max', 'xl', 'lg', 'md', 'sm'];

export const COL_WIDTHS: Record<keyof ColProps, number> = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 16,
  max: 16
};

const getEffectiveSizeCode = (props: ColProps, size: keyof ColProps) => {
  return SIZES.slice(SIZES.findIndex(s => s === size)).find(e => !!props[e]);
};

const convertToColCount = (size: string | number | undefined, effectiveSize: string) => {
  if (typeof size === 'string' && size.endsWith('%')) {
    // Find closest span for this size when using percentage
    const percentage = Number(size.substr(0, size.length - 1));
    if (percentage === 0) return 0;

    const closest = Math.round(COL_WIDTHS[effectiveSize!] * (percentage / 100));
    return closest !== 0 ? closest : 1;
  } else {
    return size ? Number(size) : undefined;
  }
}

export const getColSpan = (props: ColProps, size: keyof ColProps): { offset?: number | undefined; span?: number | undefined } | undefined => {
  const effectiveSizeCode = getEffectiveSizeCode(props, size);
  const effectiveSize = effectiveSizeCode ? props[effectiveSizeCode] : undefined;

  if (effectiveSize === undefined) return undefined;

  const { span, offset } = typeof effectiveSize === 'object' ? effectiveSize : { span: effectiveSize, offset: undefined };

  const res = {
    ...(span !== undefined  ? { span: convertToColCount(span, effectiveSizeCode!) } : {}),
    ...(offset !== undefined ? { offset: convertToColCount(offset, effectiveSizeCode!) }: {})
  }
  return res;
};
