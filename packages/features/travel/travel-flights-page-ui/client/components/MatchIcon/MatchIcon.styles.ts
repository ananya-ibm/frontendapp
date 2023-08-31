/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

type MapperProps = {
    field: "bgColor" | "textColor";
    variant: "bestMatch" | "closeMatch";
}

const mapVariantToBgColor = (field: MapperProps['field'], variant: MapperProps['variant']) => {
    switch(field) {
        case 'bgColor': 
        switch (variant) {
            case 'bestMatch': return "rgba(66, 190, 101, 0.1)";
            case 'closeMatch': return "rgba(46, 92, 153, 0.1)";
            default: return "white";

        }
        case 'textColor': 
        switch (variant) {
            case 'bestMatch': return "#1CA843";
            case 'closeMatch': return "#054ADA";
            default: return "black";
        }
    }
    
}

type MatchIconProps = {
    variant: "bestMatch" | "closeMatch";
    isvisible: 1 | 0;
}

export const MatchIcon = styled('div')<MatchIconProps>`
    background-color: ${props => mapVariantToBgColor('bgColor', props.variant)};
    color: ${props => mapVariantToBgColor('textColor', props.variant)};
    visibility: ${props => props.isvisible ? 'visible' : 'hidden'};
    font-size: x-small;
    padding: 0.3rem 0.5rem;
    display: inline-flex;
    flex-grow: 0;
    flex-shrink: 1;
    border-radius: 2px;
    width: 4.5rem;
    justify-content: center;
`;