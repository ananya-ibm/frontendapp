/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

declare global {
  interface EXOFeatureConfig {
    sapConversationalAssitant?: {
      token: string;
      channelId: string;
      apiRoot: string;
      scriptSrc: string;
    };
  }
}
export * from './SapConversationalAssistanceLoader/SapConversationalAssistanceLoader';
