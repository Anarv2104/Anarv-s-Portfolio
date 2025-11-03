'use client';

import { useEffect } from 'react';

export function usePerformanceOptimization() {
  useEffect(() => {
    // Optimize images after page load
    const optimizeImages = () => {
      // Add loading="lazy" to images that don't have it
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'lazy';
          img.decoding = 'async';
        }
      });

      // Optimize image sizes based on container
      const allImages = document.querySelectorAll('img');
      allImages.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          const parent = img.parentElement;
          if (parent) {
            const rect = parent.getBoundingClientRect();
            if (rect.width < 400) {
              img.sizes = '(max-width: 400px) 100vw, 400px';
            } else if (rect.width < 800) {
              img.sizes = '(max-width: 800px) 100vw, 800px';
            }
          }
        }
      });
    };

    // Run optimizations
    optimizeImages();

    // Run again after dynamic content loads
    const observer = new MutationObserver(() => {
      optimizeImages();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Prefetch next page resources on hover
    const prefetchOnHover = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach((link) => {
        if (link instanceof HTMLAnchorElement) {
          let timeoutId: NodeJS.Timeout;
          
          link.addEventListener('mouseenter', () => {
            timeoutId = setTimeout(() => {
              const prefetchLink = document.createElement('link');
              prefetchLink.rel = 'prefetch';
              prefetchLink.href = link.href;
              document.head.appendChild(prefetchLink);
            }, 100);
          });

          link.addEventListener('mouseleave', () => {
            clearTimeout(timeoutId);
          });
        }
      });
    };

    prefetchOnHover();

    return () => {
      observer.disconnect();
    };
  }, []);
}