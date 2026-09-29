import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChapterGallery from "../../../components/ChapterGallery";
import { chapters } from "../../../data/community";

export function generateStaticParams() { return chapters.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = chapters.find((item) => item.slug === slug);
  return { title: chapter ? `CSI ${chapter.name} | CBR Squad Indonesia` : "Chapter | CBR Squad Indonesia" };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters.find((item) => item.slug === slug);
  if (!chapter) notFound();
  const leaderRole = chapter.roles?.find((role) => role.title === "Ketua Umum")?.title ?? "Ketua Umum Chapter";

  return <main className="chapter-page">
    <header className="chapter-header">
      <Link className="wordmark" href="/" aria-label="CBR Squad Indonesia - Beranda"><b>CSI<span>/</span></b><small>CBR SQUAD<br />INDONESIA</small></Link>
      <Link className="chapter-back" href="/#territory">← Kembali ke wilayah</Link>
    </header>
    <div className="crumb"><Link href="/">Beranda</Link><span>/</span><Link href="/#territory">Wilayah Kami</Link><span>/</span><b>{chapter.name}</b></div>

    <section className="chapter-profile-hero">
      <div className="chapter-profile-copy">
        <p className="kicker">{chapter.group === "CHAPTER MANDIRI" ? "CHAPTER MANDIRI" : `KOORDINATOR WILAYAH / ${chapter.group}`}</p>
        <h1><small>CSI</small>{chapter.name}<em>.</em></h1>
        <p className="chapter-intro">{chapter.description ?? `Chapter CBR Squad Indonesia di wilayah ${chapter.name}.`}</p>
        <div className="chapter-hero-meta"><span>{chapter.code}</span><span>CBR SQUAD INDONESIA</span></div>
      </div>
      <div className="chapter-profile-mark">{chapter.logo ? <Image src={chapter.logo} width={220} height={230} alt={`Logo CSI ${chapter.name}`} priority /> : <span>{chapter.code}</span>}</div>
    </section>

    <section className="chapter-overview" aria-label="Informasi utama chapter">
      <article className="chapter-leadership"><p className="kicker">PENGURUS CHAPTER</p><div className="chapter-leader-feature">
        {chapter.leaderPhoto ? <Image src={chapter.leaderPhoto} width={112} height={112} alt={`Foto ${chapter.leaderName}`} /> : <span className="chapter-avatar">CSI</span>}
        <div><span>{leaderRole}</span><h2>{chapter.leaderName ?? "Data pengurus menyusul"}</h2><p>{chapter.leaderName ? "Memimpin dan mengoordinasikan aktivitas chapter." : "Informasi pengurus akan diperbarui setelah tersedia."}</p></div>
      </div></article>
      <article className="chapter-quick-info"><p className="kicker">INFORMASI CHAPTER</p><dl><div><dt>Wilayah</dt><dd>{chapter.name}</dd></div><div><dt>Kelompok</dt><dd>{chapter.group === "CHAPTER MANDIRI" ? "Chapter Mandiri" : chapter.group}</dd></div><div><dt>Status</dt><dd>CBR Squad Indonesia</dd></div></dl>{chapter.instagram && <a className="chapter-social" href={chapter.instagram.url} target="_blank" rel="noopener noreferrer">Instagram <span>{chapter.instagram.handle}</span> ↗</a>}</article>
    </section>

    {chapter.roles?.length ? <section className="chapter-section chapter-team"><div className="chapter-section-heading"><p className="kicker">STRUKTUR ORGANISASI</p><h2>SATU TIM.<br /><span>SATU ARAH.</span></h2></div><div className="chapter-officer-grid">{chapter.roles.map((role, index) => <article key={role.title}><span>0{index + 1}</span><h3>{role.title}</h3><p>{role.name}</p></article>)}</div></section> : <section className="chapter-section chapter-pending"><p className="kicker">STRUKTUR ORGANISASI</p><h2>DATA PENGURUS<br /><span>MENYUSUL.</span></h2><p>Struktur pengurus chapter akan ditampilkan setelah data resmi tersedia.</p></section>}

    {chapter.meetup && <section className="chapter-meetup-banner"><div><p className="kicker">KOPDAR CHAPTER</p><h2>MARI <span>BERKUMPUL.</span></h2></div><div><span>Jadwal</span><strong>{chapter.meetup.schedule}</strong></div><div><span>Lokasi</span><strong>{chapter.meetup.location}</strong></div></section>}

    <section className="chapter-section chapter-gallery" aria-labelledby="chapter-gallery-title"><div className="chapter-section-heading"><p className="kicker">DOKUMENTASI KEGIATAN</p><h2 id="chapter-gallery-title">PERJALANAN<br /><span>BERSAMA.</span></h2></div>{chapter.gallery?.length ? <ChapterGallery photos={chapter.gallery} /> : <div className="chapter-gallery-empty"><span>◈</span><h3>GALERI {chapter.name.toUpperCase()}</h3><p>Dokumentasi resmi chapter belum tersedia.</p></div>}</section>
  </main>;
}
