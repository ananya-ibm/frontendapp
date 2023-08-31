/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-indent-props, react/jsx-indent */

import React, { useState, useEffect } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { EmptyFinance, FinanceContract } from '@exo/frontend-components-automotive';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useFinance } from '@exo/frontend-features-automotive-cart-automotive-logic';
import * as S from './Finance.styles';
import FinanceSelection from './FinanceSelection';
import { getPcpValues } from '../../utilities/Pcp.setup';

const Finance = ({ priceBreakdown, financeSelector, setFinanceSelector }: Props) => {
  const [pcpSelection, setPcpSelection] = useState<any>({
    selectedFinanceOption: 'Personal Contract Purchase',
    termsLink: '#',
    priceBreakdown: [],
    monthlyPrice: null
  });

  const session = useSessionContext();
  const finance = useFinance();

  const { data, loading, error } = finance.getPcp();

  useEffect(() => {
    if (!data || !data.personalContractPurchase) return;
    setPcpSelection({
      ...pcpSelection,
      ...getPcpValues(data.personalContractPurchase)
    });
  }, [data]);

  const handlePcpSelection = pcp => {
    session.set({ 
      ...session, 
      personalContractPurchase: pcp.id, 
      totalRepaymentAmount: Math.round(pcp.totalRepayment.value),
      monthlyRepaymentAmount: Math.round(pcp.monthlyRepayment.value),
      term: pcp.months  
    });
    setPcpSelection({
      ...pcpSelection,
      ...getPcpValues(pcp)
    });
  };

  if (financeSelector.isOpen)
    return (
      <FinanceSelection
        priceBreakdown={priceBreakdown}
        financeSelector={financeSelector}
        setFinanceSelector={setFinanceSelector}
        pcpSelection={pcpSelection}
        handlePcpSelection={handlePcpSelection}
      />
    );

  const financeContractProps =
    financeSelector?.financeOption === 'PERSONAL_CONTRACT_PURCHASE'
      ? pcpSelection
      : {
          selectedFinanceOption: 'Cash (Self-funding)',
          totalPrice: priceBreakdown[priceBreakdown.length - 1].amount,
          termsLink: '#'
        };

  const openFinanceSelector = () => setFinanceSelector({ ...financeSelector, isOpen: true });

  return financeSelector.hasFinance ? (
    <S.SelectedFinanceOption>
      <S.Title>Your finance option</S.Title>
      <Button variant="link" label="Edit finance option" onClick={openFinanceSelector} />
      {error || loading ? (
        <div>
          <LayoutSpacing size="sm" />
          Loading...
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FinanceContract {...financeContractProps} />
      )}
    </S.SelectedFinanceOption>
  ) : (
    <EmptyFinance
      chooseFinanceText="Choose Your Finance"
      onClickChooseFinance={openFinanceSelector}
      text="You have no finance option selected at the moment"
    />
  );
};

type FinanceSelector = {
  financeOption?: string;
  hasFinance?: boolean;
  isOpen?: boolean;
  selectorOption?: string;
};

type Props = {
  priceBreakdown: {
    amount: {
      value: string;
      currency: string;
    };
    text?: string;
  }[];
  financeSelector: FinanceSelector;
  setFinanceSelector: (state: FinanceSelector) => void;
};

export default Finance;
