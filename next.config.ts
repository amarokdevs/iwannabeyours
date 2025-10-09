import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
    babel: {
      plugins: [
        [
          'babel-plugin-react-compiler',
          {
            compilationMode: 'annotation',
            source: 'compiler-source',
          },
        ],
        [
          '@babel/plugin-transform-react-jsx-source',
          {
            fileName: 'data-source',
          },
        ],
      ],
    },
  },
};

export default nextConfig;
