/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useMemo } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import {
  ProductInformationContainer,
  ProductHeroContainer,
  ProductRef
} from '@exo/frontend-features-catalog-logic';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { ExtensionNode } from '@exo/frontend-common-app-shell';
import { ProductSummary } from '../../components/ProductSummary/ProductSummary';
import { ProductHero } from '../../components/ProductHero/ProductHero';
import * as S from './ProductHeroPage.styles';
import { CatalogConfig } from '../../catalogConfig';

export const ProductHeroPage = ({ catalogConfig, productId, skuId }: Props) => {
  const session = useSessionContext();

  const eProductId = skuId ?? productId;

  const currency = session.currency ?? catalogConfig.defaultCurrency;

  const heroBarProps = useMemo(() => ({ productId: eProductId }), [eProductId]);
  const heroBarExt = useMemo(() => catalogConfig.pdp?.extensions?.heroBar, []);

  return (
    <>
      <LayoutSpacing size="sm" />
      <S.Wrapper>
        <ProductHeroContainer productId={eProductId} render={args => <ProductHero {...args} />} />

        <ExtensionNode extensions={heroBarExt} props={heroBarProps} />

        <S.Main>
          <S.Summary>
            <ProductInformationContainer
              productId={eProductId}
              currency={currency}
              render={args => <ProductSummary {...args} />}
              renderLoading={() => <ProductSummary.Skeleton />}
            />
          </S.Summary>
        </S.Main>

        <LayoutSpacing size="sm" />

        {/* TODO: Inline tab components here */}
        {/* TODO: Move logic to use productId instead of skuId to adapter layer */}
        {/*
        <ProductInformationContainer
          productId={productId}
          currency={currency}
          fragments={[ProductInformationContainer.detailedInformation]}
          render={args => <ProductDetails {...args} />}
          renderLoading={() => <ProductDetails.Skeleton />}
        />
        */}
      </S.Wrapper>
    </>
  );
};

type Props = {
  productId: ProductRef;
  skuId?: ProductRef;
  catalogConfig: CatalogConfig;
};
