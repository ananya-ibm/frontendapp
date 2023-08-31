/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { TableSplit } from '@carbon/react/icons';
import { useEffect, useState } from 'react';
import { DevWidget } from '@exo/frontend-features-dev-toolbar-ui';
import { Column, Grid, Row } from '@exo/frontend-components-base';

export const ToggleGrid = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      document.styleSheets[0].insertRule('.cds--row { border-bottom: 1px dashed green;, border-top: 1px dashed green; }', document.styleSheets[0].cssRules.length);
    } else {
      document.styleSheets[0].insertRule('.cds--row { border: none; }', document.styleSheets[0].cssRules.length);
    }
  }, [visible]);

  return (
    <>
      <DevWidget
        tooltip="Toggle Grid"
        onClick={() => setVisible(!visible)}
        icon={<TableSplit size={16} />}
      >
        Grid
      </DevWidget>

      {visible && (
        <div style={{ zIndex: '1000', position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <Grid>
          <Row>
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(() => (
              <Column sm="1" md="1" lg="1"><div style={{ backgroundColor: 'rgba(1, 1, 1, 0.035)', borderLeft: '1px dashed purple', borderRight: '1px dashed purple', height: '100vh' }}></div></Column>
            ))}
          </Row>
        </Grid>
      </div>
      )}
    </>
  );
};
