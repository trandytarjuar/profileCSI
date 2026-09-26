import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.CSI_BUILD_OUTPUT === '1' ? '.next-build' : '.next',
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;
