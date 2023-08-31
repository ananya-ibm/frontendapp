/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Grid, Row, Column } from '@exo/frontend-components-base';

export const AutoDealerHomePage = styled('div')`
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
  & .cds--row {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const TabletRow = styled(Row)`
  @media only screen and (max-width: 768px){
      margin-left: 0;
      margin-right: 0;

  }
`;
export const TabletCol = styled(Column)`
  @media only screen and (max-width: 768px){
    margin-left: 0;
    margin-right: 0;

  }`;
  export const TabletGrid = styled(Grid)`
  @media only screen and (max-width: 768px){
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;

  }`;