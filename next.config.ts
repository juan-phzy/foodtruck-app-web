import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing config...
  
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
    // If you already have other domains, add this one to the list
    // domains: ['existing-domain.com', 'cdn-icons-png.flaticon.com'],
  },
};

export default nextConfig;
