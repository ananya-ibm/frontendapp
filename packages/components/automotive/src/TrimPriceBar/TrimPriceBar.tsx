/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tab } from '@exo/frontend-components-base';
import { PriceBar } from '../PriceBar/PriceBar';
import * as S from './TrimPriceBar.styles';

export const TrimPriceBar = ({
  product,
  handleConfigure,
  updateTrim,
  financeLinkText,
  openModal,
  testDriveOnClick
}: Props) => {
  const formatPrice = price => {
    const formattedPrice =
      price && price.list
        ? {
            value: price.list.value,
            currency: price.list.currency
          }
        : {
            value: '25000',
            currency: 'GBP',
            rate: 'Purchase Price'
          };
    return formattedPrice;
  };

  return product?.children ? (
    <S.TabsWrapper className="tabs-wrapper">
      {product?.children?.map((child, index) => (
        <Tab
          id={child.name!}
          onClick={() => {
            updateTrim(index);
          }}
          key={child.name}
          label={child.name!}
        >
          <S.PriceBar>
            <PriceBar
              addToCartText="Configure"
              addToCartClick={handleConfigure}
              financeLinkText={financeLinkText}
              testDriveText="Book test drive"
              price={formatPrice(child.price)}
              subscriptionCost={child.financedPrice ?? child.price}
              openModal={openModal}
              testDriveOnClick={testDriveOnClick}
            />
          </S.PriceBar>
        </Tab>
      ))}
    </S.TabsWrapper>
  ) : (
    <div />
  );
};

type Props = {
  handleConfigure?: () => void;
  updateTrim: (idx: number) => void;
  product: {
    children: {
      name?: string;
      price: {
        value?: string;
        currency?: string;
        prefix?: string;
      };
      financedPrice?: {
        value?: string;
        currency?: string;
        prefix?: string;
      };
      subscriptionCost: {
        value?: string;
        currency?: string;
        prefix?: string;
        rate?: string;
      };
    }[];
  };
  financeLinkText?: string;
  openModal?: () => void;
  testDriveOnClick?: () => void;
};
