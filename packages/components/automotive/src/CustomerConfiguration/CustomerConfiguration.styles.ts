/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './CustomerConfiguration.theme';

export const CustomerConfiguration = styled('div')`
  border-bottom: 0.0625rem solid ${props => theme(props).border};
  border-left: 0.5rem solid ${props => theme(props).brandColor};
  border-radius: 0.25rem;
  border-right: 0.0625rem solid ${props => theme(props).border};
  border-top: 0.0625rem solid ${props => theme(props).border};
  font: 400 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
  padding: 1rem;
  transition: box-shadow 100ms ease-in-out;

  & .bold {
    font-weight: 700;
  }

  & .brand-color {
    color: ${props => theme(props).brandColor};
    fill: ${props => theme(props).brandColor};
  }

  & .warning-color {
    color: ${props => theme(props).warningColor};
    fill: ${props => theme(props).warningColor};
  }

  & .with-spacing {
    padding: ${props => theme(props).smallSpacing} 0;
  }

  & .icon {
    margin-right: ${props => theme(props).iconSpacing};
  }

  &:hover {
    box-shadow: 0 0 ${props => theme(props).shadowBlur} ${props => theme(props).shadowColor},
      0 0 ${props => theme(props).shadowBlur} ${props => theme(props).shadowColor};
  }
`;

export const Header = styled('div')`
  display: flex;
`;

export const Actions = styled('div')`
  display: flex;
  margin-left: auto;
`;

export const Action = styled('button')`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  font: 400 ${props => theme(props).textFontSize} ${props => theme(props).textFontFamily};
  outline: none;
  padding: 0 ${props => theme(props).spacing};
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
`;

export const Image = styled('img')`
  margin-right: ${props => theme(props).spacing};
  width: 30%;
`;

export const Content = styled('div')`
  display: flex;
  margin-top: ${props => theme(props).spacing};
`;

export const ConfiguratorLink = styled('div')`
  align-items: center;
  display: flex;
  padding: ${props => theme(props).smallSpacing} 0;
`;

export const Footer = styled('div')`
  align-items: center;
  border-top: ${props => theme(props).borderWidth} solid ${props => theme(props).borderColor};
  display: flex;
  padding: ${props => theme(props).smallSpacing} 0;
`;

export const TotalPrice = styled('div')`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

export const Price = styled('div')`
  font-weight: 700;
  padding: ${props => theme(props).smallSpacing} 0;
`;
