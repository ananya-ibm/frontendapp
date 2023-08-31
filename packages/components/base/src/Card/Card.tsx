/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import React, { useState } from 'react';
import { ActionMenu, ActionMenuItem } from '../ActionMenu/ActionMenu';
import { Button } from '../Button/Button';
import { useLayerLevel } from '../Layer/Layer';
import * as S from './Card.styles';

export const Card = ({ children, interactive, className, variant = 'vertical' }: CardProps) => {
  const depth = useLayerLevel() ?? 1;
  return (
    <S.Card depth={depth} className={className} interactive={interactive ?? false} variant={variant}>
      {children}
    </S.Card>
  );
};

type CardProps = {
  interactive?: boolean;
  variant?: 'horizontal' | 'vertical';
  children?: any;
  className?: string;
};

export const CardTitle = ({
  children,
  primaryAction,
  secondaryActions,
  className
}: CardTitleProps) => {
  return (
    <S.CardTitle className={className}>
      {children}
      {(primaryAction || secondaryActions) && (
        <S.TitleActions>
          {primaryAction && (
            <Button
              type="button"
              variant="link"
              onClick={primaryAction.onClick}
              icon={primaryAction.icon}
              label={primaryAction.label}
            />
          )}

          {secondaryActions && (
            <S.TitleSecondaryActions>
              <ActionMenu direction="left">
                {secondaryActions.map((sa) => (
                  <ActionMenuItem
                    key={sa.label}
                    label={sa.label}
                    onClick={sa.onClick}
                    disabled={sa.disabled}
                  />
                ))}
              </ActionMenu>
            </S.TitleSecondaryActions>
          )}
        </S.TitleActions>
      )}
    </S.CardTitle>
  );
};

type CardTitleProps = {
  primaryAction?: Action;
  secondaryActions?: Action[];
  children?: any;
  className?: string;
};

export const CardSection = ({ children, type, className }: CardSectionProps) => {
  return (
    <S.CardSection type={type} className={className}>
      {children}
    </S.CardSection>
  );
};

type CardSectionProps = {
  type?: 'primary' | 'secondary' | 'media';
  className?: string;
  children?: any;
};

export const CardFoldableSection = ({
  children,
  label = 'Click to see more...',
  className
}: CardFoldableSectionProps) => {
  const [folded, setFolded] = useState(true);

  if (folded) {
    return (
      <S.CardSection type="primary" className={className}>
        <Button variant="link" label={label} onClick={() => setFolded(false)} />
      </S.CardSection>
    );
  } else {
    return children;
  }
};

type CardFoldableSectionProps = {
  children?: any;
  label?: string;
  className?: string;
};

export const CardFooter = ({
  children,
  primaryActions,
  secondaryActions,
  tertiaryActions,
  className
}: CardFooterProps) => {
  return (
    <S.CardFooter className={className}>
      {primaryActions && (
        <S.FooterActions>
          {primaryActions?.map((a) => (
            <Button
              key={a.label}
              type="button"
              variant="link"
              onClick={a.onClick}
              label={a.label}
            />
          ))}
        </S.FooterActions>
      )}
      <div>{children}</div>

      {(secondaryActions || tertiaryActions) && (
        <S.FooterAdditionalActions>
          {secondaryActions && (
            <S.FooterSecondaryActions>
              {secondaryActions?.map((a) => (
                <Button
                  key={a.label}
                  type="button"
                  variant="link"
                  onClick={a.onClick}
                  label={a.label}
                />
              ))}
            </S.FooterSecondaryActions>
          )}

          {tertiaryActions && (
            <S.FooterTertiaryActions>
              <ActionMenu>
                {tertiaryActions.map((sa) => (
                  <ActionMenuItem key={sa.label} label={sa.label} onClick={sa.onClick} />
                ))}
              </ActionMenu>
            </S.FooterTertiaryActions>
          )}
        </S.FooterAdditionalActions>
      )}
    </S.CardFooter>
  );
};

type CardFooterProps = {
  primaryActions?: Action[];
  secondaryActions?: Action[];
  tertiaryActions?: Action[];
  children?: any;
  className?: string;
};

type Action = {
  label: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick: () => any;
};
