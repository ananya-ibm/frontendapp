/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './OptionCard.theme';

export const OptionCard = styled('div')`
  background: ${props => theme(props).background};
  padding: ${props => theme(props).tilePadding};

  & .title {
    text-align: left;
  }
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  padding-top: ${props => theme(props).layoutSpacing};
`;
