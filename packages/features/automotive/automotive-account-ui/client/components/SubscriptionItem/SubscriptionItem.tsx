/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import * as S from './SubscriptionItem.styles';

export const SubscriptionItem = ({
  item: {
    title = 'EV Charging',
    subtitle = 'From £200.00/Month',
    thumbnail = '/static/images/products/thumbnails/PremiumChargingSubscription.png',
    onClick = () => {},
    actionLabel = 'See details'
  }
}: Props) => {
  return (
    <S.SubscriptionItem>
      <div>{thumbnail && <S.Media img={thumbnail} />}</div>
      <S.Main>
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </S.Main>
      <div>
        <Button variant="link" label={actionLabel} onClick={onClick} />
      </div>
    </S.SubscriptionItem>
  );
};

type Props = {
  item: {
    title?: string;
    subtitle?: string;
    thumbnail?: string;
    onClick?: (e: any) => void;
    actionLabel?: string;
  };
};
