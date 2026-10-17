import type { NextConfig } from "next";

// The site is one page now; the old routes point at their sections.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/projects", destination: "/#projects", permanent: false },
      { source: "/skills", destination: "/#skills", permanent: false },
      { source: "/resume", destination: "/#resume", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
