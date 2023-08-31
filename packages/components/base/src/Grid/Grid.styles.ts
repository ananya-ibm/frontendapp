/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { FlexGrid as CarbonGrid } from '@carbon/react';

export const Grid = styled(CarbonGrid)<{ $hasRowGap?: boolean; hasColumnGap?: boolean; fullWidth?: boolean }>`
    max-width: var(--max-width);

    ${props => props.$hasRowGap && css`
    display: flex;
    flex-direction: column;
    row-gap: calc(2 * ${props.theme.spacing.inline.s5});

    .cds--row {
      row-gap: calc(2 * ${props.theme.spacing.inline.s5});
    }
  `}

  .cds--row > * > .cds--grid {
    padding-left: 0;
    padding-right: 0;
  }

  ${props => props.fullWidth && css`
    padding-left: 0;
    padding-right: 0;
    max-width: 100%;
  `}
`;
