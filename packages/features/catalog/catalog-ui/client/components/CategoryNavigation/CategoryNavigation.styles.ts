/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp, responsiveFontBlock, otherwise } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';

export const Categories = styled('div')`
  margin: 0 0 ${props => props.theme.spacing.stack.s6};
  & .subcats {
    list-style: '-  ';
    margin-left: 1rem;
  }
`;

export const Items = styled.ul`
`;

export const Link = styled(ReactLink)<{ isActive?: boolean }>`
  color: ${props => props.theme.colors.text.primary};
  ${props => ifProp(props, 'isActive').then(css`
    ${responsiveFontBlock(props.theme.typography.body.short.emM)};
  `, otherwise(css`
    ${responsiveFontBlock(props.theme.typography.body.short.M)};
  `))}
`;

export const Item = styled('li')`
  margin-top: ${props => props.theme.spacing.stack.s4};
  text-align: left;

  &:last-of-type {
    margin-bottom: 0.25rem;
  }
`;

export const CategoriesLabel = styled.div`
  ${props => responsiveFontBlock(props.theme.typography.labels.label)};
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.stack.s3};
`;