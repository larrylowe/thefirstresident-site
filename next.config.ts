import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async redirects() {
    return [
      // Earlier Prelude PDF names now lead to the current edition.
      { source: "/samples/first-resident-sample.pdf", destination: "/samples/PRELUDE%20-%20The%20First%20Resident%20of%20Briar%20Glen%20Ebook.pdf", permanent: true },
      { source: "/samples/the-first-resident-prelude.pdf", destination: "/samples/PRELUDE%20-%20The%20First%20Resident%20of%20Briar%20Glen%20Ebook.pdf", permanent: true }
    ];
  }
};

export default nextConfig;
