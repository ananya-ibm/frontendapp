/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';


export const Cards = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;

  /* stylelint-disable selector-max-type */
  > div {
    height: 100%;
  }
`;

export const Selector = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;

  /* stylelint-disable selector-max-universal */
  > *:first-child {
    flex-basis: auto;
    flex-grow: 10;
  }
`;