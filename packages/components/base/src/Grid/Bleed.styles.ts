/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';



export const Bleed = styled('div')<{ removeTop?: string }>`
  /* stylelint-disable declaration-property-unit-allowed-list, unit-allowed-list */

  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  ${props => props.removeTop === 'sm' ? css`
    margin-top: -${props.theme.spacing.inline.s7};
  ` : ''}
  ${props => props.removeTop === 'xs' ? css`
    margin-top: -${props.theme.spacing.inline.s6};
  ` : ''}
  ${props => props.removeTop === '2xl' ? css`
    margin-top: -${props.theme.spacing.inline.s13};
  ` : ''}
  ${props => props.removeTop === 'xl' ? css`
    margin-top: -${props.theme.spacing.inline.s12};
  ` : ''}
`;
