/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jzfstrhyaxuupvfyibws.supabase.co",
      },
    ],
  },
};

export default nextConfig;
