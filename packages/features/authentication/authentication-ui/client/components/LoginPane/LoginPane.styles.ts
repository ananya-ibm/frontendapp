/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './LoginPane.theme';

export const LoginPanePresentation = styled('div')`
  padding: ${props => theme(props).marginLarge} 0;

  & .cds--text-input,
  & .cds--select-input {
    background: ${props => theme(props).backgroundColor};
  }

  & .cds--form-item {
    display: block;
  }

  & .col1 {
    padding-right: ${props => theme(props).marginRight};
    ${props => media.lessThan(props, 'medium').then(css`
      padding-bottom: ${theme(props).marginRight};
      padding-right: 0;
    `)}
  }

  & .col2 {
    border-left: 0.15rem solid ${props => theme(props).border};
    padding-left: ${props => theme(props).paddingLeft};

    ${props => media.lessThan(props, 'medium').then(css`
      border-left-width: 0;
      padding-left: ${props.theme.spacing.inline.s5};
    `)}
  }

  & .cds--label {
    font-size: 100%;
  }
`;

export const RegisterTitle = styled.h5`
  font-weight: 700;
  margin-bottom: ${props => theme(props).marginLarge};
`;

export const Field = styled('div')`
  display: flex;
  margin-bottom: ${props => theme(props).marginLarge};
  margin-top: ${props => theme(props).marginLarge};
`;

export const Text = styled('div')`
  display: inline;
`;

export const TextField = styled('div')`
  align-items: center;
  display: flex;
  margin-top: ${props => theme(props).marginSmall};
`;

export const LinkField = styled('div')`
  margin-top: ${props => theme(props).marginSmall};
`;

export const ButtonField = styled('div')`
  align-items: center;
  display: flex;
  margin-top: ${props => theme(props).marginLarge};
`;
