/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import { Layer } from '@exo/frontend-components-base';

export const Wrapper = styled('div')`
  margin: ${props => props.theme.spacing.stack.s8} 0;
`;

export const NumberInput = styled.div`
  margin-right: ${props => props.theme.spacing.inline.s4};
  ${props => media.lessThan(props, 'medium').then(css`
    flex: 0 0 100%;
    padding-bottom: ${props.theme.spacing.stack.s5};
  `)};
`;

export const Button = styled.div`
  display: flex;
  gap: 0.25rem;
  ${props => media.lessThan(props, 'medium').then(css`
    flex: 0 0 100%;
  `)};
`;

export const AddToCart = styled(Layer).attrs(() => ({ isStyled: true }))`
  align-items: center;
  display: flex;
  padding: ${props => props.theme.spacing.inset.L};

  ${props => media.lessThan(props, 'medium').then(css`
    flex-direction: column;
  `)}
`;

