/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Steps as BaseSteps, Step as BaseStep } from '@exo/frontend-components-base';
import * as S from './FieldPanelGroupStepByStep.styles';

export const FieldPanelGroupStepByStep = ({ onChange, selectedIndex = 0, children }: Props) => {
  // This is implemented through hidden elements rather than the typical React-way of toggling the element on and off
  // This is due to the uncontrolled nature of the React Hook Forms and in order to not loose input
  return (
    <S.FieldPanelGroupStepByStep>
      <BaseSteps
        current={selectedIndex}
        variant="full-width"
        onChange={e => {
          onChange({ idx: e, isFirst: e === 0, isLast: e === children.length - 1 });
        }}
      >
        {children?.map(e => (
          <BaseStep
            key={e.props.labelText}
            title={e.props.labelText}
            description={e.props.helpText ?? ''}
          />
        ))}
      </BaseSteps>

      <S.Body>
        {children?.map((e, idx) => (
          <div key={`${e.key}_body`} style={{ display: idx === selectedIndex ? 'block' : 'none' }}>
            {e}
          </div>
        ))}
      </S.Body>
    </S.FieldPanelGroupStepByStep>
  );
};

type Props = {
  children: React.ReactElement<StepProps, typeof Step>[];
  onChange: ({ idx, isLast, isFirst }: { idx: number; isLast: boolean; isFirst: boolean }) => void;
  selectedIndex?: number;
};

const Step = (props: StepProps) => {
  return props.children;
};

FieldPanelGroupStepByStep.Step = Step;

type StepProps = {
  labelText: string;
  helpText?: string;
  children: any;
};
