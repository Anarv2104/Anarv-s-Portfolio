'use client';

import { useEffect } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

export default function ImagePreloader({ images, priority = false }: ImagePreloaderProps) {
  useEffect(() => {
    if (!images.length) return;

    const preloadImages = () => {
      images.forEach((src) => {
        // Create preload link
        const link = document.createElement('link');
        link.rel = priority ? 'preload' : 'prefetch';
        link.as = 'image';
        link.href = src;
        
        // Add to document head
        document.head.appendChild(link);

        // Also create image element for immediate caching
        const img = new window.Image();
        img.src = src;
        
        // Handle load and error
        img.onload = () => console.log(`Preloaded: ${src}`);
        img.onerror = () => console.warn(`Failed to preload: ${src}`);
      });
    };

    // Use requestIdleCallback for non-critical preloading
    if (priority) {
      preloadImages();
    } else {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadImages, { timeout: 2000 });
      } else {
        setTimeout(preloadImages, 100);
      }
    }
  }, [images, priority]);

  return null;
}