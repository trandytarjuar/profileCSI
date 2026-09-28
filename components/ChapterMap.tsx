"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Chapter, ChapterGroup } from '../data/community';
import { chapterGroups, mapCallouts, mapFrames, mapPoint, type MapView } from '../data/chapter-map';
import styles from './ChapterMap.module.css';

export default function ChapterMap({ chapters }: { chapters: Chapter[] }) {
  const [filter, setFilter] = useState<ChapterGroup | 'all'>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<MapView>('national');
  const [mapFailed, setMapFailed] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);
  const mapElement = useRef<HTMLDivElement>(null);
  const focusAfterZoom = useRef(false);
  const shown = chapters.filter(chapter => filter === 'all' || chapter.group === filter);
  const current = shown.find(chapter => chapter.slug === selected);
  const western = shown.filter(chapter => chapter.group !== 'CHAPTER MANDIRI');
  const pins = shown.filter(chapter => view === 'west' ? chapter.group !== 'CHAPTER MANDIRI' : chapter.group === 'CHAPTER MANDIRI');
  const frame = mapFrames[view];

  useEffect(() => {
    // Check after hydration too: an SVG resource can fail before React attaches handlers.
    const resource = new window.Image();
    resource.onload = () => setMapLoading(false);
    resource.onerror = () => { setMapFailed(true); setMapLoading(false); };
    resource.src = '/maps/indonesia.svg';
    return () => { resource.onload = null; resource.onerror = null; };
  }, []);

  useEffect(() => {
    if (focusAfterZoom.current && view === 'west') {
      mapElement.current?.querySelector<HTMLButtonElement>('[data-map-pin]')?.focus();
      focusAfterZoom.current = false;
    }
  }, [view]);

  function choose(chapter: Chapter) {
    setSelected(chapter.slug);
    setView(chapter.group === 'CHAPTER MANDIRI' ? 'national' : 'west');
  }
  function changeFilter(value: ChapterGroup | 'all') {
    setFilter(value);
    const first = chapters.find(chapter => value === 'all' || chapter.group === value);
    setSelected(value === 'all' ? null : first?.slug ?? null);
    setView(value === 'JABODETABEK' || value === 'CIKAPUR' ? 'west' : 'national');
  }
  function reset() { setFilter('all'); setSelected(null); setView('national'); }

  return <div className={styles.explorer}>
    <div className={styles.filters} role="group" aria-label="Filter chapter">
      <button type="button" aria-pressed={filter === 'all'} onClick={() => changeFilter('all')}>Semua Chapter <span>{chapters.length}</span></button>
      {chapterGroups.map(group => <button type="button" key={group.value} aria-pressed={filter === group.value} onClick={() => changeFilter(group.value)}>{group.label} <span>{chapters.filter(chapter => chapter.group === group.value).length}</span></button>)}
    </div>
    <div className={styles.layout}>
      <div className={styles.mapColumn}>
        <div className={styles.mapHeader}><div><span className={styles.eyebrow}>CSI / EKSPLORASI CHAPTER</span><h3>{view === 'national' ? 'Satu Indonesia.' : 'Lebih dekat, lebih akrab.'}</h3></div><button type="button" className={styles.reset} onClick={reset}>↺ Atur ulang peta</button></div>
        <p className={styles.hint} id="chapter-map-hint">{view === 'national' ? 'Pilih marker atau perbesar area Jabodetabek–Cikapur.' : 'Garis menghubungkan label chapter dengan titik wilayahnya.'}</p>
        <div ref={mapElement} className={styles.map} role="group" aria-label={view === 'national' ? 'Peta chapter Indonesia' : 'Peta chapter Jabodetabek dan Cikapur'} aria-describedby="chapter-map-hint">
          {mapLoading && !mapFailed && <span className={styles.mapError}>Memuat peta…</span>}
          {!mapFailed ? <svg className={styles.geography} viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`} preserveAspectRatio="none" aria-hidden="true">
            <image href="/maps/indonesia.svg" x="0" y="0" width="1000" height="396" onError={() => setMapFailed(true)} />
          </svg> : <p className={styles.mapError}>Peta belum dapat dimuat. Pilih chapter dari daftar di bawah.</p>}
          <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {view === 'national' && western.length > 0 && <line x1={mapPoint(western[0].map.latitude, western[0].map.longitude, view).x} y1={mapPoint(western[0].map.latitude, western[0].map.longitude, view).y} x2="25" y2="80" />}
            {shown.filter(chapter => view === 'national' || chapter.group !== 'CHAPTER MANDIRI').map(chapter => {
              const point = mapPoint(chapter.map.latitude, chapter.map.longitude, view);
              const label = mapCallouts[chapter.slug] ?? point;
              const clustered = view === 'national' && chapter.group !== 'CHAPTER MANDIRI';
              return <g key={chapter.slug} className={chapter.slug === selected ? styles.selectedPoint : undefined}>
                {!clustered && <line x1={point.x} y1={point.y} x2={label.x} y2={label.y} />}
                <circle cx={point.x} cy={point.y} r={view === 'national' ? .45 : .75} />
              </g>;
            })}
          </svg>
          {view === 'national' && western.length > 0 && <button type="button" className={styles.cluster} style={{ left: '25%', top: '80%' }} onClick={() => { focusAfterZoom.current = true; setView('west'); }} aria-label={`Perbesar Jabodetabek dan Cikapur, ${western.length} chapter`}><b>{western.length}</b><span>Jabodetabek<br />& Cikapur</span><span aria-hidden="true">＋</span></button>}
          {pins.map(chapter => {
            const location = mapCallouts[chapter.slug] ?? mapPoint(chapter.map.latitude, chapter.map.longitude, view);
            const group = chapterGroups.find(group => group.value === chapter.group);
            return <button type="button" data-map-pin key={chapter.slug} className={styles.marker} style={{ left: `${location.x}%`, top: `${location.y}%` }} aria-label={`Pilih CSI ${chapter.name}`} aria-pressed={selected === chapter.slug} onClick={() => choose(chapter)}>
              <span className={styles.markerSymbol} aria-hidden="true">{group?.symbol}</span><b>{chapter.code}</b><span className={styles.tooltip}>CSI {chapter.name}</span>
            </button>;
          })}
          {view === 'national' && <span className={styles.ocean} aria-hidden="true">SAMUDRA HINDIA</span>}
        </div>
        <ul className={styles.legend} aria-label="Legenda kelompok chapter">{chapterGroups.map(group => <li key={group.value}><span aria-hidden="true">{group.symbol}</span>{group.label}</li>)}</ul>
        <p className={styles.mapNote}>Titik menunjukkan perkiraan wilayah, bukan alamat sekretariat. Peta: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth</a>.</p>
        <div className={styles.listHeader}><h3>Pilih chapter</h3><span>{shown.length} chapter</span></div>
        <div className={styles.chapterList} role="group" aria-label="Daftar chapter">
          {shown.map(chapter => <button type="button" key={chapter.slug} aria-pressed={chapter.slug === selected} onClick={() => choose(chapter)}><span>{chapter.code}</span><b>{chapter.name}</b><span aria-hidden="true">↗</span></button>)}
        </div>
        {shown.length === 0 && <p className={styles.hint}>Belum ada chapter dalam kelompok ini.</p>}
      </div>
      <aside className={styles.panel} aria-label="Informasi chapter">
        <p className="sr-only" role="status">{current ? `CSI ${current.name} dipilih. ${current.leaderName ? `Ketua Umum: ${current.leaderName}.` : 'Data pengurus belum tersedia.'}` : `Tampilan nasional. ${shown.length} chapter tersedia.`}</p>
        {current ? <div className={styles.panelContent} key={current.slug}>
          <div className={styles.panelHeading}><div><p className={styles.eyebrow}>{current.group === 'CHAPTER MANDIRI' ? 'Chapter Mandiri' : `Koordinator Wilayah ${current.group}`}</p><h3>CSI<br /><span>{current.name}</span></h3></div>{current.logo && <Image className={styles.logo} src={current.logo} alt={`Logo CSI ${current.name}`} width={90} height={100} />}</div>
          <p className={styles.description}>{current.description ?? `Chapter CBR Squad Indonesia di wilayah ${current.name}.`}</p>
          <div className={styles.leader}>{current.leaderPhoto ? <Image src={current.leaderPhoto} alt={`Foto ${current.leaderName ?? 'pengurus chapter'}`} width={56} height={56} /> : <span className={styles.avatar} aria-hidden="true">CSI</span>}<div><span>Ketua Umum Chapter</span><strong>{current.leaderName ?? 'Data pengurus belum tersedia'}</strong></div></div>
          <h4>Dokumentasi kegiatan</h4>
          {current.gallery?.length ? <Link className={styles.preview} href={`/chapter/${current.slug}#chapter-gallery-title`} aria-label={`Lihat ${current.gallery.length} foto kegiatan CSI ${current.name}`}><Image src={current.gallery[0].src} alt={current.gallery[0].alt} width={current.gallery[0].width} height={current.gallery[0].height} sizes="(max-width: 850px) 88vw, 360px" /><span>{current.gallery.length} foto · Lihat galeri ↗</span></Link> : <p className={styles.empty}>Dokumentasi kegiatan belum tersedia.</p>}
          <h4>Kontak resmi</h4>
          {current.instagram ? <a className={styles.contact} href={current.instagram.url} target="_blank" rel="noopener noreferrer">Instagram ↗<span>{current.instagram.handle}</span></a> : <p className={styles.empty}>Kontak resmi belum tersedia.</p>}
          <Link className={styles.profileLink} href="/under-construction">Lihat Profil Chapter <span aria-hidden="true">↗</span></Link>
        </div> : <div className={styles.welcome}><span className={styles.bigNumber}>{chapters.length.toString().padStart(2, '0')}</span><p className={styles.eyebrow}>CHAPTER / SATU PERSAUDARAAN</p><h3>Temukan<br /><span>chapter-mu.</span></h3><p>Pilih titik di peta atau nama chapter untuk melihat pengurus, dokumentasi, dan kontak yang tersedia.</p><div className={styles.welcomeTip}>Mulai dari wilayah terdekat.<br />Semua chapter bisa dipilih lewat daftar di bawah peta.</div></div>}
      </aside>
    </div>
  </div>;
}
