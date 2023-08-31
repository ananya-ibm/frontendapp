/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button as Btn } from '@exo/frontend-components-base';

export const SearchPage = styled('div')`
  background: white;
  @media (min-width: 24rem) {
    width: 24rem;
  }
  margin: 2rem auto;
  padding: 0 1rem;
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

export const ConfirmButton = styled('div')`
  display: flex;
  margin-bottom: 1rem;
`;

export const Title = styled('h2')`
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const FindFlightButton = styled(Btn)`
  display: flex;
  flex-grow: 1;
  max-width: none;
  background-color: #2e5c99;
  justify-content: center;
  padding: 0;
  border-radius: 2px;
`;