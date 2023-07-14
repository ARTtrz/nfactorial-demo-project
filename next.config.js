/** @type {import('next').NextConfig} */
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
    domains: ['lh3.googleusercontent.com', 'otlichnik-kz.s3.amazonaws.com',]
  },
  async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:8000/api/:path*'
			}
		]
	}
};

module.exports = nextConfig;
