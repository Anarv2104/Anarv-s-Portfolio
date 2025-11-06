'use client';

import { Column } from "@once-ui-system/core";
import { useEffect, useState } from 'react';

interface HydrationSafeBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function HydrationSafeBody({ children, className }: HydrationSafeBodyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Clean up browser extension attributes after mount
    const body = document.body;
    if (body) {
      body.removeAttribute('data-new-gr-c-s-check-loaded');
      body.removeAttribute('data-gr-ext-installed');
      body.removeAttribute('data-new-gr-c-s-loaded');
      body.removeAttribute('data-gramm');
      body.removeAttribute('data-lt-tmp-id');
      body.removeAttribute('spellcheck');
    }
  }, []);

  // Always render the body element properly (no div wrapper)
  return (
    <Column
      as="body"
      background="page"
      fillWidth
      style={{ minHeight: "100vh" }}
      margin="0"
      padding="0"
      horizontal="center"
      className={className}
      suppressHydrationWarning
    >
      {children}
    </Column>
  );
}