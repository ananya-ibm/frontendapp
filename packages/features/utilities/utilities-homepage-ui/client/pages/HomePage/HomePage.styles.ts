/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css }  from 'styled-components';
import { media, spacing,responsiveFontBlock,ifProp} from '@exo/frontend-common-style-utils';
import theme from './HomePage.theme';
import { Layer } from '@exo/frontend-components-base';

export const HomePage = styled('div')`
  background: white;

  & .cds--grid {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  & .cds--col {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const HeaderImage = styled.div`
  position: absolute;
  right: 0;
  height: 25rem;
  width: 100%;
  overflow: hidden;


  ${props => media.greaterThan(props, 'medium').then(css`
    position: relative;
    width: 100%;
    height: 100%;  

  `)}

  img {
    object-fit: cover;
    width: 100%;
    display:grid;
  }
`;

export const ContentPadding = styled('div')`
    padding-left: 10rem;
    padding-right: 10rem;
    


`;

export const titlealign = styled('h1')`

  margin: 2rem auto;
  width: 90%;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  text-align: center;
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
  padding: 0.5rem 0;
`;

export const Image = styled.div`
  position: absolute;
  right: 0;
  height: 25rem;
  width: 100%;
  overflow: hidden;


  ${props => media.greaterThan(props, 'medium').then(css`
    position: relative;
    width: 100%;
    height: 100%;  

  `)}

  img {
      padding-left: 10rem;
  padding-right:10rem;
    object-fit: cover;
  }
`;

export const CardTitle = styled('h4')`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${props => spacing(props.theme.spacing.inset.M, { bottom: 0 })};
  width: 100%;
 `;
type CardSectionProps = { type?: string };

export const CardSection = styled.div.attrs<CardSectionProps>(props => ({
  className: `card-section-${props.type}`
}))<CardSectionProps>`
  align-items: center;
  display: flex;
  justify-content: center;
text-align: center;
  padding: ${props => spacing(props.theme.spacing.inset.M, {})};
  width: 100%;
  justify-content: center;
  ${props =>
    ifProp(props, 'type').eq('media').then(css`
      padding: 0;
      justify-content: center;
    `)}
`;

export const Centering = styled('div')`
  gap:1rem;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: ${props => spacing(props.theme.spacing.inset.M, {})};
  width: 100%;
`;



export const Card = styled(Layer)<{ interactive: boolean; variant?: string }>`
  padding:1rem;
  background-color: ${props => theme(props).backgroundColor};
  border: ${props =>
    `${theme(props).borderTop} ${theme(props).borderRight} ${theme(props).borderBottom} ${
      theme(props).borderLeft
    }`};
  border-radius: ${props => theme(props).borderRadius};
  
  ${props =>
    ifProp(props, 'interactive').eq(true).then(css`
    `)}

  ${props => responsiveFontBlock(props.theme.typography.body.short.S)};

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


      ${CardSection}.card-section-media {
        grid-area: left;

        /* stylelint-disable-next-line selector-nested-pattern */
        > img {
          height: 100%;
        }
      }
    `)}
`;
export const Small = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const Title = styled('h1')`
  ${props => responsiveFontBlock(props.theme.typography.display.heading1)};
  padding: 0.5rem 0;
`;

export const Text = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.S)};
  padding: 1rem 0 2rem;
`;
