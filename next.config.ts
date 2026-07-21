import type { NextConfig } from "next";
import { site } from "./lib/site";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Transitions moved to the physical development portfolio
      {
        source: "/transition",
        destination: site.physicalPortfolio,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
