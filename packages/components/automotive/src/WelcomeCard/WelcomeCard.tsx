/*
Licensed Materials - Property of IBM
694906H 
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './WelcomeCard.styles';

export const WelcomeCard = ({ data }: Props) => {
  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <S.Image src={data.image} />
      </S.ImageWrapper>
      <S.Content>
        <S.Title>{data.title}</S.Title>
        <S.Description>{data.description}</S.Description>
        <S.Button label={data.buttonText} onClick={data.clickAction}></S.Button>
        <S.BottomText>{data.bottomText}</S.BottomText>
      </S.Content>
    </S.Wrapper>
  );
};

type Props = {
  data: {
    title: string;
    image?: string;
    description: string;
    buttonText: string;
    bottomText: string;
    clickAction: any;
  };
};
