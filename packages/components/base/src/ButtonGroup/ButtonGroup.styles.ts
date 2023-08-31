/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, ifProp } from '@exo/frontend-common-style-utils';

export const ButtonGroup = styled('div')<{ isLeft?: boolean; isCompact: boolean }>`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;

  ${props => !props.isCompact && css`
    gap: ${props.theme.spacing.inline.s5};
  `}

  ${props => media.greaterThan(props, 'medium').then(css`
    flex-wrap: no-wrap;
    ${ifProp(props, 'isLeft').eq(true).then(css`
      justify-content: flex-start;
    `)}
    ${ifProp(props, 'isLeft').neq(true).then(css`
      justify-content: flex-end;
    `)}
  `)}
`;
