import React from 'react';
import { createContext, PropsWithChildren } from 'react';
import {
  DialogAction,
  DialogState,
  dialogInitState,
  dialogReducer,
} from './dialog.slice';
import {
  SnackBarAction,
  SnackBarState,
  snackbarInitState,
  snackbarReducer,
} from './snackbar.slice';

export type GlobalState = {
  snackBarState: SnackBarState;
  dialogState: DialogState;
};

type Action = DialogAction | SnackBarAction;

const initialState: GlobalState = {
  dialogState: dialogInitState,
  snackBarState: snackbarInitState,
};

export const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function GlobalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

const reducer = (state: GlobalState, action: Action): GlobalState => ({
  dialogState: dialogReducer(state.dialogState, action as any),
  snackBarState: snackbarReducer(state.snackBarState, action as any),
});

/**
 * Selectors
 */

export const getSnackbar = (state: GlobalState) => state.snackBarState;

export const getDialog = (state: GlobalState) => state.dialogState;
