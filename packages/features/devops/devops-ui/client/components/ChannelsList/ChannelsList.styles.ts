/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Tile } from '@carbon/react';
import { Link } from '@exo/frontend-common-link';
import styled from 'styled-components';
import theme from './ChannelsList.theme';

export const ArchitectureContainer = styled(Tile)`
  padding-bottom: 1rem;
  background-color: ${props => props.theme.colors.backgrounds.page};
  border: ${props => theme(props).border};
  border-style: dashed;
  margin-bottom: 1rem;
`;

export const ArchitectureContainerTitle = styled.h4`
  padding-bottom: 1rem;
`;

export const TagLink = styled(Link)`
`;
