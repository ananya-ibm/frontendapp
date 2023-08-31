/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const AutoHomePage = styled('div')`
  background: white;

  & .cds--grid {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  & .cds--col {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const SmartBudgetCalculator = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  margin: 2rem auto;
  width: 90%;
`;
