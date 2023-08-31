/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';
import theme from './MarketplaceIcon.theme';

export const MarketplaceIcon = styled(ReactLink)`
  align-items: center;
  color: ${props => theme(props).iconColor};
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0.75rem;
  position: relative;
  width: 3rem;

  svg {
    height: 100%;
    width: 100%;
  }
`;
