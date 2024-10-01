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
    ],
  },
};

export default nextConfig;
