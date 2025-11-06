import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Anarv",
  lastName: "Vasavada",
  name: `Anarv Vasavada`,
  role: "AI Research & Full Stack Engineer",
  avatar: "/images/avatar.jpg", // OptimizedImage component will handle AVIF/WebP fallbacks
  email: "anarv.work@gmail.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  locationDisplay: "Asia/India",
  languages: ["English", "Hindi", "Gujarati"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>A log of what happens when obsession learns to engineer.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Anarv2104",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/anarvvasavada/",
  },
  {
    name: "Twitter / X",
    icon: "twitter",
    link: "https://x.com/AnarvVasavada",
  },
  {
    name: "Medium",
    icon: "medium",
    link: "https://medium.com/@anarv_vasavada",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/anarv-og.jpg",
  label: "Home",
  title: "Anarv Vasavada – AI Research & Full Stack Engineer",
  description: "Building production-grade AI systems, full-stack platforms, and autonomous intelligence.",
  headline: <>Built to question everything <br />and rebuild what breaks.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Built So Far</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Anarv, built from curiosity, driven by obsession. <br />
      I build because silence is unbearable until an idea comes alive.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.locationDisplay}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://drive.google.com/file/d/12f1RQPgw5dJixSjh5jPlmOauOlxXeTcb/view?usp=drive_link",
  },
  intro: {
    display: true,
    title: "Introduction",
      description: (
      <>
        Anarv Vasavada is an engineer who sees building as a way of thinking.
He learns by questioning, creates by understanding, and builds systems that make sense of complexity. His work reflects curiosity, structure, and a constant need to turn ideas into something real.
<br /><br />
<br />These experiences aren’t about buzzwords they’re proof I can lead, build, and ship real shit that works.<br />
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Technical Experience",
    experiences: [
      {
        company: "VisionX",
        timeframe: "2023 – 2024",
        role: "Full Stack Developer | Team Lead",
        achievements: [
          <>
            Led a 4-member team to develop a GitHub-integrated collaboration platform with token-based reward tracking,
            increasing developer engagement by approximately 60 percent.
          </>,
          <>
            Architected automated PR validation via webhooks and smart contract tracking, reducing manual review effort by
            about 45 percent and improving process transparency.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/screenshot1.jpg", // Replace with your image
            alt: "VisionX Project Screenshot",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Octopus",
        timeframe: "2025",
        role: "AI Engineer | Team Lead",
        achievements: [
          <>
            Built a multi-agent orchestration system integrating Slack, Notion, GitHub, Gmail, and Sheets using FastAPI and
            LangChain, reducing manual workflows by 65 percent.
          </>,
          <>
            Modular agent pods designed with shared vector memory and distributed reasoning, doubling automation speed
            and ensuring full traceability.
          </>,
          <>
            Developed reusable AI agent templates that standardized reasoning and minimized context switch latency by
            45 percent.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/screenshot2.jpg", // Replace with your image
            alt: "Octopus Project Screenshot",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "De-MAPP",
        timeframe: "2025",
        role: "AI / Full Stack Developer",
        achievements: [
          <>
            Engineered a blockchain-powered protocol enabling persistent AI agent memory and interoperability using
            Avalanche and IPFS, improving context retrieval speed by 50 percent.
          </>,
          <>
            Designed the MCX protocol and the API of the plugin to enable decentralized communication across agents,
            achieving 100 percent verifiable integrity with 40 percent fewer data-loss incidents.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/screenshot3.jpg", // Replace with your image
            alt: "De-MAPP Project Screenshot",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Parul University",
        description: <>Studied Computer Science and Engineering.</>,
      },
    ],
  },
certifications: {
  display: true, // set to false to hide this section
  title: "Certifications",
  institutions: [
    {
      name: "Certified Apple Teacher",
      description: <>Credentialed by Apple for proficiency in teaching and developing using Apple tools and platforms.</>,
    },
    {
      name: "NPTEL Computer Networks – IIT Kharagpur",
      description: <>Completed a full-term course on Computer Networks under IIT Kharagpur via NPTEL, with rigorous evaluation and assignments.</>,
    },
    {
      name: "iOS App Development with Swift",
      description: <>Trained in Swift and Xcode with hands-on iOS app development, UI building, and Apple ecosystem integration.</>,
    },
    {
      name: "Google Startup School",
      description: <>Participated in Google’s Startup School program, gaining exposure to product building, startup growth, and founder-first frameworks.</>,
    },
  ],
},
technical: {
  display: true, // set to false to hide this section
  title: "Technical Skills",
  skills: [
    {
      title: "Multi-Agent Systems",
      description: (
        <>Architecting modular multi-agent workflows with dynamic orchestration, memory sharing, and cross-pod collaboration.</>
      ),
      tags: [
        { name: "LangChain", icon: "langchain" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "Docker", icon: "docker" },
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-05.jpg",
          alt: "Multi-Agent Orchestration",
          width: 16,
          height: 9,
        },
      ],
    },
    {
      title: "Backend Systems",
      description: (
        <><>APIs that sync, stream, and scale. From Redis queues to OAuth flows, I handle the messy backend logic that makes products work.</></>
      ),
      tags: [
        { name: "FastAPI", icon: "fastapi" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Redis", icon: "redis" },
        { name: "MongoDB", icon: "database" },
        { name: "JWT", icon: "lock" },
        { name: "WebSockets", icon: "activity" },
        { name: "Render", icon: "cloud" }
      ],
      images: [],
    },
    {
      title: "AI + NLP Integration",
      description: (
        <>Integrating LLMs, vector DBs, and custom memory layers to enable persistent AI reasoning and tool use.</>
      ),
      tags: [
        { name: "Python", icon: "python" },
        { name: "ChromaDB", icon: "database" },
        { name: "LangChain", icon: "langchain" },
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-07.jpg",
          alt: "LLM + Memory Stack",
          width: 16,
          height: 9,
        },
      ],
    },
    {
      title: "Frontend & Dashboards",
      description: (
        <>Built futuristic UIs with Next.js, React, Tailwind, and animation libraries like GSAP and Lenis.</>
      ),
      tags: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind", icon: "tailwind" },
        { name: "HTML", icon: "html" },
        { name: "CSS", icon: "css" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "Chart.js", icon: "chartjs" },
        { name: "Recharts", icon: "recharts" },
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-08.jpg",
          alt: "VisionX UI",
          width: 16,
          height: 9,
        },
      ],
    },
    {
      title: "Full Stack Development",
      description: (
        <>Building full-stack applications with dynamic UIs, secure APIs, real-time databases, and production-ready deployments.</>
      ),
      tags: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "FastAPI", icon: "fastapi" },
        { name: "Supabase", icon: "supabase" },
        { name: "Vercel", icon: "cloud" },
        { name: "Docker", icon: "docker"},
        {name: "mongodb", icon: "mongodb" }

      ],
      images: [
        {
          src: "/images/projects/project-01/cover-09.jpg",
          alt: "Full Stack Architecture",
          width: 16,
          height: 9,
        },
      ],
    },
    {
      title: "Programming Languages",
      description: (
        <>Fluent in multiple languages across domains — from backend logic to AI pipelines and system design.</>
      ),
      tags: [
        { name: "Python", icon: "python" },
        { name: "Java", icon: "java" },
        { name: "JavaScript", icon: "javascript" },
        { name: "TypeScript", icon: "typescript" },
        { name: "C", icon: "c" } 
      ],
      images: [
        {
          src: "/images/projects/project-01/cover-10.jpg",
          alt: "Programming Languages Overview",
          width: 16,
          height: 9,
        },
      ],
    },
  ],
},
};
const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Blogs - Anarv Vasavada",
  heading: "Read This If You've Got a Spine.",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
