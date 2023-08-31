/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './FieldRow.styles';

export const FieldRow = ({ widths, children }: Props) => {
  return (
    <S.FieldRow>
      {children
        ?.filter(c => !!c)
        .map((c, idx) => (
          <div
            className="field-wrapper"
            key={c?.key ?? c?.props?.id ?? `fieldrow_${idx}`}
            style={{ flexBasis: widths?.[idx] ?? '100%' }}
          >
            {c}
          </div>
        ))}
    </S.FieldRow>
  );
};

type Props = {
  children: any;
  widths?: string[];
};
