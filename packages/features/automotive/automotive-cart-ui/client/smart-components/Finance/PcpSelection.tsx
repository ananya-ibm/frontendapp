/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-indent-props, react/jsx-indent */

import React, { useState } from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { Link } from '@exo/frontend-common-link';
import { MonetaryAmount, PriceTable, LayoutSpacing } from '@exo/frontend-components-core';
import { Range } from '@exo/frontend-components-forms';
import { Button } from '@exo/frontend-components-base';
import { useFinance } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { slidersSetUp, getInitialValue } from '../../utilities/Pcp.setup';
import * as S from './Finance.styles';

const PcpSelection = ({ totPrice, pcpSelection, handlePcpSelection }: Props) => {
  const sessionContext = useSessionContext();
  const userBudget = sessionContext?.budget;
  const [values, setValues] = useState({
    deposit: userBudget?.deposit || getInitialValue(pcpSelection, 'deposit') || 0,
    annualMileage:
      userBudget?.annualMileage || getInitialValue(pcpSelection, 'annualMileage') || 10000,
    months: userBudget?.term || getInitialValue(pcpSelection, 'months') || 36
  });
  const [pcpError, setPcpError] = useState<any>(null);

  const termsLink = '#';

  const PcpSliders = slidersSetUp(values, setValues, totPrice);
  const finance = useFinance();

  const handleApplyChanges = async () => {
    const { data, errors } = await finance.createPcp({
      ...values,
      listPrice: totPrice
    });
    if (errors) {
      // eslint-disable-next-line no-console
      console.log('createPcp Error', errors);
      setPcpError(errors);
    }

    if (data?.personalContractPurchaseCreate) {
      handlePcpSelection(data.personalContractPurchaseCreate);
    }
  };

  return (
    <S.TabContent>
      <S.Title>Personal Contract Purchase (PCP)</S.Title>
      <LayoutSpacing size="sm" />
      {PcpSliders.map(slider => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Range {...slider} />
      ))}
      <LayoutSpacing size="sm" />
      <Button onClick={handleApplyChanges} label="Apply Changes" />
      <S.Terms>
        <Link href={termsLink}>Terms and conditions</Link>
      </S.Terms>
      {pcpError && (
        <div>
          <LayoutSpacing size="sm" />
          Error: {pcpError}
        </div>
      )}
      {!pcpSelection ? (
        <div>
          <LayoutSpacing size="sm" />
          Loading...
        </div>
      ) : (
        <>
          <LayoutSpacing size="sm" />
          {pcpSelection.monthlyPrice && (
            <S.Title unbold>
              Monthly Price:{' '}
              <S.CashPrice>
                <MonetaryAmount
                  value={pcpSelection.monthlyPrice.value}
                  currency={pcpSelection.monthlyPrice.currency}
                  rate="/month"
                />
              </S.CashPrice>
            </S.Title>
          )}
          <LayoutSpacing size="sm" />
          <PriceTable priceBreakdown={pcpSelection.priceBreakdown} />
        </>
      )}
    </S.TabContent>
  );
};

type Props = {
  totPrice: number;
  pcpSelection: {
    monthlyPrice: {
      value: string;
      currency: string;
    };
    priceBreakdown: {
      text: string;
      amount: {
        currency: string;
        value: string;
      };
    }[];
  };
  handlePcpSelection: (pcp: any) => void;
};

export default PcpSelection;
