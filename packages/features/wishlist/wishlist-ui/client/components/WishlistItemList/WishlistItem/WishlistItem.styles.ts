/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { ShoppingCart } from '@carbon/react/icons';
import theme from './WishlistItem.theme';


export const WishlistItem = styled('li')`
  border-bottom: solid 0.0625rem ${props => theme(props).border};
  display: flex;
  flex-direction: row;
  padding: 2rem 2rem 2rem 0;
`;

export const Button = styled('div')`
  margin-top: 0.5rem;
`;

export const Media = styled('div')`
  display: none;
  flex-direction: column;
  margin: 0 1rem 0 0;

  ${props => media.greaterThan(props, 'small').then(css`
    display:flex;
    margin-left: 1rem;
  `)}
`;

export const Thumbnail = styled('div')`
  align-items: center;
  border:solid 0.0625rem ${props => theme(props).border};
  border-radius: 0.3rem;
  display:flex;
  justify-content: center;
  overflow:hidden;
  width: 45vw;

  & .thumbnail {
    height:100%;
    width:auto;
  }

  ${props => media.greaterThan(props, 'small').then(css`
    height: 35vw;
    width: 35vw;
  `)}

  ${props => media.greaterThan(props, 'medium').then(css`
    height: 20vw;
    width: 20vw;
  `)}

  ${props => media.greaterThan(props, 'large').then(css`
    height: 15vw;
    width: 15vw;
  `)}
`;

export const Links = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${props => media.greaterThan(props, 'small').then(css`
    flex-direction:row;
  `)}
`;

export const Content = styled('div')`
  flex: 1;
  margin: 0 0 0 1rem;
`;

export const Header = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const Delete = styled('button')`
  background: none;
  border: none;
  flex-shrink: 0;
  height: 2.5rem;
  margin-left: 1rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
  outline: none;
  outline: solid 0.0625rem transparent;
  padding: 0 0.25rem;
  transition: outline 200ms ease-out;
  width: 2.5rem;

  &:hover,
  &:focus {
    outline: solid 0.0625rem black;
  }

  & .icon {
    transform: scale(0.75);
  }
`;

export const HeaderInner = styled('div')`
  flex-grow: 1;
`;

export const Title = styled('h2')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
`;

export const Description = styled('div')`
  color: ${props => theme(props).descriptionColor};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const ImageDetails = styled('div')`
  display: flex;
  margin-top: 1rem;

  & .column-alt {
    display: flex;

    ${props => media.greaterThan(props, 'small').then(css`
      display:none;
    `)}
  }
`;

export const DetailsColumn = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Grid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  margin-top: 0.75rem;
`;

export const PropertyName = styled('h3')`
  color: ${props => theme(props).propertyColor};
  ${props => responsiveFontBlock(props.theme.typography.body.short.S)};
  letter-spacing: 0.05rem;
  vertical-align: baseline;
`;

export const PropertyValue = styled('div')`
  padding-top: 0.5rem;
`;

export const Pricing = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const TotalPrice = styled('span')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.emXL)};
`;

export const ItemPrice = styled('span')`
  color: ${props => theme(props).priceColor};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};

  & .price-list {
    display: inline;
    margin-right: 0.25rem;
  }

  & .price-offer {
    display: inline;
  }
`;
export const MiniCart = styled(ReactLink)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 0.75rem;
  position: relative;
  width: 3rem;
`;
export const Icon = styled(ShoppingCart).attrs(() => ({ size: 24 }))`
  color: ${props => theme(props).iconColor};
  height: 100%;
  width: 100%;
`;
