/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const AncillaryPage = styled('div')`
  background: #f9f9f9;
  margin: 0 auto;
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
export const Bundles = styled('div')`
  padding: 1rem;
  background-color: #f9f9f9;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;
export const BundlesContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 26rem;

  & > * {
    margin-bottom: 1rem;
  }
  & > :last-child {
    margin-bottom: 0rem;
  }
`;