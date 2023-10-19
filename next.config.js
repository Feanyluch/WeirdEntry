/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/duxy2eomx/image/upload/v1697711587/tshirt_wagio8.png',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/duxy2eomx/image/upload/v1697750929/MacBook_Pro_16__-_2_v3xojo.png',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/duxy2eomx/image/upload/v1697750405/banner1_x6zzg5.png',
      },
    ],
  },
}
// module.exports = nextConfig
