/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Accordion } from './Accordion';

type Props = React.ComponentProps<typeof Accordion>;

export default {
  title: 'Components/Base/Accordion',
  component: Accordion
};

export const Default = (args: Props) => (
  <Accordion {...args}>
    <Accordion.Item title="Item 1">
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget tortor eu justo semper varius quis et libero. Duis volutpat lorem sit amet augue consequat, quis sollicitudin ligula imperdiet. Morbi sed arcu sit amet felis porttitor malesuada. Pellentesque sed enim ut arcu vulputate cursus vel id leo. In tempor mattis arcu eget ultricies. Nam sit amet mauris in turpis sodales porta. Cras eget fermentum lacus. Curabitur vitae pretium libero, in semper sapien. Vivamus eros felis, suscipit id malesuada ut, ornare et nisl. Donec ut feugiat est, at vehicula enim.
      </p>
    </Accordion.Item>
    <Accordion.Item title="Item 2" isOpen>
      <p>Quisque efficitur consectetur placerat. Ut vitae tellus ac arcu tincidunt efficitur placerat id nisl. In sagittis dolor risus, nec mollis tellus consectetur vel. In id lacus in turpis dignissim eleifend. Maecenas eu vehicula tortor, nec scelerisque tortor. Praesent non bibendum massa, ac pulvinar risus. Mauris tempor nisl vel ex ornare elementum congue nec nibh. Nam porttitor diam ac rhoncus pharetra. Nulla posuere nibh non nibh volutpat, non efficitur nisi molestie. Vestibulum nec lectus sit amet ex vulputate pharetra. Praesent sit amet mauris enim. Nunc non porta nisi, sed aliquam risus.</p>
    </Accordion.Item>
    <Accordion.Item title="Item 3">
      <p>Aliquam vehicula malesuada malesuada. Cras accumsan lorem a sapien luctus porttitor. Ut euismod mi nunc. Mauris quis gravida metus, vel varius nibh. Pellentesque consequat libero lacus, eget sodales lorem elementum non. Ut fermentum sodales justo at ornare. Integer bibendum erat vitae rhoncus aliquam. Maecenas sodales ac diam eget tristique. Mauris dignissim urna enim, ac mollis enim pellentesque nec. Proin nec sapien risus. Duis nec sagittis orci, sit amet pellentesque mi. In tristique ipsum ultricies tellus rhoncus feugiat.</p>
    </Accordion.Item>
  </Accordion>
);
Default.args = {} as Props;
