/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './PageNotFound.styles';

export const PageNotFound = ({ location }: Props) => (
  <S.PageNotFound>
    <div>
      <h1>Page not found</h1>
      <p>{location.pathname} was not found</p>
    </div>
  </S.PageNotFound>
);

type Props = {
  location: ReturnType<typeof useLocation>;
};
