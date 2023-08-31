/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { useHistory } from 'react-router-dom';
import { Grid, Row, Column, Steps, Step } from '@exo/frontend-components-base';
import ShippingDetails from '../ShippingDetails/ShippingDetails';
import AutomotiveCheckoutSummary from '../AutomotiveCheckoutSummary/AutomotiveCheckoutSummary';
import DeliveryMethod from '../DeliveryMethod/DeliveryMethod';
import Confirmation from '../Confirmation/Confirmation';
import Payment from '../Payment/Payment';
import CreditCheck from '../CreditCheck/CreditCheck';

const CheckoutCash = ({ cartId }: Props) => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      label: 'Contact Details',
      secondaryLabel: 'Step 1'
    },
    {
      label: 'Delivery Method',
      secondaryLabel: 'Step 2'
    },
    {
      label: 'Credit Check',
      secondaryLabel: 'Step 3'
    },
    {
      label: 'PaymentDetails',
      secondaryLabel: 'Step 4'
    },
    {
      label: 'Confirm Reservation',
      secondaryLabel: 'Step 5'
    }
  ];
  return (
    <Grid>
      <Row>
        <LayoutSpacing size="sm" />
        <Column>
          <Steps current={activeStep}>
            {steps.map(step => (
              <Step key={step.label} title={step.label} description={step.secondaryLabel} />
            ))}
          </Steps>
        </Column>
      </Row>
      <Row>
        <Row className="main">
          <Column>
            {activeStep === 0 && (
              <ShippingDetails
                cartId={cartId}
                onNextClick={() => setActiveStep(1)}
                onBackClick={() => history.push('/cart/checkout')}
              />
            )}

            {activeStep === 1 && (
              <DeliveryMethod
                onBackClick={() => setActiveStep(0)}
                onNextClick={() => setActiveStep(2)}
              />
            )}

            {activeStep === 2 && (
              <CreditCheck
                onBackClick={() => setActiveStep(1)}
                onNextClick={() => setActiveStep(3)}
              />
            )}

            {activeStep === 3 && (
              <Payment onBackClick={() => setActiveStep(2)} onNextClick={() => setActiveStep(4)} />
            )}

            {activeStep === 4 && <Confirmation />}

            {activeStep !== 4 && <AutomotiveCheckoutSummary />}
          </Column>
        </Row>
      </Row>
    </Grid>
  );
};

type Props = {
  cartId: string;
};

export default CheckoutCash;
