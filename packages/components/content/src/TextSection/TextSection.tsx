/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import React from 'react';
import * as S from './TextSection.styles';

export const TextSection = ({ subTitle, title, body, buttons, spacing, children }: Props) => {
  return <S.TextSection spacing={spacing ?? 'call-out'}>
    {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
    <S.Title>{title}</S.Title>
    <S.Body>{ body ?? children }</S.Body>
    {buttons && <S.Buttons>{buttons.map(b => <Button key={b.label} variant="tertiary" label={b.label} href={b.link} />)}</S.Buttons>}
  </S.TextSection>
}

type Props = {
  subTitle?: string;
  title: string;
  body?: string;
  buttons?: {
    label: string;
    link: string;
  }[];
  variant?: 'centered';
  spacing?: S.Spacing;
  children?: any;
}