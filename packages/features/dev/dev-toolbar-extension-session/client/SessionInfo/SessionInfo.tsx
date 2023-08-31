/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { User } from '@carbon/react/icons';
import {
  Button,
  ComposedModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextArea
} from '@carbon/react';
import React, { useRef, useState } from 'react';
import { DevWidget } from '@exo/frontend-features-dev-toolbar-ui';

export const SessionInfo = () => {
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>();

  const isSSR = typeof window === 'undefined';
  const session = isSSR ? {} : JSON.parse(window.localStorage.getItem('sessionContext') ?? '{}');
  return (
    <>
      <DevWidget tooltip="Session inspector" icon={<User size={16} />} onClick={() => setOpen(true)}>
        {session?.username ?? session?.type ?? 'NONE'}
      </DevWidget>

      {open && (
        <ComposedModal open={open} onClose={() => setOpen(false)}>
          <ModalHeader label="Developer" title="Update session state" />
          <ModalBody>
            <div style={{ marginBottom: '1rem' }}>
              <TextArea
                // @ts-ignore
                ref={textareaRef}
                labelText="Session content"
                rows={20}
                cols={80}
                defaultValue={JSON.stringify(session, undefined, '  ')}
              ></TextArea>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Button
                kind="danger"
                onClick={() => {
                  textareaRef.current!.value = '{}';
                }}
              >
                Clear session
              </Button>
            </div>
          </ModalBody>
          <ModalFooter
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
            onRequestSubmit={() => {
              // Check value
              JSON.parse(textareaRef.current!.value);
              window.localStorage.setItem('sessionContext', textareaRef.current!.value);
              setOpen(false);
            }}
          />
        </ComposedModal>
      )}
    </>
  );
};
