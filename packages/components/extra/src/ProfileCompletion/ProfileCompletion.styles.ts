/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const ProfileCompletion = styled('div')`
  display: flex;
  padding: 2rem;
`;

export const Roundel = styled('div')`
  color: ${props => props.theme.colors.information.success};
  flex: 0 0 8rem;
  ${props => responsiveFontBlock(props.theme.typography.heading.heading1)};
  height: 8rem;
  justify-content: center;
  width: 8rem;
`;
export const Details = styled('ul')`
  flex: 0 0 75%;
  list-style: none;
  padding-left: 2rem;
  padding-top: 1rem;

  & .ProfileCompletion-item {
    margin: 1rem 0 0;
  }

  & .ProfileCompletion-icon {
    margin-right: 0.25rem;

    &.isComplete {
      color: ${props => props.theme.colors.information.success};
    }
  }
`;
