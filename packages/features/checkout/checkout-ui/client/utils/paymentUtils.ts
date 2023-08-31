/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const isCardPayment = paymentMethod => {
  return ['VISA', 'AMEX', 'credit-card', 'Master Card'].includes(paymentMethod);
};

export const isOfflinePayment = paymentMethod => {
  return ['COD', 'checkmo', 'cashondelivery', 'banktransfer', 'advance'].includes(paymentMethod);
};
