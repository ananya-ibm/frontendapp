/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import * as S from './MobileCarousel.styles';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const defaultStyles = {
  slideContainer: {
    padding: '0 .5rem'
  }
};

export const MobileCarousel = ({
  carouselStyles = {},
  children,
  className,
  hasAutoPlay = false,
  hasProgressButtons = true,
  progressClassName
}: Props) => {
  const [current, setCurrent] = React.useState(0);

  const styles = { ...defaultStyles, ...carouselStyles };

  const SwipeableContainer = hasAutoPlay ? AutoPlaySwipeableViews : SwipeableViews;

  return (
    <S.MobileCarousel className={className}>
      <SwipeableContainer
        index={current}
        onChangeIndex={setCurrent}
        style={styles.root}
        slideStyle={styles.slideContainer}
      >
        {children}
      </SwipeableContainer>
      {hasProgressButtons && (
        <S.Progress className={progressClassName}>
          {children.map((child, i) => (
            <S.Button
              key={`carousel-${child.key}`}
              isCurrent={i === current}
              onClick={() => setCurrent(i)}
              title={`Slide ${i}`}
            >
              <S.Dot />
            </S.Button>
          ))}
        </S.Progress>
      )}
    </S.MobileCarousel>
  );
};

type Props = {
  carouselStyles?: {
    root?: any;
    slideContainer?: any;
  };
  children: React.ReactElement[];
  className?: string;
  hasAutoPlay?: boolean;
  hasProgressButtons?: boolean;
  progressClassName?: string;
};
