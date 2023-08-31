/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Menu = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  gap: 0.8rem;
  min-width: 10rem;
  padding: 1rem;
  position: absolute;
  top: 1.5rem;
  transform: translateX(-0.6rem);

  /* stylelint-disable-next-line plugin/z-index-value-constraint */
  z-index: 500;

  /* stylelint-disable-next-line selector-max-type */
  & button {
    border: none;
    color: white;
    cursor: pointer;
    text-align: left;
  }
`;
