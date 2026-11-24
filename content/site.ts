/**
 * Monokeras website content & contact configuration.
 * Edit this file to update copy, FAQs, CTAs, contact details, and social links.
 *
 * Contact channels (email, phone, booking) and legal page links only appear
 * on the site when their values are non-empty strings.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type Capability = {
  id: string;
  title: string;
  description: string;
};

export type ApproachStep = {
  step: string;
  title: string;
  description: string;
};

export type Differentiator = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const site = {
  brand: "Monokeras",
  legalName: "MONOKERAS LLC",
  location: "Asheville, North Carolina",
  locationShort: "Asheville, NC",
  foundedYear: 2025,
  copyrightYear: 2026,

  /** Canonical site URL used for metadata / Open Graph. */
  url: "https://monokeras.org",

  meta: {
    title: "Monokeras | IT Consulting & Technology Modernization",
    description:
      "Monokeras helps organizations modernize web platforms, cloud infrastructure, security practices, AI workflows, and legacy systems. Based in Asheville, North Carolina.",
    ogTitle: "Monokeras — Modern technology, built for what’s next.",
    ogDescription:
      "IT consulting for web development, cloud modernization, security, AI adoption, and legacy-system evolution.",
  },

  /**
   * Contact channels — set a string to show it on the site.
   * Leave null to hide. Do not add a contact form unless delivery is implemented.
   */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    bookingUrl: null as string | null,
  },

  social: {
    linkedin: null as string | null,
    github: null as string | null,
  },

  /** Optional legal links — set when pages are ready for review. */
  legal: {
    privacyUrl: null as string | null,
    termsUrl: null as string | null,
  },

  navigation: [
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Approach", href: "/#approach" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/#contact" },
  ] as NavItem[],

  cta: {
    primary: {
      label: "Start a conversation",
      href: "/#contact",
    },
    secondary: {
      label: "Explore capabilities",
      href: "/#capabilities",
    },
  },

  hero: {
    headline: "Modern technology, built for what’s next.",
    supporting:
      "Monokeras helps organizations modernize web platforms, cloud infrastructure, security practices, AI workflows, and legacy systems.",
  },

  capabilities: {
    eyebrow: "Capabilities",
    title: "Technology services shaped around real outcomes.",
    supporting:
      "Practical expertise across the stack—focused on systems that are secure, maintainable, and ready to evolve.",
    items: [
      {
        id: "web",
        title: "Full-Stack Web Development",
        description:
          "Secure, scalable applications and digital products designed for clarity, performance, and long-term ownership.",
      },
      {
        id: "cloud",
        title: "Cloud Modernization",
        description:
          "Migration, architecture improvements, and operational resilience that reduce risk while improving delivery speed.",
      },
      {
        id: "security",
        title: "Security Enhancement",
        description:
          "Practical security improvements integrated into systems and delivery practices—not bolted on after the fact.",
      },
      {
        id: "ai",
        title: "AI Evolution",
        description:
          "Responsible AI strategy, intelligent workflows, and implementation support aligned to real business constraints.",
      },
      {
        id: "legacy",
        title: "Legacy Modernization",
        description:
          "Upgrading, integrating, or carefully replacing critical aging systems while protecting continuity of operations.",
      },
    ] as Capability[],
  },

  approach: {
    eyebrow: "Engagement approach",
    title: "A clear path from assessment to continuous improvement.",
    supporting:
      "Engagements are structured to reduce uncertainty early, deliver meaningful change, and leave room to adapt as priorities shift.",
    steps: [
      {
        step: "01",
        title: "Assess",
        description:
          "Understand systems, constraints, risks, and opportunities before recommending a path forward.",
      },
      {
        step: "02",
        title: "Modernize",
        description:
          "Design and deliver the right technical improvements—scoped for impact, maintainability, and operational reality.",
      },
      {
        step: "03",
        title: "Evolve",
        description:
          "Support continuous improvement as priorities change, so progress compounds rather than stalling after launch.",
      },
    ] as ApproachStep[],
  },

  why: {
    eyebrow: "Why Monokeras",
    title: "Thoughtful strategy. Practical delivery.",
    supporting:
      "Modernization succeeds when technical judgment, clear communication, and sustainable engineering practices work together.",
    items: [
      {
        title: "Thoughtful technical strategy",
        description:
          "Recommendations are grounded in your constraints, risk tolerance, and long-term operating model—not trends alone.",
      },
      {
        title: "Practical delivery",
        description:
          "Work is sequenced for measurable progress, with attention to what can be shipped, operated, and maintained.",
      },
      {
        title: "Maintainability by design",
        description:
          "Systems are shaped for clarity and ownership so teams can continue improving after the engagement ends.",
      },
      {
        title: "Collaborative partnership",
        description:
          "Engagements respect existing teams, processes, and institutional knowledge rather than replacing them.",
      },
    ] as Differentiator[],
  },

  about: {
    eyebrow: "About",
    title: "Based in Asheville. Built for complex technology change.",
    body: [
      "Monokeras is an IT consulting company based in Asheville, North Carolina. We help organizations navigate complex technology change—across web platforms, cloud infrastructure, security practices, AI workflows, and legacy systems.",
      "Formed in 2025 as MONOKERAS LLC, the practice focuses on clear technical judgment, careful modernization, and durable outcomes that teams can sustain.",
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Common questions.",
    items: [
      {
        question: "What types of organizations do you work with?",
        answer:
          "Monokeras works with organizations that need thoughtful help modernizing software, infrastructure, or delivery practices. Engagements are a strong fit when there is a clear problem to solve, stakeholders who can make decisions, and a preference for practical technical partnership over generic advisory decks.",
      },
      {
        question:
          "Can you modernize an existing application without replacing everything?",
        answer:
          "Yes. Many engagements focus on incremental modernization—stabilizing what works, improving high-risk areas, and modernizing interfaces or infrastructure in stages. Full replacement is recommended only when it is clearly the lower-risk or higher-value path.",
      },
      {
        question: "How do you approach security in a modernization project?",
        answer:
          "Security is treated as part of architecture and delivery, not a final checklist. That typically includes threat-aware design, secure defaults, dependency and access hygiene, and practical improvements that fit how the system is actually built and operated.",
      },
      {
        question: "How do you determine whether AI is a good fit?",
        answer:
          "We start with the workflow, data quality, risk profile, and success criteria. AI is recommended when it can improve a specific process with acceptable cost, reliability, and governance—not when it is only a novelty or marketing goal.",
      },
      {
        question: "Can you work with an internal engineering team?",
        answer:
          "Yes. Collaborating with internal teams is a common engagement model—pairing on architecture, delivery, reviews, and knowledge transfer so improvements remain usable after the engagement ends.",
      },
    ] as FaqItem[],
  },

  contactSection: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    supporting:
      "Share a bit about your systems, timeline, and goals. Engagements usually begin with a focused conversation to understand fit and sensible next steps.",
    unconfiguredNote:
      "Contact channels are not configured yet. Set contact.email, contact.phone, or contact.bookingUrl in content/site.ts to display them here. No contact form is shown until message delivery is implemented.",
  },

  careers: {
    eyebrow: "Careers",
    title: "Find your next role.",
    supporting:
      "Five open roles, all remote: software engineering, technical consulting, and business operations.",
    body: [
      "These are the current openings. Each one lists the work, the experience it asks for, and the pay.",
      "Apply on the role page. No account is required. Include your résumé as a PDF or DOCX.",
    ],
  },

  footer: {
    tagline: "Modern technology, built for what’s next.",
  },
} as const;

export type SiteConfig = typeof site;

/** True when at least one contact channel is configured. */
export function hasConfiguredContact(): boolean {
  const { email, phone, bookingUrl } = site.contact;
  return Boolean(email || phone || bookingUrl);
}

export function hasSocialLinks(): boolean {
  return Boolean(site.social.linkedin || site.social.github);
}

export function hasLegalLinks(): boolean {
  return Boolean(site.legal.privacyUrl || site.legal.termsUrl);
}
