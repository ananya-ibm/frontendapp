/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Template.styles';
import { TemplateContainerRenderProps } from '@exo/frontend-features-devops-logic';

// TODO: Use base components instead
import { Breadcrumb, BreadcrumbItem, Link } from '@carbon/react';

export const Template = ({ data }: Props) => {
  return (
    <S.Template>
      <Breadcrumb>
        <BreadcrumbItem href='/devops/catalog'>Catalog</BreadcrumbItem>
      </Breadcrumb>
      <S.Name>{data.name}</S.Name>
      <S.Description>{data.description}</S.Description>
      <S.Frontend>Frontend App: <Link
        href={'https://github.ibm.com/ixliberty/ixl-frontend/tree/develop/packages/apps/' + data.frontend}
        target="_blank">
        {data.frontend}
      </Link></S.Frontend>
      <S.Adapter>Adapter App: <Link
        href={'https://github.ibm.com/ixliberty/ixl-adapter/tree/develop/packages/apps/' + data.adapter}
        target="_blank">
        {data.adapter}
      </Link></S.Adapter>
      <S.Keywords>{data.keywords}</S.Keywords>
    </S.Template>
  );
};

type Props = TemplateContainerRenderProps & {
  // TODO: Add any additional props
};
