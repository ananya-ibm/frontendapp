/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const formatMoney = (amount: number | string, currency?: string, format?: string) => {
  const amt = Number(amount);
  const options = {
    style: 'currency',
    currency: currency || 'GBP',
    minimumFractionDigits: 2
  };
  const intl = format || 'en-GB';
  // if its a whole, dollar amount, leave off the .00
  if (Math.ceil(amt) === Math.floor(amt)) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat(intl, options);
  return formatter.format(amt);
};
