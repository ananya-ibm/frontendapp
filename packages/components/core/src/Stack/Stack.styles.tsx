/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const Stack = styled('div')<{
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  orientation: 'vertical' | 'horizontal';
  justify: 'start' | 'end' | 'between';
}>`
  display: flex;
  ${props => (props.orientation === 'vertical' ? 'flex-direction: column;' : '')}
  ${props => (props.orientation === 'horizontal' ? 'flex-direction: row;' : '')}

  ${props => (props.justify === 'start' ? 'justify-content: start;' : '')}
  ${props => (props.justify === 'end' ? 'justify-content: end;' : '')}
  ${props => (props.justify === 'between' ? 'justify-content: space-between;' : '')}

  ${props => (props.orientation === 'vertical' && props.justify !== 'start' ? 'height: 100%;' : '')}

  ${props => (props.size === 'xs' ? `gap: ${props.theme.spacing.inline.s3}` : '')}
  ${props => (props.size === 'sm' ? `gap: ${props.theme.spacing.inline.s4}` : '')}
  ${props => (props.size === 'md' ? `gap: ${props.theme.spacing.inline.s5}` : '')}
  ${props => (props.size === 'lg' ? `gap: ${props.theme.spacing.inline.s6}` : '')}
  ${props => (props.size === 'xl' ? `gap: ${props.theme.spacing.inline.s7}` : '')}
`;
