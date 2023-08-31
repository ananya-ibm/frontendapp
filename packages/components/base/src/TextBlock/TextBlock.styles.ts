/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const TextBlock = styled.div`
  /* stylelint-disable */

  p, li {
    ${props => responsiveFontBlock(props.theme.typography.body.long.M, {})};
  }

  /* NOTE: We need .cw here to support using dangerouslySetInnerHTML if needed
           with the correct styling being applied

           See for instance packages/features/content/content-provider-aem-core-components/lib/Text/Text.tsx
  */
  > *, > .cw > * {
    margin-bottom: ${props => props.theme.spacing.stack.s5};
  }

  > *::last-child, > .cw > * {
    margin-bottom: 0;
  }


  ul { 
   list-style-position: inside; 
   list-style-type: disc; 
   margin-left: ${props => props.theme.spacing.inline.s5}; 
  }

  ol { 
    list-style-position: inside; 
    list-style-type: decimal; 
    margin-left: ${props => props.theme.spacing.inline.s5}; 
  }

  ul ul, ol ul { 
    list-style-position: inside; 
    list-style-type: circle; 
    margin-left: ${props => props.theme.spacing.inline.s5}; 
  }

  ol ol, ul ol { 
    list-style-position: inside; 
    list-style-type: lower-latin; 
    margin-left: ${props => props.theme.spacing.inline.s5}; 
  }

  /* TODO: Maybe these should all be global styles */
  h1 {
    ${props => responsiveFontBlock(props.theme.typography.heading.heading1, {})};
  }

  h2 {
    ${props => responsiveFontBlock(props.theme.typography.heading.heading2, {})};
  }

  h3 {
    ${props => responsiveFontBlock(props.theme.typography.heading.heading3, {})};
  }

  h4 {
    ${props => responsiveFontBlock(props.theme.typography.heading.heading4, {})};
  }

  h5 {
    ${props => responsiveFontBlock(props.theme.typography.heading.heading5, {})};
  }

  blockquote { 
    border-left: 4px solid ${props => props.theme.colors.brand.brand1.base};
    margin-left: ${props => props.theme.spacing.inline.s5};
    padding-left: ${props => props.theme.spacing.inline.s3};

    p {
      ${props => responsiveFontBlock(props.theme.typography.body.long.L, {})};
    }
  }
`;
