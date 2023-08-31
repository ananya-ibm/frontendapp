/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Dropdown, Slider, Button } from '@exo/frontend-components-base';
import { OptionsGroup } from '../OptionsGroup/OptionsGroup';
import * as S from './BudgetCalculator.styles';

export const STEP_TYPE = {
  BUTTONS: 'BUTTONS',
  DROPDOWN: 'DROPDOWN',
  SLIDER: 'SLIDER'
};

export const BUDGET_TYPE = { UPFRONT: 'UPFRONT', MONTHLY: 'MONTHLY' };

const onClickStep = (idx, fn) => () => fn(idx + 1);

type Item = {
  selectedItem: {
    id: string;
  };
};

export const BudgetCalculator = ({
  title,
  steps,
  nextBtnLabel,
  savePreferenceLabel,
  onSave = () => {},
  browseCarsLabel,
  onBrowse = () => {},
  budget = { type: 'MONTHLY' }
}: Props) => {
  // currentStep decides which next button should be shown. Initial is no step(0)
  const [currentStep, setCurrentStep] = useState(0);
  // budgetType descides which budget type is selected. Default is Monthly(1)
  const [budgetType, setBudgetType] = useState(1);
  // payment saves the payment dropdown value.
  const [payment, setPayment] = useState<Item | null>(null);

  const onSelectBudgetType = idx => {
    setBudgetType(idx);
    if (currentStep > 0) {
      setCurrentStep(0);
      setPayment(null);
    }
  };

  const onSelectPayment = item => {
    setPayment(item);
    if (currentStep > 1) {
      setCurrentStep(1);
    }
  };

  const [sliderValues, setSliderValues] = useState({
    '0':  3000,
    '1':  10000,
    '2':  36 
  });
  const onClickSlider = idx => value => {
    setSliderValues({ ...sliderValues, [`${idx}`]: value });
    if (currentStep > 2) {
      setCurrentStep(2);
    }
  };

  // TODO: https://jsw.ibm.com/browse/IXCOM-281
  const onTradeIn = () => {};
  const [step3Idx, setStep3Idx] = useState(0);
  const onSelectStep3 = idx => {
    setStep3Idx(idx);
    if (idx === 1) {
      onTradeIn();
    }
  };

  const upfrontValue = budgetType === 1 ? 0 : parseInt(payment?.selectedItem?.id ?? '0', 10);
  const monthlyValue = budgetType === 0 ? 0 : parseInt(payment?.selectedItem?.id ?? '0', 10);

  const selectedBudget = {
    id: budget.id,
    maxUpfrontPayment: upfrontValue,
    maxMonthlyPayment: monthlyValue,
    term: budgetType === 1 ? sliderValues['2'] || 36 : 0,
    type: budgetType === 1 ? BUDGET_TYPE.MONTHLY : BUDGET_TYPE.UPFRONT,
    deposit: budgetType === 1 ? sliderValues['0'] || 0 : 0,
    annualMileage: budgetType === 1 ? sliderValues['1'] || 10000 : 0
    //check these values
  };

  const onSavePreference = () => {
    onSave(selectedBudget);
  };

  const onBrowseCars = () => {
    onBrowse(selectedBudget);
  };

  return (
    <S.BudgetCalculator>
      <h2>{title}</h2>
      {steps[0] && (
        <S.Section>
          <S.BoldText>{steps[0].title}</S.BoldText>
          <S.Content>
            <S.Options>
              {steps[0].type === STEP_TYPE.BUTTONS && (
                <OptionsGroup
                  name={steps[0].title}
                  options={steps[0].options}
                  selectedIdx={budgetType}
                  onSelect={onSelectBudgetType}
                />
              )}
            </S.Options>
            {budgetType != null && currentStep === 0 && (
              <S.NextButton>
                <Button label={nextBtnLabel} onClick={onClickStep(0, setCurrentStep)} />
              </S.NextButton>
            )}
          </S.Content>
        </S.Section>
      )}
      {steps[1] && currentStep >= 1 && (
        <S.Section>
          <S.BoldText>{steps[1].title}</S.BoldText>
          <S.Content>
            <S.Options>
              {steps[1].type === STEP_TYPE.DROPDOWN && (
                <Dropdown
                  labelText={steps[1].label[budgetType]}
                  id={steps[1].label[budgetType]}
                  dropdownLabel={steps[1].label[budgetType]}
                  items={steps[1].options[budgetType]}
                  onChange={onSelectPayment}
                />
              )}
            </S.Options>
            {payment != null && currentStep === 1 && (
              <S.NextButton>
                <Button label={nextBtnLabel} onClick={onClickStep(1, setCurrentStep)} />
              </S.NextButton>
            )}
          </S.Content>
        </S.Section>
      )}
      {steps[2] && currentStep >= 2 && budgetType === 1 && (
        <S.Section>
          <S.BoldText>{steps[2].title}</S.BoldText>
          <S.Content>
            <S.Options>
              {steps[2].type === STEP_TYPE.SLIDER &&
                steps[2].options.map((option, idx) => (
                  <Slider
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${option.label}-${idx}`}
                    labelText={option.label}
                    min={option.min}
                    max={option.max}
                    step={option.step}
                    value={option.value}
                    onChange={onClickSlider(idx)}
                  />
                ))}
            </S.Options>
            {currentStep === 2 && (
              <S.NextButton>
                <Button label={nextBtnLabel} onClick={onClickStep(2, setCurrentStep)} />
              </S.NextButton>
            )}
          </S.Content>
        </S.Section>
      )}
      {steps[3] && currentStep >= (budgetType === 1 ? 3 : 2) && (
        <S.Section>
          <S.BoldText>{steps[3].title}</S.BoldText>
          <S.Content>
            <S.Options>
              {steps[3].type === STEP_TYPE.BUTTONS && (
                <OptionsGroup
                  name={steps[3].title}
                  options={steps[3].options}
                  selectedIdx={step3Idx}
                  onSelect={onSelectStep3}
                />
              )}
            </S.Options>
            {step3Idx != null && currentStep === (budgetType === 1 ? 3 : 2) && (
              <S.NextButton>
                <Button
                  label={nextBtnLabel}
                  onClick={onClickStep(budgetType === 1 ? 3 : 2, setCurrentStep)}
                />
              </S.NextButton>
            )}
          </S.Content>
        </S.Section>
      )}
      {currentStep >= (budgetType === 1 ? 4 : 3) && (
        <S.ActionBar>
          <Button variant="secondary" label={savePreferenceLabel} onClick={onSavePreference} />
          <Button label={browseCarsLabel} onClick={onBrowseCars} />
        </S.ActionBar>
      )}
    </S.BudgetCalculator>
  );
};

type Props = {
  title: string;
  steps: {
    title: string;
    options: any[] | any;
    type: 'BUTTONS' | 'DROPDOWN' | 'SLIDER';
    label?: any;
    selectedOption?: number;
  }[];
  nextBtnLabel: string;
  savePreferenceLabel: string;
  onSave?: (arg: any) => void;
  browseCarsLabel: string;
  onBrowse?: (arg: any) => void;
  budget?: {
    id?: string;
    type?: 'UPFRONT' | 'MONTHLY';
  };
};
