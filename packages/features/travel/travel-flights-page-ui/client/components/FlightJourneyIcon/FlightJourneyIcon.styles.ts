/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { CircleFill as CF, CircleStroke as CS, Plane as AirPlane } from '@carbon/react/icons';

export const JourneyIcon = styled('div')`
    display: flex;
    align-items: center;
`;
const IconSize = css`
    width: 1rem;
    height: 1rem;
`;
const IconColor = css`
    color: #2E5C99;
`;
export const CircleFill = styled(CF)`
    ${IconSize};
    ${IconColor};
`;
export const CircleEmpty = styled(CS)`
    ${IconSize};
    ${IconColor};
`;
export const DashedLine = styled('span')`
    width: 2.25rem;
    height: 0;
    border-bottom: 1px dashed #CACACA;
`;
export const Plane = styled(AirPlane)`
    width: 1.5rem;
    height: 1.5rem;
    ${IconColor};
    transform: rotate(90deg)
`;