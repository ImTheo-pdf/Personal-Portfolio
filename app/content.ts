// Everything on the site comes from this file.
//
// Each channel is one tile on the Wii Menu. To add one, copy a channel below,
// give it a new id, and fill in its blocks. Empty slots fill the rest of the grid.
// Pictures go in /public/images and are referenced as "/images/<file>".

export type IconName =
  | "person"
  | "briefcase"
  | "blocks"
  | "star"
  | "camera"
  | "document"
  | "mail";

export type Tint = "aqua" | "sky" | "leaf" | "pearl";

export type Picture = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
};

export type Block =
  | { type: "text"; heading?: string; text: string }
  | { type: "facts"; heading?: string; items: { label: string; value: string }[] }
  | {
      type: "entries";
      heading?: string;
      items: { title: string; meta: string; points?: string[] }[];
    }
  | { type: "tags"; heading?: string; items: string[] }
  | { type: "photos"; heading?: string; items: Picture[] }
  | { type: "links"; heading?: string; items: { label: string; href: string }[] };

export type Channel = {
  id: string; // also the link, e.g. yoursite.com/#work
  name: string;
  tagline: string;
  icon: IconName;
  tint: Tint;
  blocks: Block[];
};

export const person = {
  name: "Tre Jackson",
  fullName: "Theodore Jackson III",
  email: "jacks3t6@mail.uc.edu",
  linkedin: "https://www.linkedin.com/in/theodore-jackson-2abb8727a",
  resumePdf: "/resume.pdf",
};

// How many slots the menu shows. Unused slots appear as empty channels.
export const gridSlots = 12;

export const channels: Channel[] = [
  {
    id: "about",
    name: "Tre",
    tagline: "Hi, I'm Tre.",
    icon: "person",
    tint: "aqua",
    blocks: [
      {
        type: "text",
        text: "I'm a computer science student at the University of Cincinnati. I like software that feels calm to use, and I care about how things look as much as how they work.",
      },
      {
        type: "facts",
        items: [
          { label: "Studying", value: "Computer Science, B.S." },
          { label: "At", value: "University of Cincinnati" },
          { label: "Graduating", value: "May 2028" },
          { label: "Based in", value: "Cincinnati, Ohio" },
        ],
      },
    ],
  },
  {
    id: "work",
    name: "Work",
    tagline: "Where I've worked.",
    icon: "briefcase",
    tint: "sky",
    blocks: [
      {
        type: "entries",
        items: [
          {
            title: "Software Engineer Intern, Kroger",
            meta: "Kroger Technology & Digital · Cincinnati · Aug – Dec 2025",
            points: [
              "Built API monitoring dashboards in Grafana with Prometheus, Micrometer and Spring Boot Actuator, tracking rate, errors and duration.",
              "Exposed JVM and connection-pool metrics: memory, garbage collection, threads and database connection health.",
              "Set up alerting and dashboard templates across environments, saving the team several hours of work.",
              "Worked through GitHub pull requests and code review.",
            ],
          },
          {
            title: "Warehouse Associate, McNaughton-McKay Electric",
            meta: "Columbus · Jun – Aug 2024",
            points: [
              "Handled shipping, receiving and order picking so materials moved on time.",
              "Worked with the team to improve workflow and keep the floor safe.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "projects",
    name: "Projects",
    tagline: "Things I've made.",
    icon: "blocks",
    tint: "aqua",
    blocks: [
      {
        type: "entries",
        items: [
          {
            title: "Cookbook app",
            meta: "Solo project · React Native · Feb – May 2025",
            points: [
              "Designed an original UI prototype covering several user flows, from browsing recipes to reading one.",
              "Built the front-end components in React Native.",
            ],
          },
          {
            title: "Barcode-sorting robot",
            meta: "Lego Mindstorms · Engineering Design Thinking 1120 · 2024",
            points: ["Scans barcodes, then moves each box to its correct location."],
          },
          {
            title: "Walking robot",
            meta: "Lego Mindstorms · Engineering Design Thinking 1100 · 2023",
            points: ["A robot with no wheels that picks up objects and carries them somewhere else."],
          },
        ],
      },
    ],
  },
  {
    id: "skills",
    name: "Skills",
    tagline: "What I work with.",
    icon: "star",
    tint: "pearl",
    blocks: [
      {
        type: "tags",
        heading: "Languages",
        items: ["C++", "Java", "Python", "SQL", "PromQL", "JSON", "MATLAB"],
      },
      {
        type: "tags",
        heading: "Tools",
        items: ["React Native", "Grafana", "Prometheus", "Spring Boot", "GitHub", "LabVIEW", "Excel"],
      },
      {
        type: "tags",
        heading: "Coursework",
        items: ["Data & Discrete Structures", "Databases", "Engineering Design Thinking", "Software Engineering"],
      },
    ],
  },
  {
    id: "photos",
    name: "Photos",
    tagline: "Ohio, so far.",
    icon: "camera",
    tint: "leaf",
    blocks: [
      {
        type: "photos",
        items: [
          { src: "/images/cincinnati-night.jpg", alt: "Cincinnati skyline at night over the Ohio River", width: 1920, height: 1280, credit: "EEJCC, CC0" },
          { src: "/images/roebling-bridge.jpg", alt: "The Roebling Suspension Bridge in Cincinnati", width: 1920, height: 1440, credit: "Warren LeMay, CC0" },
          { src: "/images/uc-campus-green.jpg", alt: "The campus green at the University of Cincinnati", width: 1920, height: 1440, credit: "Bearcat2011, CC BY-SA 3.0" },
          { src: "/images/columbus-downtown.jpg", alt: "Downtown Columbus across the Scioto River", width: 1920, height: 1312, credit: "Paul Wasneski, public domain" },
        ],
      },
    ],
  },
  {
    id: "resume",
    name: "Résumé",
    tagline: "Everything, in one place.",
    icon: "document",
    tint: "sky",
    blocks: [
      {
        type: "entries",
        heading: "Education",
        items: [{ title: "University of Cincinnati", meta: "B.S. Computer Science · Graduating May 2028" }],
      },
      {
        type: "entries",
        heading: "Leadership",
        items: [
          { title: "National Society of Black Engineers", meta: "Member · 2023 – now" },
          {
            title: "Bearcat Buddies",
            meta: "Math tutor · 2023 – now",
            points: ["Teach math to elementary and middle school students, one-on-one and in small groups."],
          },
        ],
      },
      {
        type: "entries",
        heading: "Honors",
        items: [
          { title: "Dr. Edward N. Prather STEM Scholar", meta: "Bridge Program, UC · 2023 – now" },
          { title: "Choose Ohio First Scholarship", meta: "2023 – now" },
          { title: "Emerging Engineer", meta: "UC College of Engineering · 2023 – now" },
        ],
      },
      {
        type: "links",
        items: [{ label: "Download the PDF", href: "/resume.pdf" }],
      },
    ],
  },
  {
    id: "contact",
    name: "Message Board",
    tagline: "Say hello.",
    icon: "mail",
    tint: "pearl",
    blocks: [
      {
        type: "text",
        text: "The best way to reach me is email. I'm open to a co-op for Summer 2026.",
      },
      {
        type: "links",
        items: [
          { label: "jacks3t6@mail.uc.edu", href: "mailto:jacks3t6@mail.uc.edu" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/theodore-jackson-2abb8727a" },
        ],
      },
    ],
  },
];

// Credits for the photographs from Wikimedia Commons. Keep these when you keep the pictures.
export const credits = [
  { title: "Downtown Cincinnati skyline at night", by: "EEJCC", licence: "CC0", url: "https://commons.wikimedia.org/w/index.php?curid=180829335" },
  { title: "Roebling Suspension Bridge, Cincinnati", by: "Warren LeMay", licence: "CC0", url: "https://commons.wikimedia.org/w/index.php?curid=79351138" },
  { title: "Campus Green", by: "Bearcat2011", licence: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/w/index.php?curid=15740820" },
  { title: "Downtown Columbus from Main St Bridge", by: "Paul Wasneski", licence: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Downtown_Columbus_View_from_Main_St_Bridge_-_edit1.jpg" },
];
