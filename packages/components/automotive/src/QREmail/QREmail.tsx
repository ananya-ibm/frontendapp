/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ButtonGroup, TextInput } from '@exo/frontend-components-base';
import { SecondaryButton } from '@carbon/react';
import React, { useState } from 'react';
import * as S from './QREmail.styles';

// TODO: Move this component

export const QREmail = ({ onSubmit = () => {} }: Props) => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <S.QREmail onSubmit={handleSubmit}>
      <ButtonGroup>
        <SecondaryButton onClick={() => {}}>Send QR Code on email</SecondaryButton>
        <TextInput
          id="email"
          name="qremail"
          placeholder="Enter email"
          labelText="Your email"
          hideLabel
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{' '}
      </ButtonGroup>
    </S.QREmail>
  );
};

type Props = {
  buttonText?: string | React.ReactNode;
  onSubmit?: (email?: string) => void;
};
