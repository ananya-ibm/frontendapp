/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ButtonGroup } from '@exo/frontend-components-base';
import styled from 'styled-components';

export const Buttons = styled(ButtonGroup)`
  margin-top: auto;
  width: 100%;

  /* stylelint-disable-next-line selector-max-universal */
  & > * {
    width: 50%;
  }
`;

export const BodyInner = styled.div`
  background-color: #e0e0e0;
  height: 100%;
  padding: 0.1rem 1rem;
`;

export const Filters = styled('div')``;

export const SelectedFilters = styled.div`
  margin-bottom: ${props => props.theme.spacing.stack.s5};
`;

export const LinkButton = styled.div`
  margin-bottom: ${props => props.theme.spacing.stack.s7};
`;
