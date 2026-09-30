import type { MetadataRoute } from 'next';
import { chapters } from '../data/community';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cbrsquadindonesia.vercel.app';
  return [
    {
      url: base,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...chapters.map((chapter) => ({ url: `${base}/chapter/${chapter.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 }))
  ];
}
