import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import {
  boundarySchema,
  practiceSchema,
  provenanceSchema,
} from "./scripts/editorial-contract-v1.mjs";

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

const v1SystemsFields = {
  schemaVersion: z.literal("1.0").optional(),
  contentKind: z.enum(["explainer", "field-note", "playbook"]).optional(),
  readerIntent: z.enum(["understand", "inspect", "use", "reflect"]).optional(),
  readerOutcome: z.string().optional(),
  thesis: z.string().optional(),
  boundary: boundarySchema.optional(),
  practice: practiceSchema.optional(),
  provenance: provenanceSchema.optional(),
  language: z
    .object({
      profile: z.string().default("sans-serif-sentiments"),
      recipe: z.string().optional(),
    })
    .optional(),
};

const systems = defineCollection({
  name: "systems",
  directory: "src/content/systems",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["Explanations", "Concepts", "How-things-fit-together"]).optional(),
    tags: z.array(z.string()).optional().default([]),
    publishDate: z.string().optional(),
    updatedAt: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    proofPoints: z.array(z.string()).optional().default([]),

    // --- Explainer schema -----------------------------------------------
    // All optional so the existing 58 docs keep building. Backfill the
    // strongest pages first, then tighten to required once the count of
    // docs missing them reaches zero.

    // Slot 04. Two to four sentences that stand alone if lifted out,
    // because an answer engine will lift them out. No backward pronouns.
    shortAnswer: z.string().min(80).max(700).optional(),

    // Slot 05. One everyday mechanism the reader already trusts.
    // `breaksWhen` is not optional within the object: an analogy without
    // its failure point is a claim nobody has checked.
    analogy: z.object({
      mapping: z.string(),
      breaksWhen: z.string(),
    }).optional(),

    // Slot 06. One diagram of the mechanism, not of the vocabulary.
    // `shows` is an enum so figures are chosen from a system of four
    // archetypes rather than invented per article.
    figure: z.object({
      shows: z.enum(["range", "loop", "before-after", "repo-map"]),
      caption: z.string(),
      alt: z.string().min(30),
      src: z.string().optional(),
    }).optional(),

    // Slot 10. What was built, run, inspected or broken, and what changed.
    evidence: z.object({
      what: z.string(),
      where: z.string(),
      changed: z.string(),
      tags: z.array(z.string()).optional().default([]),
    }).optional(),

    // Slot 12. The internal link model, made explicit instead of left to
    // instinct: one concept-adjacent playbook, one teardown, one tool.
    related: z.array(z.object({
      type: z.enum(["explainer", "playbook", "teardown", "tool"]),
      title: z.string(),
      href: z.string(),
      note: z.string().optional(),
    })).max(3).optional(),

    // Slot 13. What can the reader do afterwards that they could not do before?
    useValue: z.string().optional(),
    // --------------------------------------------------------------------
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional()
      .default([]),
    ...editorialFields,
    ...v1SystemsFields,
    content: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.schemaVersion === "1.0") {
      if (!data.contentKind) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "v1 systems document requires contentKind (explainer | field-note | playbook)",
          path: ["contentKind"],
        });
      }
      if (!data.readerIntent) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "v1 systems document requires readerIntent (understand | inspect | use | reflect)",
          path: ["readerIntent"],
        });
      }
      if (!data.readerOutcome || data.readerOutcome.trim().length < 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "v1 systems document requires readerOutcome (at least 20 characters)",
          path: ["readerOutcome"],
        });
      }
      if (!data.thesis || data.thesis.trim().length < 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "v1 systems document requires thesis (at least 10 characters)",
          path: ["thesis"],
        });
      }
      if (!data.provenance) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "v1 systems document requires provenance object",
          path: ["provenance"],
        });
      }
      if (data.contentKind === "explainer") {
        if (!data.boundary) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "explainer requires boundary object (is, isNot, mattersWhen)",
            path: ["boundary"],
          });
        }
        if (!data.shortAnswer || typeof data.shortAnswer !== "string" || data.shortAnswer.trim().length < 80 || data.shortAnswer.trim().length > 700) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "explainer requires shortAnswer (between 80 and 700 characters)",
            path: ["shortAnswer"],
          });
        }
      }
      if (data.contentKind === "field-note") {
        const hasAuthorObserved =
          data.provenance?.primary === "observed" &&
          Array.isArray(data.provenance?.claims) &&
          data.provenance.claims.some(
            (c) => c.kind === "observed" && c.attestation === "author"
          );
        if (!hasAuthorObserved) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "field-note requires primary: 'observed' and at least one observed claim with attestation: 'author'",
            path: ["provenance"],
          });
        }
      }
      if (data.contentKind === "playbook" && !data.practice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "playbook requires practice object (steps, verification, failureCheck)",
          path: ["practice"],
        });
      }
    } else {
      if (!data.category) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Legacy systems document requires category (Explanations | Concepts | How-things-fit-together)",
          path: ["category"],
        });
      }
    }
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

const v1SelfFields = {
  schemaVersion: z.literal("1.0").optional(),
  contentKind: z.enum(["essay", "field-note"]).optional(),
  readerIntent: z.enum(["understand", "inspect", "use", "reflect"]).optional(),
  readerOutcome: z.string().optional(),
  thesis: z.string().optional(),
  boundary: boundarySchema.optional(),
  provenance: provenanceSchema.optional(),
  language: z
    .object({
      profile: z.string().default("sans-serif-sentiments"),
      recipe: z.string().optional(),
    })
    .optional(),
};

const self = defineCollection({
  name: "self",
  directory: "src/content/self",
  include: "**/*.{md,mdx}",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      publishDate: z.string(),
      tags: z.array(z.string()).optional().default([]),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().optional(),
      ...editorialFields,
      ...v1SelfFields,
      content: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.schemaVersion === "1.0") {
        if (!data.contentKind) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "v1 self document requires contentKind (essay | field-note)",
            path: ["contentKind"],
          });
        }
        if (!data.readerIntent) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "v1 self document requires readerIntent",
            path: ["readerIntent"],
          });
        }
        if (!data.readerOutcome || data.readerOutcome.trim().length < 20) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "v1 self document requires readerOutcome (at least 20 characters)",
            path: ["readerOutcome"],
          });
        }
        if (!data.thesis || data.thesis.trim().length < 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "v1 self document requires thesis (at least 10 characters)",
            path: ["thesis"],
          });
        }
        if (!data.provenance) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "v1 self document requires provenance object",
            path: ["provenance"],
          });
        }
        if (data.contentKind === "field-note") {
          const hasAuthorObserved =
            data.provenance?.primary === "observed" &&
            Array.isArray(data.provenance?.claims) &&
            data.provenance.claims.some(
              (c) => c.kind === "observed" && c.attestation === "author"
            );
          if (!hasAuthorObserved) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                "field-note requires primary: 'observed' and at least one observed claim with attestation: 'author'",
              path: ["provenance"],
            });
          }
        }
      }
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

const teardowns = defineCollection({
  name: "teardowns",
  directory: "src/content/teardowns",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    useValue: z.string(),
    repo: z.object({
      url: z.string(),
      name: z.string().optional(),
    }),
    inspected: z.object({
      ref: z.string(),
      on: z.string(),
    }),
    publishDate: z.string(),
    tags: z.array(z.string()).optional().default([]),
    ...editorialFields,
    content: z.string(),
  }),
});

const kits = defineCollection({
  name: "kits",
  directory: "src/content/kits",
  include: "**/*.{md,mdx}",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    useValue: z.string(),
    asset: z
      .object({
        type: z.string(),
        path: z.string().optional(),
        content: z.string().optional(),
      })
      .refine((a) => Boolean(a.path || a.content), {
        message: "Kit asset must specify at least one of asset.path or asset.content",
      }),
    publishDate: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    ...editorialFields,
    content: z.string(),
  }),
});

const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.{md,mdx}",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      useValue: z.string(),
      status: z.enum(["alpha", "beta", "active", "archived", "exploratory"]),
      repo: z.string().optional(),
      demo: z.string().optional(),
      package: z.string().optional(),
      docs: z.string().optional(),
      publishDate: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      ...editorialFields,
      content: z.string(),
    })
    .refine((p) => Boolean(p.repo || p.demo || p.package || p.docs), {
      message: "Project must specify at least one of repo, demo, package, or docs",
    }),
});

export default defineConfig({
  content: [systems, sentences, stickyNotes, self, shelf, teardowns, kits, projects],
});
