import { type NextConfig } from 'next';

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/lichess-papers' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
