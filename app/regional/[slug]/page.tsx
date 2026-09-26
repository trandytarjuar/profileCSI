import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { regions } from '../../../data/community';

export function generateStaticParams() { return regions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const region = regions.find(r => r.slug === slug); return { title: region ? `${region.name} Regional` : 'Regional' }; }
export default async function RegionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = regions.find(r => r.slug === slug); if (!region) notFound();
  return <main className="regional-page"><header className="regional-header"><Link className="wordmark" href="/"><b>CSI<span>/</span></b><small>CBR SQUAD<br/>INDONESIA</small></Link><Link href="/#territory">← Semua regional</Link></header><div className="crumb"><Link href="/">Home</Link> / <Link href="/#territory">Our Territory</Link> / {region.name}</div><section className="regional-hero"><p className="kicker light">{region.group}</p><span>{region.code}</span><h1>CSI<br/><em>{region.name}.</em></h1><p>Halaman profil regional CBR Squad Indonesia.</p></section><section className="regional-details"><article><p className="kicker">PROFILE</p><h2>INFORMATION<br/><span>COMING FROM CSI.</span></h2><p>Profil, kontak resmi, dan dokumentasi regional belum tersedia dalam sumber data proyek.</p></article><article className="empty-state"><span>◈</span><h3>GALERI {region.name.toUpperCase()}</h3><p>Belum ada dokumentasi resmi.</p></article></section></main>;
}
