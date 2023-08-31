/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './ExpandButton.theme';

export const ExpandButton = styled('button')`
  align-items: center;
  background-color: ${props => theme(props).background};
  border-radius: ${props => theme(props).borderRadius};
  box-shadow: 0 0 0.75rem 0 rgba(0, 0, 0, 0.14);
  display: flex;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { size: '1rem' })};
  justify-content: space-between;
  min-width: 9rem;
  outline: none;
  padding: ${props => props.theme.spacing.squishedInset.XS};
  text-transform: ${props => theme(props).textTransform};

  &:hover {
    ${props => responsiveFontBlock(props.theme.typography.body.short.M, { size: '1rem', weight: 700 })};
  }
`;
