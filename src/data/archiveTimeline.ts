export interface ArchiveDocument {
  label: string;
  src: string;
  alt: string;
}

export interface TimelineEntry {
  number: number;
  year: string;
  title: string;
  summary: string;
  slug: string;
  documents: ArchiveDocument[];
}

export const timelineEntries: TimelineEntry[] = [
  {
    number: 1,
    year: "1830s",
    title: "A Companion Is Ordered",
    summary:
      "A household note refers to a handmade plaything prepared for a child of the house. Later accounts disagree about why it mattered.",
    slug: "a-companion-is-ordered",
    documents: [
      {
        label: "Document 1 of 1: Reporter\u2019s Field File",
        src: "/images/archive-files/file-01-companion-ordered.png",
        alt: "Field File No. 01 \u2014 A Companion Is Ordered",
      },
    ],
  },
  {
    number: 2,
    year: "1830s",
    title: "Trouble in the House",
    summary:
      "Small incidents begin appearing in household recollections: missing items, sudden blame, and punishment that followed too easily.",
    slug: "trouble-in-the-house",
    documents: [
      {
        label: "Document 1 of 1: Reporter\u2019s Field File",
        src: "/images/archive-files/file-02-trouble-in-the-house.png",
        alt: "Field File No. 02 \u2014 Trouble in the House",
      },
    ],
  },
  {
    number: 3,
    year: "1830s",
    title: "Disturbance at Heathrow",
    summary:
      "A violent event enters the record under careful language. The official phrasing conceals more than it explains.",
    slug: "disturbance-at-heathrow",
    documents: [
      {
        label: "Document 1 of 2: Reporter\u2019s Field File",
        src: "/images/archive-files/file-03-disturbance-at-heathrow.png",
        alt: "Field File No. 03 \u2014 Disturbance at Heathrow",
      },
      {
        label: "Document 2 of 2: Confidential County Addendum",
        src: "/images/archive-files/file-03-disturbance-at-heathrow-addendum.png",
        alt: "Confidential County Addendum \u2014 Disturbance at Heathrow",
      },
    ],
  },
  {
    number: 4,
    year: "1882",
    title: "Briar Glen Appears",
    summary:
      "The old name fades from public use. The house is remodeled, renamed, and presented as something more respectable.",
    slug: "briar-glen-appears",
    documents: [
      {
        label: "Document 1 of 1: Reporter\u2019s Field File",
        src: "/images/archive-files/file-04-briar-glen-appears.png",
        alt: "Field File No. 04 \u2014 Briar Glen Appears",
      },
    ],
  },
  {
    number: 5,
    year: "1934",
    title: "Renovation and Sorting",
    summary:
      "During renovation work at Briar Glen, several old objects were uncovered: antiques, clothing, household trinkets, and playthings. Some were catalogued, some were sold, and some were stored away.",
    slug: "renovation-and-sorting",
    documents: [
      {
        label: "Document 1 of 1: Reporter\u2019s Field File",
        src: "/images/archive-files/file-05-renovation-and-sorting.png",
        alt: "Field File No. 05 \u2014 Renovation and Sorting",
      },
    ],
  },
  {
    number: 6,
    year: "1937",
    title: "The Summer Accidents",
    summary:
      "Two public tragedies occur within the same summer: a child at the pond, then a carpenter from the roof. The official record calls them accidents. The files leave questions behind.",
    slug: "the-summer-accidents",
    documents: [
      {
        label: "Document 1 of 2: A Child at the Pond",
        src: "/images/archive-files/file-06-child-at-the-pond.png",
        alt: "Field File No. 06 \u2014 A Child at the Pond",
      },
      {
        label: "Document 2 of 2: The Roof Fall",
        src: "/images/archive-files/file-06b-roof-fall.png",
        alt: "Field File No. 06b \u2014 The Roof Fall",
      },
    ],
  },
  {
    number: 7,
    year: "1947",
    title: "The Brooch Incident",
    summary:
      "A missing brooch leads to an accusation against a worker. The object is later found, but the accusation remains part of the house record.",
    slug: "the-brooch-incident",
    documents: [
      {
        label: "Document 1 of 1: Reporter\u2019s Field File",
        src: "/images/archive-files/file-07-the-brooch-incident.png",
        alt: "Field File No. 07 \u2014 The Brooch Incident",
      },
    ],
  },
  {
    number: 8,
    year: "1955\u20131956",
    title: "The Whitmore File",
    summary:
      "One of our veteran investigative reporters begins tracing old reports, staff recollections, and unexplained repetitions at Briar Glen. His inquiry stops before the file is complete.",
    slug: "the-whitmore-file",
    documents: [
      {
        label: "Document 1 of 2: The Whitmore File",
        src: "/images/archive-files/file-08-the-whitmore-file.png",
        alt: "Field File No. 08 \u2014 The Whitmore File",
      },
      {
        label: "Document 2 of 2: Paul Whitmore Passing Notice",
        src: "/images/archive-files/file-08b-paul-whitmore-passing.png",
        alt: "Paul Whitmore Passing Notice",
      },
    ],
  },
  {
    number: 9,
    year: "1983",
    title: "The Modern Record",
    summary:
      "Daniel Whitmore reopens his father\u2019s unfinished Briar Glen files, beginning with a public interview that seems to close the door. The record suggests otherwise.",
    slug: "the-modern-record",
    documents: [
      {
        label: "Document 1 of 2: Daniel Whitmore\u2019s Note",
        src: "/images/archive-files/file-09a-daniel-whitmore-note.png",
        alt: "Field File No. 09A, Daniel Whitmore\u2019s Note",
      },
      {
        label: "Document 2 of 2: Missus Jenkins Interview, 1983",
        src: "/images/archive-files/file-09b-jenkins-interview-1983.png",
        alt: "The First Resident newspaper article, Witness Denies Anything Strange Happening, October 2, 1983",
      },
    ],
  },
];
