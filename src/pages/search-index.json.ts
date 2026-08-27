import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Statische zoekindex voor de client-side zoekbalk.
 * Compact gehouden: korte sleutels, geen overbodige velden.
 * k = kind (s = school, p = plaats, b = bokser, n = nieuws)
 */
export const GET: APIRoute = async () => {
  const [gyms, cities, boxers, posts] = await Promise.all([
    getCollection('gyms'),
    getCollection('cities'),
    getCollection('boxers'),
    getCollection('blog'),
  ]);

  const items: Array<{ n: string; u: string; k: string; c?: string }> = [];

  for (const c of cities) {
    items.push({ n: c.data.city, u: `/scholen/${c.id}/`, k: 'p' });
  }
  for (const g of gyms) {
    items.push({ n: g.data.title, u: `/${g.id}/`, k: 's', c: g.data.city || undefined });
  }
  for (const b of boxers) {
    items.push({ n: b.data.title, u: `/${b.id}/`, k: 'b' });
  }
  for (const p of posts) {
    items.push({ n: p.data.title, u: `/${p.id}/`, k: 'n' });
  }

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
