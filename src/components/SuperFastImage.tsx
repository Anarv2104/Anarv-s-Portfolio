'use client';

import Image, { ImageProps } from 'next/image';
import { CSSProperties, useState, useEffect, useCallback } from 'react';

interface SuperFastImageProps extends Omit<ImageProps, 'src' | 'onLoad'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
  placeholder?: 'blur' | 'empty';
}

// Ultra-optimized base64 placeholder
const createPlaceholder = (w: number, h: number) => {
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><circle cx="${w/2}" cy="${h/2}" r="20" fill="#e5e7eb" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/></circle></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};

export default function SuperFastImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  quality = 95,
  eager = false,
  placeholder = 'blur',
  className,
  style,
  ...props
}: SuperFastImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload critical images
  useEffect(() => {
    if (priority || eager) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  }, [src, priority, eager]);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
    console.warn(`Failed to load image: ${src}`);
  }, [src]);

  const blurDataURL = placeholder === 'blur' ? createPlaceholder(width, height) : undefined;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={priority || eager ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={handleLoad}
        onError={handleError}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: imageLoaded ? 1 : 0.8,
          filter: imageLoaded ? 'none' : 'blur(2px)',
        }}
        {...props}
      />
      
      {/* Loading state overlay */}
      {!imageLoaded && !imageError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            pointerEvents: 'none',
          }}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}