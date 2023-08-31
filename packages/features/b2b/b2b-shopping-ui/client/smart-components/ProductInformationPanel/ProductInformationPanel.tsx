/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CardSection, Tab, Tabs } from '@exo/frontend-components-base';
import { useIntl } from '@exo/frontend-common-i18n';
import { AddToCart, SelectionCriteria } from '@exo/frontend-features-catalog-ui';
import {
  ProductAddToCartContainer,
  ProductImagesContainer,
  ProductInformationContainer,
  ProductRef,
  ProductTypeContainer,
  SelectionCriteriaContainer
} from '@exo/frontend-features-catalog-logic';
import React, { useEffect, useState } from 'react';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { ProductDetails } from '@exo/frontend-features-catalog-ui/client/components/ProductDetails/ProductDetails';
import * as S from './ProductInformationPanel.styles';

export const ProductInformationPanel = ({ productId, productType, onClose }) => {
  const [skuId, setSkuId] = useState<ProductRef | undefined>();
  const { createNotification: notify } = useNotificationContext()!;
  const session = useSessionContext();
  const intl = useIntl('features.catalog.catalog-ui.pages.ProductDetailsPage');
  const {currency} = session;

  useEffect(() => {
    setSkuId(productType === 'sku' ? productId : undefined);
  }, [productId, productType]);

  const eProductId = skuId?.partnumber ?? productId;

  if (!productId) return <div>no product</div>;
  return (
    <>
      <ProductImagesContainer
        productId={productId}
        render={props => (
          <S.MediaAndActionSection>
            <S.Media>
              <img src={props.fullImage} />
            </S.Media>
            <div>
              <S.Action>
                <ProductTypeContainer
                  productId={eProductId}
                  render={({ productType: currentProductType, parentProductType }) => (
                    <>
                      {(parentProductType === 'product' || currentProductType === 'product') && (
                        <CardSection>
                          <S.SelectionTitle>Select variant:</S.SelectionTitle>
                          <SelectionCriteriaContainer
                            productId={productId}
                            skuId={skuId}
                            onChange={({ sku }) => {
                              if (!sku) return;
                              setSkuId(new ProductRef({ partnumber: sku?.partnumber }));
                            }}
                            render={args => <SelectionCriteria {...args} />}
                            renderLoading={() => <SelectionCriteria.Skeleton />}
                          />
                        </CardSection>
                      )}
                      <CardSection>
                        SKU:{' '}
                        {currentProductType === 'sku'
                          ? skuId?.partnumber ?? skuId
                          : 'No variant selected'}
                      </CardSection>
                      <CardSection>
                        <ProductAddToCartContainer
                          hasWishlist={false}
                          productType={currentProductType}
                          productId={eProductId}
                          onSuccess={() => {
                            notify({
                              kind: 'success',
                              title: 'Product added to basket'
                            });
                            onClose();
                          }}
                          onFailure={err =>
                            notify({
                              kind: 'error',
                              title: JSON.stringify(err.message)
                            })
                          }
                          render={args => <S.StyledAddToCart {...args} />}
                          renderLoading={() => <AddToCart.Skeleton />}
                        />
                      </CardSection>
                    </>
                  )}
                />
              </S.Action>
            </div>
          </S.MediaAndActionSection>
        )}
      />

      <ProductInformationContainer
        productId={productId}
        render={props => (
          <div style={{ padding: '2rem' }}>
            <h4>Description</h4>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={(() => {
                // TODO: Remove this hack - only here for Atlas Copco demo
                const d = props.product.longDescription
                  .replaceAll('&lt;', '<')
                  .replaceAll('&gt;', '>')
                  .replaceAll('\\"', '"')
                  .replaceAll('\\n', '')
                  .replaceAll('\\t', '');
                return {
                  __html: d
                };
              })()}
            />
          </div>
        )}
      />
       <Tabs>
          <Tab id="product-attributes" label={intl.msg('tab.productattribute', 'Product Attributes') as string}>
            <ProductInformationContainer
              productId={productId}
              currency={currency}
              fragments={[ProductInformationContainer.detailedInformation]}
              render={args => <ProductDetails {...args} />}
              renderLoading={() => <ProductDetails.Skeleton />}
            />
          </Tab>
      </Tabs>
    </>
  );
};
