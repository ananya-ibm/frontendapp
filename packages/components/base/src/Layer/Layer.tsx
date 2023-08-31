/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import { Layer as CarbonLayer } from '@carbon/react';
import styled from 'styled-components';

const LayerContext = React.createContext(1);

export const useLayerLevel = () => {
  const contextLevel = useContext(LayerContext);
  return contextLevel as number | undefined;
}

const LayerStyle = styled.div<{ depth?: number }>`
  background-color: ${props => props.theme.colors.backgrounds.panels[props.depth === 1 ? 'primary' : props.depth === 2 ? 'secondary' : 'tertiary'].base};
`;

export const Layer = ({ as, isStyled, level, className, children }: Props) => {
  const depth = useLayerLevel() ?? 1;
  const value = Math.max(0, Math.min((level ?? depth) + 1, 100));
  return (
    <LayerContext.Provider value={value}>
      {isStyled ? 
        (
          <LayerStyle depth={depth}>
            <CarbonLayer className={className} as={as} level={level}>{children}</CarbonLayer>
          </LayerStyle>
        )
        : <CarbonLayer className={className} as={as} level={level}>{children}</CarbonLayer>
      }
    </LayerContext.Provider>
  );
}

type Props = {
  level?: 0 | 1 |2 ;
  as?: string;
  isStyled?: boolean;
  className?: string;
  children?: any;
};