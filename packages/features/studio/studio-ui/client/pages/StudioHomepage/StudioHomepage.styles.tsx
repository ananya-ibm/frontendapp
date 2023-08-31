/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Layer } from '@exo/frontend-components-base';
import styled from 'styled-components';

export const Panel = styled(Layer)`
  margin-top: 1rem;
  padding: 1rem;

  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
`;

export const Entry = styled.div`
  > div { height: 100%; }
`;