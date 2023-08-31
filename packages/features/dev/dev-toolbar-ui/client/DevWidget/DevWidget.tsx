/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Tooltip } from '@carbon/react';
import * as S from './DevWidget.styles';

export const DevWidget = ({ icon, tooltip, children, onClick, actions }: Props) => {
  return (
    <S.Widget>
      {icon && (
        <S.Icon>
          <Tooltip label={tooltip}>
            <button onClick={onClick} type="button">
              {icon}
            </button>
          </Tooltip>
        </S.Icon>
      )}
      <S.Clickable onClick={onClick} isClickable={!!onClick}>
        <S.Body>{children}</S.Body>
      </S.Clickable>
      {actions && (
        <S.Actions>
          {actions.map(a => (
            <S.Action key={a.tooltip}>
              <Tooltip label={a.tooltip}>
                <button onClick={a.onClick} type="button">
                  {a.icon}
                </button>
              </Tooltip>
            </S.Action>
          ))}
        </S.Actions>
      )}
    </S.Widget>
  );
};

type Action = {
  icon: JSX.Element;
  tooltip: string;
  onClick: () => void;
};

type Props = {
  icon?: JSX.Element;
  tooltip: string;
  children: any;
  onClick?: () => void;
  actions?: Action[];
};
