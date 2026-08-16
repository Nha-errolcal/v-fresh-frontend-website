/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silences the Next.js 16 strict error
  turbopack: {},

  webpack: (config: any, { dev, isServer }: any) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;