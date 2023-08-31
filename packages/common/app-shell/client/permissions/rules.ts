/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const rules = {
  b2badmin: {
    static: [
      'approval-dashboard',
      'budgets',
      'cost-centers',
      'account-summary',
      'support-tickets',
      'units',
      'users',
      'user-groups',
      'permissions',
      'quick-order',
      'my-organization'
    ]
  },
  b2bapprover: {
    static: ['approval-dashboard', 'support-tickets', 'quick-order', 'my-organization']
  },
  b2buser: {
    static: ['support-tickets', 'quick-order', 'my-organization']
  },
  b2bmanager: {
    static: ['quick-order', 'my-organization']
  },
  user: {
    static: [
      'profile',
      'details',
      'orders',
      'security',
      'preferences',
      'payment',
      'stores',
      'store-info',
      'store-orders',
      'shipping',
      'addresses',
      'products',
      'auto-profile',
      'vehicle',
      'auto-orders',
      'configurations',
      'messages',
      'subscriptions',
      'payments',
      'lease',
      'documents',
      'dealer',

      // TODO: Temporary only
      'approval-dashboard',
      'budgets',
      'cost-centers',
      'account-summary',
      'support-tickets',
      'units',
      'users',
      'user-groups',
      'permissions',
      'quick-order',
      'my-organization'
    ]
  },

  // TODO: This is needed for backwards compatibility. Should be removed by end of october 2020
  customer: {
    static: [
      'profile',
      'details',
      'orders',
      'security',
      'preferences',
      'payment',
      'stores',

      // TODO: Temporary only
      'approval-dashboard',
      'budgets',
      'cost-centers',
      'account-summary',
      'support-tickets',
      'units',
      'users',
      'user-groups',
      'permissions',
      'quick-order',
      'my-organization',

      // TODO: Shouldn't addresses be part of the user scope as well
      'addresses',
      'store-info',
      'store-orders',
      'shipping',
      'products',
      'auto-profile',
      'vehicle',
      'auto-orders',
      'configurations',
      'messages',
      'subscriptions',
      'payments',
      'lease',
      'documents'
    ]
  }
};
