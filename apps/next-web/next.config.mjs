const apiUrl = 'http://localhost:4040';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/assistant/:path*',
        destination: `${apiUrl}/assistant/:path*`,
      },
    ]
  },
};

export default nextConfig;
