/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/prop-types */

import React from 'react';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { BreadcrumbItem as CarbonBreadcrumbItem } from '@carbon/react';
import SkeletonLine from '../SkeletonLine/SkeletonLine';
import * as S from './Breadcrumb.styles';

export const Breadcrumb = ({ path, className }: Props) => {
  return (
    <S.StyledCarbonBreadcrumb noTrailingSlash className={className}>
      <CarbonBreadcrumbItem>
        <ReactLink to="/" title="Home">
          Home
        </ReactLink>
      </CarbonBreadcrumbItem>

      {path.map((d, idx) => (
        <CarbonBreadcrumbItem key={d.url} isCurrentPage={idx === path.length - 1}>
          <ReactLink to={d.url} title={d.label?.toString()}>
            {d.label}
          </ReactLink>
        </CarbonBreadcrumbItem>
      ))}
    </S.StyledCarbonBreadcrumb>
  );
};

type Props = {
  path: {
    url: string;
    label: string | React.ReactNode;
  }[];
  className?: string;
};

Breadcrumb.Skeleton = () => (
  <S.StyledCarbonBreadcrumb noTrailingSlash>
    <CarbonBreadcrumbItem>
      <ReactLink to="/" title="Home">
        Home
      </ReactLink>
    </CarbonBreadcrumbItem>
    <CarbonBreadcrumbItem>
      <SkeletonLine />
    </CarbonBreadcrumbItem>
  </S.StyledCarbonBreadcrumb>
);
