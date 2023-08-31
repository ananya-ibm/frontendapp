/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Chevron } from '@exo/frontend-components-core';
import * as S from './List.styles';

export const List = ({ items }: Props) => {
  return (
    <S.List>
      {items &&
        items.map((item, i) => (
          <li key={`${item.title}${i}`} className="List-item">
            {item.url && (
              <S.Link to={item.url}>
                <S.LinkInner>
                  <S.Title>{item.title}</S.Title>
                  <p>{item.text}</p>
                </S.LinkInner>
                <span className="List-icon">
                  <Chevron />
                </span>
              </S.Link>
            )}
            {!item.url && (
              <>
                <S.Title>{item.title}</S.Title>
                <p>{item.text}</p>
              </>
            )}
          </li>
        ))}
    </S.List>
  );
};

type Props = {
  items: {
    title: string;
    text: string;
    url: string;
  }[];
};
