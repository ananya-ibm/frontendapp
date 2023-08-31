/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { getColSpan } from './ColumnStyleUtils';

describe('ColumnStyleUtils', () => {
  describe('getColSpan', () => {
    test('returns undefined if no props found', () => {
      expect(getColSpan({}, 'sm')).toBeUndefined();
      expect(getColSpan({ lg: 8 }, 'sm')).toBeUndefined();
    });

    test('returns exact match if exists', () => {
      expect(getColSpan({ sm: 4, md: 6, lg: 8 }, 'sm')).toStrictEqual({ span: 4 });
      expect(getColSpan({ sm: 4, md: 6, lg: 8 }, 'md')).toStrictEqual({ span: 6 });
      expect(getColSpan({ sm: 4, md: 6, lg: 8 }, 'lg')).toStrictEqual({ span: 8 });
    });

    test('returns first smalller if no exists', () => {
      expect(getColSpan({ sm: 4, lg: 8 }, 'md')).toStrictEqual({ span: 4 });
      expect(getColSpan({ sm: 4, lg: 8 }, 'xl')).toStrictEqual({ span: 8 });
      expect(getColSpan({ sm: 4, lg: 8 }, 'max')).toStrictEqual({ span: 8 });
    });

    test('percentage rounding to closest span', () => {
      expect(getColSpan({ sm: '25%', lg: '30%' }, 'md')).toStrictEqual({ span: 1 });
      expect(getColSpan({ sm: '35%', lg: '30%' }, 'md')).toStrictEqual({ span: 1 });
      expect(getColSpan({ sm: '45%', lg: '30%' }, 'md')).toStrictEqual({ span: 2 });

      expect(getColSpan({ sm: '45%', lg: '30%' }, 'lg')).toStrictEqual({ span: 5 });
    });

    test('percentage rounding upwards for small values', () => {
      expect(getColSpan({ sm: '15%', lg: '30%' }, 'md')).toStrictEqual({ span: 1 });
      expect(getColSpan({ sm: '5%', lg: '30%' }, 'md')).toStrictEqual({ span: 1 });
      expect(getColSpan({ sm: '1%', lg: '30%' }, 'md')).toStrictEqual({ span: 1 });
    });

    test('percentage rounding to 0 for exact 0', () => {
      expect(getColSpan({ sm: '0%', lg: '30%' }, 'md')).toStrictEqual({ span: 0 });
    });
  });
});
