/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './MarketingInfoTabs.theme';

export const MarketingInfoTabs = styled('div')`
  background: ${props => theme(props).background};
  margin: 2rem 0;
  padding: 0 4rem;

  & .cds--tabs__nav {
    width: 100%;
  }

  & .cds--tabs__nav-item {
    width: 33%;
  }

  & .cds--tabs__nav-link {
    color: ${props => theme(props).linkColor};
    ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
    width: 100%;

    &:focus,
    &:active {
      border: none;
      outline: 0;
      width: 100%;
    }
  }
`;

export const ImageTemplate = styled('div')`
  display: flex;
`;

export const Image = styled('img')`
  height: 21rem;
  object-fit: cover;
  width: 44%;
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading1)};
  line-height: 4rem;
  padding-bottom: ${props => props.theme.spacing.stack.s5};
  position: relative;

  &:after {
    background: ${props => theme(props).titleUnderlineColor};
    bottom: 0;
    content: '';
    height: 0.125rem;
    left: 0;
    position: absolute;
    width: 14.3125rem;
  }
`;

export const Desc = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { size: '1rem' })};
  line-height: 1.5rem;
  padding-right: ${props => props.theme.spacing.stack.s7};
  padding-top: 1.375rem;
`;

export const ThreeColTemplate = styled('div')`
  display: flex;
  padding: ${props => props.theme.spacing.stack.s7};
`;

export const Column = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${props => props.theme.spacing.stack.s7};
`;

export const Subtitle = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
  padding-top: ${props => props.theme.spacing.stack.s4};
  text-align: center;
`;

export const ShortDesc = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  padding: ${props => props.theme.spacing.stack.s4} 0;
  text-align: center;
`;
