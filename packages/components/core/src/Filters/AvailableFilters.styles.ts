/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled from 'styled-components';

export const SingleSelect = styled('button')`
  border: none;
  display: block;
  padding: 0.3rem 0;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};

  &:hover {
    cursor: pointer;
  }

  /* stylelint-disable-next-line selector-max-type */
  & label {
    color: ${props => props.theme.colors.text.primary};
    text-align: left;
  }
`;

export const CheckboxEntry = styled('div')`
  padding: 0.1rem 0;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};

  /* stylelint-disable-next-line selector-max-type */
  & label {
    color: ${props => props.theme.colors.text.primary};
    text-align: left;
  }
`;

export const Facet = styled('div')`
  margin: 0 0 ${props => props.theme.spacing.stack.s6};
`;

export const FacetLabel = styled.div`
  ${props => responsiveFontBlock(props.theme.typography.labels.label)};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.stack.s3};
`;

export const ToggleMore = styled.p`
  margin-top: 0.75rem;
`;

export const Toggle = styled.button`
  border: none;
  color: ${props => props.theme.colors.link.base};
  &:hover {
    color: ${props => props.theme.colors.link.hover};
  }
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;