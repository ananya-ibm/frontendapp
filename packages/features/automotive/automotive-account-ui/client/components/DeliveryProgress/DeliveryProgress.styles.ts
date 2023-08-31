/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const DeliveryProgress = styled('div')`
  .steps {
    justify-content: stretch;
    margin-bottom: ${props => props.theme.spacing.stack.s7};
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }
`;

export const Subtitle = styled('h3')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  margin-left: 1rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const InfoLink = styled('h3')`
  align-items: center;
  border: 0.125rem solid ${props => props.theme.colors.delimiters.lowContrast};
  display: flex;
  margin-bottom: ${props => props.theme.spacing.stack.s7};
  padding: 0.35rem 0.35rem 0.35rem 0.1rem;

  & .info-icon {
    fill: ${props => props.theme.colors.interactive.primary.base.bg};
    max-height: 1rem;
    text-align: left;
  }
`;
