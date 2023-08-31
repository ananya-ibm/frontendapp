/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './DepartmentSelector.styles';

export const DepartmentSelector = ({ departments }: Props) => {
  return (
    <S.DepartmentSelector>
      {departments &&
        departments.map(department => (
          <S.Department
            key={department.title}
            bgImg={department.bgImg}
            aria-label={department.altText}
            href={department.href}
          >
            <div className="department-title">
              <h1>{department.title}</h1>
            </div>
          </S.Department>
        ))}
    </S.DepartmentSelector>
  );
};

type Props = {
  departments: {
    title: string;
    bgImg: string;
    altText: string;
    href: string;
  }[];
};
