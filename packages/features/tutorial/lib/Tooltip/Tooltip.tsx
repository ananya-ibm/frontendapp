/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TooltipRenderProps } from 'react-joyride';
import * as S from './Tooltip.styles';

export const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps
}: TooltipRenderProps) => {
  return (
    <S.Tooltip {...tooltipProps}>
      {step.title && <S.Title>{step.title}</S.Title>}
      <S.Content>{step.content}</S.Content>
      <S.Footer>
        {index > 0 && <S.Button label={backProps.title ?? 'Back'} {...backProps} />}
        {continuous && <S.Button label={primaryProps.title} {...primaryProps} />}
        {!continuous && <S.Button label={closeProps.title ?? 'Close'} {...closeProps} />}
      </S.Footer>
    </S.Tooltip>
  );
};
