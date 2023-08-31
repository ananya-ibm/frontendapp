/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const FlightSortContainer = styled('div')`
    margin: 1rem;
    display: inline-flex;
    overflow-x: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
    > button{
        margin: 0 10px;
    }
`;

export const FlightSortWrapper = styled('div')`
  justify-content: center;
  display: flex;
`;

export const FlightSortTitle = styled('div')`
    text-align: center;
    line-height: 50px;
    font-size: medium;
`;
