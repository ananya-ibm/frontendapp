/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from '@carbon/react/icons';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { ExpandButton } from '../ExpandButton/ExpandButton';
import * as S from './ProductBrowseCarousel.styles';

export const ProductBrowseCarousel = ({
  title = 'A vehicle for any superhero',
  description = 'See our full range of vehicles and find the one that best fits your lifestyle',
  productRangeLink = '',
  items = []
}: Props) => {
  const [isCarouselActive, setCarouselActive] = useState(false);
  const [display, setDisplay] = useState(1);

  const handleAnchorToBudget = () => {
    const anchor = document.querySelector('#BudgetCalculatorSection');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleCarousel = () => {
    setCarouselActive(!isCarouselActive);
  };

  const handleScroll = e => {
    if (e.deltaY > 0) {
      if (display === items.length - 1) {
        setDisplay(display * 0);
      } else {
        setDisplay(display + 1);
      }
    } else if (e.deltaY < 0) {
      if (display === 0) {
        setDisplay(items.length - 1);
      } else {
        setDisplay(display - 1);
      }
    }
  };

  const handleSlide = e => {
    const target = e.currentTarget.id;
    if (target === 'NextSlide') {
      if (display === items.length - 1) {
        setDisplay(display * 0);
      } else {
        setDisplay(display + 1);
      }
    } else if (target === 'PreviousSlide') {
      if (display === 0) {
        setDisplay(items.length - 1);
      } else {
        setDisplay(display - 1);
      }
    }
  };

  return (
    <S.ProductBrowseCarousel>
      <S.TopSection>
        <h2 className="title">{title}</h2>
        <S.Content>{description}</S.Content>
      </S.TopSection>
      <S.Viewport onWheel={isCarouselActive ? () => false : handleScroll}>
        <S.CarouselFrame>
          <S.Carousel>
            <S.ListItems>
              {items && items.length ? (
                <>
                  <S.Item>
                    <S.ScrollItem className={isCarouselActive ? 'overlay' : ''}>
                      <S.Image
                        src={items[display === 0 ? items.length - 1 : display - 1].image}
                        alt={items[display === 0 ? items.length - 1 : display - 1].alt}
                      />
                    </S.ScrollItem>
                  </S.Item>

                  <S.Item>
                    <S.ScrollItem>
                      <S.Image src={items[display].image} alt={items[display].alt} />
                    </S.ScrollItem>
                  </S.Item>

                  <S.Item>
                    <S.ScrollItem className={isCarouselActive ? 'overlay' : ''}>
                      <S.Image
                        src={items[display === items.length - 1 ? 0 : display + 1].image}
                        alt={items[display === items.length - 1 ? 0 : display + 1].alt}
                      />
                    </S.ScrollItem>
                  </S.Item>
                </>
              ) : (
                'There Are No Items'
              )}
            </S.ListItems>
          </S.Carousel>
        </S.CarouselFrame>
      </S.Viewport>
      {isCarouselActive && (
        <S.ExpanadCarousel>
          {items && items.length ? (
            <S.ExpandContainer>
              <S.ChevronButton
                id="PreviousSlide"
                data-testid="prev-slide"
                onClick={e => handleSlide(e)}
              >
                <ChevronLeft size={32} />
              </S.ChevronButton>
              <S.ExpandWrapper>
                <S.ExpandTop>
                  <h3 className="productName">{items[display].product_name}</h3>
                  <S.Text>{items[display].product_description}</S.Text>
                </S.ExpandTop>
                <S.ExpandBody>
                  <S.Stats>
                    {items && items.length
                      ? items[display].product_stats?.map(item => {
                          return (
                            <S.StatsItems key={item.name}>
                              <S.StatsDescription>{item.stats}</S.StatsDescription>
                              <S.StatsName>{item.name}</S.StatsName>
                            </S.StatsItems>
                          );
                        })
                      : ''}
                  </S.Stats>
                  <S.ExpandImage src={items[display].image} alt={items[display].alt} />
                </S.ExpandBody>
                <S.ExpandBottom>
                  <MonetaryAmount
                    value={items[display].price?.value}
                    currency={items[display].price?.currency}
                    rate={items[display].price?.rate}
                  />
                  <br />
                  <ReactLink className="financeOptionsLink" to={items[display].financeOptions}>
                    View more finance options
                    <ArrowRight size={32} className="arrowRight" />
                  </ReactLink>
                </S.ExpandBottom>
              </S.ExpandWrapper>
              <S.ChevronButton
                id="NextSlide"
                data-testid="next-slide"
                onClick={e => handleSlide(e)}
              >
                <ChevronRight size={32} />
              </S.ChevronButton>
            </S.ExpandContainer>
          ) : (
            'There Are No Items'
          )}
        </S.ExpanadCarousel>
      )}
      <S.ButtonGroup>
        <ReactLink to={productRangeLink}>
          <Button label="Browse our product range" />
        </ReactLink>
        <Button
          variant="secondary"
          label="Set your budget"
          data-testid="set-budget-link"
          onClick={handleAnchorToBudget}
        />
      </S.ButtonGroup>
      <S.SeeMoreSection>
        <ExpandButton isExpanded={isCarouselActive} onExpandClick={() => toggleCarousel()} />
      </S.SeeMoreSection>
    </S.ProductBrowseCarousel>
  );
};

type Props = {
  title?: string;
  description?: string;
  productRangeLink?: string;
  items?: {
    image?: string;
    alt?: string;
    price?: {
      value?: number;
      currency?: string;
      prefix?: string;
      rate?: string;
    };
    product_name?: string;
    product_description?: string;
    financeOptions?: string;
    product_stats?: {
      stats?: string;
      name?: string;
    }[];
  }[];
};
