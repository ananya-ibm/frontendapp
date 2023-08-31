/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

// TODO: Use base components instead
import { ClickableTile } from '@carbon/react';

export const SchemaTile = styled(ClickableTile)`
  margin-bottom: 2rem;
  min-height: 10rem;
`;

export const PageTitle = styled.h2`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const PageDescription = styled.div`
  padding-bottom: 1rem;
  p {padding-bottom: 1rem;}
`;

export const Description = styled.h4`
  font-size: 0.9rem;
  padding-bottom: 1rem;
`;

export const Feature = styled.div`
  font-size: 0.8rem;
  position: absolute;
  bottom: 1rem;
`;

export const Action = styled.div`
  font-size: 0.8rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

