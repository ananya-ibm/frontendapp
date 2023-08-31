/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const ProductBundleOverview = styled('div')`
`;

export const Wrapper = styled('div')`
`;

export const BundleComponent = styled('div')`
  border-top: 1px solid ${props => props.theme.colors.delimiters.lowContrast};
  display: flex;
  padding: ${props => props.theme.spacing.inset.M};
  padding-left: 0;
  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }
  &:last-of-type {
    padding-bottom: 0;
  }
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
  margin-bottom: ${props => props.theme.spacing.stack.s3};
`;

export const Thumbnail = styled.img`
  width: 20%;
  border: 1px solid #dedede;
`;

export const Info = styled('div')`
  padding-left: ${props => props.theme.spacing.inline.s5};
  width: 70%;
`;

export const Price = styled('div')`
  color: ${props => props.theme.colors.text.primary};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin-bottom: ${props => props.theme.spacing.stack.s4};
  > span > div { margin-left: 0.5rem; display: inline; }
  > span > div:first-of-type { margin-left: 0; }
`;

export const ProductName = styled('div')`
  color: ${props => props.theme.colors.text.primary};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin-bottom: ${props => props.theme.spacing.stack.s4};
`;
