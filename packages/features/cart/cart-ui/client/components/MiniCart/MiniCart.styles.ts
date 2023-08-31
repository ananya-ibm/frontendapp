/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';

import theme from './MiniCart.theme';

const size = '0.8rem';

export const MiniCart = styled(ReactLink)`
  align-items: center;
  color: ${props => theme(props).iconColor};
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0.75rem;
  position: relative;
  width: 3rem;
`;

export const CartCount = styled('span')`
  background-color: ${props => theme(props).countBg};
  border-radius: calc(${size} * 0.5);
  color: ${props => theme(props).countFg};
  font-size: calc(${size} * .8);
  height: ${size};
  left: calc(0.675rem + 50%);
  line-height: calc(${size} * 1.1);
  min-width: ${size};
  padding: 0 0.25rem;
  position: absolute;
  top: 0.5rem;
  transform: translateX(-50%);
`;

