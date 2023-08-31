/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import * as R from 'ramda';

export const slidersSetUp = (values, setValues, totPrice) => [
  {
    key: 'deposit',
    labelText: 'Change your deposit',
    min: 0,
    max: Math.floor((totPrice * 0.3) / 100) * 100,
    step: 1000,
    value: values.deposit,
    onChangeValue: value => setValues({ ...values, deposit: value })
  },
  {
    key: 'annualMileage',
    labelText: 'Change your annual miles',
    min: 1000,
    max: 30000,
    step: 1000,
    value: values.annualMileage,
    onChangeValue: value => setValues({ ...values, annualMileage: value })
  },
  {
    key: 'months',
    labelText: 'Change the length of the contract',
    min: 12,
    max: 48,
    step: 6,
    value: values.months,
    onChangeValue: value => setValues({ ...values, months: value })
  }
];

const pcpValues = {
  annualMileage: 'Annual Mileage',
  apr: 'APR',
  months: 'Length of Contract'
};

const pcpAmounts = {
  deposit: 'Deposit',
  listPrice: 'List Price',
  monthlyRepayment: 'Monthly Repayment',
  totalInterestRepayable: 'Total Interest Repayable',
  totalRepayment: 'Total Repayment'
};

const mapToKeys = (value, key) => {
  if (key === 'apr') return { text: pcpValues[key], value: `${value}%` };
  if (pcpValues[key]) return { text: pcpValues[key], value };
  if (pcpAmounts[key]) return { text: pcpAmounts[key], amount: value };
  return null;
};

export const getPayments = R.pipe(
  R.mapObjIndexed(mapToKeys),
  R.values,
  R.filter(R.pipe(R.isNil, R.not))
);

export const getPcpValues = personalContractPurchase => ({
  priceBreakdown: getPayments(personalContractPurchase),
  monthlyPrice: { ...personalContractPurchase.monthlyRepayment }
});

const pcpSliders = {
  deposit: 'Deposit',
  months: 'Length of Contract',
  annualMileage: 'Annual Mileage'
};


const getValue = slider => priceBreakdown =>
  R.pipe(
    R.find(R.propEq('text', pcpSliders[slider])),
    R.ifElse(R.propEq('text', 'Deposit'), R.path(['amount', 'value']), R.prop('value')),
    val => parseFloat(val)
  )(priceBreakdown);

export const getInitialValue = (pcp, slider) =>
  // @ts-ignore
  R.pipe(R.prop('priceBreakdown'), R.ifElse(R.isEmpty, R.always(null), getValue(slider)))(pcp);
