/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import { SidePanel } from '@exo/frontend-components-core';
import { CartContainer } from '@exo/frontend-features-cart-logic';
import { ProductRef, ProductTypeContainer, useProduct } from '@exo/frontend-features-catalog-logic';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { B2BCart } from '../../components/B2BCart/B2BCart';
import { ProductInformationPanel } from '../../smart-components/ProductInformationPanel/ProductInformationPanel';
import { urlFactory } from '../../urls';
import * as S from './ShoppingPage.styles';

const PRODUCT_NAME_FRAGMENT = gql`
  fragment ProductInformationContainer_Basic on PrdItem {
    id
    name
  }
`;

const STATE_MARKER = {
  fromShop: true
};

const isStateMarked = () => window.history.state?.fromShop;

export const ShoppingPage = ({ productId, renderPanel }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProductOpen, setIsProductOpen] = useState(!!productId);
  const [eProductId, setEffectiveProductId] = useState(productId);

  useEffect(() => {
    setIsProductOpen(!!productId);
    setEffectiveProductId(productId);
  }, [productId]);

  const onClickProduct = useCallback(prdId => {
    window.history.pushState(STATE_MARKER, 'Product', urlFactory.product(prdId));

    setEffectiveProductId(prdId);
    setIsProductOpen(true);
  }, []);

  const { data } = useProduct<{ name: string }>({ productId: eProductId }, PRODUCT_NAME_FRAGMENT);
  const productName = data?.product.name;

  const history = useHistory();
  return (
    <div>
      <SidePanel
        title="Products"
        size="m"
        isOpen={isOpen}
        isClosable={true}
        onClose={() => setIsOpen(false)}
        mode="compress"
        hasOverlay={false}
      >
        {renderPanel({ onClickProduct })}
      </SidePanel>

      <SidePanel
        key="main"
        title={productName}
        size="xl"
        isOpen={isProductOpen}
        onClose={() => {
          setIsProductOpen(false);
          if (isStateMarked()) {
            window.history.back();
          }
        }}
      >
        {eProductId && (
          <ProductTypeContainer
            productId={new ProductRef({ partnumber: eProductId })}
            render={({ productType }) => (
              <ProductInformationPanel
                onClose={() => setIsProductOpen(false)}
                productId={eProductId}
                productType={productType}
              />
            )}
          />
        )}
      </SidePanel>

      <SidePanel.Main>
        <S.MainPanel>
          <CartContainer
            render={props => (
              <B2BCart
                cart={props.cart}
                onItemUpdate={props.onItemUpdate}
                onAddProducts={() => {
                  setIsOpen(true);
                  history.push(urlFactory.root());
                }}
              />
            )}
          />
        </S.MainPanel>
      </SidePanel.Main>
    </div>
  );
};

type Props = {
  isProductOpen?: boolean;
  productId?: string;
  productType?: string;
  onProductClose?: () => void;
  renderPanel: (p: PanelRenderProps) => JSX.Element;
};

export type PanelRenderProps = {
  onClickProduct: (string) => void;
};
