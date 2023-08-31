/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './AccountOverviewConfiguration.theme';

export const LeftHeadingText = styled('h4')`
  font-weight: 700;
  margin-bottom: ${props => theme(props).marginSmall};
  text-align: left;
`;

export const EstimatedTotal = styled('div')`
  & .prefix {
    display: block;
  }

  & .value {
    font-weight: 700;
    padding: ${props => theme(props).smallSpacing} 0;
  }
`;
