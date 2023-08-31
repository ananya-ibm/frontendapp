/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-indent-props, react/jsx-indent */

import React from 'react';
import { OptionCard, FinanceSelector } from '@exo/frontend-components-automotive';
import * as S from './Finance.styles';
import financeOptionsSetUp from './financeOptions.setup';

const FinanceSelection = ({
  priceBreakdown,
  financeSelector,
  setFinanceSelector,
  pcpSelection,
  handlePcpSelection
}: Props) => {
  const financeOptions = financeOptionsSetUp({
    handlePcpSelection,
    priceBreakdown,
    financeSelector,
    setFinanceSelector,
    pcpSelection
  });

  return financeSelector.selectorOption ? (
    <FinanceSelector
      tabId={financeSelector.selectorOption}
      tabs={financeOptions}
      onTabClick={id => setFinanceSelector({ ...financeSelector, selectorOption: id })}
    />
  ) : (
    <S.FinanceOptions>
      {financeOptions.map(option => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <OptionCard key={option.id} {...option}>
          {option.cardContent()}
        </OptionCard>
      ))}
    </S.FinanceOptions>
  );
};

type Props = {
  priceBreakdown: any[];
  financeSelector: any;
  setFinanceSelector: (state: any) => void;
  pcpSelection: any;
  handlePcpSelection: (pcp: any) => void;
};
export default FinanceSelection;
