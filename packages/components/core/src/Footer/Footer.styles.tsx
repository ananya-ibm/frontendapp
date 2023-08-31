/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { Layer } from '@exo/frontend-components-base';
import theme from './Footer.theme';

export const Footer = styled('footer')`
  background: ${props => theme(props).background};
  display: flex;
  flex-direction: column;
`;

export const Inner = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

export const Social = styled(Layer)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 8rem;
  padding: ${props => props.theme.spacing.inset.M};
  ${props =>
    media.greaterThan(props, 'small').then(css`
      padding: ${props.theme.spacing.stack.s7} ${props.theme.spacing.inline.s7}
        ${props.theme.spacing.stack.s5};
    `)}
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      flex-direction: row;
    `)};
`;

export const ContentPanel = styled.div`
`;

export const Content = styled('div')`
  color: ${props => theme(props).contentColor};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.inset.M};

  ${props =>
    media.greaterThan(props, 'small').then(css`
      padding: ${props.theme.spacing.stack.s5} ${props.theme.spacing.inline.s7}
        ${props.theme.spacing.stack.s7};
    `)}
`;

export const Columns = styled('div')`
  display: grid;
  grid-gap: ${props => props.theme.spacing.inline.s5};
  grid-template-columns: 1fr 1fr;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
    grid-template-columns: 1fr 1fr 1fr;
  `)}
`;

export const Link = styled(ReactLink)`
  color: ${props => theme(props).linkColor};
  font: ${props => theme(props).linkFont};
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const Column = styled('div')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SocialColumn = styled(Column)`
  justify-content: flex-end;
  margin-top: 2rem;

  ${props =>
    media.greaterThan(props, 'medium').then(css`
    align-items: flex-end;
  `)}
`;

export const Heading = styled('h2')`
  font: ${props => theme(props).headingFont};
  text-align: left;
`;

export const Items = styled('ul')`
  list-style: none;
`;

export const Item = styled('li')`
  margin: ${props => props.theme.spacing.stack.s4} 0 0;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
    margin: ${props.theme.spacing.stack.s3} 0 0;
  `)}
`;

export const TermsPanel = styled('div')`
`;

export const Terms = styled('div')`
  font: ${props => theme(props).termsFont};
  width: 100%;
  padding: 1rem 2rem;
`;

export const TermsText = styled.div`
  border-top: 1px solid ${props => props.theme.colors.delimiters.lowContrast};
  padding: 0.5rem 0.5rem;
`;