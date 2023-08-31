/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './HorizontalContentCard.styles';

export const HorizontalContentCard = ({
  title,
  subtitle,
  text,
  img,
  linkText,
  link,
  isImageRight,
  hasAlwaysShadow,
  hasNoShadow
}: Props) => {
  return (
    <S.HorizontalContentCard
      isImageRight={isImageRight}
      hasAlwaysShadow={hasAlwaysShadow}
      hasNoShadow={hasNoShadow}
    >
      <div className="card-image">{img && <S.Media img={img} />}</div>
      <div className="card-content">
        <S.ContentPanel>
          {title && <S.Title>{title}</S.Title>}
          {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
          {text && <S.Content>{text}</S.Content>}
          {linkText && <S.Link href={link}>{linkText}</S.Link>}
        </S.ContentPanel>
      </div>
    </S.HorizontalContentCard>
  );
};

type Props = {
  title?: string;
  subtitle?: string;
  text?: string | React.ReactElement;
  img?: string;
  linkText?: string;
  link?: string;
  isImageRight?: boolean;
  hasAlwaysShadow?: boolean;
  hasNoShadow?: boolean;
};
