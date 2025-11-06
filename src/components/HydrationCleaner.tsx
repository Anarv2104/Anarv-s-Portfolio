'use client';

import { useEffect } from 'react';

/**
 * Hydration utility to handle browser extension conflicts
 * This runs after hydration to clean up extension-added attributes
 */
export default function HydrationCleaner() {
  useEffect(() => {
    // Run after hydration is complete
    const cleanupExtensions = () => {
      const body = document.body;
      const html = document.documentElement;
      
      // Remove browser extension attributes that cause hydration mismatches
      const attributesToRemove = [
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'data-new-gr-c-s-loaded',
        'data-gramm',
        'data-gramm_editor',
        'data-lt-tmp-id',
        'spellcheck',
        'data-ms-editor',
        'data-adblock-key'
      ];

      // Clean body attributes
      if (body) {
        attributesToRemove.forEach(attr => {
          body.removeAttribute(attr);
        });
      }

      // Clean html attributes  
      if (html) {
        attributesToRemove.forEach(attr => {
          html.removeAttribute(attr);
        });
      }
    };

    // Clean up immediately
    cleanupExtensions();

    // Also clean up after a small delay in case extensions add attributes later
    const timeoutId = setTimeout(cleanupExtensions, 100);
    
    // Set up mutation observer to continuously clean up extension attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName;
          
          if (attrName && (
            attrName.startsWith('data-gr-') ||
            attrName.startsWith('data-gramm') ||
            attrName.startsWith('data-lt-') ||
            attrName.startsWith('data-ms-') ||
            attrName.includes('grammarly')
          )) {
            target.removeAttribute(attrName);
          }
        }
      });
    });

    // Observe both body and html for attribute changes
    if (document.body) {
      observer.observe(document.body, { attributes: true });
    }
    if (document.documentElement) {
      observer.observe(document.documentElement, { attributes: true });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return null;
}