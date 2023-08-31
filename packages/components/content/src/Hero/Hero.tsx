/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Bleed, Button } from '@exo/frontend-components-base';
import * as S from './Hero.styles';

export const Hero = ({
  color,
  variant = 'image-full-width',
  backgroundColor,
  ctaLink = '#',
  ctaText = 'View Shop',
  image = 'https://picsum.photos/1500/700',
  subtitle = 'IBM',
  text = 'Check out our latest products',
  title = 'Commerce Demo Store',
  children
}: Props) => {
  return (
    <Bleed>
      <S.Hero 
        bgImg={variant === 'image-full-width' ? image : undefined}
        bgColor={backgroundColor}>
        <S.Inner>
          <S.Content c={color}>
            {children || (
              <>
                <S.Small>{subtitle}</S.Small>
                <S.Title>{title}</S.Title>
                <S.Text>{text}</S.Text>

                <Button
                  onClick={() => window.location.replace(ctaLink)}
                  label={ctaText}
                />
              </>
            )}
          </S.Content>
          {variant !== 'image-full-width' && (
            <S.Image>
              <img src={image} />
            </S.Image>
          )}
        </S.Inner>
      </S.Hero>
    </Bleed>
  );
};

type Props = {
  image?: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  text?: string | React.ReactNode;
  color?: string;
  ctaText?: string | React.ReactNode;
  ctaLink?: string;
  backgroundColor?: string;
  variant?: 'image-full-width' | 'image-50%';
  children?: any;
};
