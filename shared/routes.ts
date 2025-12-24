import { z } from 'zod';
import { insertMessageSchema, projects, skills, experience, education } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  portfolio: {
    get: {
      method: 'GET' as const,
      path: '/api/portfolio',
      responses: {
        200: z.object({
          projects: z.array(z.custom<typeof projects.$inferSelect>()),
          skills: z.array(z.custom<typeof skills.$inferSelect>()),
          experience: z.array(z.custom<typeof experience.$inferSelect>()),
          education: z.array(z.custom<typeof education.$inferSelect>()),
          profile: z.object({
             name: z.string(),
             title: z.string(),
             summary: z.string(),
             email: z.string(),
             phone: z.string(),
             github: z.string(),
             linkedin: z.string(),
             resumeUrl: z.string().optional(),
          })
        }),
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertMessageSchema,
      responses: {
        201: z.object({ success: z.boolean() }),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PortfolioResponse = z.infer<typeof api.portfolio.get.responses[200]>;
