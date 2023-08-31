/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SidePanel } from '@exo/frontend-components-core';
import { CardSection } from '@exo/frontend-components-base';
import { TopCategoryNavigationContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import { Link } from '@exo/frontend-common-link';
import React from 'react';
import { B2BGrid } from '../B2BGrid/B2BGrid';
import * as S from './B2BCategoriesGrid.styles';

export const B2BCategoriesGrid = ({
  childCategories
}: TopCategoryNavigationContainerRenderProps & { id?: string }) => {
  return (
    <>
      <SidePanel.Body>
        <B2BGrid>
          {childCategories.map(cat => (
            <S.CategoryCard key={cat.id} interactive>
              <Link href={`/shop/category/${cat.id}`}>
                <CardSection type="media">
                  <img
                    style={{ width: '100%', maxHeight: '5rem', objectFit: 'cover' }}
                    src={cat.thumbnail}
                  />
                </CardSection>
                <CardSection>{cat.name}</CardSection>
              </Link>
            </S.CategoryCard>
          ))}
        </B2BGrid>
      </SidePanel.Body>
    </>
  );
};

B2BCategoriesGrid.Skeleton = () => {
  return (
    <SidePanel.Body>
      <B2BGrid />
    </SidePanel.Body>
  );
};
