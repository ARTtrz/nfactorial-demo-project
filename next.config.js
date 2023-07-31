const withTM = require('next-transpile-modules')(['langchain']);

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        port: "",
      },
    ],
    domains: ['lh3.googleusercontent.com', 'otlichnik-kz.s3.amazonaws.com', 'zakon-img2.object.pscloud.io', 'zakon-img3.object.pscloud.io'],
  },
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: 'https://patrol-backend-service.onrender.com/server/:path*',
      },
    ];
  },
};

module.exports = withTM(nextConfig);
