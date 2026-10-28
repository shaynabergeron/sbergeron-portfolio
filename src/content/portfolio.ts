/**
 * EDIT YOUR PORTFOLIO CONTENT HERE.
 * No component edits needed for changing projects, jobs, skills, social links, or copy.
 * Project entries are honest illustrative concepts / proof-of-concepts, not public client work.
 */
export const profile = {
  firstName: "Shayna",
  lastName: "Bergeron",
  role: "Full-Stack Software Engineer",
  email: "shayna.celine@gmail.com",
  location: "United States",
  availability: "Open to interesting opportunities",
  intro: "Hey, I’m Shayna Bergeron — a full-stack software engineer with a soft spot for intuitive interfaces, reliable systems, and the little accessibility details that make a big difference.",
  resume: "/resume/Shayna_Bergeron_Resume.pdf",
  github: "https://github.com/shaynabergeron",
  linkedin: "https://www.linkedin.com/in/shaynabergeron1/",
} as const;

export type Project = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  art: "document" | "components" | "workflow";
  featured?: boolean;
  link?: string; // Optional external repo / live demo URL.
};

export const projects: Project[] = [
  {
    id: "accessible-docs", number: "01", eyebrow: "POC · Backend + document systems",
    title: "Accessible Document Studio", featured: true, art: "document",
    summary: "A cleaner way to turn complex application data into readable, printable documents.",
    description: "A .NET proof of concept for generating structured, printable account documents with maintainable templates. It explores a more dependable alternative to brittle HTML-to-PDF workflows, with accessibility validation as a key design consideration. Proof of concept — not a deployed production product.",
    tech: ["C#", ".NET", "QuestPDF", "Document design"],
  },
  {
    id: "component-library", number: "02", eyebrow: "UI engineering · Accessible components",
    title: "Thoughtful Component Library", art: "components",
    summary: "Reusable form patterns built to feel great on mouse, keyboard, and touch.",
    description: "A component engineering showcase inspired by autocomplete, validation, and accessible form work: keyboard-first interactions, configurable suggestion ranking, sensible results limits, and clear user feedback. Conceptual showcase, not a publicly released library.",
    tech: ["React", "TypeScript", "WCAG", "Design systems"],
  },
  {
    id: "workflow", number: "03", eyebrow: "UX design · Product workflows",
    title: "Less Friction, Better Flows", art: "workflow",
    summary: "Making complicated transactions feel organized, understandable, and human.",
    description: "An experience-design concept for guided transaction and refund workflows. The design uses progressive disclosure, contextual validation, intuitive forms, and explicit confirmation states to reduce cognitive load. Shown as a design concept, not a published client deliverable.",
    tech: ["Figma", "Form UX", "Frontend", "Accessibility"],
  },
];

export type SkillCategory = { id: string; label: string; title: string; description: string; skills: string[]; note: string };
export const skillCategories: SkillCategory[] = [
  { id: "frontend", label: "Frontend", title: "Frontend engineering", description: "Interfaces that are intuitive, responsive, and easy to use.", skills: ["React", "TypeScript", "JavaScript", "HTML5", "SCSS / CSS", "Redux", "Responsive UI", "Next.js (building on it)"], note: "Thoughtful UI starts with semantic, accessible HTML." },
  { id: "backend", label: "Backend & data", title: "Backend & data", description: "Reliable application logic and API-backed experiences.", skills: ["C#", ".NET", "ASP.NET Core", "REST APIs", "SQL", "Java", "PostgreSQL", "API integration"], note: "Comfortable connecting the UI to the systems underneath." },
  { id: "quality", label: "Quality & a11y", title: "Quality & accessibility", description: "Great software should work for more people.", skills: ["WCAG", "Section 508", "axe DevTools", "Playwright", "Cypress", "Automated testing", "Keyboard testing", "Regression testing"], note: "Accessibility isn’t a polish phase; it shapes the build." },
  { id: "tools", label: "Tools & process", title: "Tools & collaboration", description: "The workflows and tools that move work from idea to delivery.", skills: ["Git / GitHub", "Docker", "Figma", "CI/CD", "Agile", "Design systems", "VS Code", "Azure / AWS exposure"], note: "Keep learning, ship carefully, collaborate often." },
];

export type Job = { id: string; company: string; position: string; dates: string; highlight: string; details: string[]; tags: string[] };
export const experience: Job[] = [
  { id: "ots", company: "Louisiana Office of Technology Services", position: "UI/UX Engineer · Accessibility & QA", dates: "2026 — PRESENT", highlight: "Building more usable state digital services.", details: ["Design and develop user-centered web experiences for enterprise/state applications.", "Audit and remediate Section 508/WCAG issues using axe DevTools, manual testing, and automation.", "Collaborate across design, development, and QA to improve component behavior and UI consistency."], tags: ["UI/UX", "Development", "508 / WCAG"] },
  { id: "ara", company: "Applied Research Associates", position: "Software Engineer · Full-Stack Applications", dates: "2022 — 2026", highlight: "Engineering web applications supporting federal programs.", details: ["Build and maintain React/TypeScript interfaces and integrate backend services.", "Work across C#/.NET, RESTful APIs, SQL, and automated testing workflows.", "Collaborate with cross-functional teams on dependable, maintainable application features."], tags: ["React", "C# / .NET", "APIs"] },
  { id: "ibm", company: "IBM", position: "Application Developer · Enterprise Applications", dates: "2021 — 2022", highlight: "Learning the art of dependable enterprise software.", details: ["Develop and support Java-based applications in a structured, collaborative environment.", "Work with stakeholders and engineering teams serving federal clients.", "Contribute to testing, troubleshooting, and incremental feature delivery."], tags: ["Java", "Enterprise", "Federal"] },
];

export const principles = [
  { symbol: "⌘", title: "Build it right", description: "Clean, maintainable engineering that solves real problems." },
  { symbol: "◉", title: "Test the edges", description: "Accessibility, usability, and automated checks belong in the process." },
  { symbol: "✳", title: "Stay curious", description: "Thoughtful details, a little creativity, and always learning." },
];
