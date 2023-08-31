/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const RealDate = Date;

const mockDate = isoDate => {
  const mockedDate = new RealDate(isoDate);
  global.Date = class extends Date {
    constructor() {
      super();
      return mockedDate;
    }
  };
  global.Date.now = () => mockedDate.getTime();
  global.Date.getTime = () => mockedDate.getTime();
  global.Date.toDateString = () => mockedDate.toDateString();
  global.Date.toString = () => mockedDate.toString();
};

// TODO: We should really add a today() function
const mockNewDate = isoDate => {
  const mockedDate = new RealDate(isoDate);
  global.Date = class extends Date {
    constructor(...args) {
      super(...args);

      return args && args.length > 0 ? new RealDate(...args) : mockedDate;
    }
  };
};

export { RealDate, mockDate, mockNewDate };
