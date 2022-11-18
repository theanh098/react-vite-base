import { GlobalContext, GlobalState } from '@/store/context';
import React from 'react';

type Select = (state: GlobalState) => GlobalState[keyof GlobalState];

export function useSelector<T extends Select>(select: T): ReturnType<T> {
  const { state } = React.useContext(GlobalContext);
  return select(state) as any;
}
