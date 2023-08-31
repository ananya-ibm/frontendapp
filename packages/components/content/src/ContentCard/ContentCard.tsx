/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ContentCard.styles';

export const ContentCard = ({
  title,
  subtitle,
  text,
  img,
  imgNode,
  linkText,
  link,
  hasAlwaysShadow,
  hasNoShadow
}: Props) => {
  return (
    <S.ContentCard
      hasAlwaysShadow={hasAlwaysShadow}
      hasNoShadow={hasNoShadow}
      className="content-card"
    >
      {img && <S.Media img={img} />}
      {imgNode}
      {title && <S.Title className="card-title">{title}</S.Title>}
      {subtitle && <S.Subtitle className="card-subtitle">{subtitle}</S.Subtitle>}
      {text && <S.Content className="card-content">{text}</S.Content>}
      {linkText && <S.Link href={link}>{linkText}</S.Link>}
    </S.ContentCard>
  );
};

type Props = {
  title?: string;
  subtitle?: string;
  text?: string;
  img?: string;
  imgNode?: React.ReactElement;
  linkText?: string;
  link?: string;
  hasAlwaysShadow?: boolean;
  hasNoShadow?: boolean;
};
