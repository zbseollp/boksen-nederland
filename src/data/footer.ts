import { getCollection } from 'astro:content';

/**
 * De footer staat op alle ~3000 pagina's. Zonder deze module draaide de
 * sortering over 2349 scholen per pagina opnieuw, wat de build van ~9s naar
 * ~294s bracht. Een module-level promise wordt per build één keer uitgevoerd.
 */
async function build() {
  const [gyms, cities] = await Promise.all([
    getCollection('gyms'),
    getCollection('cities'),
  ]);

  const counts = new Map<string, number>();
  for (const g of gyms) {
    const cs = g.data.citySlug;
    if (cs) counts.set(cs, (counts.get(cs) || 0) + 1);
  }

  const topCities = [...cities]
    .sort((a, b) => (counts.get(b.id) || 0) - (counts.get(a.id) || 0))
    .slice(0, 8)
    .map((c) => ({ slug: c.id, city: c.data.city }));

  return { gymCount: gyms.length, cityCount: cities.length, topCities };
}

export const footerData = build();
