/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Row } from '@exo/frontend-components-base';

export const ProductRow = styled(Row)`
  padding: 1rem;
`;

export const Subscriptions = styled('div')`
  & .information {
    fill: ${props => props.theme.colors.text.primary};
  }

  & .highlighted-row {
    font-weight: bold;
    margin: 2rem 0 1rem 0;
  }

  & .ellipsis-button {
    color: ${props => props.theme.colors.brand.brand1.base};
    letter-spacing: 0.2rem;
  }
`;

export const RightButton = styled('div')`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;