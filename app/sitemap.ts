import type { MetadataRoute } from 'next';
import { chapters } from '../data/community';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cbrsquadindonesia.vercel.app';
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/under-construction`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...chapters.map((chapter) => ({ url: `${base}/chapter/${chapter.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 }))
  ];
}
