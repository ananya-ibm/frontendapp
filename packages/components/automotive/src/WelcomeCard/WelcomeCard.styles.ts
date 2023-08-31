/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button as ExoButton } from '@exo/frontend-components-base';


export const Image = styled('img')`
    max-width:100%;
    max-height:100%;
    width:768px;
    height:auto;`
export const ImageWrapper = styled('div')`
    max-height:316px;
    overflow:hidden;`;
export const Content = styled('div')`
    display:flex;
    flex-flow: column nowrap;
    padding:48px;
`
export const Title = styled('h2')`
    font-size:3.35rem;`;
export const Description = styled('p')`
    margin-top:1.75rem;
    font-size:1.25rem;`;
export const Button = styled(ExoButton)`
    font-size:0.85rem;
    width:215px;
    margin-top:3.35rem;`;
export const BottomText = styled('div')`
    margin-top:9rem;
    font-size:1.25rem;`;
export const Wrapper = styled('div')`
    max-width: 768px;
    margin: auto;
`;

