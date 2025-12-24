import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Initialize seed data
  await storage.seedData();

  app.get(api.portfolio.get.path, async (req, res) => {
    const [projects, skills, experience, education] = await Promise.all([
      storage.getProjects(),
      storage.getSkills(),
      storage.getExperience(),
      storage.getEducation(),
    ]);

    const profile = {
      name: "Ajai Sekar",
      title: "Full Stack Developer",
      summary: "Full Stack Developer with hands-on experience in enterprise application development, specializing in Angular, TypeScript, Laravel, and Java. Proven track record of delivering production-ready features for HRMS and ATS platforms.",
      email: "ajaiofficial06@gmail.com",
      phone: "+91 9361685137",
      github: "https://github.com/ajai-sekar", // Placeholder if not in resume
      linkedin: "https://linkedin.com/in/ajai-sekar", // Placeholder
      resumeUrl: "/resume.pdf",
    };

    res.json({
      projects,
      skills,
      experience,
      education,
      profile
    });
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
