import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  
  // Fix workspace root warning - explicitly set output file tracing root
  outputFileTracingRoot: process.cwd(),
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // ESLint configuration - temporarily disabled during builds for faster deployment
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable to avoid circular dependency issues
    dirs: ['src'], // Only lint the src directory for faster builds
  },
  
  // TypeScript configuration - strict type checking for production quality
  typescript: {
    ignoreBuildErrors: false, // Keep type checking enabled
  },
  
  // Logging configuration - reduce verbose output
  logging: {
    fetches: {
      fullUrl: false, // Reduce log verbosity
    },
  },
  
  // Ultra-aggressive image optimization for Vercel
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
        pathname: "**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
    path: '/_next/image',
  },
  
  // SASS optimization
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  
    // Advanced optimizations
  experimental: {
    optimizePackageImports: ["@once-ui-system/core", "react-icons"],
  },
  
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Webpack optimization for performance and memory
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Advanced bundle optimization
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 244000,
          },
          onceUI: {
            test: /[\\/]node_modules[\\/]@once-ui-system[\\/]/,
            name: 'once-ui',
            priority: 10,
            chunks: 'all',
          },
          reactIcons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'react-icons',
            priority: 10,
            chunks: 'all',
          },
        },
      },
      usedExports: true,
      sideEffects: false,
    };
    
    // Performance optimizations
    if (!dev) {
      config.optimization.minimize = true;
    }
    
    return config;
  },
};

export default withMDX(nextConfig);
