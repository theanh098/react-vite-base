import React from 'react';
import { GlobalContext } from '@/store/context';

export function useDispatch() {
  const { dispatch } = React.useContext(GlobalContext);
  return dispatch;
}
