export const product = {
  title: "The First Resident of Briar Glen",
  author: "Larry Lowe",
  format: "Digital edition, PDF",
  introPrice: process.env.NEXT_PUBLIC_INTRO_PRICE || "4.99",
  regularPrice: process.env.NEXT_PUBLIC_REGULAR_PRICE || "6.99",
  price:
    process.env.NEXT_PUBLIC_PRODUCT_PRICE ||
    process.env.NEXT_PUBLIC_INTRO_PRICE ||
    "4.99",
  tagline: "Every House Has A First Resident. This One Never Left.",
  sampleUrl: process.env.NEXT_PUBLIC_SAMPLE_PDF || "/samples/first-resident-sample.pdf",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL || "https://youtu.be/pOdHt66Bue4",

  // Legacy image references kept for TypeScript compatibility with older unused components.
  // These files are no longer used by the live page. They can be manually deleted from
  // /public/images once the old component files are removed:
  //   book-mockup.png, briar-glen-house.jpg, little-charlotte-plantation.png, video-poster.jpg
  coverImage: "/images/book-mockup.png",
  houseImage: "/images/briar-glen-house.jpg",
  charlotteImage: "/images/little-charlotte-plantation.png",
  videoPoster: "/images/video-poster.jpg",
};
