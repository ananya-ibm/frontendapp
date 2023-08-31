/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './QuickOrderButton.theme';

export const QuickOrderButton = styled('div')`
  display: inline-flex;
  height: 100%;

  padding: ${props => props.theme.spacing.inset.S};

  svg { 
    color: ${props => theme(props).color};
  }

  /* stylelint-disable-next-line selector-max-type */
  button span {
    margin: 0;
  }
`;
