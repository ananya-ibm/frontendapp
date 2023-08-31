/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Accordion as CarbonAccordion, AccordionItem as CarbonAccordionItem } from '@carbon/react';

export const Accordion = ({ children }: AccordionProps) => {
  return (
    <CarbonAccordion>
      {React.Children.map(children, (c) =>
        c && typeof c === 'object' ? React.cloneElement(c.type(c.props), { key: c.key }) : c
      )}
    </CarbonAccordion>
  );
}

type AccordionProps = {
  children: any;
}

Accordion.Item = ({ title, isOpen, children }: ItemProps) => {
  return <CarbonAccordionItem title={title} open={isOpen}>{children}</CarbonAccordionItem>
}

type ItemProps = {
  title: string;
  isOpen?: boolean;
  children: any;
}