export type Technology = {
  name: string;
  group: "Cloud & DevOps" | "Backend" | "Data & AI" | "Frontend & Tools";
  related: string[];
};

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  period: string;
  summary: string;
  outcomes: { title: string; detail: string; tags: string[] }[];
};

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  problem: string;
  responsibilities: string[];
  stack: string[];
  result: string;
};

export type EducationItem = {
  degree: string;
  detail: string;
  metrics: { value: string; label: string }[];
  note: string;
};

export type SocialLink = {
  label: string;
  href: string;
  kind: "external" | "email" | "phone";
};

export const PROFILE = {
  firstName: "Abdulrahman",
  lastName: "Shamieh",
  title: "Backend Engineer",
  tagline: "Backend Engineer building reliable systems behind the interface.",
  domains: "APIs · Cloud · Serverless · Automation",
  status: "AVAILABLE FOR BACKEND / SOFTWARE ENGINEERING",
  email: "abdulrahmanshamieh234@gmail.com",
  phone: "+961 3668091",
  github: "https://github.com/AbedShamieh-developer",
  linkedin: "https://www.linkedin.com/in/abdulrahman-shamieh-dev",
};

export const PRINCIPLES: { name: string; meaning: string }[] = [
  {
    name: "Reliability",
    meaning: "A system is only finished when its failure paths are as designed as its happy path.",
  },
  {
    name: "Ownership",
    meaning:
      "Shipping includes deployment, verification, documentation and the pager that follows.",
  },
  {
    name: "Clarity",
    meaning: "Code and diagrams should let the next engineer reason without asking me anything.",
  },
  {
    name: "Scalability",
    meaning:
      "Design for the second tenant, the second region and the fourteenth function from day one.",
  },
  {
    name: "Curiosity",
    meaning:
      "I read the internals until the abstraction stops being magic and starts being a tool.",
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "oreyeon",
    role: "Backend / Cloud Engineer",
    org: "Oreyeon LDA",
    period: "Professional experience",
    summary:
      "Backend and cloud engineering across serverless services, observability infrastructure and deployment automation on AWS.",
    outcomes: [
      {
        title: "Centralized Observability",
        detail:
          "Designed and implemented a centralized multi-tenant logging architecture for 14+ AWS Lambda functions using CloudWatch Logs, Amazon Data Firehose, a Python routing Lambda and tenant-separated S3 storage.",
        tags: ["CloudWatch", "Firehose", "Python", "S3"],
      },
      {
        title: "Secure Log Retrieval",
        detail:
          "Built REST API functionality for log access using API Gateway, AWS Lambda, Amazon Cognito, S3 pagination and presigned URLs.",
        tags: ["API Gateway", "Cognito", "Presigned URLs"],
      },
      {
        title: "Reusable Logging Infrastructure",
        detail:
          "Developed reusable structured logging capabilities with AWS Lambda Powertools so every service emits consistent, queryable events.",
        tags: ["Powertools", "Structured Logging"],
      },
      {
        title: "Production Engineering",
        detail:
          "Refactored backend Lambda systems into maintainable modular Python structures while preserving production behavior, and authored deployment and runbook documentation.",
        tags: ["Refactoring", "Runbooks", "Documentation"],
      },
      {
        title: "CI/CD Architecture",
        detail:
          "Designed a multi-account, multi-region AWS Lambda CI/CD architecture with GitHub Actions, OIDC authentication, deterministic artifacts, DEV verification, deployment safeguards and rollback strategy.",
        tags: ["GitHub Actions", "OIDC", "Multi-account"],
      },
      {
        title: "Backend Flow Presentation",
        detail:
          "Led the backend engineering segment of an interactive student presentation, explaining the Screen-to-API-to-Backend-to-Database request flow and guiding a hands-on SQL exercise.",
        tags: ["Backend Flow", "SQL", "Presentation"],
      },
    ],
  },
  {
    id: "university",
    role: "Computer Science · Leadership & Student Activities",
    org: "Lebanese International University",
    period: "Alongside studies",
    summary:
      "Graduated in Computer Science from Lebanese International University with a 3.89 GPA and a consistent place on the Honor List, while leading student activities and presenting technical work.",
    outcomes: [
      {
        title: "Explaining Systems",
        detail:
          "Presented technical work and helped peers reason about architecture rather than memorize syntax.",
        tags: ["Communication", "Mentoring"],
      },
      {
        title: "Leading Activities",
        detail:
          "Took ownership of university activities end to end: planning, coordination and follow-through.",
        tags: ["Leadership", "Coordination"],
      },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "tracelens",
    index: "01",
    title: "TraceLens",
    subtitle: "A cleaner way to follow serverless logs.",
    problem: "Centralizes Lambda logs so activity across services is easier to understand.",
    responsibilities: ["Log collection", "Tenant separation", "Secure access", "Documentation"],
    stack: ["Python", "AWS Lambda", "Firehose", "S3", "API Gateway", "Cognito"],
    result: "A focused observability flow for serverless systems.",
  },
  {
    id: "cicd",
    index: "02",
    title: "Multi-Account Lambda CI/CD",
    subtitle: "A safer flow for Lambda deployments.",
    problem: "Deploys serverless functions across AWS accounts without manual repetition.",
    responsibilities: ["GitHub Actions", "OIDC access", "Build checks", "Rollback planning"],
    stack: ["GitHub Actions", "OIDC", "IAM", "AWS Lambda", "TypeScript"],
    result: "A repeatable deployment path with verification before release.",
  },
  {
    id: "logging-lib",
    index: "03",
    title: "Structured Logging Toolkit",
    subtitle: "One logging shape across services.",
    problem: "Keeps service logs consistent and easier to search.",
    responsibilities: ["Reusable module", "Correlation IDs", "Service adoption"],
    stack: ["Python", "Lambda Powertools", "CloudWatch"],
    result: "Cleaner logs with less repeated setup.",
  },
  {
    id: "api-platform",
    index: "04",
    title: "REST API Services",
    subtitle: "Simple APIs for product features.",
    problem: "Creates predictable backend endpoints for frontend and service consumers.",
    responsibilities: ["Endpoint design", "Validation", "Authentication"],
    stack: ["TypeScript", "Node.js", "Express", "REST"],
    result: "Clear API contracts that are easier to integrate with.",
  },
  {
    id: "modularization",
    index: "05",
    title: "Lambda Modularization",
    subtitle: "Making Lambda code easier to work with.",
    problem: "Breaks large Lambda handlers into smaller, maintainable parts.",
    responsibilities: ["Refactoring", "Shared utilities", "Runbooks"],
    stack: ["Python", "AWS Lambda", "Documentation"],
    result: "Cleaner structure without changing production behavior.",
  },
  {
    id: "mysense-ai",
    index: "06",
    title: "MySense AI",
    subtitle: "AI-powered healthcare management system.",
    problem:
      "Supports patients, doctors, nurses, pharmacists and administrators in one healthcare platform.",
    responsibilities: ["Role access", "AI diagnosis", "Medical records", "Analytics"],
    stack: ["Python", "scikit-learn", "React.js", "Chart.js", "Stripe", "SQL"],
    result: "A full-stack healthcare system with AI diagnosis and operational dashboards.",
  },
];

export const TECHNOLOGIES: Technology[] = [
  {
    name: "AWS Lambda",
    group: "Cloud & DevOps",
    related: ["API Gateway", "CloudWatch", "Amazon S3", "AWS Lambda Powertools"],
  },
  {
    name: "API Gateway",
    group: "Cloud & DevOps",
    related: ["AWS Lambda", "Amazon Cognito", "REST API Design"],
  },
  {
    name: "CloudWatch",
    group: "Cloud & DevOps",
    related: ["AWS Lambda", "Amazon Data Firehose"],
  },
  {
    name: "Amazon S3",
    group: "Cloud & DevOps",
    related: ["Amazon Data Firehose", "AWS Lambda"],
  },
  {
    name: "Amazon Data Firehose",
    group: "Cloud & DevOps",
    related: ["CloudWatch", "Amazon S3"],
  },
  {
    name: "Amazon Cognito",
    group: "Cloud & DevOps",
    related: ["API Gateway", "REST API Design"],
  },
  { name: "AWS IAM", group: "Cloud & DevOps", related: ["OIDC", "GitHub Actions"] },
  { name: "GitHub Actions", group: "Cloud & DevOps", related: ["CI/CD", "OIDC", "AWS IAM"] },
  { name: "OIDC", group: "Cloud & DevOps", related: ["AWS IAM", "GitHub Actions"] },
  { name: "CI/CD", group: "Cloud & DevOps", related: ["GitHub Actions", "OIDC"] },

  { name: "FastAPI", group: "Backend", related: ["REST API Design", "Python"] },
  { name: "Python", group: "Backend", related: ["FastAPI", "AWS Lambda", "scikit-learn"] },
  { name: "REST API Design", group: "Backend", related: ["FastAPI", "API Gateway"] },
  {
    name: "Serverless Architecture",
    group: "Backend",
    related: ["AWS Lambda", "API Gateway", "CI/CD"],
  },
  {
    name: "AWS Lambda Powertools",
    group: "Backend",
    related: ["AWS Lambda", "CloudWatch", "Python"],
  },

  { name: "SQL", group: "Data & AI", related: ["PostgreSQL", "MySQL"] },
  { name: "PostgreSQL", group: "Data & AI", related: ["SQL", "FastAPI"] },
  { name: "MySQL", group: "Data & AI", related: ["SQL", "FastAPI"] },
  { name: "Pandas", group: "Data & AI", related: ["Python", "Machine Learning"] },
  { name: "scikit-learn", group: "Data & AI", related: ["Python", "Machine Learning"] },
  { name: "Machine Learning", group: "Data & AI", related: ["Pandas", "scikit-learn"] },

  { name: "React.js", group: "Frontend & Tools", related: ["Tailwind CSS", "Chart.js"] },
  { name: "Tailwind CSS", group: "Frontend & Tools", related: ["React.js"] },
  { name: "Chart.js", group: "Frontend & Tools", related: ["React.js", "Data & AI"] },
  { name: "Git", group: "Frontend & Tools", related: ["GitHub", "GitHub Actions"] },
  { name: "GitHub", group: "Frontend & Tools", related: ["Git", "GitHub Actions"] },
  { name: "Agile", group: "Frontend & Tools", related: ["GitHub", "CI/CD"] },
];

export const PROCESS: { step: string; title: string; detail: string }[] = [
  {
    step: "01",
    title: "Understand the problem",
    detail:
      "Requirements are usually a description of a symptom. I look for the actual constraint.",
  },
  {
    step: "02",
    title: "Model the system",
    detail: "Boundaries, data flow and ownership on paper before any handler exists.",
  },
  {
    step: "03",
    title: "Identify failure modes",
    detail: "What breaks, how it is detected, and what the system does about it.",
  },
  {
    step: "04",
    title: "Build the smallest reliable solution",
    detail: "Minimal surface that fully satisfies the contract, nothing speculative.",
  },
  {
    step: "05",
    title: "Verify behavior",
    detail: "Tests, smoke checks and observable evidence that it does what it claims.",
  },
  {
    step: "06",
    title: "Improve the architecture",
    detail: "Once behavior is proven, structure can be refined without fear.",
  },
];

export const EDUCATION: EducationItem = {
  degree: "Computer Science",
  detail:
    "Graduated from Lebanese International University with a consistent academic record and a place on the Honor List.",
  metrics: [
    { value: "3.89", label: "GPA" },
    { value: "Honor", label: "List" },
    { value: "CS", label: "Degree" },
  ],
  note: "Consistency became a habit before it became an engineering principle.",
};

export const SOCIALS: SocialLink[] = [
  { label: "LinkedIn", href: PROFILE.linkedin, kind: "external" },
  { label: "GitHub", href: PROFILE.github, kind: "external" },
  { label: "Email", href: `mailto:${PROFILE.email}`, kind: "email" },
  { label: "Phone", href: `tel:${PROFILE.phone.replace(/\s/g, "")}`, kind: "phone" },
];

export const SECTIONS = [
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Experience" },
  { id: "projects", num: "03", label: "Projects" },
  { id: "stack", num: "04", label: "Stack" },
  { id: "journey", num: "05", label: "Journey" },
  { id: "contact", num: "06", label: "Contact" },
] as const;
