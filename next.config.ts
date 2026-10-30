import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      // The Prelude PDF was renamed when the final-cover edition replaced it.
      { source: "/samples/first-resident-sample.pdf", destination: "/samples/the-first-resident-prelude.pdf", permanent: true }
    ];
  }
};

export default nextConfig;
