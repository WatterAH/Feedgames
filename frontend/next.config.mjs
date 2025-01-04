/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zptrwdrgobouoriwsfoj.supabase.co",
        pathname: "/storage/v1/object/public/Images/images/**",
      },
      {
        protocol: "https",
        hostname: "zptrwdrgobouoriwsfoj.supabase.co",
        pathname: "/storage/v1/object/public/Images/pfp/**",
      },
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        pathname: "/agents/**",
      },
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        pathname: "/maps/**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
  },
};

export default nextConfig;
