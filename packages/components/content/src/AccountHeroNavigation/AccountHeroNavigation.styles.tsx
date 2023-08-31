/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Link as ReactLink } from '@exo/frontend-common-link';
import styled from 'styled-components';

export const AccountHeroNavigation = styled('div')`
  background-color: ${props => props.theme.colors.inverse.base.bg};
  padding: 1rem;
`;

export const NavigationItems = styled('div')`
  display: flex;
  justify-content: space-evenly;
`;

export const NavigationItem = styled(ReactLink)`
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

export const NavigationItemIcon = styled('div')`
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const NavigationItemLink = styled('div')`
  color: ${props => props.theme.colors.inverse.base.fg};
  text-align: center;
`;
