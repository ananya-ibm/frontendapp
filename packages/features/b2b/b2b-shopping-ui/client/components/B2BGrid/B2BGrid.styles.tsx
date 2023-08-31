/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const OuterWrapper = styled('div')`
  background-color: rgb(244, 244, 244);
  height: 100%;
`;

export const InnerWrapper = styled('div')`
  background-color: rgb(244, 244, 244);
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr 1fr;
  padding: 0.75rem;
`;
