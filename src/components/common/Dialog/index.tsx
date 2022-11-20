import React, { PropsWithChildren } from 'react';
import Dialog from '@mui/material/Dialog';

type DialogProp = {
  show: boolean;
  onClose?: () => void;
};

function CommonDialog({
  children,
  show,
  onClose,
}: PropsWithChildren<DialogProp>) {
  return (
    <Dialog open={show} onClose={onClose} fullWidth maxWidth={'sm'}>
      <div className='p-6'>{children}</div>
    </Dialog>
  );
}

export default CommonDialog;
