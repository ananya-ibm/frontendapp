/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button as CarbonBtn } from '@exo/frontend-components-base';
import { FlightInfoLine } from '../../components/FlightInfoLine/FlightInfoLine';
import { FlightJourney as FlightJny } from '@exo/frontend-components-travel';
// import { PredefinedBundle as PredefinedBndl } from '../../components/PredefinedBundle/PredefinedBundle';

export const CheckoutPage = styled('div')`
    background-color: #f9f9f9;
`;
export const PageTitle = styled('div')`
    font-size: 1.25rem;
    text-align: center;
    background-color: white;
    padding: 1rem 0;
`;
export const Basket = styled('div')`
    background-color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;
export const BasketTotal = styled('div')`
    background-color: white;
    font-weight: 900;
    font-size: x-large;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 1rem;
`;
export const TotalLabel = styled('div')``;
export const TotalAmount = styled('div')``;

export const Button = styled(CarbonBtn)`
    display: inline-flex;
    font-size: 0.9rem;
    flex-shrink: 1;
    color: #2e5c99;
    text-decoration: none;
    font-weight: 400;
    margin-top: 1rem;
    align-self: flex-end;
`;
export const FlightInfoWrapper = styled('div')`
    border-bottom: 1px solid #f4f4f4;
    padding: 1rem;
`;
export const FlightInfo = styled(FlightInfoLine)`
    background-color: white;
    display: flex;
`;
export const FlightJourney = styled(FlightJny)`
    margin-bottom: 0.5rem;
`;

export const Cart = styled('div')`
    margin-top: 1rem;
    background-color: white;
`;

export const Ancillary = styled('div')`
    display: flex;
    justify-content: space-between;
    font-size: small;
    line-height: normal;
`;

export const EditBasket = styled(CarbonBtn)`
    display: inline-flex;
    font-size: 0.9rem;
    flex-shrink: 1;
    color: #2e5c99;
    text-decoration: none;
    font-weight: 400;
    margin-top: 1rem;
    align-self: flex-end;
`;

export const CheckoutButton = styled(Button)`
    display: flex;
    flex-grow: 1;
    max-width: none;
    background-color: #2e5c99;
    justify-content: center;
    padding: 0;
    border-radius: 2px;
    color: white;
`;

export const Checkout = styled('div')`
    background-color: white;
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
`;