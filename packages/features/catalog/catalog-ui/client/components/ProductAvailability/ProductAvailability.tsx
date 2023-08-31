/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { SkeletonLine, LayoutSpacing } from '@exo/frontend-components-core';
import { DeliveryTruck, Store } from '@carbon/react/icons';
import { ProductAvailabilityContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import * as S from './ProductAvaliability.styles';

const stockStatusMap = {
  Available: 'available',
  Future: 'future',
  inStock: 'available',
  Unavailable: 'not_available'
};

export const ProductAvailability = ({
  availability,
  isOnlineEnabled,
  isStoreEnabled,
  children
}: ProductAvailabilityContainerRenderProps & { children: any }) => {
  const intl = useIntl('features.catalog.catalog-ui.components.ProductAvailibility');
  return (
    <>
      {!availability && (
        <>
          <LayoutSpacing size="sm" />
          <div>{intl.msg('title.availability', 'No product availability information')}</div>
          <LayoutSpacing size="sm" />
        </>
      )}
      {isOnlineEnabled &&
        availability?.length > 0 &&
        availability
          .filter(a => a.distributionGroup)
          .map(a => (
            <S.Entry key={a.distributionGroup!.id}>
              <S.Icon>
                <DeliveryTruck size={20} />
              </S.Icon>
              {a.distributionGroup!.name}
              <S.Status type={stockStatusMap[a.status]}>
                {stockStatusMap[a.status] === 'available' && <>{intl.msg('title.instock', 'In stock')}</>}
                {stockStatusMap[a.status] === 'not_available' && <>{intl.msg('title.outofstock', 'Out of stock')}</>}
                {stockStatusMap[a.status] === 'future' && (
                  <> {intl.msg('title.availableon', 'Available on')}{a.availableDate!.split('T')[0]}</>
                )}
              </S.Status>
            </S.Entry>
          ))}
      {isStoreEnabled &&
        availability?.length > 0 &&
        availability
          .filter(a => a.shipNode)
          .map(a => (
            <S.Entry key={a.shipNode!.id}>
              <S.Icon>
                <Store size={20} />
              </S.Icon>
              {a.shipNode!.name}
              <S.Status type={stockStatusMap[a.status]}>
                {stockStatusMap[a.status] === 'available' && <> {intl.msg('title.instock', 'In stock')}</>}
                {stockStatusMap[a.status] === 'not_available' && <>{intl.msg('title.outofstock', 'Out of stock')}</>}
                {stockStatusMap[a.status] === 'future' && (
                  <> {intl.msg('title.availableon', 'Available on')}{a.availableDate!.split('T')[0]}</>
                )}
              </S.Status>
            </S.Entry>
          ))}
      {isStoreEnabled && <div style={{marginTop: '1rem'}}>{children}</div>}
    </>
  );
};

ProductAvailability.Skeleton = () => {
  return (
    <>
      <S.Entry>
        <S.Icon>
          <DeliveryTruck size={20} />
        </S.Icon>
        <SkeletonLine />
      </S.Entry>

      <S.Entry>
        <S.Icon>
          <Store size={20} />
        </S.Icon>
        <SkeletonLine />
      </S.Entry>
    </>
  );
};
