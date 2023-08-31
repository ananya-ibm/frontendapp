/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// TODO: Split this into two pacakges - one for admin and one for storefront

export * from './hooks/useProductModifications';
export * from './hooks/useStore';
export * from './hooks/useStores';
export * from './hooks/useStoreModifications';

export * from './smart-components/ManageStoreContainer/ManageStoreContainer';
export * from './smart-components/ManageProductsContainer/ManageProductsContainer';
export * from './smart-components/ManageShippingContainer/ManageShippingContainer';
export * from './smart-components/ManageOrdersContainer/ManageOrdersContainer';

export * from './smart-components/StoresContainer/StoresContainer';
export * from './smart-components/StoreContainer/StoreContainer';
export * from './smart-components/StoreProductsContainer/StoreProductsContainer';

declare global {
  interface EXOSession {
    marketplaceStoreId?: string;
  }
}
