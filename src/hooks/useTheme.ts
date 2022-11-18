import { useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

export function useTheme() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);
}
