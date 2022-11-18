export type DialogState = {
  show: boolean;
  Component?: JSX.Element;
};

enum DialogActionTypeEnum {
  Update = 'Update',
}

type DialogUpdateAction = {
  type: DialogActionTypeEnum;
  payload: DialogState;
};

export type DialogAction = DialogUpdateAction;

export const dialogInitState = {
  show: false,
};

export const updateDialogAction = (
  payload: DialogState
): DialogUpdateAction => ({
  payload,
  type: DialogActionTypeEnum.Update,
});

export const dialogReducer = (
  state: DialogState,
  action: DialogAction
): DialogState => {
  switch (action.type) {
    case DialogActionTypeEnum.Update:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
