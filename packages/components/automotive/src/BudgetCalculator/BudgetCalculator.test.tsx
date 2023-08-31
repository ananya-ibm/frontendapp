/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from '@testUtils';
import { BudgetCalculator } from './BudgetCalculator';

jest.mock('@exo/frontend-components-base', () => {
  const carbon = jest.requireActual('@exo/frontend-components-base');

  const Dropdown = ({ id, label, items, onChange }) => (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        onChange={e => onChange({ selectedItem: e.target.value })}
        data-testid="select"
      >
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );

  return {
    ...carbon,
    Dropdown
  };
});

const testProps: React.ComponentProps<typeof BudgetCalculator> = {
  title: 'Set your budget',
  steps: [
    {
      title: 'How do you want to pay?',
      options: ['Upfront', 'Monthly contract'],
      type: 'BUTTONS'
    },
    {
      title: 'What is your budget?',
      options: {
        0: [
          { id: '10000', label: 'Up to £10,000' },
          { id: '15000', label: 'Up to £15,000' },
          { id: '20000', label: 'Up to £20,000' },
          { id: '25000', label: 'Up to £25,000' },
          { id: '35000', label: 'Up to £35,000' },
          { id: '45000', label: 'Up to £45,000' },
          { id: '50000', label: '£50,000 or more' }
        ],
        1: [
          { id: '9999999', label: 'No maximum' },
          { id: '200', label: 'Up to £200' },
          { id: '300', label: 'Up to £300' },
          { id: '400', label: 'Up to £400' },
          { id: '500', label: 'Up to £500' },
          { id: '5000', label: '£500 +' }
        ]
      },
      type: 'DROPDOWN',
      label: { 0: 'Budget Amount', 1: 'Monthly Price' }
    },
    {
      title: 'How much will you pay for deposit?',
      options: [
        {
          label: 'How much will you pay for your deposit?',
          min: 0,
          max: 30000,
          step: 1000,
          value: 3000,
          unit: '£'
        },
        {
          label: 'How many miles per annum?',
          min: 1000,
          max: 30000,
          step: 1000,
          value: 10000,
          unit: 'm'
        },
        {
          label: 'How many months would you like to pay over?',
          min: 12,
          max: 48,
          step: 6,
          value: 36,
          unit: 'M'
        }
      ],
      type: 'SLIDER'
    },
    {
      title: 'Do you want to trade your car in?',
      options: ['Not right now', 'Yes, I want to trade-in'],
      type: 'BUTTONS'
    }
  ],
  nextBtnLabel: 'Next',
  savePreferenceLabel: 'Save my budget perference',
  browseCarsLabel: 'Browse cars with budget perference'
};

describe('<BudgetCalculator /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<BudgetCalculator {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should follow the logic of Monthly Price', async () => {
    const { getByText, queryByText, findByText, getByTestId } = render(
      <BudgetCalculator {...testProps} />
    );
    const nextBtn = getByText(testProps.nextBtnLabel);
    expect(nextBtn).toBeDefined();
    // Monthly price is selected
    fireEvent.click(nextBtn);

    const paymentLabel = await findByText(testProps.steps[1].title);
    expect(paymentLabel).toBeDefined();

    const paymentDropdown = getByTestId('select');
    expect(paymentDropdown).toBeDefined();

    // next button disappears
    expect(queryByText(testProps.nextBtnLabel)).toBeNull();

    // select the first option
    const selectedPayment = testProps.steps[1].options[1][0];
    fireEvent.change(getByTestId('select'), {
      target: {
        value: selectedPayment
      }
    });

    // next button should appear
    expect(getByText(testProps.nextBtnLabel)).toBeDefined();

    fireEvent.click(getByText(testProps.nextBtnLabel));

    // slider
    fireEvent.click(getByText(testProps.nextBtnLabel));

    const tradeIn = await findByText(testProps.steps[3].title);
    expect(tradeIn).toBeDefined();

    fireEvent.click(getByText(testProps.nextBtnLabel));

    const saveButton = await findByText(testProps.savePreferenceLabel);
    expect(saveButton).toBeDefined();

    const browseButton = await findByText(testProps.browseCarsLabel);
    expect(browseButton).toBeDefined();
  });

  test('should follow the logic of Upfront', async () => {
    const { getByText, queryByText, findByText, getByTestId } = render(
      <BudgetCalculator {...testProps} />
    );
    const nextBtn = getByText(testProps.nextBtnLabel);
    expect(nextBtn).toBeDefined();

    fireEvent.click(getByText(testProps.steps[0].options[0]));

    // Upfront is selected
    fireEvent.click(nextBtn);

    const paymentLabel = await findByText(testProps.steps[1].title);
    expect(paymentLabel).toBeDefined();

    const paymentDropdown = getByTestId('select');
    expect(paymentDropdown).toBeDefined();

    // next button disappears
    expect(queryByText(testProps.nextBtnLabel)).toBeNull();

    // select the first option
    const selectedPayment = testProps.steps[1].options[0][0];
    fireEvent.change(getByTestId('select'), {
      target: { value: selectedPayment }
    });

    // next button should appear
    expect(getByText(testProps.nextBtnLabel)).toBeDefined();

    fireEvent.click(getByText(testProps.nextBtnLabel));

    const tradeIn = await findByText(testProps.steps[3].title);
    expect(tradeIn).toBeDefined();

    fireEvent.click(getByText(testProps.nextBtnLabel));

    const saveButton = await findByText(testProps.savePreferenceLabel);
    expect(saveButton).toBeDefined();

    const browseButton = await findByText(testProps.browseCarsLabel);
    expect(browseButton).toBeDefined();
  });
});
