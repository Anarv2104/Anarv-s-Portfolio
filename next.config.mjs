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
  
  // Deployment-optimized image configuration with cross-browser compatibility
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
      {
        protocol: "https",
        hostname: "vercel.app",
        pathname: "**",
      },
    ],
    // Enable modern formats but ensure JPEG fallback works across all browsers
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days for stable deployment
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Ensure optimization works properly on Vercel
    unoptimized: false,
    loader: 'default',
  },
  
  // SASS optimization
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  
  // Stable configuration for reliable deployments
  experimental: {
    // Minimal experimental features for stability
  },
  
  // Compression and caching
  compress: true,
  poweredByHeader: false,
  
  // Simplified webpack configuration for reliable builds
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default withMDX(nextConfig);
