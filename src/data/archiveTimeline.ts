export interface TimelineEntry {
  number: number;
  year: string;
  title: string;
  summary: string;
  slug: string;
}

export const timelineEntries: TimelineEntry[] = [
  {
    number: 1,
    year: "1830s",
    title: "A Companion Is Ordered",
    summary:
      "A household note refers to a handmade plaything prepared for a child of the house. Later accounts disagree about why it mattered.",
    slug: "a-companion-is-ordered",
  },
  {
    number: 2,
    year: "1830s",
    title: "Trouble in the House",
    summary:
      "Small incidents begin appearing in household recollections: missing items, sudden blame, and punishment that followed too easily.",
    slug: "trouble-in-the-house",
  },
  {
    number: 3,
    year: "1830s",
    title: "Disturbance at Heathrow",
    summary:
      "A violent event enters the record under careful language. The official phrasing conceals more than it explains.",
    slug: "disturbance-at-heathrow",
  },
  {
    number: 4,
    year: "1882",
    title: "Briar Glen Appears",
    summary:
      "The old name fades from public use. The house is remodeled, renamed, and presented as something more respectable.",
    slug: "briar-glen-appears",
  },
  {
    number: 5,
    year: "1934",
    title: "Renovation and Sorting",
    summary:
      "During renovation work at Briar Glen, several old objects were uncovered: antiques, clothing, household trinkets, and playthings. Some were catalogued, some were sold, and some were stored away.",
    slug: "renovation-and-sorting",
  },
  {
    number: 6,
    year: "1937",
    title: "A Child at the Pond",
    summary:
      "A family tragedy is recorded as an accident. Later notes question what was found nearby, but the public account remains unchanged.",
    slug: "a-child-at-the-pond",
  },
  {
    number: 7,
    year: "1947",
    title: "The Brooch Incident",
    summary:
      "A missing brooch leads to an accusation against a worker. The object is later found, but the accusation remains part of the house record.",
    slug: "the-brooch-incident",
  },
  {
    number: 8,
    year: "1955–1956",
    title: "The Whitmore File",
    summary:
      "One of our veteran investigative reporters begins tracing old reports, staff recollections, and unexplained repetitions at Briar Glen. His inquiry stops before the file is complete.",
    slug: "the-whitmore-file",
  },
  {
    number: 9,
    year: "1969–1984",
    title: "The Modern Record",
    summary:
      "The property changes purpose, but scattered reports continue: falls, locked rooms, misplaced objects, and residents unsettled by what they cannot quite explain.",
    slug: "the-modern-record",
  },
];
