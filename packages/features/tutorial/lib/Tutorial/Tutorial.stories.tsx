/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Step } from 'react-joyride';
import { Tutorial } from './Tutorial';

export default {
  title: 'Features/Tutorial/Tutorial',
  component: Tutorial
};

export const Default = args => (
  <>
    <div style={{ position: 'relative' }}>
      <img
        style={{ width: '80rem' }}
        src="https://images.unsplash.com/photo-1631564881809-16af7615a2ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80"
      />
      <button
        id="button1"
        style={{
          backgroundColor: 'black',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.8rem',
          fontSize: '120%',
          border: '1px solid white',
          position: 'absolute',
          left: '30%',
          top: '30%'
        }}
      >
        Button 1
      </button>
      <button
        id="button2"
        style={{
          backgroundColor: 'black',
          color: 'white',
          fontWeight: 'bold',
          padding: '0.8rem',
          fontSize: '120%',
          border: '1px solid white',
          position: 'absolute',
          left: '50%',
          top: '50%'
        }}
      >
        Button 2
      </button>
    </div>
    <Tutorial {...args} />
  </>
);
Default.args = {
  steps: [
    { target: '#button1', title: 'Button 1', content: 'This is an awesome button' },
    { target: '#button2', title: 'Button 2', content: 'This is a dull and boring button' }
  ] as Step[],
  isEnabled: true
};
