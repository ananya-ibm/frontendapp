/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const evaluateBreakpoint = (a) => typeof window !== 'undefined' && a && window?.matchMedia && window.matchMedia(a``.join('').match(/(\([^)]*\))/g)).matches;

export default evaluateBreakpoint;
