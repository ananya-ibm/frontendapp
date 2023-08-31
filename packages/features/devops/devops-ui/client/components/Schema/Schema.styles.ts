/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Table, TableHeader } from '@exo/frontend-components-base';

export const Schema = styled.div`
  padding-top: 1rem;
`;

export const Name = styled.div`
  padding-bottom: 1rem;
`;

export const Description = styled.h2`
  padding-bottom: 1rem;
`;

export const DetailsTable = styled(Table)`
  padding-bottom: 1rem;
`;


export const DetailsTableHeader = styled(TableHeader)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const Queries = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const Query = styled.div`
  margin-top: 1rem;
`;

export const QueryTitle = styled.h3`
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 1rem;
`;

export const Arg = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export const Response = styled(Table)`
margin-top: 1rem;  
padding-bottom: 1rem;
  width: 40rem;
`;

