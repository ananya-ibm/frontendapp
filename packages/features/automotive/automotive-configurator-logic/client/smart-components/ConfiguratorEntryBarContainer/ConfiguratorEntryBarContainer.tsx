/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useProduct } from '@exo/frontend-features-catalog-logic';
import {
  useCartModification,
  useFinance
} from '@exo/frontend-features-automotive-cart-automotive-logic';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { renderDefaultError, SmartComponentProps } from '@exo/frontend-common-utils';
import { useConfigurator } from '../../hooks/useConfigurator';

// TODO: Should change to productId: ProductRef
type Props = SmartComponentProps<{
  productId: string;
  render: (props: ConfiguratorEntryBarContainerRenderProps) => JSX.Element;
}>;

type Price = {
  value?: string;
  currency?: string;
  rate?: string;
};

export type ConfiguratorEntryBarContainerRenderProps = {
  productType: string;
  productWithFinance: any;
  handleTrimConfigure: () => void;
  updateTrim: (index: any) => void;
  selectedTrimId: string;
  handleDerivativeConfigure: () => Promise<any>;
  handleAddToCart: () => void;
  formattedPrice?: Price;
  financedPrice?: Price;
  financeModalTitle?: string;
  financeModalMonthlyPrice?: Price;
  setDisplayAvaliabilityModal: (b: boolean) => void;
  displayAvaliabilityModal: boolean;
};

export const ConfiguratorEntryBarContainer = ({
  productId,
  renderLoading = () => <LoadingIndicator />,
  render,
  renderError = renderDefaultError
}: Props) => {
  const cart = useCartModification();
  const session = useSessionContext();
  const history = useHistory();
  const finance = useFinance();
  const [selectedTrim, setSelectedTrim] = useState(0);
  const [displayAvaliabilityModal, setDisplayAvaliabilityModal] = useState(false);
  const [financeData, setFinanceData] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<string | undefined>('25000');

  const { loading, data, error } = useProduct<ConfiguratorType>(
    { productId },
    ConfiguratorEntryBarContainer.fragment
  );

  const handleCreateConfiguredItem = ({ configuredItemCreate }) => {
    session.set({
      cartId: configuredItemCreate.cartId,
      configurationId: configuredItemCreate.id
    });

    history.push(
      `/automotive/${configuredItemCreate.baseProduct?.partnumber}/configuration/${configuredItemCreate.id}`
    );
  };

  const handleErrorCreateConfiguredItem = (err: any) =>
    console.log('createConfigurationItem error', err);

  const { handleConfigure, handleConfigureLoading } = useConfigurator({
    handleCompleteCreate: handleCreateConfiguredItem,
    handleErrorCreate: handleErrorCreateConfiguredItem,
    productId
  });

  const handleTrimConfigure = () => {
    const selectedDerivative =
      data?.product?.children &&
      !!data?.product?.children.length &&
      data?.product?.children[selectedTrim];

    if (!selectedDerivative) {
      // eslint-disable-next-line no-console
      console.log('handleTrimConfigure: Failed to create configuration');
    } else {
      handleConfigure({
        variables: {
          partnumber: selectedDerivative.partnumber,
          currency: session.currency
        }
      });
    }
  };

  const handleDerivativeConfigure = () =>
    handleConfigure({
      variables: {
        partnumber: productId
      }
    });

  if (loading || handleConfigureLoading) return renderLoading();
  if (error) return renderError(error);
  if (!data) return renderLoading();

  const addToCart = () => {
    if (data.product.type === 'bundleOfSkus') {
      cart
        .add(
          data.product.children.map(c => ({
            id: c.id,
            quantity: 1
          }))
        )
        .then(() => history.push('/cart/cart'));
    } else {
      cart.add([{ id: data.product.id, quantity: 1 }]).then(() => history.push('/cart/cart'));
    }
  };

  // Price not returned from backend, so hardcoding as workaround
  const formattedPrice =
    data.product.price && data.product.price.list
      ? {
          value: data.product.price.list.value,
          currency: data.product.price.list.currency
        }
      : {
          value: '25000',
          currency: 'GBP',
          rate: 'Purchase Price'
        };

  // stores pcpId in the session
  // TO-DO months value generated from pcp term value
  const getPcp = (listPrice, idx) => {
    finance
      .createPcp({
        months: parseInt(process.env.MONTHLY_DIVISOR! ?? '24', 10),
        listPrice: parseFloat(listPrice),
        deposit: 2500,
        annualMileage: 1000,
        currency: session.currency || 'GBP'
      })
      .then(async () => {
        const { data: configFinanceData, error: configFinanceError } = await finance.getPcp();
        /*if (configFinanceError)
          // eslint-disable-next-line no-console
          console.error(`Error getting product hero finance: ${configFinanceError}`);
        if (typeof configFinanceData?.personalContractPurchase === 'undefined')
          // eslint-disable-next-line no-console
          console.error(
            `Error getting product hero personalContractPurchase: ${configFinanceData}`
          );*/
        if (!configFinanceError && configFinanceData?.personalContractPurchase) {
          const newFinance = financeData;
          newFinance[idx] = configFinanceData.personalContractPurchase;
          setFinanceData(newFinance);
        }
      })
      // eslint-disable-next-line no-console
  };

  if (formattedPrice.value !== totalPrice) {
    setTotalPrice(formattedPrice.value);
    data.product.children.forEach((item, idx) => getPcp(item.price!.list!.value, idx));
  }

  const addFinanced = product => {
    return {
      ...product,
      children: product.children.map((child, idx) => {
        return {
          ...child,
          financedPrice: {
            value: financeData[idx]?.monthlyRepayment?.value || '250',
            currency: financeData[idx]?.monthlyRepayment?.currency || 'GBP',
            rate: '/m'
          }
        };
      })
    };
  };
  // Finance price not done, so hardcoding
  const financedPrice = {
    value: '250',
    currency: 'GBP',
    rate: '/m'
  };

  const updateTrim = index => {
    setSelectedTrim(index);
  };

  const productType = data?.product?.type;
  const finalFinancePrice = {
    financedPrice: {
      prefix: 'From ',
      value: financeData[selectedTrim]?.monthlyRepayment?.value || '250',
      currency: financeData[selectedTrim]?.monthlyRepayment?.currency || 'GBP',
      rate: ' per month'
    }
  };

  return render({
    productType,
    productWithFinance: addFinanced(data.product),
    handleTrimConfigure,
    updateTrim,
    selectedTrimId: data?.product?.children[selectedTrim]?.partnumber || data.product.id,
    handleDerivativeConfigure,
    handleAddToCart: addToCart,
    formattedPrice,
    financedPrice,
    financeModalTitle: data.product.children.length
      ? data.product.children[selectedTrim].name
      : data.product.name,
    financeModalMonthlyPrice: data.product.children.length
      ? finalFinancePrice.financedPrice
      : financedPrice,
    setDisplayAvaliabilityModal,
    displayAvaliabilityModal
  });
};

type ConfiguratorType = {
  type: string;
  id: string;
  fullImage?: string;
  name?: string;
  description?: string;
  longDescription?: string;
  thumbnail?: string;
  attributes?: {
    id?: string;
    name?: string;
    value: {
      id?: string;
      value?: string;
    };
  }[];
  children: {
    id?: string;
    name?: string;
    type?: string;
    fullImage?: string;
    description?: string;
    longDescription?: string;
    thumbnail?: string;
    attributes?: {
      id?: string;
      name?: string;
      value?: {
        id?: string;
        value?: string;
      };
    }[];
    partnumber?: string;
    price?: {
      list?: {
        value?: string;
        currency?: string;
      };
    };
  }[];
  parentCategory?: {
    identifier?: string;
    id?: string;
    name?: string;
  };
  partnumber?: string;
  price?: {
    list?: {
      value?: string;
      currency?: string;
    };
  };
};

ConfiguratorEntryBarContainer.fragment = gql`
  fragment ConfiguratorEntryBar on PrdItem {
    type
    id
    fullImage
    # subscriptionCost
    name
    description
    longDescription
    thumbnail
    attributes {
      id
      name
      value {
        id
        value
      }
    }
    children {
      id
      name
      type
      fullImage
      # subscriptionCost
      description
      longDescription
      thumbnail
      attributes {
        id
        name
        value {
          id
          value
        }
      }
      partnumber
      price {
        list {
          value
          currency
        }
      }
    }
    parentCategory {
      identifier
      id
      name
    }
    partnumber
    price {
      list {
        value
        currency
      }
    }
  }
`;
