/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Configurator } from '@exo/frontend-components-automotive';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { format, addMonths } from 'date-fns';
import { useFinance } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  ConfiguredItemResponse,
  mapCategories,
  useConfigurator,
  useConfiguratorContext
} from '@exo/frontend-features-automotive-configurator-logic';
import { getPriceBreakDown, getSummarySelections, getTotPrice } from './configurationHelper';
import { useNotificationContext } from '@exo/frontend-common-notification';
import * as S from './ConfiguratorHero.styles';

export const ConfiguratorHero = ({useVR} : Props) => {
  const { createNotification } = useNotificationContext()!;
  const [baseTotalPrice, setBaseTotalPrice] = useState<string | undefined>('25000');
  const history = useHistory();
  const {
    categories,
    setCategories,
    financeData,
    setFinanceData,
    handleProductSelection,
    getItemLoading
  } = useConfiguratorContext();

  const getCategories = (res: ConfiguredItemResponse) =>
    res.configuredItem?.optionCategories &&
    setCategories!(mapCategories(res.configuredItem?.optionCategories));

  // TODO: Move this to a prop
  // @ts-ignore
  const { configurationId } = useParams();

  const { getConfiguredItem, saveConfiguration, isSaving } = useConfigurator({
    configurationId,
    getCategories
  });

  const { loading, error, data } = getConfiguredItem();

  const finance = useFinance();
  const session = useSessionContext();

  if (loading || !categories) return <div>loading...</div>;
  if (error) return <div>Error! {JSON.stringify(error)}</div>;

  console.assert(data);

  const { baseProduct } = data!.configuredItem;

  const priceBreakdown = getPriceBreakDown(categories);

  const totalPrice = baseProduct &&
    baseProduct.price && {
      // TODO: Change to default currency here
      currency: baseProduct.price?.list?.currency ?? 'GBP',
      value: getTotPrice(baseProduct.price?.list?.value, priceBreakdown) ?? '0.00'
    };
    
    // TO-DO months value generated from pcp term value
  const getPcp = async listPrice => {
    const res = await finance.createPcp({
      months: parseInt(process.env.MONTHLY_DIVISOR ?? '24', 10),
      listPrice: parseFloat(listPrice),
      deposit: 2500,
      annualMileage: 1000,
      currency: session.currency || 'GBP'
    });

    const { data: configFinanceData } = res;
    if (configFinanceData?.personalContractPurchaseCreate) {
      setFinanceData!(configFinanceData.personalContractPurchaseCreate);
    }
  };

  // TODO: Move to useEffect instead
  if (totalPrice?.value !== baseTotalPrice) {
    setBaseTotalPrice(totalPrice?.value);
    getPcp(totalPrice?.value);
  }

  const monthlyRepayment = financeData?.monthlyRepayment;

  // harcoded for demo except total price and subscriptionCost
  const priceBar = {
    addToCartText: 'Go to Cart',
    addToCartClick: () => {return history.push('/cart/cart')},
    financeLinkText: 'Calculate Finance',
    financeUrl: '/cart/customize',
    price: totalPrice,
    subscriptionCost: {
      value: monthlyRepayment?.value || '300',
      currency: monthlyRepayment?.currency || 'GBP',
      rate: '/month'
    },
    testDriveText: 'Book Test Drive',
    testDriveOnClick: () => {}
  };

  const handleSave = async () => {
    if (!session || session.type !== 'USER') return history.push('/account-profile/login');

    await saveConfiguration(configurationId);
    createNotification({
          kind: 'success',
          title: 'Your configuration has been saved'
        });
    return;
  };

  return (
    <>
      {getItemLoading && <LoadingIndicator />}
      <S.ConfiguratorHero>
        <Configurator
          useVR={useVR}
          priceBar={priceBar}
          categories={categories}
          onBackButtonClick={history.goBack}
          handleProductSelection={handleProductSelection}
          configuratorSummary={
            baseProduct
              ? {
                  summaryText: baseProduct.longDescription || baseProduct.description,
                  deliveryDate: format(addMonths(new Date(), 1), 'MMMM yyyy'),
                  configurationCode: data!.configuredItem && data!.configuredItem.id,
                  priceBreakdown:
                    baseProduct && priceBreakdown
                      ? [
                          {
                            text: 'Base Price',
                            amount: {
                              currency: baseProduct.price?.list?.currency,
                              value: baseProduct.price?.list?.value
                            }
                          },
                          ...priceBreakdown,
                          {
                            text: 'Total Price',
                            amount: totalPrice
                          }
                        ]
                      : [],
                  onSaveConfiguration: handleSave,
                  isSaving,
                  summarySelections:
                    categories && !!categories.length ? getSummarySelections(categories) : []
                }
              : undefined
          }
          configurationID={session.type !== 'DEALER' ? configurationId : null}
        />
      </S.ConfiguratorHero>
    </>
  );
};

export default ConfiguratorHero;

type Props = {
  useVR?: boolean; 
};