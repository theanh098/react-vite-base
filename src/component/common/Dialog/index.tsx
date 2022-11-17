import React, { PropsWithChildren } from 'react';
import Dialog from '@mui/material/Dialog';
import { useGlobalState } from '@/hook/useGlobalState';
import { updateDialogAction } from '@/store/action';

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
    <Dialog open={show} onClose={onClose}>
      {children}
    </Dialog>
  );
}

export default CommonDialog;
