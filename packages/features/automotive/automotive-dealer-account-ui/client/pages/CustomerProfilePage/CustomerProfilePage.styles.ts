/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Row, Button as ExoButton } from '@exo/frontend-components-base';

export const SavedConfigurations = styled('div')`
  display: grid;
  grid-gap: 2rem;
`;

export const AutoDealerHomePage = styled('div')`
  background: white;

  & .bx--grid {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  & .bx--col {
    padding-left: 0;
    padding-right: 0;
  }
  & .bx--row {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const TabletRow = styled(Row)`
  @media only screen and (max-width: 768px){
      margin-left: 0;
      margin-right: 0;

  }
`;
export const TabWrapper = styled('div')`
    max-width: 768px;
    padding: 32px;
    margin: auto;
    margin-top: 32px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px black;
    form div:nth-child(3), form div:nth-child(4){
        
    }
    `;

export const Title = styled('h2')`
    font-size: 40px;
    letter-spacing: 0.4px;
    color: #161616;
    margin-bottom: 3.5rem;
    `;
export const Subtitle = styled('h3')`
    font-size:23px;
    font-weight: 600;
    color:#161616;
    letter-spacing: 0.03px;
    margin-top: 40px;
    margin-bottom:24px;
    `;
export const Button = styled(ExoButton)`
    font-size:0.85rem;
    width:245px;
    margin-top:3.35rem;`;
