/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import {
  Row,
  Column,
  Card,
  CardTitle,
  CardSection,
  CardFooter,
  Tabs,
  Tab
} from '@exo/frontend-components-base';
import { LeaseContainerRenderProps } from '@exo/frontend-features-automotive-account-logic';
import { LayoutSpacing } from '@exo/frontend-components-core';
import * as S from './Leases.styles';

const LeaseCard = ({
  name,
  expiry,
  cost,
  payment,
  mileageLimit,
  termDuration,
  upfrontPayment
}: Props) => {
  return (
    <Card>
      <CardTitle>{name}</CardTitle>
      <CardSection>
        {expiry && <div>{expiry}</div>}
        {cost && payment && (
          <>
            <div className="highlighted-row">{cost}</div>
            <div>{payment}</div>
          </>
        )}

        <Row>
          {mileageLimit && (
            <Column lg={2}>
              <div className="highlighted-row">Mileage Limit</div>
              <div>{mileageLimit}</div>
            </Column>
          )}
          {termDuration && (
            <Column lg={2}>
              <div className="highlighted-row">Term Duration</div>
              <div>{termDuration}</div>
            </Column>
          )}
          {upfrontPayment && (
            <Column lg={3}>
              <div className="highlighted-row">Upfront Payment</div>
              <div>{upfrontPayment}</div>
            </Column>
          )}
        </Row>
      </CardSection>
      <CardFooter
        primaryActions={[{ label: 'Manage Lease', onClick: () => {} }]}
        secondaryActions={[{ label: 'Terms and Conditions', onClick: () => {} }]}
      />
    </Card>
  );
};

type Props = {
  name: string;
  expiry?: string;
  cost?: string;
  payment?: string;
  mileageLimit?: string;
  termDuration?: string;
  upfrontPayment?: string;
};

export const Leases = ({ title, activeLeases, expiredLeases }: LeaseContainerRenderProps) => {
  return (
    <S.Lease>
      <h4>{title}</h4>
      <hr />
      <LayoutSpacing size="sm" />
      <Tabs>
        <Tab id="active" label="Active">
          <LayoutSpacing size="sm" />
          {activeLeases?.map(item => (
            <LeaseCard
              key={item.name}
              name={item.name}
              expiry={item.expiry}
              cost={item.cost}
              payment={item.payment}
              mileageLimit={item.mileageLimit}
              termDuration={item.termDuration}
              upfrontPayment={item.upfrontPayment}
            />
          ))}
        </Tab>
        <Tab id="expire" label="Expire">
          <LayoutSpacing size="sm" />
          {expiredLeases?.map(item => (
            <LeaseCard
              key={item.name}
              name={item.name}
              expiry={item.expiry}
              cost={item.cost}
              payment={item.payment}
              mileageLimit={item.mileageLimit}
              termDuration={item.termDuration}
              upfrontPayment={item.upfrontPayment}
            />
          ))}
        </Tab>
      </Tabs>
    </S.Lease>
  );
};
