import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    // legacy WordPress/Sanity compatibility
    excerpt: z.string().optional(),
    date: z.coerce.date().optional(),
    // presentation extras
    heroImage: z.string().optional(),
    metaTitle: z.string().optional(),
  }),
});

// Boksschool-vermeldingen (voorheen de ZB Magic Pages van WordPress)
const gyms = defineCollection({
  loader: glob({ base: './src/content/gyms', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string(),
    city: z.string().optional(),
    website: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    lastUpdated: z.string().optional(),
    intro: z.string().optional(),
    schedule: z.string().optional(),
    costs: z.string().optional(),
    locationNote: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
    citySlug: z.string().optional(),
    nearby: z
      .array(z.object({ name: z.string(), href: z.string() }))
      .optional(),
  }),
});

// Stadspagina's: /scholen/{stad}/
const cities = defineCollection({
  loader: glob({ base: './src/content/cities', pattern: '**/*.json' }),
  schema: z.object({
    title: z.string(),
    city: z.string(),
    metaTitle: z.string().optional(),
    metaDesc: z.string().optional(),
    intro: z.string().optional(),
    gyms: z.array(z.object({ name: z.string(), href: z.string() })).optional(),
  }),
});

// Boksers: recordpagina's per bokser (voorheen de record magic pages)
const boxers = defineCollection({
  loader: glob({ base: './src/content/boxers', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    metaTitle: z.string().optional(),
    nickname: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog, gyms, cities, boxers };
