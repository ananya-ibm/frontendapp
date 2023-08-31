/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as yup from 'yup';
import { Button, LoadingIndicator } from '@exo/frontend-components-base';
import { useCreditCheck } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { removeNull } from '@exo/frontend-common-utils';
import { CreditCheckForm } from '@exo/frontend-components-forms';
import { useMe } from '@exo/frontend-features-account-profile-logic';
import { gql } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';
import * as S from './CreditCheck.styles';
import { CreditCheckDetails } from './CreditCheckDetails';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';

const SCHEMA = yup.object().shape({
  title: yup.string().required('Your title is required'),
  lastName: yup.string().required('Your last name is required'),
  firstName: yup.string().required('Your first name is required'),
  dateOfBirth: yup.string().required('The date of birth is required'),
  amount: yup.number().required().typeError('The amount is required'),
  monthlyAmount: yup.number().required().typeError('The monthly amount is required'),
  term: yup.number().required().typeError('The term is required')
});

const CreditCheck = ({ onNextClick, onBackClick }: Props) => {
  const { data, loading, refetch } = useMe<GQLResponse>({}, CreditCheck.fragment);

  const {
    updateCreditCheckInfo,
    updateCreditCheckFullInfo,
    saveDecisionId,
    creditCheckLoading,
    creditCheckFullLoading
  } = useCreditCheck();
  
  const session = useSessionContext();

  const initialValues = {
    title: data?.me?.defaultAddress.titleCode,
    firstName: data?.me?.defaultAddress.firstName,
    lastName: data?.me?.defaultAddress.lastName,
    dateOfBirth: '01-01-2000',    
    amount: session?.totalRepaymentAmount,
    monthlyAmount: session?.monthlyRepaymentAmount,
    term: session?.term
  };

  useScrollViewportTo(0, 0);

  const onFormSubmit = async (formValues: {
    amount: number;
    monthlyAmount: number;
    term: number;
    firstName: string;
    lastName: string;
    title: string;
    dateOfBirth: string;
  }) => {
    const fullData = removeNull({
      amount: formValues.amount,
      monthlyAmount: formValues.monthlyAmount,
      term: formValues.term,
      customerType: 'CON',
      productType: 'LOAN',
      purpose: 'NEW_CAR',
      productCode: session?.cartId,
      person: {
        forname: formValues.firstName,
        surname: formValues.lastName,
        title: formValues.title,
        dateOfBirth: formValues.dateOfBirth
      }
    });

    if (!data?.me?.creditCheck?.decisionId) {
      // soft credit check request
      fullData.isQuoteFlag = 'NO';
      const {
        data: { creditCheckEligibility }
      } = await updateCreditCheckInfo(fullData);

      await saveDecisionId(creditCheckEligibility?.decisionId);
    } else {
      // full credit check
      fullData.isQuoteFlag = 'YES';
      await updateCreditCheckFullInfo(data?.me?.creditCheck?.decisionId, fullData);
    }

    refetch!();
  };

  return (
    <S.CreditCheck>
      <h2>Please fill in your credit check details</h2>
      <br />
      {(creditCheckLoading || creditCheckFullLoading) && <LoadingIndicator />}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <CreditCheckForm
          onSubmit={onFormSubmit}
          fields={[
            'amount',
            'monthlyAmount',
            'term',
            'title',
            'firstName',
            'lastName',
            'dateOfBirth'
          ]}
          data={initialValues}
          schema={SCHEMA}
          renderFooter={() => <></>}
        >
          <S.ButtonGroup>
            <Button
              type="submit"
              label={data?.me?.creditCheck?.decisionId ? 'Full Credit Check' : 'Soft Credit Check'}
            />
          </S.ButtonGroup>
        </CreditCheckForm>
      )}
      <br />
      {data?.me?.creditCheck?.decisionId && <CreditCheckDetails decision={data?.me?.creditCheck} />}
      <br />

      <S.ButtonGroup>
        <Button variant="secondary" onClick={onBackClick} label="Back" />
        {data?.me?.creditCheck?.decisionStatusText === 'Accept' && (
          <Button type="button" onClick={onNextClick} label="Next" />
        )}
      </S.ButtonGroup>
    </S.CreditCheck>
  );
};

type Props = {
  onBackClick: () => void;
  onNextClick: (data: any) => void;
};

type GQLResponse = {
  defaultAddress: {
    titleCode?: string;
    firstName?: string;
    lastName?: string;
  };
  creditCheck: {
    decisionId?: string;
    decisionStatusText?: string;
    applicationDate?: string;
    applicationTime?: string;
  };
};

CreditCheck.fragment = gql`
  fragment CreditCheck on CusMe {
    defaultAddress {
      titleCode
      firstName
      lastName
    }
    creditCheck {
      decisionId
      decisionStatusText
      applicationDate
      applicationTime
    }
  }
`;

export default CreditCheck;
