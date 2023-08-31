/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import faker from 'faker';

faker.seed(123);

export const getStories = (
  entries: Record<string, any>
): [string, { (args: any): JSX.Element; args: any }][] => {
  return Object.entries(entries).filter(([, v]) => typeof v === 'function');
};
