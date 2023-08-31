/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useBudgetModification } from './hooks/useBudgetModification';
import { useCheckout } from './hooks/useCheckout';
import { usePayment } from './hooks/usePayment';
import { useCartModification } from './hooks/useCartModification';
import { useAvailability } from './hooks/useAvailability';
import { useCart } from './hooks/useCart';
import { useCarts } from './hooks/useCarts';
import { useFinance } from './hooks/useFinance';
import { useTradeIn } from './hooks/useTradeIn';
import { MiniCart } from './extensions/MiniCart';
import { MiniCartPresentation } from './components/MiniCartPresentation';
import { useCreditCheck, useCreditCheckDetails } from './hooks/useCreditCheck';

declare global {
  interface EXOSession {
    budget?: any;
    financeOption?: any;
    personalContractPurchase?: string;
    totalRepaymentAmount?: any;
    monthlyRepaymentAmount?: any;
    term?: any;
    tradeInId?: string;
  }
}

export {
  MiniCart as MiniCartExt,
  MiniCartPresentation,
  useBudgetModification,
  useCart,
  useCartModification,
  useCheckout,
  useCarts,
  useFinance,
  usePayment,
  useTradeIn,
  useAvailability,
  useCreditCheck,
  useCreditCheckDetails
};
