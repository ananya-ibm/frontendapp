/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { PriceBar, TrimPriceBar, AcknowledgeModal } from '@exo/frontend-components-automotive';
import * as S from './ConfiguratorEntryBar.styles';

export const ConfiguratorEntryBar = ({
  productType,
  productWithFinance,
  handleTrimConfigure,
  updateTrim,
  handleDerivativeConfigure,
  handleAddToCart,
  formattedPrice,
  financedPrice,
  financeModalTitle,
  financeModalMonthlyPrice,
  children,
  setDisplayAvaliabilityModal
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const isTrim = productType === 'Trim' || productType === 'sku';
  const isDerivative = productType === 'Derivative' || productType === 'product';

  return (
    <>
      {isTrim ? (
        <S.TrimPriceBar>
          <TrimPriceBar
            product={productWithFinance}
            handleConfigure={handleTrimConfigure}
            updateTrim={updateTrim}
            financeLinkText="See finance example"
            openModal={() => setOpenModal(true)}
            testDriveOnClick={() => setDisplayAvaliabilityModal(true)}
          />
          {children}
        </S.TrimPriceBar>
      ) : (
        <S.PriceBar>
          <PriceBar
            addToCartText={isDerivative ? 'Configure' : 'Add to cart'}
            addToCartClick={isDerivative ? handleDerivativeConfigure : handleAddToCart}
            financeLinkText="See finance example"
            testDriveText="Book test drive"
            testDriveOnClick={() => setDisplayAvaliabilityModal(true)}
            price={formattedPrice}
            subscriptionCost={financedPrice}
            openModal={() => setOpenModal(true)}
          />
          {children}
        </S.PriceBar>
      )}
      <AcknowledgeModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        okBtnClick={() => setOpenModal(false)}
        okBtnText="Ok"
        title={financeModalTitle ?? 'Finance'}
        monthlyPrice={financeModalMonthlyPrice}
      />
    </>
  );
};

type Props = {
  productType: string;
  productWithFinance: any;
  handleTrimConfigure: () => void;
  updateTrim: (index: any) => void;
  setDisplayAvaliabilityModal: (val: boolean) => void;
  handleDerivativeConfigure: () => void;
  handleAddToCart: () => void;
  formattedPrice?: any;
  financedPrice?: any;
  financeModalTitle?: string;
  financeModalMonthlyPrice?: any;
  children: React.ReactNode;
};

export default ConfiguratorEntryBar;
