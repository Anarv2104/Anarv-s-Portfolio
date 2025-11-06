'use client';

import Image, { ImageProps } from 'next/image';
import { CSSProperties, useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  alt: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  quality?: number;
  className?: string;
  style?: CSSProperties;
  preload?: boolean;
}

// High-quality blur placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  loading = 'lazy',
  quality = 90,
  placeholder = 'blur',
  preload = false,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [currentFormat, setCurrentFormat] = useState<'avif' | 'webp' | 'original'>('avif');

  // Get optimized image source based on format
  const getOptimizedSrc = (format: 'avif' | 'webp' | 'original') => {
    if (format === 'original') return src;
    
    const lastDotIndex = src.lastIndexOf('.');
    if (lastDotIndex === -1) return src;
    
    const basePath = src.substring(0, lastDotIndex);
    const extension = format === 'avif' ? '.avif' : '.webp';
    
    return `${basePath}${extension}`;
  };

  // Update imageSrc when format changes
  useEffect(() => {
    setImageSrc(getOptimizedSrc(currentFormat));
  }, [currentFormat, src]);

  // Preload critical images with modern formats
  useEffect(() => {
    if (preload || priority) {
      // Preload AVIF first, then WebP, then original
      ['avif', 'webp', 'original'].forEach((format, index) => {
        setTimeout(() => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = getOptimizedSrc(format as any);
          document.head.appendChild(link);
        }, index * 100); // Stagger preloads
      });
    }
  }, [src, preload, priority]);

  const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`;

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={loading}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          // Try fallback formats: AVIF → WebP → Original
          if (currentFormat === 'avif') {
            setCurrentFormat('webp');
          } else if (currentFormat === 'webp') {
            setCurrentFormat('original');
          } else {
            console.warn(`Failed to load image: ${src}`);
          }
        }}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0.8,
          willChange: 'opacity',
        }}
        {...props}
      />
    </div>
  );
}