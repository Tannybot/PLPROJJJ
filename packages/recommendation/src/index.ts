export type Criterion =
  | "security"
  | "speed"
  | "scalability"
  | "maintainability"
  | "community"
  | "learning";

export type ProjectInput = {
  projectType: string;
  targetUsers: number;
  scalability: number;
  security: number;
  performance: number;
  budget: "low" | "medium" | "high";
  developmentSpeed: number;
  deploymentPlatform: string;
};

export type LanguageProfile = {
  name: string;
  slug: string;
  color: string;
  scores: Record<Criterion, number>;
  idealUseCases: string[];
  strengths: string[];
  weaknesses: string[];
  beginnerExplanation: string;
  technicalExplanation: string;
  industryUsage: string[];
  famousCompanies: string[];
  frameworks: string[];
  salaryInsight: string;
  history: string[];
  didYouKnow: string;
};

export type Recommendation = LanguageProfile & {
  suitabilityScore: number;
  percentage: number;
  explanation: string;
};

export const languageProfiles: LanguageProfile[] = [
  {
    name: "Python",
    slug: "python",
    color: "#4fd1c5",
    scores: { security: 78, speed: 64, scalability: 76, maintainability: 91, community: 98, learning: 95 },
    idealUseCases: ["AI/ML", "data analytics", "automation", "research prototypes"],
    strengths: ["Fast development", "vast scientific ecosystem", "excellent readability"],
    weaknesses: ["Runtime speed limitations", "mobile and low-level systems are weaker fits"],
    beginnerExplanation: "Python is friendly for beginners because its syntax reads close to plain English and lets teams build useful features quickly.",
    technicalExplanation: "Python is strongest when ecosystem velocity matters more than raw runtime speed, especially through optimized native extensions and mature data libraries.",
    industryUsage: ["AI research", "data science", "automation", "backend APIs"],
    famousCompanies: ["Google", "Netflix", "Instagram", "Dropbox"],
    frameworks: ["Django", "FastAPI", "Flask", "PyTorch"],
    salaryInsight: "Python skills are highly marketable in data, AI, automation, and backend engineering roles.",
    history: ["1991: Python released by Guido van Rossum", "2008: Python 3 modernizes the language", "2010s: Becomes dominant in data science and machine learning"],
    didYouKnow: "Python became a major AI language because its scientific ecosystem made experimentation faster than many lower-level alternatives."
  },
  {
    name: "Java",
    slug: "java",
    color: "#f59e0b",
    scores: { security: 88, speed: 82, scalability: 91, maintainability: 84, community: 94, learning: 70 },
    idealUseCases: ["enterprise systems", "Android", "financial platforms", "large backends"],
    strengths: ["Mature ecosystem", "strong concurrency", "enterprise-grade tooling"],
    weaknesses: ["Verbose syntax", "slower iteration for small teams"],
    beginnerExplanation: "Java is a dependable language for learning large-scale software because it teaches structure, object-oriented design, and strong typing.",
    technicalExplanation: "Java offers mature virtual-machine performance, strong observability tooling, and battle-tested frameworks for large distributed systems.",
    industryUsage: ["banking", "enterprise platforms", "Android apps", "large backend services"],
    famousCompanies: ["Amazon", "LinkedIn", "Netflix", "Uber"],
    frameworks: ["Spring Boot", "Quarkus", "Micronaut", "Hibernate"],
    salaryInsight: "Java remains valuable for enterprise backend, fintech, Android, and long-lived platform teams.",
    history: ["1995: Java released by Sun Microsystems", "2009: Oracle acquires Sun", "2010s: Spring Boot accelerates enterprise API development"],
    didYouKnow: "Java's 'write once, run anywhere' idea helped shape modern cross-platform application development."
  },
  {
    name: "JavaScript",
    slug: "javascript",
    color: "#facc15",
    scores: { security: 72, speed: 78, scalability: 82, maintainability: 76, community: 99, learning: 85 },
    idealUseCases: ["web apps", "full-stack SaaS", "real-time dashboards", "serverless"],
    strengths: ["Universal web runtime", "massive package ecosystem", "rapid UI delivery"],
    weaknesses: ["Dependency risk", "type safety requires discipline"],
    beginnerExplanation: "JavaScript is ideal for seeing quick visual results because it runs directly in browsers and powers interactive web interfaces.",
    technicalExplanation: "JavaScript excels in event-driven systems and full-stack delivery, especially when paired with TypeScript for maintainability.",
    industryUsage: ["frontend apps", "SaaS products", "real-time dashboards", "serverless APIs"],
    famousCompanies: ["Meta", "Vercel", "Airbnb", "Shopify"],
    frameworks: ["Next.js", "React", "Express", "NestJS"],
    salaryInsight: "JavaScript and TypeScript are highly employable because nearly every modern product needs web expertise.",
    history: ["1995: JavaScript created for Netscape", "2009: Node.js brings JavaScript to servers", "2012 onward: TypeScript improves large-app maintainability"],
    didYouKnow: "JavaScript was created in about ten days, yet became the language of the modern web."
  },
  {
    name: "PHP",
    slug: "php",
    color: "#818cf8",
    scores: { security: 70, speed: 74, scalability: 71, maintainability: 73, community: 86, learning: 86 },
    idealUseCases: ["CMS", "e-commerce", "content-driven websites", "budget web systems"],
    strengths: ["Low hosting cost", "strong CMS ecosystem", "quick web delivery"],
    weaknesses: ["Mixed legacy practices", "less ideal for compute-heavy systems"],
    beginnerExplanation: "PHP is practical for learning web development because it was designed around building dynamic websites quickly.",
    technicalExplanation: "Modern PHP, especially with Laravel and Symfony, can support clean architecture for content-heavy and commerce-oriented systems.",
    industryUsage: ["CMS platforms", "e-commerce", "small business websites", "content systems"],
    famousCompanies: ["Meta", "Wikipedia", "WordPress", "Slack"],
    frameworks: ["Laravel", "Symfony", "WordPress", "Drupal"],
    salaryInsight: "PHP remains useful where businesses maintain WordPress, Laravel, and e-commerce platforms.",
    history: ["1995: PHP first released", "2003: WordPress launches", "2011: Laravel modernizes PHP application development"],
    didYouKnow: "A large portion of the public web still runs on PHP because of WordPress and mature hosting support."
  },
  {
    name: "C#",
    slug: "csharp",
    color: "#a78bfa",
    scores: { security: 86, speed: 86, scalability: 88, maintainability: 86, community: 88, learning: 75 },
    idealUseCases: ["enterprise apps", "Windows systems", "games", "cloud APIs"],
    strengths: ["Excellent tooling", "high productivity", "strong cloud and game support"],
    weaknesses: ["Microsoft ecosystem bias", "heavier runtime footprint than Go/Rust"],
    beginnerExplanation: "C# is approachable for structured application development and has excellent tools that help learners catch mistakes.",
    technicalExplanation: "C# and .NET provide high-performance managed runtime capabilities, mature async programming, and strong enterprise integration.",
    industryUsage: ["enterprise apps", "cloud APIs", "game development", "Windows software"],
    famousCompanies: ["Microsoft", "Stack Overflow", "Unity", "GoDaddy"],
    frameworks: [".NET", "ASP.NET Core", "Entity Framework", "Unity"],
    salaryInsight: "C# is valuable in enterprise software, cloud services, game studios, and Microsoft-centered organizations.",
    history: ["2000: C# introduced by Microsoft", "2016: .NET Core expands cross-platform support", "2020s: .NET becomes a strong cloud-native runtime"],
    didYouKnow: "C# powers many Unity games, making it important beyond traditional business software."
  },
  {
    name: "C++",
    slug: "cpp",
    color: "#60a5fa",
    scores: { security: 62, speed: 98, scalability: 80, maintainability: 59, community: 87, learning: 42 },
    idealUseCases: ["game engines", "embedded systems", "high-frequency trading", "native apps"],
    strengths: ["Maximum performance", "hardware control", "mature systems ecosystem"],
    weaknesses: ["Memory safety complexity", "longer development cycles"],
    beginnerExplanation: "C++ is powerful but challenging because it gives developers direct control over memory and system resources.",
    technicalExplanation: "C++ remains a top choice for latency-sensitive software where deterministic performance and hardware-level optimization matter.",
    industryUsage: ["game engines", "embedded systems", "trading systems", "desktop software"],
    famousCompanies: ["Adobe", "Bloomberg", "Epic Games", "Microsoft"],
    frameworks: ["Qt", "Unreal Engine", "Boost", "OpenCV"],
    salaryInsight: "C++ expertise is prized in performance-critical domains such as gaming, finance, embedded systems, and infrastructure.",
    history: ["1985: C++ released as an extension of C", "1998: First ISO C++ standard", "2011: Modern C++ introduces major safety and productivity improvements"],
    didYouKnow: "Many game engines and operating-system components use C++ because it combines abstraction with low-level control."
  },
  {
    name: "Go",
    slug: "go",
    color: "#22d3ee",
    scores: { security: 82, speed: 90, scalability: 92, maintainability: 88, community: 84, learning: 82 },
    idealUseCases: ["cloud services", "microservices", "CLIs", "network systems"],
    strengths: ["Simple concurrency", "fast builds", "excellent deployment ergonomics"],
    weaknesses: ["Less expressive generics ecosystem", "smaller domain-specific libraries"],
    beginnerExplanation: "Go is easy to read and practical for backend systems because it keeps the language small and focused.",
    technicalExplanation: "Go is optimized for network services, concurrency, fast compilation, and simple deployment as static binaries.",
    industryUsage: ["cloud infrastructure", "microservices", "developer tools", "network systems"],
    famousCompanies: ["Google", "Docker", "Kubernetes", "Cloudflare"],
    frameworks: ["Gin", "Fiber", "Echo", "gRPC"],
    salaryInsight: "Go is strong for cloud, DevOps, platform engineering, and infrastructure teams.",
    history: ["2009: Go publicly announced by Google", "2012: Go 1.0 released", "2014 onward: Docker and Kubernetes drive cloud adoption"],
    didYouKnow: "Kubernetes and Docker helped make Go a core language of cloud-native infrastructure."
  },
  {
    name: "Rust",
    slug: "rust",
    color: "#fb7185",
    scores: { security: 96, speed: 96, scalability: 86, maintainability: 79, community: 78, learning: 38 },
    idealUseCases: ["secure systems", "WebAssembly", "infrastructure", "performance-critical services"],
    strengths: ["Memory safety", "near-C++ performance", "modern tooling"],
    weaknesses: ["Steep learning curve", "slower initial delivery"],
    beginnerExplanation: "Rust is harder at first, but it teaches safe systems thinking by preventing many memory errors before code runs.",
    technicalExplanation: "Rust combines ownership-based memory safety with low-level performance, making it strong for secure infrastructure and systems software.",
    industryUsage: ["secure infrastructure", "WebAssembly", "systems programming", "performance-critical services"],
    famousCompanies: ["Mozilla", "Amazon", "Microsoft", "Discord"],
    frameworks: ["Axum", "Actix", "Tauri", "Tokio"],
    salaryInsight: "Rust is increasingly valued for security-focused infrastructure, blockchain, systems, and performance engineering.",
    history: ["2010: Rust project announced by Mozilla", "2015: Rust 1.0 released", "2020s: Adoption grows in security-critical infrastructure"],
    didYouKnow: "Rust is loved by many developers because it catches memory-safety issues at compile time instead of at runtime."
  }
];

export function buildWeights(input: ProjectInput): Record<Criterion, number> {
  const budgetBoost = input.budget === "low" ? 0.12 : input.budget === "medium" ? 0.04 : 0;
  return {
    security: 0.16 + input.security * 0.018,
    speed: 0.14 + input.performance * 0.018,
    scalability: 0.15 + input.scalability * 0.02 + Math.min(input.targetUsers / 1000000, 1) * 0.1,
    maintainability: 0.17,
    community: 0.14 + budgetBoost,
    learning: 0.12 + input.developmentSpeed * 0.018 + budgetBoost
  };
}

export function scoreLanguages(input: ProjectInput, profiles = languageProfiles): Recommendation[] {
  const weights = buildWeights(input);
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);

  return profiles
    .map((language) => {
      const weightedScore = Object.entries(weights).reduce((sum, [criterion, weight]) => {
        return sum + language.scores[criterion as Criterion] * weight;
      }, 0);
      const projectFit = language.idealUseCases.some((useCase) =>
        input.projectType.toLowerCase().includes(useCase.split("/")[0].toLowerCase())
      )
        ? 5
        : 0;
      const suitabilityScore = Math.min(100, Math.round(weightedScore / totalWeight + projectFit));

      return {
        ...language,
        suitabilityScore,
        percentage: suitabilityScore,
        explanation: `${language.name} scores ${suitabilityScore}% because its strengths align with the requested security, performance, scalability, delivery speed, and deployment priorities. ${language.beginnerExplanation}`
      };
    })
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
