import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.VERCEL === '1'
  ? { output: 'export', images: { unoptimized: true } }
  : {};

export default nextConfig;
