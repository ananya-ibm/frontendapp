/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { FavoriteFilled } from '@carbon/react/icons';
import theme from './FavoriteButton.theme';

export const FavButton = styled('button')`
  background: none;
  border: none;
  cursor: pointer;
  left: 0;
  margin-left: ${props => theme(props).favoriteSpacing};
  margin-top: ${props => theme(props).favoriteSpacing};
  outline: none;
  position: absolute;
  top: 0;
`;

export const FilledButton = styled(FavoriteFilled).attrs(() => ({ size: 20 }))`
  color: ${props => theme(props).activeColor};
`;
