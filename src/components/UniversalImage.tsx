'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface UniversalImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * UniversalImage - Handles modern image formats with bulletproof fallbacks
 * Works consistently across Chrome, Safari, Firefox, and Edge
 */
export function UniversalImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false,
  sizes,
  quality = 85,
  fill = false,
  style,
  onLoad,
  onError
}: UniversalImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [formatTried, setFormatTried] = useState<'original' | 'webp' | 'avif'>('original');

  // Check if browser supports modern formats
  const [supportsAvif, setSupportsAvif] = useState(false);
  const [supportsWebp, setSupportsWebp] = useState(false);

  useEffect(() => {
    // Simple and reliable browser support detection
    const checkImageSupport = async () => {
      try {
        // Check AVIF support
        const avifSupported = await new Promise<boolean>((resolve) => {
          const img = document.createElement('img');
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
        });

        // Check WebP support  
        const webpSupported = await new Promise<boolean>((resolve) => {
          const img = document.createElement('img');
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });

        setSupportsAvif(avifSupported);
        setSupportsWebp(webpSupported);
        
        console.log('Browser support - AVIF:', avifSupported, 'WebP:', webpSupported);

        // Set initial format based on browser support - only if original format is being used
        if (formatTried === 'original') {
          if (avifSupported) {
            const avifSrc = getOptimizedSrc('avif');
            setImageSrc(avifSrc);
            setFormatTried('avif');
          } else if (webpSupported) {
            const webpSrc = getOptimizedSrc('webp');
            setImageSrc(webpSrc);  
            setFormatTried('webp');
          }
        }
      } catch (error) {
        console.warn('Error checking image format support:', error);
        // Fallback to original format
        setSupportsAvif(false);
        setSupportsWebp(false);
      }
    };

    checkImageSupport();
  }, [src]);

  const getOptimizedSrc = (format: 'avif' | 'webp' | 'original') => {
    if (format === 'original') return src;
    
    const lastDotIndex = src.lastIndexOf('.');
    if (lastDotIndex === -1) return src;
    
    const basePath = src.substring(0, lastDotIndex);
    const extension = format === 'avif' ? '.avif' : '.webp';
    
    return `${basePath}${extension}`;
  };

  const handleImageError = () => {
    console.log(`Failed to load ${formatTried} format:`, imageSrc);
    
    // Try fallback formats in order: AVIF → WebP → Original
    if (formatTried === 'avif' && supportsWebp) {
      const webpSrc = getOptimizedSrc('webp');
      setImageSrc(webpSrc);
      setFormatTried('webp');
      setHasError(false);
    } else if ((formatTried === 'avif' && !supportsWebp) || formatTried === 'webp') {
      const originalSrc = getOptimizedSrc('original');
      setImageSrc(originalSrc);
      setFormatTried('original');
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded ${formatTried} format:`, imageSrc);
    setHasError(false);
    onLoad?.();
  };

  // Show fallback if all formats failed
  if (hasError) {
    return (
      <div 
        className={className}
        style={{ 
          ...style, 
          backgroundColor: '#f3f4f6', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          ...(width && height ? { width, height } : {}),
          ...(fill ? { position: 'absolute', inset: 0 } : {})
        }}
      >
        <span style={{ color: '#6b7280', fontSize: '12px', textAlign: 'center' }}>
          Image unavailable<br/>
          <small>{alt}</small>
        </span>
      </div>
    );
  }

  const imageProps = {
    src: imageSrc,
    alt,
    className,
    priority,
    quality,
    style,
    onLoad: handleImageLoad,
    onError: handleImageError,
    ...(sizes && { sizes }),
    ...(fill 
      ? { fill: true } 
      : { 
          width: width || 800, 
          height: height || 600 
        }
    ),
  };

  return <Image {...imageProps} />;
}

export default UniversalImage;