/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import styled from 'styled-components';

export const ListingTypeToggle = styled('div')`
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
`;

export const ToggleButton = styled(Button)`
  max-width: 3rem;
  padding-right: 0.5rem;

  .light {
    fill: ${props => props.theme.colors.interactive.disabled.bg};
  }

  .dark {
    fill: ${props => props.theme.colors.icon.primary};
  }

  & svg {
    color: ${props => props.theme.colors.icon.primary};
  }
`;
