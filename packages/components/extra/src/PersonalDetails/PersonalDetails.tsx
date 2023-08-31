/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Pencil } from '@exo/frontend-components-core';
import * as S from './PersonalDetails.styles';

export const PersonalDetails = ({ name, initials, details, isSmall, onEditClick }: Props) => {
  return (
    <S.PersonalDetails isSmall={isSmall}>
      <S.Media>
        <S.Image>{initials}</S.Image>
        {onEditClick && (
          <S.Button type="button" onClick={onEditClick}>
            <span className="sr">Edit</span>
            <Pencil width="20px" />
          </S.Button>
        )}
      </S.Media>

      <S.Content>
        <h1>{name}</h1>
        <dl>
          {details &&
            details.length &&
            details.map((detail, i) => (
              <div key={`details-${initials}-${i}`}>
                <dt>{detail.title}</dt>
                <dd>{detail.text}</dd>
              </div>
            ))}
        </dl>
      </S.Content>
    </S.PersonalDetails>
  );
};

type Props = {
  name: string;
  initials: string;
  details: {
    title: string;
    text: string;
  }[];
  isSmall?: boolean;
  onEditClick?: () => void;
};
