/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useRef, useState } from 'react';
import { Pencil, LayoutSpacing } from '@exo/frontend-components-core';
import { Button, Modal, Card, CardTitle, Tag, CardSection } from '@exo/frontend-components-base';
import { TrashCan } from '@carbon/react/icons';
import { formatDate, useIntl } from '@exo/frontend-common-i18n';
import { StoredPaymentMethodsContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import * as S from './PaymentMethods.styles';
import { PaymentForm } from './PaymentForm/PaymentForm';


export const PaymentMethods = ({
  onDeletePaymentMethod,
  onSetDefaultPaymentMethod,
  payments,
  defaultPaymentId
}: StoredPaymentMethodsContainerRenderProps) => {
  const [deletePaymentId, setDeletePaymentId] = useState<any>();
  const [editPayment, setEditPayment] = useState<any>();
  const [displayAddPaymentModal, setDisplayAddPaymentModal] = useState<any>(false);

  const editFormRef = useRef<HTMLFormElement>(null);
  const addFormRef = useRef<HTMLFormElement>(null);
  const intl = useIntl('features.account.account-profile-ui.components');

  const getPaymentCards = () => {
    return (
      <S.PaymentMethods>
        {payments?.map(payment => (
          <React.Fragment key={payment.id}>
            <Card>
              <CardTitle
                primaryAction={{
                  label: 'Edit',
                  icon: <Pencil width="0.875rem" />,
                  onClick: () => setEditPayment(payment)
                }}
                secondaryActions={[
                  {
                    label: 'Delete',
                    onClick: () => setDeletePaymentId(payment.id),
                    disabled: payment.id === defaultPaymentId,
                    icon: <TrashCan size={16} />
                  },
                  {
                    label: 'Set as Primary',
                    disabled: payment.id === defaultPaymentId,
                    onClick: () => {
                      onSetDefaultPaymentMethod(payment.id);
                    }
                  }
                ]}
              >
                <div>
                  {payment.cardType} {payment.cardNo}
                  {payment.id === defaultPaymentId && <Tag label="Default" />}
                </div>
              </CardTitle>
              <CardSection>
                <div>
                  {payment.firstName} {payment.lastName}
                </div>
                <div>Expires: {formatDate(payment.expiryDate, 'mm/yy')}</div>
              </CardSection>
            </Card>

            <LayoutSpacing size="sm" />
          </React.Fragment>
        ))}
      </S.PaymentMethods>
    );
  };

  const Payments = getPaymentCards();

  return (
    <>
      {Payments}

      <LayoutSpacing size="sm" />
      <S.RightButton>
        <Button
          variant="secondary"
          size="field"
          onClick={() => {
            setDisplayAddPaymentModal(true);
          }}
          label={intl.msg('PaymentForm.PaymentMethod.Label', 'Add new payment method')}
        />
      </S.RightButton>

      <Modal
        title="Are you sure you want to delete this payment method?"
        onClose={() => setDeletePaymentId(null)}
        isOpen={!!deletePaymentId}
        isDanger
        buttons={[
          {
            label: 'Confirm',
            onClick: () => {
              onDeletePaymentMethod(deletePaymentId);
              setDeletePaymentId(null);
            }
          },
          {
            label: 'Cancel',
            onClick: () => {
              () => setDeletePaymentId(null);
            }
          }
        ]}
      ></Modal>

      <Modal
        title={intl.msg('PaymentForm.PaymentMethod.Title', 'Please fill in your payment details') as string}
        onClose={() => setEditPayment(null)}
        isOpen={!!editPayment}
        isScrollable
        buttons={[
          { label: intl.msg('PaymentForm.Button.UpadatePaymentMethod', 'Update Payment Method') as string, onClick: () => editFormRef.current!.requestSubmit() },
          { label: intl.msg('PaymentForm.Button.cancel', 'Cancel') as string, onClick: () => setEditPayment(null) }
        ]}
      >
        <PaymentForm
          ref={editFormRef}
          hideButtons
          isAdd={false}
          payment={editPayment}
          setEditPayment={setEditPayment}
        />
      </Modal>

      <Modal
        title={intl.msg('PaymentForm.PaymentMethod.Title', 'Please fill in your payment details') as string}
        onClose={() => setDisplayAddPaymentModal(false)}
        isOpen={displayAddPaymentModal}
        isScrollable
        buttons={[
          { label: intl.msg('PaymentForm.Button.save', 'Save') as string, onClick: () => addFormRef.current!.requestSubmit() },
          { label: intl.msg('PaymentForm.Button.cancel', 'Cancel') as string, onClick: () => setDisplayAddPaymentModal(false) }
        ]}
      >
        <PaymentForm
          ref={addFormRef}
          hideButtons
          isAdd
          setDisplayAddPaymentModal={setDisplayAddPaymentModal}
        />
      </Modal>
    </>
  );
};

PaymentMethods.Skeleton = () => <div>Loading...</div>;
