import { db } from "./db";
import {
  projects, skills, experience, education, messages,
  type Project, type Skill, type Experience, type Education, type Message,
  type InsertMessage,
  insertProjectSchema, insertSkillSchema, insertExperienceSchema, insertEducationSchema
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

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async seedData(): Promise<void> {
    // Check if data exists
    const existingProjects = await this.getProjects();
    if (existingProjects.length > 0) return;

    // Seed Skills
    await db.insert(skills).values([
      { name: "Java", category: "Language" },
      { name: "JavaScript", category: "Language" },
      { name: "TypeScript", category: "Language" },
      { name: "PHP", category: "Language" },
      { name: "SQL", category: "Language" },
      { name: "Angular", category: "Framework" },
      { name: "RxJS", category: "Library" },
      { name: "NgRx", category: "Library" },
      { name: "Laravel", category: "Framework" },
      { name: "Eloquent ORM", category: "Library" },
      { name: "SASS", category: "Library" },
      { name: "Tailwind CSS", category: "Library" },
      { name: "MySQL", category: "Database" },
      { name: "Redis", category: "Database" },
      { name: "Git", category: "Tool" },
      { name: "Postman", category: "Tool" },
      { name: "AWS S3", category: "Tool" },
    ]);

    // Seed Experience
    await db.insert(experience).values([
      {
        company: "Thikse Software Solutions",
        role: "Full Stack Developer",
        duration: "August 2025 - Present",
        description: "Joined as Software Development Intern. Contributed to Fuoday HRMS and ATS. Worked on backend (Laravel, Java/Spring Boot) and frontend (Angular). Implemented AWS S3 integrations.",
        location: "Puducherry"
      },
      {
        company: "NIC (National Informatics Centre)",
        role: "Programmer (Intern)",
        duration: "June 2025 - August 2025",
        description: "Learned real-world software development practices and strengthened technical foundations.",
        location: "Puducherry"
      },
      {
        company: "TWILIGHT IT SOLUTIONS",
        role: "Internship",
        duration: "March 2023 - March 2023",
        description: "Gained hands-on experience in HTML, CSS, and PHP/MySQL.",
        location: "Puducherry"
      }
    ]);

    // Seed Projects
    await db.insert(projects).values([
      {
        title: "Fuoday (HRMS & ATS)",
        description: "Enterprise-level HR management platform. Designed and developed ATS user interface, job creation workflows, and candidate tracking. Integrated JWT auth, AWS S3, and Redis.",
        techStack: ["Angular", "TypeScript", "Laravel", "Java", "Redis", "AWS S3"],
      },
      {
        title: "Thikse Software Solutions Website",
        description: "Official corporate website development using Angular. Focused on responsive UI, reusable components, and performance optimization.",
        techStack: ["Angular", "TypeScript", "SASS", "Highcharts"],
        link: "https://thikse.in"
      },
      {
        title: "Enzopik Oil Collection Platform",
        description: "Web-based system to manage oil collection operations. Handled frontend in Angular and backend integration via REST APIs.",
        techStack: ["Angular", "TypeScript", "SASS", "MySQL"],
      },
      {
        title: "Seminar Hall Booking System",
        description: "Booking system for Pondicherry University. Features email notifications via PHPMailer and PDF reports via TCPDF.",
        techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      },
      {
        title: "Momento Events",
        description: "Event management platform for booking and scheduling events with payment processing integration.",
        techStack: ["PHP", "MySQL", "JavaScript"],
      }
    ]);

    // Seed Education
    await db.insert(education).values([
      {
        institution: "Pondicherry University",
        degree: "Masters in Computer Science",
        duration: "October 2023 - April 2025",
        grade: "CGPA: 7.89",
        location: "Puducherry"
      },
      {
        institution: "RAAK Arts and Science College",
        degree: "Bachelors in Computer Science",
        duration: "July 2020 - June 2023",
        grade: "CGPA: 7.8",
        location: "Tamil Nadu"
      }
    ]);
  }
}

export const storage = new DatabaseStorage();
