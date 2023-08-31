/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-indent, react/jsx-indent-props */

import React from 'react';
import { ChevronDown } from '@carbon/react/icons';
import PcpSelection from './PcpSelection';
import CashPayment from './CashPayment';
import * as S from './Finance.styles';

const otherFinancialOptions = [
  { id: 'personalContractHire', label: 'Personal Contract Hire' },
  { id: 'businessContractHire', label: 'Business Contract Hire' },
  { id: 'lease', label: 'Lease' }
];

const financeOptions = ({
  priceBreakdown,
  financeSelector,
  setFinanceSelector,
  pcpSelection,
  handlePcpSelection
}) => [
  {
    id: 'PERSONAL_CONTRACT_PURCHASE',
    title: 'Personal Contract Purchase',
    cardContent: () => (
      <p>
        Personal Contract Purchse gives you the chance to change your car more often. By deferring
        part og the cost to the end it means that you can reduce the length of your agreement, and
        at the end you have the flexibility to keep, exchange or return your vehicle.
      </p>
    ),
    onClick: () =>
      setFinanceSelector({
        ...financeSelector,
        selectorOption: 'PERSONAL_CONTRACT_PURCHASE'
      }),
    onMoreClick: () => {},
    label: 'Personal Contract Purchase',
    content: (
      <PcpSelection
        handlePcpSelection={handlePcpSelection}
        pcpSelection={pcpSelection}
        totPrice={priceBreakdown[priceBreakdown.length - 1].amount.value}
      />
    )
  },
  {
    id: 'CASH',
    title: 'Cash Purchase (Self-funding)',
    cardContent: () => (
      <p>
        The Cash option allows you to fund your new car yourself without the help of a finance plan.
      </p>
    ),
    onClick: () => setFinanceSelector({ ...financeSelector, selectorOption: 'CASH' }),
    onMoreClick: () => {},
    label: 'Cash Purchase (Self-funding)',
    content: <CashPayment priceBreakdown={priceBreakdown} />
  },
  {
    id: 'OTHER',
    title: 'Other Financial Options',
    cardContent: () => (
      <S.Options>
        {otherFinancialOptions.map(option => (
          <S.Option key={option.id}>
            {option.label}
            <ChevronDown size={16} />
          </S.Option>
        ))}
      </S.Options>
    ),
    label: 'Other Financial Options',
    content: <div>Other Financial Options tab content</div>
  }
];

export default financeOptions;
