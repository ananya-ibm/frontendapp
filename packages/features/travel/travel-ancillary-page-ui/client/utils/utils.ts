/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { UserFollow, BaggageClaim, StarReview, Hotel, Cafe } from '@carbon/react/icons';

export const iconChoose = (name: string) => {
  switch (name) {
    case 'Priority boarding':
      return UserFollow;
    case 'Carryon bag':
      return BaggageClaim;
    case 'Cabin bag':
      return BaggageClaim;
    case '20kg check-in bag':
      return BaggageClaim;
    case 'Avios upgrade and extra payment options':
      return StarReview;
    case 'Lounge access':
      return Cafe;
    case 'Hotel stay':
      return Hotel;
  }
};

// TODO - use currency adapter
export const currencyMap = {
  EUR: '€'
};