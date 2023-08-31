/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useInterval } from '@exo/frontend-common-hooks';
import React, { useState } from 'react';
import * as S from './HeroCarousel.styles';

export const HeroCarousel = ({ items, slideSpeed = 5000, height = '40rem' }: Props) => {
  const [current, setCurrent] = useState(0);
  const isAnimated = items?.length > 1;

  useInterval(
    () => setCurrent((current + 1) % items?.length), 
    isAnimated ? slideSpeed : 0
  );

  return (
    <S.HeroCarousel containerHeight={height}>
      <S.Items>
        {items?.map((item, i) => (
          <S.Item
            to={item.link}
            /* eslint-disable-next-line react/no-array-index-key */
            key={`HeroCarousel-${i}`}
            isCurrent={i === current}
            zIndex={items.length}
            title={item.title}
          >
            <S.Background image={item.backgroundImage} />
            {item.foregroundImage && <S.Foreground image={item.foregroundImage} />}
            <S.Content>
              <S.Inner>
                <S.Title>{item.title}</S.Title>
                <S.Body>{item.body}</S.Body>
              </S.Inner>
            </S.Content>
          </S.Item>
        ))}
      </S.Items>
      {isAnimated && (
        <S.Progress>
          {items?.map((_, i) => (
            <S.Button
              /* eslint-disable-next-line react/no-array-index-key */
              key={`Hero-progress-${i}`}
              isCurrent={i === current}
              onClick={() => setCurrent(i)}
              title={`Slide ${i}`}
            >
              <S.Dot />
            </S.Button>
          ))}
        </S.Progress>
      )}
    </S.HeroCarousel>
  );
};

type Props = {
  items: {
    title: string;
    backgroundImage?: string;
    foregroundImage: string;
    body: string;
    link: string;
  }[];
  slideSpeed?: number;
  height?: string;
};
