export const product = {
  title: "The First Resident of Briar Glen",
  author: "Larry Lowe",
  format: "Digital edition, PDF",
  price: process.env.NEXT_PUBLIC_PRODUCT_PRICE || "9.99",
  // Updated tagline to match the final marketing copy.  The tagline should
  // emphasize the idea that the first resident never left, matching the
  // tagline used across the hero and marketing materials.
  tagline: "Every House Has A First Resident. This One Never Left.",
  sampleUrl: process.env.NEXT_PUBLIC_SAMPLE_PDF || "/samples/first-resident-sample.pdf",
  videoUrl: process.env.NEXT_PUBLIC_VIDEO_URL || "",
  coverImage: "/images/book-cover.jpg",
  houseImage: "/images/briar-glen-house.jpg",
  videoPoster: "/images/video-poster.jpg"
};
