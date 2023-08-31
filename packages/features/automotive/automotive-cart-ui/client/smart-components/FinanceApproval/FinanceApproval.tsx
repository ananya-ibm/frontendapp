/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Button } from '@exo/frontend-components-base';
import { Warning } from '@carbon/react/icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import * as S from './FinanceApproval.styles';
import { useEffectOnce, useScrollViewportTo } from '@exo/frontend-common-hooks';

const FinanceApproval = ({ onNextClick, onBackClick }: Props) => {
  const [stage, setStage] = useState(0);
  const [value, setValue] = useState(0);

  useScrollViewportTo(0, 0);
  useEffectOnce(() => {
    setValue(0);
  });

  const onSubmitFinance = () => {
    setStage(1);
    setTimeout(() => {
      setValue(100);
    });

    setTimeout(() => {
      onNextClick();
    }, 4000);
  };

  return (
    <S.FinanceApproval>
      <h2>Submit Finance for approval</h2>
      {stage === 0 && (
        <div>
          <p className="copy">
            After submitting your finance for approval, you will be redirected to the Payment
            Details step. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>
          <S.Alert>
            <S.Icon>
              <Warning size={32} />
            </S.Icon>
            <p className="copy">
              Your selected financial option is Personal Contract Purchase. Your request will be
              sent to the Financial Department for approval. If your application is taking longer to
              approve, you will be redirectioned to your account. No worries, your order will be
              saved in your cart while awaiting approval.
            </p>
          </S.Alert>
          <S.ButtonGroup>
            <Button variant="secondary" onClick={onBackClick} label="Back" />
            <Button onClick={() => onSubmitFinance()} label="Submit" />
          </S.ButtonGroup>
        </div>
      )}

      {stage === 1 && (
        <S.Loading>
          <S.Progress>
            <S.Meter>
              <CircularProgressbar
                value={value}
                styles={buildStyles({ pathTransitionDuration: 1.5 })}
              />
            </S.Meter>
            <p className="copy">Please stand by, your finance application is being verified...</p>
          </S.Progress>
        </S.Loading>
      )}
    </S.FinanceApproval>
  );
};

type Props = {
  onBackClick: () => void;
  onNextClick: () => void;
};

export default FinanceApproval;
