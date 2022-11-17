export enum SnackBarActionTypeEnum {
  Update = 'SNACK_BAR_UPDATE',
  Reset = 'SNACK_BAR_RESET',
}

export type SnackBarState = {
  show: boolean;
  message: string;
  messageType?: 'success' | 'info' | 'warning' | 'error';
};

export type UpdateSnackBarAction = {
  type: SnackBarActionTypeEnum.Update;
  payload: SnackBarState;
};

export type ResetSnackBarAction = {
  type: SnackBarActionTypeEnum.Reset;
  payload: null;
};
