import { DialogState } from '@/types/dialog';
import { SnackBarState } from '@/types/snackbar';
import React from 'react';
import { createContext, PropsWithChildren } from 'react';
import { DialogUpdateAction, DialogActionTypeEnum } from '@/types/dialog';
import {
  ResetSnackBarAction,
  UpdateSnackBarAction,
  SnackBarActionTypeEnum,
} from '@/types/snackbar';

type GlobalState = {
  snackBarState: SnackBarState;
  dialogState: DialogState;
};

type Action = DialogUpdateAction | ResetSnackBarAction | UpdateSnackBarAction;

export const initialState: GlobalState = {
  dialogState: {
    show: false,
  },
  snackBarState: {
    message: '',
    show: false,
  },
};

export const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function GlobalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    /**
     * Dialog reducer
     */
    case DialogActionTypeEnum.Update:
      return {
        ...state,
        dialogState: {
          ...action.payload,
        },
      };
    /**
     * Snackbar reducer
     */
    case SnackBarActionTypeEnum.Update:
      return {
        ...state,
        snackBarState: {
          ...action.payload,
        },
      };
    case SnackBarActionTypeEnum.Reset:
      return {
        ...state,
        snackBarState: initialState.snackBarState,
      };
    default:
      return state;
  }
};
