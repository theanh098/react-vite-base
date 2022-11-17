export type DialogState = {
  show: boolean;
  Component?: JSX.Element;
};

export enum DialogActionTypeEnum {
  Update = 'Update',
}

export type DialogUpdateAction = {
  type: DialogActionTypeEnum;
  payload: DialogState;
};
