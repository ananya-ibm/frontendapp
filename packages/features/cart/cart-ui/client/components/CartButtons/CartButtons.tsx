/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ButtonGroup, Button } from '@exo/frontend-components-base';
import { useHistory } from 'react-router-dom';


type Props = {
  isDisabled?: boolean;
  next: string | React.ReactNode;
  onNext: () => void;
};

export const CartButtons = ({ isDisabled, next, onNext }: Props) => {
  const history = useHistory();
  return (
    <ButtonGroup>
      {next && onNext && (
        <>
          <Button
            disabled={isDisabled}
            onClick={onNext}
            label={next}
            data-testid="cart-CartButtons-next-button"
          />
          <Button
            onClick={() => history.push('/')}
            variant="tertiary"
            label='Continue shopping'
          />
        </>
      )}
    </ButtonGroup>
  );
};
