/* eslint-disable react/jsx-one-expression-per-line */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useRef, useState } from 'react';
import { Pencil, LayoutSpacing } from '@exo/frontend-components-core';
import { Modal, Button, Card, CardTitle, CardSection, Tag } from '@exo/frontend-components-base';
import { TrashCan } from '@carbon/react/icons';
import { ManageAddressesContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import { Address } from '@exo/frontend-features-checkout-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './ManageAddresses.styles';
import { AddressForm } from './AddressForm/AddressForm';

export const ManageAddresses = ({
  defaultAddressId,
  addresses,
  countries,
  onSetDefaultAddress,
  onDeleteAddress,
  onUpdateAddress,
  onAddAddress
}: ManageAddressesContainerRenderProps) => {
  const [deleteAddressId, setDeleteAddressId] = useState<string | undefined>();
  const [editAddress, setEditAddress] = useState<Address | undefined>();
  const [displayAddAddressModal, setDisplayAddAddressModal] = useState(false);

  const editFormRef = useRef<HTMLFormElement>(null);
  const addFormRef = useRef<HTMLFormElement>(null);
  const intl = useIntl('features.account.account-profile-ui.components');

  const onClose = () => {
    setDisplayAddAddressModal(false);
    setEditAddress(undefined);
  };

  return (
    <S.ManageAddresses>
      {addresses?.map(address => (
        <React.Fragment key={address.id}>
          <Card>
            <CardTitle
              primaryAction={{
                label: 'Edit',
                icon: <Pencil width="0.875rem" />,
                onClick: () => setEditAddress(address)
              }}
              secondaryActions={[
                {
                  label: 'Delete',
                  onClick: () => setDeleteAddressId(address.id),
                  disabled: address.id === defaultAddressId,
                  icon: <TrashCan size={16} />
                },
                {
                  label: 'Set as Primary',
                  disabled: address.id === defaultAddressId,
                  onClick: () => {
                    onSetDefaultAddress(address);
                  }
                }
              ]}
            >
              <div>
                {address.address1}
                {address.id === defaultAddressId && <Tag label="Default" />}
              </div>
            </CardTitle>
            <CardSection>
              <div>{address.address1}</div>
              <div>{address.address2}</div>
              <div>{address.city}</div>
              <div>{address.countryName}</div>
              <div>{address.zip}</div>
            </CardSection>
          </Card>

          <LayoutSpacing size="sm" />
        </React.Fragment>
      ))}
      <LayoutSpacing size="sm" />
      <S.RightButton>
        <Button
          variant="secondary"
          size="field"
          onClick={() => {
            setDisplayAddAddressModal(true);
          }}
          label={intl.msg('ManageAddresses.Addnewaddress', 'Add new address')}
        />
      </S.RightButton>

      <Modal
        title="Are you sure you want to delete this address?"
        isDanger
        onClose={() => setDeleteAddressId(undefined)}
        isOpen={!!deleteAddressId}
        buttons={[
          {
            label: 'Confirm',
            onClick: () => {
              onDeleteAddress(deleteAddressId!);
              setDeleteAddressId(undefined);
            }
          },
          { label: 'Cancel', onClick: () => setDeleteAddressId(undefined) }
        ]}
      ></Modal>

      <Modal
        onClose={onClose}
        isOpen={!!editAddress}
        isScrollable
        title={intl.msg('ManageAddresses.Title', 'Please fill in your contact details') as string}
        buttons={[
          { label: intl.msg('ManageAddresses.Button.Save', 'Save') as string, onClick: () => editFormRef.current!.requestSubmit() },
          { label: intl.msg('ManageAddresses.Button.Cancel', 'Cancel') as string, onClick: onClose }
        ]}
      >
        <AddressForm
          ref={editFormRef}
          onAddAddress={onAddAddress}
          onUpdateAddress={onUpdateAddress}
          mode="update"
          countries={countries}
          address={editAddress!}
          onClose={onClose}
          hideButtons
        />
      </Modal>

      <Modal
        onClose={onClose}
        isOpen={displayAddAddressModal}
        isScrollable
        title="Please fill in your contact details"
        buttons={[
          { label: 'Save', onClick: () => addFormRef.current!.requestSubmit() },
          { label: 'Cancel', onClick: onClose }
        ]}
      >
        <AddressForm
          ref={addFormRef}
          onAddAddress={onAddAddress}
          onUpdateAddress={onUpdateAddress}
          countries={countries}
          mode="add"
          onClose={onClose}
          hideButtons
        />
      </Modal>
    </S.ManageAddresses>
  );
};

ManageAddresses.Skeleton = () => <div>Loading...</div>;
