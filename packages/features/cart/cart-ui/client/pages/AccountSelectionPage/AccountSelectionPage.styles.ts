/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Panel = styled.div`
  border: solid 1px #e0e0e0;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const Button = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    width: 100%;
    max-width: 100%;
  }
`;