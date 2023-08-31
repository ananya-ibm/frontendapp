/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import theme from './Preferences.theme';

export const Preferences = styled('div')`
  border: ${props => theme(props).border};

  & .cds--grid {
    padding-left: 0;
    padding-right: ${props => props.theme.spacing.inline.s5};
  }

  & .cds--toggle__switch {
    margin-top: 0.3rem;
  }
`;

export const Text = styled.div`
  font-size: 0.875rem;
  line-height: 2;
  margin-top: ${props => props.theme.spacing.stack.s5};
`;

export const Field = styled.div`
  margin-top: ${props => props.theme.spacing.stack.s7};
`;

export const Email = styled.span`
  font-weight: 700;
`;
