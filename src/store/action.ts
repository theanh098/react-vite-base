import {
  DialogActionTypeEnum,
  DialogState,
  DialogUpdateAction,
} from '@/types/dialog';
import {
  ResetSnackBarAction,
  SnackBarActionTypeEnum,
  SnackBarState,
  UpdateSnackBarAction,
} from '@/types/snackbar';

export const updateDialogAction = (
  payload: DialogState
): DialogUpdateAction => ({
  payload,
  type: DialogActionTypeEnum.Update,
});

export const updateSnackbarAction = (
  payload: SnackBarState
): UpdateSnackBarAction => ({
  payload,
  type: SnackBarActionTypeEnum.Update,
});

export const resetSnackbarAction = (
  payload: SnackBarState
): ResetSnackBarAction => ({
  payload: null,
  type: SnackBarActionTypeEnum.Reset,
});
