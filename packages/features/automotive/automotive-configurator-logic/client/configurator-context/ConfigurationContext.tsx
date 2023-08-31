/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/prop-types, react/require-default-props */

import React, { useState, useContext, useEffect } from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useNotificationContext } from '@exo/frontend-common-notification';
import JSONTree from 'react-json-tree';
import { useParams } from 'react-router-dom';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { Button, TextInput } from '@exo/frontend-components-base';
import { useConfigurator } from '../hooks/useConfigurator';
import { mapCategories, mapUpdatedCategories } from './configurationHelper';
import { Category } from '../types';

type ConfigurationStateContextType = {
  categories?: Category[];
  setCategories?: (val: Category[]) => void;
  financeData?: any;
  setFinanceData?: (val: any) => void;
  handleProductSelection?: (product: any) => Promise<void>;
  getItemLoading?: boolean;
  getItemErrror?: any;
};

const ConfiguratorStateContext = React.createContext<ConfigurationStateContextType>({});

export const useConfiguratorContext = () => {
  return useContext(ConfiguratorStateContext);
};

export const ConfiguratorContextProvider = ({ children }) => {
  const eventContext = useEventContext();
  const { type, set, customerConfigurationId } = useSessionContext();
  const { createNotification } = useNotificationContext()!;
  const [categories, setCategories] = useState<any>(null);
  const [financeData, setFinanceData] = useState(null);
  const [customerConfigID, setCustomerConfigID] = useState<string | undefined>(undefined);
  const [handledEvents, setHandledEvents] = useState<any[]>([]);

  const { configurationId } = useParams<{ configurationId: string }>();
  const getCategories = ({ configuredItem }) =>
    configuredItem?.optionCategories &&
    setCategories(mapCategories(configuredItem?.optionCategories));

  const { getConfiguredItem, updateConfigurationItem } = useConfigurator({
    configurationId,
    getCategories
  });

  const { loading, error } = getConfiguredItem();

  const fullEventHistory = eventContext?.getEventHistory() ?? [];

  const handleProductSelection = async product => {
    setCategories(mapUpdatedCategories(product, categories));
    await updateConfigurationItem({
      id: configurationId,
      productCode: product.id,
      selected: !product.isSelected
    });
  };

  useEffect(() => {
    if (customerConfigurationId) {
      eventContext?.createEvent({
        event_code: 'dealer_join'
      });
    }
  }, [customerConfigurationId]);

  useEffect(() => {
    // Sets events as being handled - not sure this is still needed?
    if (fullEventHistory[0]?.event_initiator === 'USER') {
      setHandledEvents([...handledEvents, fullEventHistory[0].id]);
    }
    // Handles product select
    if (fullEventHistory[0]?.event_code === 'product_select') {
      const update = fullEventHistory[0]?.product;
      handleProductSelection(update);
    }
    // If not a dealer and gets a dealer join, dispatch reset event, check type as very slight delay
    if (fullEventHistory[0]?.event_code === 'dealer_join' && type !== 'DEALER') {
      eventContext?.createEvent({
        event_code: 'configurator_reset',
        categories,
        financeData
      });
      createNotification({
        kind: 'success',
        title: 'Dealer has now joined your session'
      });
    }
    // Updates configurator when recieves reset, check type as very slight delay
    if (fullEventHistory[0]?.event_code === 'configurator_reset' && type === 'DEALER') {
      createNotification({
        kind: 'info',
        title: 'Your configurator is now aligned with the customer'
      });
      const categoriesNew = fullEventHistory[0]?.categories;
      const financeDataNew = fullEventHistory[0]?.financeData;
      setCategories(categoriesNew);
      setFinanceData(financeDataNew);
    }
  }, [fullEventHistory]);

  const handleCustomerIDSet = async () => {
    await set({ customerConfigurationId: customerConfigID });
  };

  const handleCustomerIDType = e => setCustomerConfigID(e.target.value);

  const handleBackToCustomer = () => {
    createNotification({
      kind: 'success',
      title: 'You are now in  customer view'
    });
    set({ type: undefined });
  };

  return (
    <ConfiguratorStateContext.Provider
      value={{
        categories,
        setCategories,
        financeData,
        setFinanceData,
        getItemLoading: loading,
        getItemErrror: error,
        handleProductSelection
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>{children}</div>

        {/* TODO: This should really move out of the logic package */}
        {type === 'DEALER' && (
          <div
            style={{
              minWidth: '30rem',
              paddingRight: '2rem'
            }}
          >
            <h2
              style={{
                paddingTop: '2rem',
                paddingBottom: '1rem'
              }}
            >
              Dealer view
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end'
              }}
            >
              <TextInput
                labelText="Enter customer Configurator ID:"
                id="customerConfigurationIdInput"
                type="text"
                onChange={handleCustomerIDType}
                value={customerConfigID ?? ''}
              />
              <Button label="Connect to client" onClick={handleCustomerIDSet} />
            </div>

            <h4
              style={{
                paddingTop: '2rem',
                paddingBottom: '0.7rem'
              }}
            >
              Configurator Status
            </h4>
            <JSONTree data={{ categories, financeData }} />

            <Button
              variant="secondary"
              label="Back to customer view"
              onClick={handleBackToCustomer}
            />
          </div>
        )}
      </div>
    </ConfiguratorStateContext.Provider>
  );
};
