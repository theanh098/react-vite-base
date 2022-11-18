import { SnackbarOrigin } from '@mui/material';

export type SnackBarState = {
  show: boolean;
  message: string;
  messageType?: 'success' | 'info' | 'warning' | 'error';
  anchorOrigin?: SnackbarOrigin;
};

enum SnackBarActionTypeEnum {
  Update = 'SNACK_BAR_UPDATE',
  Reset = 'SNACK_BAR_RESET',
}

type UpdateSnackBarAction = {
  type: SnackBarActionTypeEnum.Update;
  payload: SnackBarState;
};

type ResetSnackBarAction = {
  type: SnackBarActionTypeEnum.Reset;
  payload: null;
};

export type SnackBarAction = UpdateSnackBarAction | ResetSnackBarAction;

export const snackbarInitState = {
  message: '',
  show: false,
};

export const updateSnackbarAction = (
  payload: SnackBarState
): SnackBarAction => ({
  payload,
  type: SnackBarActionTypeEnum.Update,
});

export const resetSnackbarAction = (): SnackBarAction => ({
  payload: null,
  type: SnackBarActionTypeEnum.Reset,
});

export const snackbarReducer = (
  state: SnackBarState,
  action: SnackBarAction
): SnackBarState => {
  switch (action.type) {
    case SnackBarActionTypeEnum.Update:
      return {
        ...state,
        ...action.payload,
      };
    case SnackBarActionTypeEnum.Reset:
      return snackbarInitState;
    default:
      return state;
  }
};
