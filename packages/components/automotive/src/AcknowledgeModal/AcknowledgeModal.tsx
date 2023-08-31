/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Modal } from '@exo/frontend-components-base';
import * as S from './AcknowledgeModal.styles';

export const AcknowledgeModal = ({
  title,
  monthlyPrice,
  okBtnClick = () => {},
  okBtnText,
  onRequestCloseClick,
  ...props
}: Props) => {
  return (
    <S.AcknowledgeModal>
      <Modal
        onClose={onRequestCloseClick}
        title={`This price is based on a ${title} with standard paint and wheels.`}
        buttons={[{ label: okBtnText ?? 'Ok', onClick: okBtnClick }]}
        {...props}
      >
        {monthlyPrice && (
          <S.Text>
            <MonetaryAmount
              prefix={monthlyPrice.prefix}
              currency={monthlyPrice.currency}
              value={monthlyPrice.value}
              rate={monthlyPrice.rate}
            />
          </S.Text>
        )}
        <S.Text>
          {' '}
          The price is based on a contract length of 36 months, with a limit of 10,000 miles per
          annum and a deposit of £2500.
        </S.Text>
      </Modal>
    </S.AcknowledgeModal>
  );
};

type Props = {
  title: string;
  monthlyPrice: {
    value?: string;
    currency?: string;
    prefix?: string;
    rate?: string;
  };
  okBtnText?: string;
  okBtnClick?: () => void;
  onRequestCloseClick?: () => void;
} & Partial<React.ComponentProps<typeof Modal>>;
