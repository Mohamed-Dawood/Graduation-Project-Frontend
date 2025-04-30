/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'content.presspage.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cdc.gov',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'media.gettyimages.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
=======
    domains: [
      'content.presspage.com',
      'encrypted-tbn0.gstatic.com',
      'www.cdc.gov',
      'www.shutterstock.com',
      'res.cloudinary.com',
      'media.gettyimages.com',
      'img.freepik.com',
      'petracarestore.com',
      'cdn.salla.sa',
>>>>>>> 182b167ea60f365286ba26852a50ccb11e6841b7
    ],
  },
};

export default nextConfig;
