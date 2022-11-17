import React from 'react';
import { GlobalContext } from '@/store/context';

export function useGlobalState() {
  return React.useContext(GlobalContext);
}
