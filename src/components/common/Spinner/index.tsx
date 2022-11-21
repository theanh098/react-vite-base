import React, { useCallback, useMemo } from 'react';

import { CircularProgress, CircularProgressProps, Fade } from '@mui/material';
import clsx from 'clsx';

export interface ComponentProps {
  className?: string;
  circularProgressProps?: CircularProgressProps;
  loading?: boolean;
  type?: 'fullLayout' | 'fullContent';
}

export default function Spinner({
  circularProgressProps = { size: 50 },
  className,
  loading = true,
  type = 'fullLayout',
}: ComponentProps) {
  const rootClassname = useMemo(
    () =>
      clsx(
        className,
        loading
          ? 'w-full absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center'
          : 'hidden',
        type === 'fullLayout'
          ? 'h-[calc(100vh - 20px)] before:block before:content-[""] before:fixed top-0 bottom-0 left-0 right-0 bg-white opacity-[0.3]'
          : 'h-full bg-white opacity-[0.3]'
      ),
    [className, loading, type]
  );

  const onClick = useCallback((event: React.MouseEvent) => {
    event.nativeEvent.stopImmediatePropagation();
  }, []);

  return (
    <div
      className={rootClassname}
      data-testid='circularLoader'
      onMouseDown={onClick}
      onClick={onClick}
    >
      <Fade in={loading}>
        <CircularProgress {...circularProgressProps} />
      </Fade>
    </div>
  );
}
