/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useHistory } from 'react-router';
import * as S from './ImageGrid.styles';

export const ImageGrid = ({ title, images, columnCount }: Props) => {
  const history = useHistory();
  return (
    <>
      {title && <S.Heading>{title}</S.Heading>}
      <S.ImageGrid count={columnCount ?? 5}>
        {images.map(i => (
          <S.Entry key={i.src} columns={i.columns ?? 1} onClick={() => history.push(i.url)}>
            <S.Image src={i.src}>{!i.text && <S.Title>{i.title}</S.Title>}</S.Image>
            {i.text && (
              <>
                <S.SubTitle>{i.title}</S.SubTitle>
                <S.Text>{i.text}</S.Text>
                <S.Links>
                  {i.links?.map(l => (
                    <S.Link key={l.label} href={l.url}>
                      {l.label}
                    </S.Link>
                  ))}
                </S.Links>
              </>
            )}
          </S.Entry>
        ))}
      </S.ImageGrid>
    </>
  );
};

type Props = {
  title?: string;
  images: {
    src: string;
    columns?: number;
    title: string;
    url: string;
    text?: string;
    links?: {
      label: string;
      url: string;
    }[];
  }[];
  columnCount?: number;
};
