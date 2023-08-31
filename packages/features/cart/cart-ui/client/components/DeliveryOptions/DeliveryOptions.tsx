/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import {
  DeliveryOptionsContainerRenderProps,
  DeliveryOptionTypes
} from '@exo/frontend-features-cart-logic';
import { StoreFinderContainer } from '@exo/frontend-features-store-logic';
import { StoreFinder } from '@exo/frontend-features-store-ui';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './DeliveryOptions.styles';
import { HomeDeliverySelector } from './HomeDeliverySelector';
import { Tab, Tabs } from '@exo/frontend-components-base';

export const DeliveryOptions = ({
  selected,
  onDeliveryOptionChange,
  currentStore,
  deliveryOptions
}: DeliveryOptionsContainerRenderProps) => {
  const intl = useIntl('features.cart.cart-ui.components');

  const ALL_GROUPS = [
    {
      id: DeliveryOptionTypes.HOME_DELIVERY,
      label: intl.msg('Delivery.Options.Home', 'Home Delivery') as string
    },
    {
      id: DeliveryOptionTypes.PICKUP_IN_STORE,
      label: intl.msg('Delivery.Options.Store', 'Store Pick-up') as string
    },
    { id: DeliveryOptionTypes.ORG_ORDER, label: 'Organisation Order' }
  ];

  const groups = ALL_GROUPS.filter((g) => deliveryOptions?.find((sm) => sm.method === g.id));

  const [selectedGroup, setSelectedGroup] = useState(selected?.method ?? groups[0]?.id);
  useEffect(() => {
    setSelectedGroup(groups[0]?.id);
  }, [groups?.length]);

  const pickupDeliveryOptions = deliveryOptions?.filter(
    (sm) => sm.method === DeliveryOptionTypes.PICKUP_IN_STORE
  );
  const homeDeliveryOptions = deliveryOptions?.filter(
    (sm) => sm.method === DeliveryOptionTypes.HOME_DELIVERY
  );

  return (
    <S.DeliveryOptions>
      <Tabs selected={groups.findIndex((d) => selectedGroup === d.id)}>
        {groups.map((d) => (
          <Tab
            id={d.id}
            label={d.label}
            key={d.id}
            /* disabled={selectedGroup === d.id} */
            onClick={() => {
              onDeliveryOptionChange({
                method: d.id,
                ...(d.id === DeliveryOptionTypes.HOME_DELIVERY
                  ? { shippingModeId: homeDeliveryOptions?.[0]?.shippingModeId }
                  : {}),
                ...(d.id === DeliveryOptionTypes.PICKUP_IN_STORE
                  ? { shippingModeId: pickupDeliveryOptions?.[0]?.shippingModeId }
                  : {})
              });
              setSelectedGroup(d.id);
            }}
          >
            {selectedGroup === d.id && selectedGroup === DeliveryOptionTypes.HOME_DELIVERY && (
              <HomeDeliverySelector
                methods={homeDeliveryOptions}
                selected={
                  homeDeliveryOptions.find((h) => h.shippingModeId === selected.shippingModeId)
                    ?.shippingModeId ?? homeDeliveryOptions[0]?.shippingModeId
                }
                onChange={(id) => {
                  if (selected.method === DeliveryOptionTypes.HOME_DELIVERY) {
                    onDeliveryOptionChange({
                      method: DeliveryOptionTypes.HOME_DELIVERY,
                      shippingModeId: id
                    });
                  }
                }}
              />
            )}

            {selectedGroup === d.id && selectedGroup === DeliveryOptionTypes.PICKUP_IN_STORE && (
              <>
                {currentStore?.name && <S.StoreName>Collect at {currentStore?.name}</S.StoreName>}
                <StoreFinderContainer
                  onChange={(id, name) => {
                    onDeliveryOptionChange({
                      method: DeliveryOptionTypes.PICKUP_IN_STORE,
                      shippingModeId: pickupDeliveryOptions?.[0]?.shippingModeId,
                      storeId: id,
                      storeName: name
                    });
                  }}
                  render={(args) => <StoreFinder {...args} />}
                />
              </>
            )}

            {selectedGroup === d.id && selectedGroup === DeliveryOptionTypes.ORG_ORDER && (
              <div>
                You will be ordering on behalf of your organization, and may be subject to admin
                approval
              </div>
            )}
          </Tab>
        ))}
      </Tabs>
    </S.DeliveryOptions>
  );
};

DeliveryOptions.Skeleton = () => {
  return <div></div>;
};
