/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { formatDate } from '@exo/frontend-common-i18n';
import { SummaryTile } from '@exo/frontend-components-automotive';
import {
  Card,
  CardTitle,
  CardSection,
  Tag,
  Tabs,
  Tab,
  Button
} from '@exo/frontend-components-base';
import { SubscriptionsContainerRenderProps } from '@exo/frontend-features-automotive-account-logic';
import * as S from './Subscriptions.styles';

const SubscriptionItem = ({ isActive, name, startDate, cost, payment, products }: Props) => {
  const getProducts = productsArr => {
    return (
      <>
        {productsArr.map(p => {
          return (
            <SummaryTile
              key={p.product.name}
              thumbnail={getClientImagePath(p.product.thumbnail)}
              text={''}
              onChange={() => {}}
              changeButtonText="Change"
              title={p.product.name}
              amount={{
                value: p.product.price.list.value,
                currency: p.product?.price?.list?.currency
              }}
            />
          );
        })}
      </>
    );
  };
  const ProductData = (products ?? []).length > 0 && getProducts(products);
  return (
    <>
      <Card>
        <CardTitle>
          <div>
            {name} {isActive && <Tag label="Active" />}
          </div>
        </CardTitle>
        <CardSection>
          {startDate && (
            <div>
              {`Start Date: ${formatDate(new Date(parseInt(startDate, 10)), 'dd/MM/yyyy')}`}
            </div>
          )}
          {cost && payment && (
            <>
              <div className="highlighted-row">{cost}</div>
              <div>{payment}</div>
            </>
          )}

          <LayoutSpacing size="sm" />
          <S.ProductRow>{ProductData && ProductData}</S.ProductRow>
        </CardSection>
      </Card>
      <LayoutSpacing size="sm" />
    </>
  );
};

type Props = {
  isActive?: boolean;
  name: string;
  startDate?: string;
  cost?: string;
  payment?: string;
  products?: any[];
};

export const Subscriptions = ({ subscriptions, cancelled }: SubscriptionsContainerRenderProps) => {
  return (
    <S.Subscriptions>
      <Tabs>
        <Tab id="active" label="Active">
          <S.RightButton>
            <Button label="Browse more subscriptions" onClick={() => {}} />
          </S.RightButton>
          <LayoutSpacing size="sm" />
          {subscriptions.map(item => (
            <SubscriptionItem
              key={item.id}
              name={item.id}
              isActive={!!item.status}
              startDate={item.startDate}
              products={item.subscribedProducts}
            />
          ))}
        </Tab>
        <Tab id="cancelled" label="Cancelled">
          <S.RightButton>
            <Button label="Browse subscriptions" onClick={() => {}} />
          </S.RightButton>
          <LayoutSpacing size="sm" />
          {cancelled.map(item => (
            <SubscriptionItem
              key={item.name}
              name={item.name}
              isActive={item.isActive}
              cost={item.cost}
              payment={item.payment}
            />
          ))}
        </Tab>
      </Tabs>
    </S.Subscriptions>
  );
};
