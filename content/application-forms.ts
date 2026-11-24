import { jobs } from "@/content/jobs";

export type ApplicationFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "radio"
  | "checkbox"
  | "file";

export type ApplicationField = {
  name: string;
  label: string;
  type: ApplicationFieldType;
  required: boolean;
  help?: string;
  placeholder?: string;
  options?: string[];
  autoComplete?: string;
  maxLength?: number;
};

const engineeringLevels = [
  "Senior Software Engineer",
  "Lead Software Engineer",
  "Principal Software Engineer",
  "Staff Software Engineer",
  "Manager or Director",
];

function contactFields(): ApplicationField[] {
  return [
    {
      name: "full_name",
      label: "What is your full name?",
      type: "text",
      required: true,
      autoComplete: "name",
      maxLength: 150,
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      required: true,
      autoComplete: "email",
      maxLength: 254,
    },
    {
      name: "phone",
      label: "What is your phone number?",
      type: "tel",
      required: true,
      autoComplete: "tel",
      placeholder: "+1 555 123 4567",
      maxLength: 4000,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      required: true,
      help: "City and country where you are currently based.",
      autoComplete: "address-level2",
      maxLength: 180,
    },
  ];
}

function years(required: boolean): ApplicationField {
  return {
    name: "years_experience",
    label: "How many years of experience do you have in software engineering?",
    type: "number",
    required,
  };
}

function stack(required: boolean, help: string): ApplicationField {
  return {
    name: "primary_stack",
    label: "What is your primary tech stack?",
    type: "text",
    required,
    help,
    maxLength: 4000,
  };
}

function salary(required: boolean, help: string): ApplicationField {
  return {
    name: "salary_expectation",
    label: "What is your salary expectation?",
    type: "text",
    required,
    help,
    maxLength: 4000,
  };
}

function level(required: boolean): ApplicationField {
  return {
    name: "engineering_level",
    label: "What is your level of engineering?",
    type: "radio",
    required,
    options: engineeringLevels,
  };
}

function category(required: boolean, options: string[]): ApplicationField {
  return {
    name: "engineering_category",
    label: "Do you consider yourself in one of the following categories?",
    type: "radio",
    required,
    options,
  };
}

function resume(required: boolean): ApplicationField {
  return {
    name: "resume",
    label: "Please upload your résumé here.",
    type: "file",
    required,
    help: "PDF, DOC, or DOCX. Maximum 4 MB.",
  };
}

const javaStackHelp = "For example: Java, Spring Boot, PostgreSQL, and AWS.";
const salaryExampleHelp =
  "Include currency and period, for example USD 60/hour.";
const backendCategories = ["Backend Engineer", "Full Stack Engineer", "Other"];

export const applicationForms: Record<string, ApplicationField[]> = {
  "senior-full-stack-software-engineer-php-laravel": [
    ...contactFields(),
    years(true),
    stack(true, javaStackHelp),
    salary(false, salaryExampleHelp),
    level(true),
    category(true, backendCategories),
    resume(true),
  ],
  "senior-devops-engineering-consultant": [
    ...contactFields(),
    {
      name: "years_experience",
      label: "How do you estimate your level of Engineering?",
      type: "checkbox",
      required: false,
      options: [
        "Senior Level",
        "Lead Level",
        "Principal Level",
        "Staff Level",
        "Manager Level",
        "Director Level",
      ],
    },
    {
      name: "engineering_category",
      label: "Do you consider yourself in one of the following categories?",
      type: "checkbox",
      required: true,
      options: [
        "Site Reliability Engineer",
        "DevOps Engineer",
        "Platform Engineer",
        "Cloud Engineer",
        "Other",
      ],
    },
    resume(true),
  ],
  "part-time-business-operations-specialist": [
    ...contactFields(),
    {
      name: "opportunity_source",
      label: "Where did you find this opportunity?",
      type: "radio",
      required: true,
      options: [
        "LinkedIn",
        "Instagram",
        "Company Career Page",
        "Craigslist",
        "Referred by someone",
      ],
    },
    {
      name: "work_authorization",
      label: "Are you authorized to work in United States?",
      type: "radio",
      required: true,
      options: ["YES", "NO"],
    },
    resume(false),
  ],
  "senior-ai-engineering-consultant": [
    ...contactFields(),
    years(true),
    stack(true, javaStackHelp),
    salary(true, salaryExampleHelp),
    level(true),
    category(true, [
      "Backend Engineer",
      "Full Stack Engineer",
      "DevOps Engineer",
      "Other",
    ]),
    resume(true),
  ],
  "senior-software-engineering-consultant": [
    ...contactFields(),
    years(false),
    stack(
      false,
      "Node.js, C#/.NET, Java/Spring, Python/Django/FastAPI, PHP/Laravel ETC",
    ),
    salary(false, "$35 ~ $60/hr"),
    level(false),
    category(true, backendCategories),
    resume(true),
  ],
};

for (const job of jobs) {
  if (!applicationForms[job.slug]) {
    throw new Error(`Missing application form for ${job.slug}`);
  }
}

export function getApplicationFields(slug: string): ApplicationField[] | undefined {
  return applicationForms[slug];
}
