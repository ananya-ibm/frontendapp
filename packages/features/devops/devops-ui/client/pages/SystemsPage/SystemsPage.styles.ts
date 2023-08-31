/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './SystemsPage.theme';
import { Tile, ClickableTile } from '@carbon/react'

export const PageTitle = styled.h2`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const PageDescription = styled.div`
  padding-bottom: 1rem;
  p {padding-bottom: 1rem;}
`;

export const ArchitectureContainer = styled(Tile)`
  padding-bottom: 1rem;
  background-color: ${props => props.theme.colors.backgrounds.page};
  border: ${props => theme(props).border};
  border-style: dashed;
  margin-bottom: 1rem;
`;

export const ArchitectureComponent = styled(ClickableTile)`
  margin-bottom: 1rem;
`;

export const ArchitectureContainerTitle = styled.h4`
  padding-bottom: 1rem;
`;

export const ArchitectureComponentTitle = styled.h5`
  padding-bottom: 0.5rem;
`;