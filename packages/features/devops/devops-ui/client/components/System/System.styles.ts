/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './System.theme';
import { Tile } from '@carbon/react'

export const System = styled.div`
  padding-top: 1rem;
`;

export const SystemTitle = styled.h2`
  padding-bottom: 1rem;
`;

export const SystemDescription = styled.p`
  padding-bottom: 1rem;
`;

export const ArchitectureContainer = styled(Tile)`
  margin-top: 1rem;
  padding-bottom: 1rem;
  background-color: ${props => props.theme.colors.backgrounds.page};
  border: ${props => theme(props).border};
  border-style: dashed;
  margin-bottom: 1rem;
`;

export const ArchitectureComponent = styled(Tile)`
  margin-bottom: 1rem;
`;

export const ArchitectureContainerTitle = styled.h4`
  padding-bottom: 1rem;
`;

export const ArchitectureComponentTitle = styled.h5`
  padding-bottom: 0.5rem;
`;