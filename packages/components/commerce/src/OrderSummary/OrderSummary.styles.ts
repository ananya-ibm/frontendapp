/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './OrderSummary.theme';

export const OrderSummary = styled('div')`
  & .cds--grid {
    padding-left: 0;
  }

  & .cds--row {
    margin-left: 0;
  }

  & .priceColumn {
    text-align: right;
  }

  & .subRows {
    margin-top: ${props => theme(props).marginTop};
  }
`;

export const Heading = styled('h5')`
  font-weight: 700;
`;

export const BoldText = styled('div')`
  font-weight: 700;
`;
