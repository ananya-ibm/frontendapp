/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export * from './configurator-context/ConfigurationContext';
export * from './smart-components/ConfiguratorEntryBarContainer/ConfiguratorEntryBarContainer';
export * from './hooks/useConfigurator';
export * from './types';

export { mapCategories } from './configurator-context/configurationHelper';

declare global {
  interface EXOSession {
    configurationId?: string;

    // TODO: Are we actually using both of these?
    customerConfigurationId?: string;
  }
}
