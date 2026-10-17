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
  | "medal"
  | "mail";

export type Tint = "aqua" | "sky" | "leaf" | "pearl";

export type Picture = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
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
  | { type: "links"; heading?: string; items: { label: string; href: string; download?: boolean }[] }
  | { type: "pdf"; heading?: string; src: string; title: string };

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
  phone: "(614) 817-3452",
  linkedin: "https://www.linkedin.com/in/theodore-jackson-2abb8727a",
  github: "https://github.com/ImTheo-pdf",
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
          { label: "At", value: "University of Cincinnati\nDean's List" },
          { label: "Graduating", value: "May 2028" },
          { label: "Based in", value: "Cincinnati, Ohio" },
        ],
      },
      {
        type: "photos",
        items: [
          { src: "/images/photos/professional-shot.jpg", alt: "Tre Jackson outdoors in a brown jacket", width: 1333, height: 2000 },
          { src: "/images/photos/tre.jpg", alt: "Tre Jackson, headshot", width: 2000, height: 1500 },
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
            title: "Software Developer Intern, Siemens",
            meta: "Milford, Ohio · May – Aug 2026",
            points: [
              "Designed an end-to-end Python automation pipeline from scratch, gathering requirements from managers and engineers to build a new container image management process.",
              "Built automated labeling and cleanup workflows in Harbor, owning the project from design and implementation through testing, code review, demos and production deployment.",
              "Automated image management with Python, Docker, Linux command-line tools, JSON/CSV logging and custom scripts, eliminating months of recurring manual labeling and deletion work.",
              "Maintained GitLab repositories through version control, code review and testing, folding in feedback from technical demos.",
            ],
          },
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
            title: "Spatial awareness app for Deaf people",
            meta: "Knight Hacks IX · Swift, Python, Hugging Face, ARKit · Oct 2026",
            points: [
              "Won Best Use of Open-Source AI (Hugging Face) at Knight Hacks IX.",
              "Built and tested iOS workflows for real-time speech captions and sound visualization, with priority-based alerts for detected sounds.",
              "Refined AI sound classification through prompt engineering, and helped with computer vision for recognizing people and objects so captions match their speakers.",
            ],
          },
          {
            title: "This portfolio",
            meta: "Solo project · Next.js, React, Tailwind CSS, Figma · Feb 2026 – now",
            points: [
              "Designed and built a responsive web app with reusable components.",
              "Used structured AI prompts, refined over many rounds, to help with development, documentation and UI polish.",
            ],
          },
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
        items: ["C++", "Java", "Python", "TypeScript", "JavaScript", "Swift", "SQL", "PromQL", "JSON", "MATLAB"],
      },
      {
        type: "tags",
        heading: "Tools",
        items: ["React Native", "Next.js", "Tailwind CSS", "Docker", "Harbor", "Linux", "Grafana", "Prometheus", "Spring Boot", "GitHub", "GitLab", "Figma", "LabVIEW", "Excel"],
      },
      {
        type: "tags",
        heading: "AI",
        items: ["Prompt engineering", "AI-assisted development", "Hugging Face", "AI sound classification"],
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
    tagline: "Places I've been.",
    icon: "camera",
    tint: "leaf",
    blocks: [
      {
        type: "photos",
        items: [
          { src: "/images/photos/castle.jpg", alt: "Cinderella Castle under a sky of tall clouds", width: 1500, height: 2000, caption: "Cinderella Castle, Magic Kingdom" },
          { src: "/images/photos/ak-tree.jpg", alt: "The Tree of Life against a bright blue sky", width: 1500, height: 2000, caption: "Tree of Life, Animal Kingdom" },
          { src: "/images/photos/epcot-japan.jpg", alt: "The pagoda at EPCOT's Japan pavilion on a sunny day", width: 1500, height: 2000, caption: "Japan pavilion, EPCOT" },
          { src: "/images/photos/clearwater-beach.jpg", alt: "Seagulls over Clearwater Beach with a blue umbrella on the sand", width: 1500, height: 2000, caption: "Clearwater Beach, Florida" },
          { src: "/images/photos/magic-balloons.jpg", alt: "A bunch of Mickey balloons on Main Street, U.S.A.", width: 1500, height: 2000, caption: "Balloons on Main Street, U.S.A." },
          { src: "/images/photos/epcot-evening.jpg", alt: "Spaceship Earth glowing purple at dusk behind palm trees", width: 1500, height: 2000, caption: "Spaceship Earth at dusk" },
          { src: "/images/photos/cake-bake.jpg", alt: "The bright dining room and chandelier at The Cake Bake Shop", width: 1500, height: 2000, caption: "The Cake Bake Shop" },
          { src: "/images/photos/st-kitts.jpg", alt: "St. Kitts seen across the water, with green mountains behind the town", width: 2000, height: 1500, caption: "St. Kitts from the water" },
          { src: "/images/photos/avatar.jpg", alt: "A Na'vi figure from Avatar with braids and feathers", width: 1500, height: 2000, caption: "Pandora, Animal Kingdom" },
          { src: "/images/photos/tower-of-terror.jpg", alt: "The Hollywood Tower Hotel under a purple evening sky", width: 1500, height: 2000, caption: "Tower of Terror at dusk" },
          { src: "/images/photos/honeymoon-beach.jpg", alt: "Clouds over a calm, clear beach", width: 1500, height: 2000, caption: "Honeymoon Beach" },
          { src: "/images/photos/epcot-ball.jpg", alt: "Spaceship Earth from below, with a palm tree in front", width: 1500, height: 2000, caption: "Spaceship Earth, EPCOT" },
          { src: "/images/photos/st-kitts-sculpture.jpg", alt: "A classical statue in a tropical garden", width: 1500, height: 2000, caption: "Sculpture garden, St. Kitts" },
          { src: "/images/photos/castle-right.jpg", alt: "Cinderella Castle from the side under storm clouds", width: 1500, height: 2000, caption: "Cinderella Castle, from the side" },
          { src: "/images/photos/dark-epcot-ball.jpg", alt: "Close-up of Spaceship Earth's panels lit up at night", width: 1500, height: 2000, caption: "Spaceship Earth after dark" },
          { src: "/images/photos/cincinnati-night.jpg", alt: "The Cincinnati skyline reflected in the Ohio River at night", width: 1500, height: 2000, caption: "Cincinnati at night" },
          { src: "/images/photos/epcot-ball-night.jpg", alt: "Spaceship Earth lit blue at night", width: 1500, height: 2000, caption: "Spaceship Earth at night" },
        ],
      },
    ],
  },
  {
    id: "awards",
    name: "Experiences & Awards",
    tagline: "What I'm part of.",
    icon: "medal",
    tint: "sky",
    blocks: [
      {
        type: "entries",
        heading: "Experiences",
        items: [
          { title: "Disney College Program", meta: "The Walt Disney Company · Orlando · Aug 2026 – now" },
          { title: "Knight Hacks IX", meta: "University of Central Florida hackathon · Oct 2026" },
          { title: "National Society of Black Engineers", meta: "Member · 2023 – now" },
          {
            title: "Bearcat Buddies",
            meta: "Math tutor · 2023 – now",
            points: ["Teach math to elementary and middle school students, one-on-one and in small groups."],
          },
        ],
      },
      {
        type: "photos",
        items: [
          { src: "/images/photos/knight-hacks-day-1.jpg", alt: "Tre and three teammates in front of the Knight Hacks sign", width: 2000, height: 1125, caption: "Knight Hacks IX, day one" },
        ],
      },
      {
        type: "entries",
        heading: "Honors & Awards",
        items: [
          { title: "Best Use of Open-Source AI (Hugging Face)", meta: "Knight Hacks IX · Oct 2026" },
          { title: "Dr. Edward N. Prather STEM Scholar", meta: "Bridge Program, UC · 2023 – now" },
          { title: "Choose Ohio First Scholarship", meta: "2023 – now" },
          { title: "Emerging Engineer", meta: "UC College of Engineering · 2023 – now" },
        ],
      },
      {
        type: "photos",
        items: [
          { src: "/images/photos/hugging-face-award.jpg", alt: "Tre's team together after winning at Knight Hacks IX", width: 2000, height: 1125, caption: "Best Use of Open-Source AI (Hugging Face), Knight Hacks IX" },
        ],
      },
    ],
  },
  {
    id: "resume",
    name: "Résumé",
    tagline: "My résumé.",
    icon: "document",
    tint: "aqua",
    blocks: [
      {
        type: "links",
        items: [
          { label: "Download PDF", href: "/resume.pdf", download: true },
          { label: "Open in new tab", href: "/resume.pdf" },
        ],
      },
      { type: "pdf", src: "/resume.pdf", title: "Theodore Jackson III résumé" },
    ],
  },
  {
    id: "contact",
    name: "Contact Me",
    tagline: "Reach out anytime.",
    icon: "mail",
    tint: "pearl",
    blocks: [
      {
        type: "text",
        text: "Email is the best way to reach me, but feel free to call or text too. I'm open to a co-op for Summer 2027.",
      },
      {
        type: "links",
        items: [
          { label: "jacks3t6@mail.uc.edu", href: "mailto:jacks3t6@mail.uc.edu" },
          { label: "trejacks223@gmail.com", href: "mailto:trejacks223@gmail.com" },
          { label: "(614) 817-3452", href: "tel:+16148173452" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/theodore-jackson-2abb8727a" },
          { label: "GitHub", href: "https://github.com/ImTheo-pdf" },
        ],
      },
    ],
  },
];
