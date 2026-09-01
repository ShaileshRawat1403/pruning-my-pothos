import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const editorialFields = {
  // Search title, used only for <title>/og:title. Falls back to `title`.
  // Lets an editorial H1 stay editorial while the SERP title matches the
  // language people actually search for.
  seoTitle: z.string().optional(),
  featured: z.boolean().optional().default(false),
  contentType: z.string().optional(),
  readingTime: z.number().optional(),
  difficulty: z.string().optional(),
};

const systems = defineCollection({
  name: "systems",
  directory: "src/content/systems",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["Explanations", "Concepts", "How-things-fit-together"]),
    tags: z.array(z.string()).optional().default([]),
    publishDate: z.string().optional(),
    updatedAt: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    proofPoints: z.array(z.string()).optional().default([]),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional().default([]),
    ...editorialFields,
    content: z.string(),
  }),
});

const sentences = defineCollection({
  name: "sentences",
  directory: "src/content/sentences",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(["Attention", "Meaning", "Judgment"]),
    tags: z.array(z.string()).optional().default([]),
    ...editorialFields,
    content: z.string(),
  }),
});

const stickyNotes = defineCollection({
  name: "stickyNotes",
  directory: "src/content/sticky-notes",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    rotation: z.number().optional(),
    color: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    ...editorialFields,
    content: z.string(),
  }),
});

const self = defineCollection({
  name: "self",
  directory: "src/content/self",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()).optional().default([]),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    ...editorialFields,
    content: z.string(),
  }),
});

const shelf = defineCollection({
  name: "shelf",
  directory: "src/content/shelf",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    tags: z.array(z.string()).optional().default([]),
    artist: z.string().optional(),
    album: z.string().optional(),
    year: z.number().optional(),
    coverUrl: z.string().optional(),
    coverAlt: z.string().optional(),
    pdfUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    resourceHighlights: z.array(z.string()).optional(),
    appleMusicUrl: z.string().optional(),
    ...editorialFields,
    content: z.string(),
  }),
});

export default defineConfig({
  content: [systems, sentences, stickyNotes, self, shelf],
});
