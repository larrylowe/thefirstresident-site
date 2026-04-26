export const product = {
  title: "The First Resident of Briar Glen",
  author: "Larry Lowe",
  format: "Digital edition, PDF",
  /**
   * Pricing strategy:
   * We launch with an introductory "early bird" price for the first two weeks.
   * After the launch period ends, the price increases to the full recommended retail price.
   * Both values can be overridden via environment variables if needed.
   */
  introPrice: process.env.NEXT_PUBLIC_INTRO_PRICE || "4.99",
  regularPrice: process.env.NEXT_PUBLIC_REGULAR_PRICE || "6.99",
  // The price displayed on the site defaults to the intro price unless overridden.
  price:
    process.env.NEXT_PUBLIC_PRODUCT_PRICE ||
    process.env.NEXT_PUBLIC_INTRO_PRICE ||
    "4.99",
  // Updated tagline to match the final marketing copy.  The tagline should
  // emphasize the idea that the first resident never left, matching the
  // tagline used across the hero and marketing materials.
  tagline: "Every House Has A First Resident. This One Never Left.",
  sampleUrl: process.env.NEXT_PUBLIC_SAMPLE_PDF || "/samples/first-resident-sample.pdf",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL || "",
  // Use the 3D book mockup for the story section. This file should be placed in
  // public/images/book-mockup.png. The old book-cover.jpg was removed.
  coverImage: "/images/book-mockup.png",
  houseImage: "/images/briar-glen-house.jpg",
  videoPoster: "/images/video-poster.jpg"
  ,
  /**
   * Additional artwork used in the story section.  This image depicts
   * Little Charlotte facing the original residence.  It is used to
   * anchor the historical narrative visually.
   */
  charlotteImage: "/images/little-charlotte-plantation.png"
};
