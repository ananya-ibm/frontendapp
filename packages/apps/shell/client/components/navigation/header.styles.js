import styled, { css } from 'styled-components';

export const HeaderWrapper = styled('div')`
    display: flex;
    box-shadow: none;
    background-color: #FCD839;
    overflow: hidden;
    z-index: 10;
    padding:1.5rem;

    & div:first-child {
        & img:nth-child(1) {
            width:14%;
        }
    }
`;

export const Headerdivision = styled('div')`
    flex: 0 0 46%;
    
`;