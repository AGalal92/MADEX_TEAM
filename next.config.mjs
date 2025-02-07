/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001', // Include the port if your backend serves images from a specific port
        pathname: '/storage/**', // Match the folder path where images are served
      },
    ],
  },
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5001/api/:path*', // Proxy API requests to the backend
    },
  ],
};

export default nextConfig;
