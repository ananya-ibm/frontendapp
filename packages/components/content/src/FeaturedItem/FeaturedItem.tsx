/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import * as S from './FeaturedItem.styles';

export const FeaturedItem = ({ className, subtitle, title, text, buttonText, image }: Props) => {
  return (
    <S.FeaturedItem className={className}>
      <S.Content>
        <h3>{subtitle}</h3>
        <S.Title>{title}</S.Title>
        <S.Text>{text}</S.Text>
        <Button label={buttonText} />
      </S.Content>
      <S.Image url={image} />
    </S.FeaturedItem>
  );
};

type Props = {
  className?: string;
  subtitle: string;
  title: string;
  text: string;
  buttonText: string;
  image: string;
};
