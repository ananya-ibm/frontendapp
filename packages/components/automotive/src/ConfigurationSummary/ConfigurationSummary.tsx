/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount, PriceTable } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { addImageExt } from '@exo/frontend-common-utils';
import { SummaryTile } from '../SummaryTile/SummaryTile';
import * as S from './ConfigurationSummary.styles';

export const ConfigurationSummary = ({
  summaryText,
  configurationCode,
  deliveryDate,
  priceBreakdownText,
  priceBreakdown,
  onSaveConfiguration,
  onDeleteConfiguration,
  summarySelections,
  CTAbutton,
  image,
  isSmall,
  isSaving
}: Props) => {
  // eslint-disable-next-line react/jsx-indent
  return isSmall ? (
    <S.SmallConfigurationSummary>
      <S.Title isSmall>Your Car</S.Title>
      <S.Text>{summaryText}</S.Text>
      <S.Text>
        On the road price:
        <S.BoldText>
          <MonetaryAmount {...priceBreakdown[priceBreakdown.length - 1].amount} />
        </S.BoldText>
      </S.Text>
    </S.SmallConfigurationSummary>
  ) : (
    <S.ConfigurationSummary>
      <S.LeftSummary>
        <S.Title>Your new car</S.Title>
        {image && <S.Image src={addImageExt(image)} />}
        <S.Text>{summaryText}</S.Text>
        <S.Text>
          Your configuration code:
          <strong> {configurationCode}</strong>
        </S.Text>
        {deliveryDate && (
          <S.Text>
            Estimated delivery date:
            <strong> {deliveryDate}</strong>
          </S.Text>
        )}
        {priceBreakdown && (
          <S.Price>
            <S.Title>Price breakdown</S.Title>
            <S.Text>{priceBreakdownText}</S.Text>
            <PriceTable priceBreakdown={priceBreakdown} />
          </S.Price>
        )}
        <S.ButtonGroup>
          <>
            {CTAbutton ? (
              CTAbutton()
            ) : (
              <Button disabled={isSaving} onClick={onSaveConfiguration} label="Save Configuration" />
            )}
            {onDeleteConfiguration && (
              <S.Button>
                <Button variant="link" label="Delete Configuration" onClick={onDeleteConfiguration} />
              </S.Button>
            )}
          </>
        </S.ButtonGroup>
      </S.LeftSummary>
      {summarySelections && (
        <S.RightSummary>
          <S.Title>Summary</S.Title>
          {summarySelections.map(selection => (
            <div key={`sel-${selection.title}`} className="selection">
              <S.Subtitle>{selection.title}</S.Subtitle>
              <S.SummarySection>
                {selection.options.map(option => (
                  <S.SummaryTile key={`opt-${option.title}-${option.text}`}>
                    <SummaryTile
                      title={option.title}
                      text={option.text}
                      amount={option.amount}
                      version={option.version}
                      thumbnail={addImageExt(option.thumbnail)}
                      onChange={option.onProductSelectionChange}
                      changeButtonText={option.changeButtonText}
                    />
                  </S.SummaryTile>
                ))}
              </S.SummarySection>
            </div>
          ))}
        </S.RightSummary>
      )}
    </S.ConfigurationSummary>
  );
};

type Props = {
  isSmall?: boolean;
  isSaving?: boolean;
  CTAbutton?: () => void;
  image?: string;
  summaryText: string;
  configurationCode: string;
  deliveryDate: string;
  priceBreakdownText?: string;
  priceBreakdown: {
    text?: string;
    amount: {
      prefix?: string;
      currency?: string;
      value: string | number;
    };
  }[];
  onSaveConfiguration?: () => void;
  onDeleteConfiguration?: () => void;
  summarySelections: {
    title?: string;
    options: {
      title: string;
      text?: string;
      amount: {
        prefix?: string;
        currency?: string;
        value: number | string;
      };
      version?: string;
      thumbnail?: string;
      onProductSelectionChange: (arg: any) => void;
      changeButtonText: string;
    }[];
  }[];
};
