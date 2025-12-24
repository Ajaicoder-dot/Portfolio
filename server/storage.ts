import {
  projects, skills, experience, education, messages,
  type Project, type Skill, type Experience, type Education, type Message,
  type InsertMessage,
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getSkills(): Promise<Skill[]>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Seed methods
  seedData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private projects: Project[] = [];
  private skills: Skill[] = [];
  private experience: Experience[] = [];
  private education: Education[] = [];
  private messages: Message[] = [];
  private initialized = false;

  constructor() {
    this.seedData();
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getExperience(): Promise<Experience[]> {
    return this.experience;
  }

  async getEducation(): Promise<Education[]> {
    return this.education;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = {
      ...message,
      id: this.messages.length + 1,
      createdAt: new Date().toISOString()
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  async seedData(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    // Seed Skills
    this.skills = [
      { id: 1, name: "Java", category: "Language" },
      { id: 2, name: "JavaScript", category: "Language" },
      { id: 3, name: "TypeScript", category: "Language" },
      { id: 4, name: "PHP", category: "Language" },
      { id: 5, name: "SQL", category: "Language" },
      { id: 6, name: "Angular", category: "Framework" },
      { id: 7, name: "RxJS", category: "Library" },
      { id: 8, name: "NgRx", category: "Library" },
      { id: 9, name: "Laravel", category: "Framework" },
      { id: 10, name: "Eloquent ORM", category: "Library" },
      { id: 11, name: "SASS", category: "Library" },
      { id: 12, name: "Tailwind CSS", category: "Library" },
      { id: 13, name: "MySQL", category: "Database" },
      { id: 14, name: "Redis", category: "Database" },
      { id: 15, name: "Git", category: "Tool" },
      { id: 16, name: "Postman", category: "Tool" },
      { id: 17, name: "AWS S3", category: "Tool" },
    ];

    // Seed Experience
    this.experience = [
      {
        id: 1,
        company: "Thikse Software Solutions",
        role: "Full Stack Developer",
        duration: "August 2025 - Present",
        description: "Joined as Software Development Intern. Contributed to Fuoday HRMS and ATS. Worked on backend (Laravel, Java/Spring Boot) and frontend (Angular). Implemented AWS S3 integrations.",
        location: "Puducherry"
      },
      {
        id: 2,
        company: "NIC (National Informatics Centre)",
        role: "Programmer (Intern)",
        duration: "June 2025 - August 2025",
        description: "Learned real-world software development practices and strengthened technical foundations.",
        location: "Puducherry"
      },
      {
        id: 3,
        company: "TWILIGHT IT SOLUTIONS",
        role: "Internship",
        duration: "March 2023 - March 2023",
        description: "Gained hands-on experience in HTML, CSS, and PHP/MySQL.",
        location: "Puducherry"
      }
    ];

    // Seed Projects
    this.projects = [
      {
        id: 1,
        title: "Fuoday (HRMS & ATS)",
        description: "Enterprise-level HR management platform. Designed and developed ATS user interface, job creation workflows, and candidate tracking. Integrated JWT auth, AWS S3, and Redis.",
        techStack: ["Angular", "TypeScript", "Laravel", "Java", "Redis", "AWS S3"],
        link: null,
        githubLink: null,
        imageUrl: null
      },
      {
        id: 2,
        title: "Thikse Software Solutions Website",
        description: "Official corporate website development using Angular. Focused on responsive UI, reusable components, and performance optimization.",
        techStack: ["Angular", "TypeScript", "SASS", "Highcharts"],
        link: "https://thikse.in",
        githubLink: null,
        imageUrl: null
      },
      {
        id: 3,
        title: "Enzopik Oil Collection Platform",
        description: "Web-based system to manage oil collection operations. Handled frontend in Angular and backend integration via REST APIs.",
        techStack: ["Angular", "TypeScript", "SASS", "MySQL"],
        link: null,
        githubLink: null,
        imageUrl: null
      },
      {
        id: 4,
        title: "Seminar Hall Booking System",
        description: "Booking system for Pondicherry University. Features email notifications via PHPMailer and PDF reports via TCPDF.",
        techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
        link: null,
        githubLink: null,
        imageUrl: null
      },
      {
        id: 5,
        title: "Momento Events",
        description: "Event management platform for booking and scheduling events with payment processing integration.",
        techStack: ["PHP", "MySQL", "JavaScript"],
        link: null,
        githubLink: null,
        imageUrl: null
      }
    ];

    // Seed Education
    this.education = [
      {
        id: 1,
        institution: "Pondicherry University",
        degree: "Masters in Computer Science",
        duration: "October 2023 - April 2025",
        grade: "CGPA: 7.89",
        location: "Puducherry"
      },
      {
        id: 2,
        institution: "RAAK Arts and Science College",
        degree: "Bachelors in Computer Science",
        duration: "July 2020 - June 2023",
        grade: "CGPA: 7.8",
        location: "Tamil Nadu"
      }
    ];
  }
}

export const storage = new MemStorage();
