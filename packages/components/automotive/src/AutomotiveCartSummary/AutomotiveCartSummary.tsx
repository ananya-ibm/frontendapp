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
import * as S from './AutomotiveCartSummary.styles';

export const AutomotiveCartSummary = ({
  isConfirmation,
  summaryText,
  deliveryDate,
  priceBreakdownText,
  priceBreakdown,
  summarySelections,
  image,
  isFinanced,
  tradeInRegistrationNumber,
  title = 'Your new car',
  financeBreakdown
}: Props) => {
  const payableNow = priceBreakdown.find(i => i.text === 'Amount payable now');

  return (
    // eslint-disable-next-line react/jsx-indent
    <S.AutomotiveCartSummary isGrid={isConfirmation}>
      {!isConfirmation && (
        <>
          <h2>Your car summary</h2>
          {payableNow && (
            <>
              <S.LargeTitle>
                {payableNow.text}
                {': '}
                <S.HighLightText>
                  <MonetaryAmount {...payableNow.amount} />
                </S.HighLightText>
              </S.LargeTitle>
              <hr />
            </>
          )}
        </>
      )}
      <S.Group isRow={isConfirmation}>
        <S.CarDetails isConfirmation={isConfirmation}>
          {isConfirmation && <h2>Your car summary</h2>}
          <S.Section>
            <S.Title>{title}</S.Title>
            {image && !isConfirmation && <S.Image src={addImageExt(image)} />}
          </S.Section>
          <S.Details isConfirmation={isConfirmation}>
            {deliveryDate && (
              <S.Text>
                Estimated delivery date:
                <S.BoldText> {deliveryDate}</S.BoldText>
              </S.Text>
            )}
            <S.Text>{summaryText}</S.Text>
          </S.Details>
        </S.CarDetails>
        {summarySelections && (
          <S.Section isConfirmation={isConfirmation}>
            <S.Title className="config">Your configuration</S.Title>
            {/* would like text not to be bold and to be longer horizontally instead of on the next line */}
            {summarySelections.map(selection => (
              <div key={`sel-${selection.title}`}>
                {selection.options.map(option => (
                  <S.Media key={`${option.title}-${option.text}`}>
                    <S.Thumbnail src={addImageExt(option.thumbnail)} alt={option.title} />
                    <S.Caption>
                      {option.title}: {option.text}
                    </S.Caption>
                  </S.Media>
                ))}
              </div>
            ))}
          </S.Section>
        )}
      </S.Group>

      <S.Group>
        {priceBreakdown && (
          <S.Section isConfirmation={isConfirmation}>
            {!isConfirmation && <hr />}
            <h2 className="cost-title">Costs</h2>
            <S.Section>
              <S.Title>Your finance option</S.Title>

              {isFinanced && (
                <>
                  <S.Text>
                    Your selected finance option is <strong>Financed</strong>
                  </S.Text>
                  <PriceTable priceBreakdown={financeBreakdown!} />
                </>
              )}
              {!isFinanced && (
                <S.Text>
                  Your selected finance option is <strong>Cash</strong>
                </S.Text>
              )}
            </S.Section>
            {tradeInRegistrationNumber && (
              <S.Section>
                <S.Title>Your trade-in</S.Title>
                <S.Text>
                  The car with registration number <strong>{tradeInRegistrationNumber}</strong> has
                  been added for trade-in.
                </S.Text>
              </S.Section>
            )}
            {!isConfirmation && <S.Text>{priceBreakdownText}</S.Text>}
            <PriceTable priceBreakdown={priceBreakdown} />
          </S.Section>
        )}
      </S.Group>

      <S.Group isRow={isConfirmation}>
        <S.Section>
          <Button variant="link" label="Terms and conditions" onClick={() => {}} />
          <S.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure
            dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          </S.Text>
        </S.Section>
        <S.Section>
          <Button variant="link" label="Legal Disclaimer" onClick={() => {}} />
          <S.Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </S.Text>
        </S.Section>
      </S.Group>
    </S.AutomotiveCartSummary>
  );
};

type Props = {
  deliveryDate: string;
  image?: string;
  isFinanced?: boolean;
  isConfirmation?: boolean;
  financeBreakdown?: {
    text?: string;
    amount: {
      prefix?: string;
      currency?: string;
      value: string | number;
    };
  }[];
  priceBreakdown: {
    text?: string;
    amount: {
      prefix?: string;
      currency?: string;
      value: number | string;
    };
  }[];
  priceBreakdownText?: string;
  summaryText: string;
  summarySelections: {
    title?: string;
    options: {
      title?: string;
      text?: string;
      amount: {
        prefix?: string;
        currency?: string;
        value: number | string;
      };
      version?: string;
      thumbnail?: string;
      onProductSelectionChange?: () => void;
      changeButtonText?: string;
    }[];
  }[];
  tradeInRegistrationNumber?: string;
  title?: string;
};
