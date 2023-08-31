/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TextBlock } from './TextBlock';

export default {
  title: 'Components/Base/TextBlock',
  component: TextBlock
};

type Props = React.ComponentProps<typeof TextBlock>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => (
  <TextBlock {...args}>
    <h1>h1. Header level 1</h1>
    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Sed eu imperdiet
      odio. Nulla ornare pharetra ante vel vulputate. Suspendisse potenti. Donec id lacus quis nisi
      condimentum placerat. Donec sodales velit et congue dignissim. Ut a fringilla eros. Donec
      vehicula, enim ac tincidunt porttitor, quam purus commodo ante, nec venenatis lectus dui vitae
      metus. Nulla suscipit ultricies tristique. Class aptent taciti sociosqu ad litora torquent per
      conubia nostra, per inceptos himenaeos. Proin condimentum gravida turpis, in molestie nulla
      mattis non. Cras gravida ipsum eu tellus fringilla, vitae imperdiet diam posuere. Mauris
      auctor pellentesque sem laoreet posuere.{' '}
      <em>
        Pellentesque dolor diam, porttitor fringilla auctor id, ultrices a diam. Curabitur nibh
        tellus, imperdiet in tristique vel, accumsan at mi.
      </em>
    </p>
    <h2>h2. Header level 2</h2>
    <h3>h3. Header level 3</h3>
    <p>
      Quisque turpis magna, dignissim at rhoncus et, bibendum at massa. Nunc massa diam, ullamcorper
      id ante ac, bibendum maximus tellus. Quisque eu vestibulum ante. Suspendisse ullamcorper
      congue tortor, a vestibulum est facilisis id. Etiam ullamcorper sapien nec sapien porttitor
      tempus. In efficitur convallis libero sit amet ultricies. Cras dolor justo, congue et magna
      eu, vulputate finibus enim. Suspendisse id nunc ipsum. Maecenas quis congue ligula. Aenean
      imperdiet eu sem eget varius. Cras id lobortis urna. Integer rutrum in quam et scelerisque.
      Morbi at velit et leo consequat malesuada.
    </p>
    <p>
      Praesent sollicitudin mi ac lorem malesuada, ut sodales nisi tristique. Duis dapibus urna
      augue, eu viverra tortor tincidunt in. Nullam ac egestas elit, vel malesuada ex. Sed purus
      dui, pharetra eget suscipit at, elementum vitae est. Mauris blandit nulla vel urna bibendum,
      sit amet malesuada turpis mollis. Morbi ut pharetra neque. Sed purus quam, accumsan id
      imperdiet vitae, bibendum at mauris. Integer vulputate massa nec lacus ultrices egestas.
      Maecenas convallis quam mauris, eu posuere risus sodales vulputate. Etiam auctor nisi sed odio
      sagittis, commodo accumsan tortor blandit.
    </p>
    <ol>
      <li>This is an ordered list.</li>
      <li>
        Nested lists:
        <ol>
          <li>Lorem</li>
          <li>
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Fusce tincidunt lorem sit amet arcu consectetur faucibus.
          </li>
          <li>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          </li>
        </ol>
      </li>
      <li>Morbi feugiat, elit imperdiet eleifend porttitor.</li>
    </ol>
    <h3>h3. Header level 3</h3>
    <p>
      Donec eleifend sollicitudin mattis. Donec hendrerit at urna et porttitor. Nulla ultricies
      neque et orci malesuada rhoncus. Duis imperdiet lorem ut porta iaculis. Curabitur bibendum
      augue vel ipsum semper egestas. Phasellus euismod ligula vel interdum pretium. Nulla lorem
      ligula, mollis id dapibus et, iaculis id mauris. Nullam porta condimentum nibh a tempus.
      Integer id fermentum velit. Fusce diam est, feugiat quis ullamcorper nec, semper quis felis.
    </p>
    <blockquote>
      <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
    <p>
      Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce
      tincidunt lorem sit amet arcu consectetur faucibus. Phasellus arcu dui, eleifend eget lectus
      eu, ullamcorper elementum nulla. Nulla vehicula lectus eu tellus elementum, non blandit ipsum
      blandit. Vestibulum suscipit vitae lorem eu lacinia. Sed molestie odio vitae felis ultrices,
      nec bibendum odio varius. Nam malesuada nisl enim, id posuere justo dignissim eget. Fusce
      hendrerit, ligula sit amet pharetra convallis, enim velit elementum arcu, eget dapibus libero
      lectus sed enim. Proin ut turpis ut nibh tempor posuere. Sed sed nisl faucibus, rhoncus eros
      ac, bibendum turpis. Morbi feugiat, elit imperdiet eleifend porttitor, risus erat dapibus
      arcu, quis scelerisque nulla ante nec tellus. Vestibulum ante ipsum primis in faucibus orci
      luctus et ultrices posuere cubilia curae;
    </p>
    <ul>
      <li>This is a list.</li>
      <li>
        Nested lists:
        <ul>
          <li>Lorem</li>
          <li>
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Fusce tincidunt lorem sit amet arcu consectetur faucibus.
          </li>
          <li>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
          </li>
        </ul>
      </li>
      <li>Morbi feugiat, elit imperdiet eleifend porttitor.</li>
    </ul>
  </TextBlock>
);
