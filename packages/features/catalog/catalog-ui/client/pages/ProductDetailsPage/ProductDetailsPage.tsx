/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback } from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Breadcrumb, Grid, Row, Column, Accordion } from '@exo/frontend-components-base';
import { useHistory } from 'react-router-dom';
import {
  ProductTypeContainer,
  SelectionCriteriaContainer,
  ProductAvailabilityContainer,
  ProductAddToCartContainer,
  ProductInformationContainer,
  ProductPriceContainer,
  ProductBreadcrumbContainer,
  ProductImagesContainer,
  makeProductUrlFactory,
  makeCategoryUrlFactory,
  ProductRef
} from '@exo/frontend-features-catalog-logic';
import { StoreAvailabilityContainer } from '@exo/frontend-features-store-logic';
import { StoreAvailabilityFinder } from '@exo/frontend-features-store-ui/client';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { ProductDetails } from '../../components/ProductDetails/ProductDetails';
import { ProductSummary } from '../../components/ProductSummary/ProductSummary';
import { ProductPrice } from '../../components/ProductPrice/ProductPrice';
import { ProductAvailability } from '../../components/ProductAvailability/ProductAvailability';
import { SelectionCriteria } from '../../components/SelectionCriteria/SelectionCriteria';
import { ProductMediaViewer } from '../../components/ProductMediaViewer/ProductMediaViewer';
import { ProductBundleOverview } from '../../components/ProductBundleOverview/ProductBundleOverview';
import * as S from './ProductDetailsPage.styles';
import { CatalogConfig } from '../../catalogConfig';
import { SimpleAddToCart } from '../../components/SimpleAddToCart/SimpleAddToCart';

// TODO: Optimize to only use one fetch
export const ProductDetailsPage = ({ catalogConfig, productId, skuId }: Props) => {
  const intl = useIntl('features.catalog.catalog-ui.pages.ProductDetailsPage');
  const session = useSessionContext();
  const eProductId = skuId ?? productId;

  const { createNotification: notify, notifyUnexpectedError: notifyError } = useNotificationContext()!;
  const history = useHistory();

  const productUrlFactory = makeProductUrlFactory(
    !!catalogConfig.useSlugs,
    catalogConfig.useSlugseparator ? catalogConfig.slugSeparator : undefined
  );
  const categoryUrlFactory = makeCategoryUrlFactory(!!catalogConfig.useSlugs);

  const onSelectionCriteriaChange = useCallback(
    ({ product, sku }: { product?: any; sku?: any }) => {
      history.push(productUrlFactory(product, sku?.slug ?? sku?.partnumber ?? '_'));
    },
    [productUrlFactory]
  );

  const onStoreSelect = useCallback(
    (store) => {
      session.set({
        country: store.country,
        storeId: store.storeId,
        storeName: store.storeName,
        storeDistance: store.storeDistance
      });
    },
    [session]
  );

  const currency = session.currency ?? catalogConfig.defaultCurrency!;

  const currentStoreId = session?.storeId ?? catalogConfig.defaultStoreId;
  const currentStore = currentStoreId
    ? {
        id: currentStoreId!,
        name: session?.storeName ?? catalogConfig.defaultStoreId ?? '',
        distance: session?.storeDistance ?? ''
      }
    : undefined;

  // TODO: Optimize this a bit - a few too many requests

  return (
    <>
      <LayoutSpacing size="sm" />
      <Grid>
        <Row>
          <Column>
            <ProductBreadcrumbContainer
              productId={productId}
              categoryUrlFactory={categoryUrlFactory}
              productUrlFactory={productUrlFactory}
              render={(args) => <Breadcrumb {...args} />}
              renderLoading={() => <Breadcrumb.Skeleton />}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <S.Layout>
              <S.Title>
                <ProductInformationContainer
                  productId={eProductId}
                  currency={currency}
                  render={(args) => <ProductSummary {...args} />}
                  renderLoading={() => <ProductSummary.Skeleton />}
                />
              </S.Title>
              <S.Price>
                <ProductPriceContainer
                  productId={eProductId}
                  currency={currency}
                  render={(args) => <ProductPrice {...args} />}
                  renderLoading={() => <ProductPrice.Skeleton />}
                />
              </S.Price>
              <S.Extra>
                <ProductTypeContainer
                  productId={eProductId}
                  render={({ productType, parentProductType, hasPrice }) => (
                    <>
                      {(parentProductType === 'product' || productType === 'product') && (
                        <SelectionCriteriaContainer
                          productId={productId}
                          skuId={skuId}
                          onChange={onSelectionCriteriaChange}
                          render={(args) => <SelectionCriteria {...args} />}
                          renderLoading={() => <SelectionCriteria.Skeleton />}
                        />
                      )}

                      <ProductAddToCartContainer
                        productType={productType}
                        hasPrice={hasPrice}
                        productId={eProductId}
                        onSuccess={() =>
                          notify({
                            kind: 'success',
                            title: intl.msg('title.productadded', 'Product added to basket') as string
                          })
                        }
                        onFailure={(err) => notifyError('Error adding to cart', err, '')}
                        /* TODO: Make configurable */
                        render={(args) => <SimpleAddToCart {...args} />}
                        renderLoading={() => <SimpleAddToCart.Skeleton />}
                      />

                      <LayoutSpacing size="sm" />
                      <Accordion>
                        {(productType === 'bundleOfSkus' || productType === 'bundleOfProducts') && (
                          <Accordion.Item title="Items in this bundle" isOpen>
                            <p>
                              <ProductInformationContainer
                                productId={eProductId}
                                currency={currency}
                                fragments={[ProductInformationContainer.childProducts]}
                                render={(args) => <ProductBundleOverview {...args} />}
                                renderLoading={() => <ProductBundleOverview.Skeleton />}
                              />
                            </p>
                          </Accordion.Item>
                        )}
                        {productType === 'sku' && (
                          <Accordion.Item title="Availability" isOpen>
                            <div>
                              <ProductAvailabilityContainer
                                storeId={session.storeId}
                                productId={eProductId}
                                isStoreEnabled={catalogConfig.pdp?.availability?.includes('store')}
                                isOnlineEnabled={catalogConfig.pdp?.availability?.includes(
                                  'online'
                                )}
                                render={(args) => (
                                  <ProductAvailability {...args}>
                                    <StoreAvailabilityContainer
                                      productId={eProductId}
                                      onChange={onStoreSelect}
                                      selectedStore={currentStore}
                                      selectedCountry={session.country}
                                      render={(a) => <StoreAvailabilityFinder {...a} />}
                                      renderLoading={() => (
                                        <StoreAvailabilityFinder state={{ loading: true }} />
                                      )}
                                      renderError={(a) => (
                                        <StoreAvailabilityFinder state={{ error: a }} />
                                      )}
                                    />
                                  </ProductAvailability>
                                )}
                                renderLoading={() => <ProductAvailability.Skeleton />}
                              />
                            </div>
                          </Accordion.Item>
                        )}
                        <Accordion.Item title="Description" isOpen>
                          <ProductInformationContainer
                            productId={eProductId}
                            currency={currency}
                            render={(args) => (
                              <p
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={(() => {
                                  return { __html: args.product.longDescription };
                                })()}
                              />
                            )}
                          />
                        </Accordion.Item>
                        <Accordion.Item title="Product Information">
                          <div>
                            <ProductInformationContainer
                              productId={eProductId}
                              currency={currency}
                              fragments={[ProductInformationContainer.detailedInformation]}
                              render={(args) => <ProductDetails {...args} />}
                              renderLoading={() => <ProductDetails.Skeleton />}
                            />
                          </div>
                        </Accordion.Item>
                        <Accordion.Item title="Reviews">
                          <p>No reviews found</p>
                        </Accordion.Item>
                        <Accordion.Item title="Attachments">
                          <p>No attachments found</p>
                        </Accordion.Item>
                      </Accordion>
                    </>
                  )}
                />
              </S.Extra>
              <S.Images>
                <ProductImagesContainer
                  productId={eProductId}
                  render={(args) => <ProductMediaViewer {...args} />}
                  renderLoading={() => <ProductMediaViewer.Skeleton />}
                />
              </S.Images>
            </S.Layout>
          </Column>
        </Row>
      </Grid>

      <LayoutSpacing size="xl" />
    </>
  );
};

type Props = {
  productId: ProductRef;
  skuId?: ProductRef;
  catalogConfig: CatalogConfig;
};
