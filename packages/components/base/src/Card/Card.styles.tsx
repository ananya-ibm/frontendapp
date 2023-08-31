/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { responsiveFontBlock, ifProp, spacing } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';
import theme from './Card.theme';
import { Layer } from '../Layer/Layer';

export const CardTitle = styled('h4')`
  align-items: center;

  display: flex;

  /*font: ${props => theme(props).titleFont};*/
  justify-content: space-between;
  padding: ${props => spacing(props.theme.spacing.inset.M, { bottom: 0 })};
  width: 100%;
`;

export const TitleActions = styled('div')`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.spacing.inline.s7};
`;

export const TitleSecondaryActions = styled('div')`
  margin: ${props =>
    spacing(props.theme.spacing.stack.s5, { vertical: 'invert', horizontal: 'invert' })};
`;

export const CardFooter = styled('div')`
  align-items: center;
  border-top: 0.125rem solid ${props => props.theme.colors.delimiters.lowContrast};
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.inset.M};
  width: 100%;
`;

type CardSectionProps = { type?: string };

export const CardSection = styled.div.attrs<CardSectionProps>(props => ({
  className: `card-section-${props.type}`
}))<CardSectionProps>`
  padding: ${props => spacing(props.theme.spacing.inset.M, {})};
  width: 100%;

  ${props =>
    ifProp(props, 'type').eq('media').then(css`
      padding: 0;
    `)}
  ${props =>
    ifProp(props, 'type').eq('secondary').then(css`
      border-top: 0.125rem solid ${props.theme.colors.delimiters.lowContrast};
      color: ${props.theme.colors.text.secondary};
      ${responsiveFontBlock(props.theme.typography.body.short.M)};
      padding-top: ${props.theme.spacing.inline.s5};
    `)}
`;

export const Card = styled(Layer)<{ interactive: boolean; variant?: string; depth: number }>`
  background-color: ${props => props.theme.colors.backgrounds.panels[props.depth === 1 ? 'primary' : props.depth === 2 ? 'secondary' : 'tertiary'].base};
  border: ${props =>
    `${theme(props).borderTop} ${theme(props).borderRight} ${theme(props).borderBottom} ${
      theme(props).borderLeft
    }`};
  border-radius: ${props => theme(props).borderRadius};
  box-shadow: ${props => theme(props).boxShadow};

  ${props =>
    ifProp(props, 'interactive').eq(true).then(css`
      &:hover {
        box-shadow: ${theme(props).boxShadowHover};
      }
    `)}

  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};

  display: flex;
  flex-direction: column;

  ${props =>
    ifProp(props, 'variant').eq('horizontal').then(css`
      display: grid;
      grid-template-areas: 'left right2' 'left right3' 'left right4';
      grid-template-rows: min-content 1fr min-content;

      ${CardTitle} {
        align-self: start;
        grid-area: right2;
        justify-self: start;
      }

      ${CardSection}.card-section-primary,
      ${CardSection}.card-section-secondary {
        align-self: start;
        grid-area: right3;
        justify-self: start;
      }

      ${CardFooter} {
        align-self: end;
        grid-area: right4;
        justify-self: end;
      }

      ${CardSection}.card-section-media {
        grid-area: left;

        /* stylelint-disable-next-line selector-nested-pattern */
        > img {
          height: 100%;
        }
      }
    `)}
`;

export const FooterActions = styled('div')`
  display: flex;
  gap: ${props => props.theme.spacing.inline.s4};
`;

export const FooterAdditionalActions = styled('div')``;

export const FooterSecondaryActions = styled('div')`
  display: flex;
  gap: ${props => props.theme.spacing.inline.s4};
`;

export const FooterTertiaryActions = styled('div')`
  margin: ${props =>
    spacing(props.theme.spacing.stack.s5, { vertical: 'invert', horizontal: 'invert' })};
`;
