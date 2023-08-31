/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { BarChart } from '../charts/BarChart/BarChart';

export const LoginCount = ({loginsData}) => {
  return (
    <>
      <BarChart loginData={loginsData} />
      <pre id="json">{JSON.stringify(loginsData, null, '\t')}</pre>
    </>
  );
};
