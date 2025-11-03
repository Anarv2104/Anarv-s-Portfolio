import { Suspense } from 'react';
import { Column } from '@once-ui-system/core';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const defaultFallback = (
  <Column
    fillWidth
    minHeight={200}
    background="neutral-weak"
    radius="m"
    style={{
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }}
  />
);

export default function LazyLoad({ children, fallback = defaultFallback, className }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
}