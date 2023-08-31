/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { StarFilled } from '@carbon/react/icons';

export const Stars = styled('div')`
  align-items: center;
  display: flex;
`;

export const Star = styled(StarFilled).attrs(() => ({ size: 20 }))`
  color: ${props => props.theme.colors.icon.primary};
`;

export const EmptyStar = styled(StarFilled).attrs(() => ({ size: 20 }))`
  color: ${props => props.theme.colors.backgrounds.panels.primary.base};
`;
