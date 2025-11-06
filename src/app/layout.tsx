import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";

import {
  Background,
  Column,
  Flex,
  Meta,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers, WebVitals } from "@/components";
import ImagePreloader from "@/components/ImagePreloader";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import HydrationSafeBody from "@/components/HydrationSafeBody";
import NoSSR from "@/components/NoSSR";
import HydrationCleaner from "@/components/HydrationCleaner";
import { baseURL, effects, fonts, style, dataStyle, home, person } from "@/resources";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: home.title,
    description: home.description,
    openGraph: {
      title: home.title,
      description: home.description,
      url: baseURL,
      siteName: `${person.name}'s Portfolio`,
      images: [
        {
          url: `${baseURL}${home.image}`,
          width: 1200,
          height: 630,
          alt: home.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: home.title,
      description: home.description,
      images: [`${baseURL}${home.image}`],
    },
    metadataBase: new URL(baseURL),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        {/* Ultra-aggressive DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//vercel.app" />
        
        {/* Preconnect for critical external resources */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        
        {/* Critical image preloading with modern formats and highest priority */}
        <link rel="preload" href="/images/avatar.avif" as="image" type="image/avif" fetchPriority="high" />
        <link rel="preload" href="/images/avatar.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/avatar.jpg" as="image" type="image/jpeg" fetchPriority="high" />
        <link rel="preload" href="/images/teammates/prayers.avif" as="image" type="image/avif" fetchPriority="high" />
        <link rel="preload" href="/images/teammates/prayers.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="/images/teammates/priyank.avif" as="image" type="image/avif" fetchPriority="high" />
        <link rel="preload" href="/images/teammates/priyank.webp" as="image" type="image/webp" fetchPriority="high" />
        
        {/* Preload critical CSS and fonts */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="preload" href="/_next/static/chunks/main.js" as="script" />
        
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                  
                  // Remove browser extension attributes to prevent hydration mismatch
                  setTimeout(() => {
                    const body = document.body;
                    if (body) {
                      body.removeAttribute('data-new-gr-c-s-check-loaded');
                      body.removeAttribute('data-gr-ext-installed');
                      body.removeAttribute('data-new-gr-c-s-loaded');
                      body.removeAttribute('data-gramm');
                      body.removeAttribute('data-lt-tmp-id');
                      body.removeAttribute('spellcheck');
                    }
                  }, 0);
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <HydrationSafeBody>
          <RevealFx fill position="absolute">
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </RevealFx>
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
          <NoSSR>
            <WebVitals />
            <ImagePreloader
              images={[
                '/images/avatar.avif',
                '/images/avatar.webp', 
                '/images/avatar.jpg',
                '/images/teammates/prayers.avif',
                '/images/teammates/prayers.webp',
                '/images/teammates/prayers.jpg',
                '/images/teammates/priyank.avif',
                '/images/teammates/priyank.webp',
                '/images/teammates/priyank.jpg',
              ]}
              priority={true}
              aggressive={true}
            />
            <PerformanceOptimizer />
            <ServiceWorkerRegistration />
            <HydrationCleaner />
          </NoSSR>
        </HydrationSafeBody>
      </Providers>
    </Flex>
  );
}
