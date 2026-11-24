export type JobSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Job = {
  slug: string;
  department: string;
  title: string;
  location: string;
  arrangement: string;
  type: string;
  experience: string;
  summary: string;
  compensation: string;
  extraPay?: string;
  tags: string[];
  sections: JobSection[];
};

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-software-engineer-php-laravel",
    department: "Technology",
    title: "Senior Full Stack Software Engineer (PHP/Laravel)",
    location: "Nigeria",
    arrangement: "Remote",
    type: "Full-time",
    experience: "8+ years in software engineering",
    summary:
      "Senior full-stack engineer with a strong backend focus, preferably in PHP and Laravel, and hands-on experience integrating U.S. payment systems such as Stripe, Affirm, Sezzle, and NMI.",
    compensation: "$2,500 / month",
    tags: ["PHP", "Laravel", "English", "Payment systems"],
    sections: [
      {
        heading: "About the opportunity",
        paragraphs: [
          "Join a leading U.S. GLP-1 healthcare provider as a Senior Software Engineer, working directly with a U.S.-based engineering team to build and enhance backend-focused healthcare applications and payment systems.",
        ],
      },
      {
        heading: "What you will do",
        bullets: [
          "Develop and maintain scalable backend applications and APIs.",
          "Build and integrate payment solutions using Stripe, Affirm, Sezzle, NMI, and other payment providers.",
          "Implement and maintain reliable payment workflows and third-party integrations.",
          "Collaborate directly with the U.S. engineering team on technical solutions and application improvements.",
        ],
      },
      {
        heading: "What you bring",
        bullets: [
          "Senior-level full-stack software engineering experience with a strong backend focus.",
          "Proficiency in PHP and Laravel.",
          "Hands-on experience with U.S. payment gateways and processing systems.",
          "A strong understanding of credit card transactions and their lifecycle, including authorization, capture, settlement, and refunds.",
          "Clear communication and collaboration skills.",
        ],
      },
    ],
  },
  {
    slug: "senior-devops-engineering-consultant",
    department: "Software Engineering",
    title: "Top 5% talent Sr DevOps Engineering Consultant",
    location: "Worldwide",
    arrangement: "Remote",
    type: "Full-time",
    experience: "8+ years in software engineering, including DevOps",
    summary:
      "Monokeras is hiring senior technical consultants who can represent its engineering work in client interviews, join technical discussions with stakeholders, and help launch new engagements.",
    compensation: "USD $35–$60 per interview hour",
    extraPay: "$2,500 per engagement you win and run",
    tags: ["Fully remote", "AWS, Azure, or Google Cloud", "CI/CD", "C1+ English"],
    sections: [
      {
        heading: "What we’re looking for",
        bullets: [
          "Advanced English (C1+) with confident spoken communication for U.S.-based client interviews and technical discussions.",
          "8+ years of professional experience in software engineering, including at least 3 years of hands-on DevOps engineering.",
          "Strong experience with cloud platforms such as AWS, Azure, or Google Cloud, including infrastructure, deployment, monitoring, security, and troubleshooting.",
          "Hands-on experience with CI/CD, Docker, Kubernetes, infrastructure as code, Git, and automation tools such as Terraform, Ansible, or comparable technologies.",
          "A strong understanding of Linux, networking, system architecture, scalability, reliability, observability, and production infrastructure.",
          "The ability to work across technology stacks, explain technical decisions clearly, and take part in interviews, client discussions, and solution reviews.",
        ],
      },
      {
        heading: "Compensation",
        paragraphs: [
          "Base pay is USD $35–$60 per hour for time spent in interviews. The performance bonus is $2,500 per engagement you win and run: $500 when you receive an offer, then $1,000 per month for the first two months the engagement is running.",
        ],
      },
      {
        heading: "Performance expectations",
        paragraphs: [
          "Win 3–8 new engagements each month. Performance is measured by winning engagements and helping them move into delivery. The package is set up so consultants who meet the criteria for three continuous months can earn more than $15,000 per month.",
        ],
      },
    ],
  },
  {
    slug: "part-time-business-operations-specialist",
    department: "Business Operations",
    title:
      "Part-Time Business Operations Specialist - Marketing & Branch Support (Must be located in US)",
    location: "United States",
    arrangement: "Remote",
    type: "Part-time",
    experience: "No experience required",
    summary:
      "A part-time role coordinating internal operations and communication with customers and third-party service providers. Clear communication and follow-through matter more than prior operations experience.",
    compensation: "$15–$30 / hour",
    tags: ["Fully remote", "Part-time", "United States"],
    sections: [
      {
        heading: "About the opportunity",
        paragraphs: [
          "Monokeras is an IT consulting practice based in Asheville, North Carolina. The work covers web platforms, cloud infrastructure, security, AI workflows, and legacy systems.",
          "This remote role supports day-to-day administration as the practice expands: business account setup, documentation, and routine communication with customers and service providers. You must be located in the United States and able to respond during daytime business hours.",
        ],
      },
      {
        heading: "What you will do",
        bullets: [
          "Support day-to-day administrative operations for new branches and related companies.",
          "Assist with business account setup, maintenance, and related documentation.",
          "Prepare and coordinate documents requested by customers and third-party providers.",
          "Represent the company in routine communications with customers and service providers.",
          "Coordinate required business verification processes and keep accurate records.",
        ],
      },
    ],
  },
  {
    slug: "senior-ai-engineering-consultant",
    department: "Technical Consulting, AI and Generative AI",
    title: "Technical Consultant | Senior Software Engineering - AI/ML",
    location: "Remote",
    arrangement: "Remote",
    type: "Contract",
    experience: "8+ years in software engineering",
    summary:
      "A senior technical consultant with production generative-AI experience who can represent Monokeras in client interviews, technical discussions, and new engagements.",
    compensation: "USD $40–$60 per interview hour",
    extraPay: "$1,000 per month for each ongoing engagement",
    tags: ["Fully remote", "Production GenAI / LLMs", "C1+ English"],
    sections: [
      {
        heading: "What we’re looking for",
        bullets: [
          "Advanced English (C1+) with confident spoken communication for U.S.-based client interviews and stakeholder discussions.",
          "8+ years of professional experience in software engineering.",
          "8–15 years of overall software, data, or machine-learning experience.",
          "2–5 years of hands-on generative AI or LLM work in production.",
          "Strong technical judgment and the ability to explain complex ideas clearly.",
        ],
      },
      {
        heading: "Compensation",
        paragraphs: [
          "Base pay is USD $40–$60 per hour for time spent in interviews. The performance bonus is $1,000 per month for each ongoing engagement you have won.",
        ],
      },
      {
        heading: "Performance expectations",
        paragraphs: [
          "The target is winning 5 engagements every month, and more than 20 ongoing engagements within the first 6 months. At that volume the performance bonus is more than $20,000 per month.",
        ],
      },
    ],
  },
  {
    slug: "senior-software-engineering-consultant",
    department: "Technical Consulting, Backend and Full Stack",
    title: "Senior Software Engineering Consultant",
    location: "Remote",
    arrangement: "Remote",
    type: "Contract",
    experience: "9+ years in backend or full-stack engineering",
    summary:
      "A senior backend or full-stack consultant who can represent Monokeras in client interviews and technical discussions, then help launch the engagements those conversations win.",
    compensation: "USD $35–$60 per interview hour",
    extraPay: "$2,500 per engagement you win and run",
    tags: ["Fully remote", "Multiple backend stacks", "C1+ English"],
    sections: [
      {
        heading: "What we’re looking for",
        bullets: [
          "Advanced English (C1 or above), with confident spoken communication for U.S.-based client interviews and technical discussions.",
          "At least nine years of professional backend software engineering, including production systems.",
          "Professional experience with at least two or three backend languages or frameworks, such as Java/Spring, C#/.NET, JavaScript/TypeScript/Node.js, Python/Django, Ruby on Rails, or comparable technologies.",
          "Strong knowledge of backend architecture, APIs, databases, system design, integrations, and scalable application development.",
          "The ability to explain technical decisions clearly and take part in interviews, client discussions, and solution reviews.",
          "Real delivery experience: understand requirements, solve backend problems, and connect engineering decisions to business needs.",
        ],
      },
      {
        heading: "Compensation",
        paragraphs: [
          "Base pay is USD $35–$60 per hour for time spent in interviews. The performance bonus is $2,500 per engagement you win and run: $500 when you receive an offer, then $1,000 per month for the first two months the engagement is running.",
        ],
      },
      {
        heading: "Performance expectations",
        paragraphs: [
          "Win 3–8 new engagements each month. Consultants who meet that pace for three continuous months can earn more than $15,000 per month.",
        ],
      },
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
