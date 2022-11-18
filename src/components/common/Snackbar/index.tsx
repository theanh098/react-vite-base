import { useDispatch } from '@/hooks/useDispatch';
import { useSelector } from '@/hooks/useSelector';
import { getSnackbar } from '@/store/context';
import { resetSnackbarAction } from '@/store/snackbar.slice';
import { Alert, Snackbar as SnackbarMui } from '@mui/material';
import React from 'react';

function Snackbar() {
  const { message, show, anchorOrigin, messageType } = useSelector(getSnackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetSnackbarAction());
  };

  if (show) {
    const keyOfMessage = new Date().getTime();
    return (
      <div className='w-full'>
        <SnackbarMui
          key={keyOfMessage}
          anchorOrigin={
            anchorOrigin ?? { vertical: 'top', horizontal: 'center' }
          }
          open={show}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            data-testid='alertSnackbar'
            elevation={6}
            variant='filled'
            onClose={handleClose}
            severity={messageType}
            iconMapping={{ warning: <></> }}
          >
            {message}
          </Alert>
        </SnackbarMui>
      </div>
    );
  }
  return null;
}

export default Snackbar;
