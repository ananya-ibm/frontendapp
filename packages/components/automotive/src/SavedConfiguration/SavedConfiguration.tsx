/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { format, addMonths } from 'date-fns';
import { TrashCan, Printer, Download, View } from '@carbon/react/icons';
import * as S from './SavedConfiguration.styles';

export const SavedConfiguration = ({
  configuration,
  onDelete,
  onDownload = () => {},
  onPrint = () => {},
  onCartAdd
}: Props) => (
  <S.SavedConfiguration>
    <S.Header>
      Configuration Code:&nbsp;
      <strong>{configuration.id}</strong>
      <S.Actions>
        <S.Action className="brand-color bold" onClick={onPrint}>
          <Printer size={16} className="brand-color icon" /> Print
        </S.Action>
        <S.Action className="brand-color bold" onClick={onDownload}>
          <Download size={16} className="brand-color icon" /> Download
        </S.Action>
        <S.Action className="warning-color bold" onClick={onDelete}>
          <TrashCan size={16} className="warning-color icon" />
          Delete
        </S.Action>
      </S.Actions>
    </S.Header>
    <S.Content>
      <S.Image src={configuration.image} />
      <div>
        <S.Title className="bold">Your saved car</S.Title>
        <S.Title className="with-spacing">
          Estimated delivery time:{' '}
          <span className="bold brand-color">{format(addMonths(new Date(), 1), 'MMMM yyyy')}</span>
        </S.Title>
        {configuration.description}
      </div>
    </S.Content>
    <S.ConfiguratorLink>
      <View size={16} className="brand-color icon" />
      <Button
        variant="link"
        label="View Configuration"
        onClick={() =>
          window.location.assign(
            `/automotive/${configuration.productId}/configuration/${configuration.id}`
          )
          }
          
      />
    </S.ConfiguratorLink>
    <S.Footer>
      <Button variant="secondary" onClick={onCartAdd} label="Add to cart" />
      <S.TotalPrice>
        Estimated Total
        <S.Price>
          <MonetaryAmount {...configuration.amount} />
        </S.Price>
        OTR price, no finance
      </S.TotalPrice>
    </S.Footer>
  </S.SavedConfiguration>
);

type Props = {
  configuration: {
    amount?: any;
    description?: string;
    id?: string;
    image?: string;
    productId?: string;
  };
  onCartAdd: () => void;
  onDelete: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
};
