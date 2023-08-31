/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './ProfileLink.theme';

export const ProfileLink = styled(ReactLink)`
  align-items: center;
  color: inherit;
  display: flex;
  ${(props) =>
    responsiveFontBlock(props.theme.typography.body.short.M, {
      lineHeight: '0.75rem'
    })};
  justify-content: flex-end;
  padding: ${(props) => props.theme.spacing.inline.s3};
  position: relative;
  transition: opacity 300ms ease-out;

  &:hover,
  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;

export const Name = styled('span')`
  margin-left: 0.25rem;
`;

export const Icon = styled('div')`
  color: ${(props) => theme(props).color};
  height: 1rem;
  overflow: hidden;
  width: 1rem;

  & svg {
    max-height: 100%;
    width: 100%;
  }
`;
