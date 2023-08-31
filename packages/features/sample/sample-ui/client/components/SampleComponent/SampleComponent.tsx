/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SampleDataContainerRenderProps } from '@exo/frontend-features-sample-logic';

export const SampleComponent = (props: SampleDataContainerRenderProps) => {
  return (
    <div style={{ padding: '2rem', margin: '2rem', border: '4px dashed #666666' }}>
      Here is an example of a smart component fetching categories from a commerce platform... here are the categories I got; {props.data?.map(d => d.name).join(', ')}
    </div>
  );
};
