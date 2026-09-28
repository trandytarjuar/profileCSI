import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { regions } from '../../../data/community';

export function generateStaticParams() { return regions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const region = regions.find(r => r.slug === slug); return { title: region ? `${region.name} Regional` : 'Regional' }; }
export default async function RegionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = regions.find(r => r.slug === slug); if (!region) notFound();
  return <main className="regional-page"><header className="regional-header"><Link className="wordmark" href="/"><b>CSI<span>/</span></b><small>CBR SQUAD<br/>INDONESIA</small></Link><Link href="/#territory">← Semua regional</Link></header><div className="crumb"><Link href="/">Home</Link> / <Link href="/#territory">Our Territory</Link> / {region.name}</div><section className="regional-hero"><p className="kicker light">{region.group}</p>{region.slug === 'deli-serdang' && region.logo && <Image className="regional-hero-logo" src={region.logo} width={2835} height={2942} alt="Logo CSI Deli Serdang" priority sizes="(max-width: 650px) 120px, 180px" />}<span>{region.code}</span><h1>CSI<br/><em>{region.name}.</em></h1><p>Halaman profil regional CBR Squad Indonesia.</p></section><section className="regional-details"><article><p className="kicker">PROFILE</p>{region.roles ? <><h2>PENGURUS<br/><span>REGIONAL.</span></h2><dl className="regional-officers">{region.roles.map(role => <div key={role.title}><dt>{role.title}</dt><dd>{role.name}</dd></div>)}</dl></> : <><h2>INFORMATION<br/><span>COMING FROM CSI.</span></h2><p>Profil, kontak resmi, dan dokumentasi regional belum tersedia dalam sumber data proyek.</p></>}</article>{region.meetup && <article className="regional-meetup"><p className="kicker">KOPDAR</p><h2>JADWAL<br/><span>KOPDAR.</span></h2><p>{region.meetup.schedule}</p><p>{region.meetup.location}</p>{region.instagram && <a className="button red regional-instagram" href={region.instagram.url} target="_blank" rel="noopener noreferrer">Instagram {region.instagram.handle}</a>}</article>}<article className="empty-state"><span>◈</span><h3>GALERI {region.name.toUpperCase()}</h3><p>Belum ada dokumentasi resmi.</p></article></section></main>;
}
