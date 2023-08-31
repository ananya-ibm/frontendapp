/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const RangeDropdown = styled('div')`
  position: relative;

  & .cds--dropdown {
    width: 8rem;
  }
`;

export const RangeContainer = styled('div')`
  background-color: white;
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.2);
  max-width: 40rem;
  overflow-y: auto;
  position: absolute;
  transition: max-height 110ms cubic-bezier(0.2, 0, 0.38, 0.9);
  z-index: 11;

  &:focus {
    outline: 0.1rem solid #0f62fe;
  }
`;

export const RangeChildren = styled('div')`
  padding: 2rem;

  & .cds--slider-text-input {
    width: unset;
  }
`;
