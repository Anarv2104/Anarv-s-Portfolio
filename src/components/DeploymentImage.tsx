'use client';

import { CSSProperties } from 'react';

interface DeploymentImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * DeploymentImage - Simple, reliable image component for deployment
 * Uses native HTML picture element for bulletproof format fallbacks
 */
export function DeploymentImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className, 
  priority = false,
  style,
  onLoad,
  onError
}: DeploymentImageProps) {
  // Get optimized source paths
  const getOptimizedSrc = (format: 'avif' | 'webp' | 'original') => {
    if (format === 'original') return src;
    
    const lastDotIndex = src.lastIndexOf('.');
    if (lastDotIndex === -1) return src;
    
    const basePath = src.substring(0, lastDotIndex);
    const extension = format === 'avif' ? '.avif' : '.webp';
    
    return `${basePath}${extension}`;
  };

  const avifSrc = getOptimizedSrc('avif');
  const webpSrc = getOptimizedSrc('webp');
  const jpegSrc = getOptimizedSrc('original');

  return (
    <picture>
      {/* AVIF source - best compression */}
      <source srcSet={avifSrc} type="image/avif" />
      
      {/* WebP source - wide browser support */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* JPEG fallback - universal support */}
      <img
        src={jpegSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{
          objectFit: 'cover',
          ...style
        }}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  );
}

export default DeploymentImage;