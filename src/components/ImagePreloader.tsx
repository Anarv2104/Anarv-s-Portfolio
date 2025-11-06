'use client';

import { useEffect, useCallback } from 'react';

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
  aggressive?: boolean;
}

export default function ImagePreloader({ images, priority = false, aggressive = false }: ImagePreloaderProps) {
  const preloadImage = useCallback((src: string, isPriority: boolean) => {
    return new Promise((resolve, reject) => {
      // Create multiple preload strategies
      const link = document.createElement('link');
      link.rel = isPriority ? 'preload' : 'prefetch';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = isPriority ? 'high' : 'low';
      document.head.appendChild(link);

      // Also create image element for immediate caching
      const img = new window.Image();
      
      // Set optimal loading attributes
      img.loading = isPriority ? 'eager' : 'lazy';
      img.decoding = isPriority ? 'sync' : 'async';
      img.fetchPriority = isPriority ? 'high' : 'low';
      
      img.onload = () => {
        console.log(`✅ Preloaded: ${src}`);
        resolve(src);
      };
      
      img.onerror = () => {
        console.warn(`❌ Failed to preload: ${src}`);
        reject(new Error(`Failed to load ${src}`));
      };
      
      img.src = src;
    });
  }, []);

  const batchPreload = useCallback(async (imagesToLoad: string[], isPriority: boolean) => {
    const batchSize = aggressive ? 6 : 3;
    for (let i = 0; i < imagesToLoad.length; i += batchSize) {
      const batch = imagesToLoad.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map(src => preloadImage(src, isPriority))
      );
      
      // Small delay between batches to prevent overwhelming
      if (i + batchSize < imagesToLoad.length && !isPriority) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }, [preloadImage, aggressive]);

  useEffect(() => {
    if (!images.length) return;

    const executePreloading = async () => {
      if (priority) {
        // Immediate preloading for critical images
        await batchPreload(images, true);
      } else {
        // Smart preloading based on browser capabilities
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => {
            batchPreload(images, false);
          }, { timeout: 1000 });
        } else {
          setTimeout(() => {
            batchPreload(images, false);
          }, 100);
        }
      }
    };

    // Check if images are already cached
    const uncachedImages = images.filter(src => {
      const img = document.querySelector(`img[src="${src}"]`) as HTMLImageElement;
      return !img || !img.complete;
    });

    if (uncachedImages.length > 0) {
      executePreloading();
    }
  }, [images, priority, batchPreload]);

  // Preconnect to image domains for faster loading
  useEffect(() => {
    const domains = Array.from(new Set(
      images.map(src => {
        try {
          return new URL(src, window.location.origin).hostname;
        } catch {
          return null;
        }
      }).filter(Boolean)
    ));

    domains.forEach(domain => {
      if (domain && domain !== window.location.hostname) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = `https://${domain}`;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }, [images]);

  return null;
}