/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import * as S from './ExpandButton.styles';

export const ExpandButton = ({
  expandedText = 'See More',
  lessText = 'See Less',
  onExpandClick,
  isExpanded
}: Props) => {
  const onClick = () => {
    onExpandClick();
  };

  return (
    <S.ExpandButton onClick={onClick}>
      {isExpanded ? lessText : expandedText}
      {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </S.ExpandButton>
  );
};

type Props = {
  isExpanded?: boolean;
  expandedText?: string;
  lessText?: string;
  onExpandClick: () => void;
};
