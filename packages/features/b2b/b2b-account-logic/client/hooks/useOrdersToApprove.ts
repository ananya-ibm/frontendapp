/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const useOrdersToApprove = () => {
  // Get user role & permit fn to check they can approve/reject

  // approve order

  // reject order

  // get all orders by organization that require approval

  return {
    updateOrder: updates => {
      // eslint-disable-next-line no-console
      console.log('status ', updates.status);
    },
    getOrder: id => ({
      id,
      date: '01/01/20',
      user: 'Anthony Lombardi',
      total: '100£',
      status: 'approved'
    }),
    getOrders: () => [
      {
        id: '1',
        user: 'Anthony Lombardi',
        date: '01/01/20',
        status: 'open'
      },
      {
        id: '2',
        user: 'Lars Bauer',
        date: '01/01/20',
        status: 'approved'
      },
      {
        id: '3',
        user: 'Lars Bauer',
        date: '01/01/20',
        status: 'rejected'
      },
      {
        id: '4',
        user: 'Lars Bauer',
        date: '01/01/20',
        status: 'complete'
      }
    ]
  };
};
