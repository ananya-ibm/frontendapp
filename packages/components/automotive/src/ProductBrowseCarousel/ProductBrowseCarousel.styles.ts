/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './ProductBrowseCarousel.theme';

export const ProductBrowseCarousel = styled('div')`
  background: ${props => theme(props).background};
  margin: ${props => props.theme.spacing.stack.s7} 0;
  position: relative;
`;

export const TopSection = styled('div')`
  display: block;
  padding: ${props => props.theme.spacing.stack.s9} ${props => props.theme.spacing.stack.s9} 0;

  & .title {
    ${props => responsiveFontBlock(props.theme.typography.display.heading1)};
    line-height: 4rem;
    text-align: left;

    &::after {
      height: 0.125rem;
      margin-top: ${props => props.theme.spacing.stack.s3};
      width: 28rem;
    }
  }
`;

export const Content = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 700 })};
  line-height: 1.25rem;
  padding: ${props => props.theme.spacing.stack.s6} 0;
`;

export const Viewport = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 16rem;
  width: 100%;
`;

export const CarouselFrame = styled('div')`
  height: 16rem;
  width: 100%;
`;

export const Carousel = styled('div')`
  height: 16rem;
  width: 100%;
`;

export const ListItems = styled('ul')`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  list-style: none;
  margin: 0;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  /* overflow-y: hidden; */
  overflow-y: scroll;
  padding: 0;
  width: 100%;
`;

export const Item = styled('li')`
  height: 100%;
  margin: 0 2.375rem;
  width: 100%;

  & .overlay {
    opacity: 0.3;
  }
`;

export const ScrollItem = styled('div')`
  height: 16rem;
  width: 35rem;
`;

export const Image = styled('img')`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

export const ExpanadCarousel = styled('div')`
  margin: 0 auto;
  width: 90%;
`;

export const ExpandContainer = styled('div')`
  align-items: center;
  display: flex;
`;

export const ExpandWrapper = styled('div')`
  display: 'flex';
  flex-direction: 'column';
  width: 100%;
`;

export const ChevronButton = styled('button')`
  background: none;
  border: none;
  margin: 0 ${props => props.theme.spacing.inline.s7};
`;

export const ExpandTop = styled('div')`
  margin-bottom: 1.25rem;

  & .productName {
    font-size: ${props => props.theme.spacing.inline.s6};
    line-height: ${props => props.theme.spacing.inline.s7};
  }
`;

export const Text = styled('div')`
  font-size: 0.875rem;
  line-height: 1.125rem;
`;

export const ExpandBody = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Stats = styled('ul')``;

export const StatsItems = styled('li')`
  display: flex;
  flex-direction: column;
  margin: 1.25rem 0;
`;

export const StatsDescription = styled('div')`
  font-size: 1.5625rem;
  font-weight: 600;
  line-height: 2.062rem;

  &::after {
    background: ${props => props.theme.colors.brand.brand1.base};
    content: '';
    display: block;
    height: 0.062rem;
    margin-top: 0.5rem;
  }
`;

export const StatsName = styled('div')`
  font-size: 0.875rem;
  line-height: 1.125rem;
`;

export const ExpandImage = styled('img')`
  height: 15.5rem;
  object-fit: contain;
  width: 49.187rem;
`;

export const ExpandBottom = styled('div')`
  padding-top: 1.25rem;

  & .financeOptionsLink {
    align-items: center;
    display: flex;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25rem;
    padding-top: 0.625rem;
    text-decoration: underline;
  }

  & .arrowRight {
    fill: #0062ff;
    height: ${props => props.theme.spacing.stack.s4};
    width: ${props => props.theme.spacing.inline.s5};
  }
`;

export const ButtonGroup = styled('div')`
  align-items: center;
  display: flex;
  gap: ${props => props.theme.spacing.inline.s5};
  justify-content: center;
  padding: ${props => props.theme.spacing.inset.L};
`;

export const SeeMoreSection = styled('div')`
  bottom: -2.62rem;
  left: calc(50% - 4.5rem);
  position: absolute;
`;
