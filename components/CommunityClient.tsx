"use client";
import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import type { OrganizationRole, Region } from "../data/community";
const groups = ["JABODETABEK", "CIKAPUR", "REGIONAL MANDIRI"] as const;
function RegionCard({ r }: { r: Region }) {
  return (
    <Link className="region-card" href={`/regional/${r.slug}`}>
      <div className="region-card-top">
        <span>{r.group}</span>
        {r.logo && (
          <Image className="chapter-logo" src={r.logo} width={76} height={80} alt={`Logo CSI ${r.name}`} />
        )}
      </div>
      <h3>{r.name}</h3>
      {r.leaderName && (
        <div className="regional-leader">
          <small>Ketua Umum · {r.leaderName}</small>
        </div>
      )}
      <i>↗</i>
    </Link>
  );
}
type Profile = { title: string; photo?: string };
function Modal({
  profile,
  close,
}: {
  profile: string | Profile;
  close: () => void;
}) {
  const { title, photo } =
    typeof profile === "string" ? { title: profile } : profile;
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, [close]);
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <section
        className="profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="close" onClick={close} aria-label="Tutup">
          ×
        </button>
        <p className="kicker">CSI / STRUKTUR ORGANISASI</p>
        {photo ? (
          <Image
            className="profile-photo"
            src={photo}
            width={160}
            height={160}
            alt={`Foto ${title}`}
          />
        ) : (
          <div className="profile-placeholder">CSI</div>
        )}
        <h2 id="profile-title">{title}</h2>
        <p>
          Profil pengurus, foto, periode kepengurusan, dan informasi kontak
          belum dipublikasikan di data resmi proyek ini.
        </p>
      </section>
    </div>
  );
}
type CommunityClientProps = {
  regions: Region[];
  nationalRoles: OrganizationRole[];
  activities: readonly (readonly [string, string])[];
};

export default function CommunityClient({ regions, nationalRoles, activities }: CommunityClientProps) {
  const [menu, setMenu] = useState(false),
    [group, setGroup] = useState("SEMUA"),
    [org, setOrg] = useState("Nasional"),
    [profile, setProfile] = useState<string | Profile | null>(null),
    [gallery, setGallery] = useState("Semua");
  const shown = regions.filter((r) => group === "SEMUA" || r.group === group);
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#home">
          <Image
            className="csi-logo"
            src="/asset-9f2a7c.png"
            width={58}
            height={60}
            alt="Logo CBR Squad Indonesia"
            priority
          />
          <small>
            CBR SQUAD
            <br />
            INDONESIA
          </small>
        </a>
        <button
          className="menu-button"
          aria-expanded={menu}
          aria-controls="primary-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "×" : "☰"}
          <span className="sr-only">Menu</span>
        </button>
        <nav id="primary-nav" className={menu ? "open" : ""}>
          {[
            ["Tentang", "#about"],
            ["Logo CSI", "#logo-history"],
            ["Aturan Member", "#member-rules"],
            ["Organization", "#organization"],
            ["Our Territory", "#territory"],
            ["Gallery", "#gallery"],
            ["Activities", "#activities"],
          ].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMenu(false)}>
              {l}
            </a>
          ))}
          <a
            className="nav-cta"
            href="/under-construction"
            onClick={() => setMenu(false)}
          >
            Gabung CSI ↗
          </a>
        </nav>
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="kicker light">
              INDONESIAN CBR COMMUNITY <em>●</em> ONE NATION
            </p>
            <h1>
              CBR SQUAD
              <br />
              <span>INDONESIA.</span>
            </h1>
            <p className="hero-copy">KEEP SOLID AND SAFETY RIDE.</p>
            <div className="actions">
              <a className="button red" href="#territory">
                Explore Our Territory <b>↘</b>
              </a>
              <a className="button line" href="#about">
                About CSI
              </a>
            </div>
          </div>
          <a className="scroll" href="#about">
            SCROLL TO EXPLORE <span>↓</span>
          </a>
        </section>
        <div className="marquee">
          ONE PASSION <b>✦</b> ONE BROTHERHOOD <b>✦</b> KEEP SOLID <b>✦</b>{" "}
          SAFETY RIDE <b>✦</b>
        </div>
        <section id="about" className="section split">
          <div>
            <p className="kicker">01 / ABOUT CSI</p>
            <h2>
              MORE THAN
              <br />
              <span>A COMMUNITY.</span>
            </h2>
          </div>
          <div className="prose">
            <p className="lead">
              Sejak 26 Desember 2022, CBR Squad Indonesia menjadi keluarga besar
              pecinta Honda CBR di seluruh Indonesia.
            </p>
            <p>
              Kami semua bersaudara: berdiri sejajar, duduk sama rata, berkembang
              bersama tanpa saling menjatuhkan. Kegiatan kami mencakup riding,
              touring, kopdar, sharing, dan kegiatan sosial dengan safety riding
              sebagai dasar setiap perjalanan.
            </p>
            <div className="value-list">
              <span>Brotherhood</span>
              <span>Safety Riding</span>
              <span>Solidarity</span>
            </div>
          </div>
        </section>
        <section id="logo-history" className="section logo-history">
          <div className="logo-history-mark">
            <Image
              src="/asset-9f2a7c.png"
              width={300}
              height={312}
              alt="Logo CBR Squad Indonesia"
            />
          </div>
          <div>
            <p className="kicker">02 / CSI IDENTITY</p>
            <h2>
              SEJARAH
              <br />
              <span>LOGO CSI.</span>
            </h2>
            <p className="logo-copy">
              Community Profile CSI mendokumentasikan perjalanan transformasi logo
              CBR Squad Indonesia dari identitas awal chapter hingga logo nasional.
            </p>
            <ol className="logo-timeline">
              <li>
                <Image className="timeline-logo" src="/asset-2020a7.png" width={160} height={168} alt="Logo awal CBR Squad Depok tahun 2020" />
                <b>2020</b><span>Creator: Wahyu Tri Setiyadi</span>
              </li>
              <li>
                <Image className="timeline-logo" src="/asset-2021b4.png" width={160} height={168} alt="Logo CBR Squad Depok tahun 2021" />
                <b>2021</b><span>Creator: Wahyu Tri Setiyadi</span>
              </li>
              <li>
                <Image className="timeline-logo" src="/asset-9f2a7c.png" width={160} height={168} alt="Logo CBR Squad Indonesia tahun 2022" />
                <b>2022</b><span>Creator: Alm. Fendi Mustofa</span>
              </li>
            </ol>
            <div className="shape-key" aria-label="Elemen pembentuk logo CSI">
              {[
                ['asset-shape-a1.png', 'Tameng'],
                ['asset-shape-b2.png', 'Perisai'],
                ['asset-shape-c3.png', 'Pita melingkar'],
                ['asset-shape-d4.png', 'Sayap'],
                ['asset-shape-e5.png', 'Logo Honda'],
              ].map(([src, label]) => (
                <figure key={src}>
                  <Image src={`/${src}`} width={120} height={86} alt={`Elemen ${label} pada logo CSI`} />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="logo-philosophy">
              <article>
                <b>Bentuk</b>
                <dl>
                  <div><dt>Tameng</dt><dd>Logo motor merupakan salah satu produk unggulan dari varian motor sport Honda yang menjadi ciri khas CBR Squad.</dd></div>
                  <div><dt>Perisai</dt><dd>Garis perisai melambangkan kekuatan dalam mempertahankan kondisi pasang surut dalam suatu komunitas.</dd></div>
                  <div><dt>Pita melingkar</dt><dd>Melambangkan wujud rasa persaudaraan yang tidak pernah putus.</dd></div>
                  <div><dt>Sayap</dt><dd>Melambangkan CBR Squad yang terus berkembang untuk mencapai impian dan harapan bagi setiap individu di dalamnya.</dd></div>
                  <div><dt>Logo Honda</dt><dd>Melambangkan bahwa CBR Squad terbentuk dari satu varian motor sport Honda.</dd></div>
                </dl>
              </article>
              <article>
                <b>Warna</b>
                <dl>
                  <div><dt>Hitam</dt><dd>Melambangkan kekuatan dan keseriusan dalam membangun suatu organisasi.</dd></div>
                  <div><dt>Merah</dt><dd>Melambangkan keberanian untuk terus melangkah maju dan berkembang.</dd></div>
                  <div><dt>Putih</dt><dd>Melambangkan toleransi dalam kegiatan sosial dan netralitas dalam keanekaragaman suku, agama, dan ras.</dd></div>
                </dl>
              </article>
            </div>
          </div>
        </section>
        <section id="member-rules" className="section member-rules">
          <div className="section-head">
            <div>
              <p className="kicker">03 / MEMBER GUIDELINES</p>
              <h2>
                SOLID ON THE ROAD.
                <br />
                <span>SAFE IN EVERY RIDE.</span>
              </h2>
            </div>
            <p>Aturan dasar dan kewajiban yang menjadi pedoman bagi member CSI.</p>
          </div>
          <div className="rule-grid">
            <article>
              <b>01</b>
              <h3>Safety Riding</h3>
              <p>Gunakan helm, jaket, sarung tangan, celana panjang, dan sepatu. Pastikan kendaraan layak jalan serta dokumen berkendara lengkap.</p>
            </article>
            <article>
              <b>02</b>
              <h3>Disiplin Konvoi</h3>
              <p>Patuhi rambu lalu lintas, utamakan kendaraan prioritas, dan jangan mendahului barisan kecuali menjalankan tugas RC, sweeper, atau korlap.</p>
            </article>
            <article>
              <b>03</b>
              <h3>Etika Member</h3>
              <p>Jaga nama baik CSI. Narkoba, SARA, politik, kekerasan, ugal-ugalan, strobo, dan merokok saat berkendara dilarang.</p>
            </article>
            <article>
              <b>04</b>
              <h3>Menjadi Member</h3>
              <p>Ikuti proses rekrutmen, kopdar empat kali berturut-turut, aktif dalam agenda CSI, dan penuhi ketentuan untuk memperoleh NRA.</p>
            </article>
          </div>
        </section>
        <section id="organization" className="section organization">
          <div className="section-head">
            <div>
              <p className="kicker">04 / THE PEOPLE</p>
              <h2>
                ONE TEAM.
                <br />
                <span>ONE DIRECTION.</span>
              </h2>
            </div>
            <p>
              Struktur disajikan tanpa mengisi nama atau masa jabatan yang belum
              dikonfirmasi.
            </p>
          </div>
          <div className="org-tabs" role="tablist">
            {["Nasional", "Koordinator Wilayah", "Regional Mandiri"].map(
              (x) => (
                <button
                  key={x}
                  role="tab"
                  aria-selected={org === x}
                  className={org === x ? "selected" : ""}
                  onClick={() => setOrg(x)}
                >
                  {x}
                </button>
              ),
            )}
          </div>
          {org === "Nasional" && (
            <div className="role-grid">
              {nationalRoles.map((role, i) => (
                <button
                  className="role-card"
                  key={role.title}
                  onClick={() =>
                    setProfile(
                      role.name ? `${role.name} — ${role.title}` : role.title,
                    )
                  }
                >
                  <span>0{i + 1} / NATIONAL</span>
                  {role.photo ? (
                    <Image
                      className="role-photo"
                      src={role.photo}
                      width={64}
                      height={64}
                      alt={`Foto ${role.name}, ${role.title}`}
                    />
                  ) : (
                    <div>CSI</div>
                  )}
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                  <small>
                    {role.name ? role.name : "Profil menunggu data resmi"} ↗
                  </small>
                </button>
              ))}
            </div>
          )}
          {org === "Koordinator Wilayah" && (
            <div className="territory-org">
              {groups.slice(0, 2).map((g) => (
                <article key={g}>
                  <p className="kicker">KOORDINATOR WILAYAH</p>
                  <h3>{g}</h3>
                  <button
                    className="leader"
                    onClick={() => setProfile(`Koordinator Wilayah ${g}`)}
                  >
                    Koordinator wilayah <span>Data pengurus menyusul</span>
                  </button>
                  {regions
                    .filter((r) => r.group === g)
                    .map((r) => (
                      <button
                        key={r.slug}
                        className="leader"
                        onClick={() =>
                          setProfile(
                            r.leaderName
                              ? {
                                  title: `${r.leaderName} — Ketua Umum ${r.name}`,
                                  photo: r.leaderPhoto,
                                }
                              : `Ketua Umum ${r.name}`,
                          )
                        }
                      >
                        <b>Ketua Umum {r.name}</b>
                        <span>{r.leaderName ?? "Data pengurus menyusul"}</span>
                      </button>
                    ))}
                </article>
              ))}
            </div>
          )}
          {org === "Regional Mandiri" && (
            <div className="territory-org single">
              {regions
                .filter((r) => r.group === "REGIONAL MANDIRI")
                .map((r) => (
                  <article key={r.slug}>
                    <p className="kicker">REGIONAL MANDIRI</p>
                    <h3>{r.name}</h3>
                    <button
                      className="leader"
                      onClick={() =>
                        setProfile(
                          r.leaderName
                            ? {
                                title: `${r.leaderName} - Ketua Umum ${r.name}`,
                                photo: r.leaderPhoto,
                              }
                            : `Ketua Umum ${r.name}`,
                        )
                      }
                    >
                      <b>Ketua Umum {r.name}</b>
                      <span>{r.leaderName ?? "Data pengurus menyusul"}</span>
                    </button>
                  </article>
                ))}
            </div>
          )}
        </section>
        <section id="territory" className="section territory">
          <div className="section-head">
            <div>
              <p className="kicker">03 / OUR TERRITORY</p>
              <h2>
                FROM CITY
                <br />
                <span>TO BROTHERHOOD.</span>
              </h2>
            </div>
            <p>
              Pilih wilayah untuk melihat halaman profil dan informasi yang
              tersedia.
            </p>
          </div>
          <div className="filters">
            {["SEMUA", ...groups].map((x) => (
              <button
                className={group === x ? "selected" : ""}
                onClick={() => setGroup(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="map-wrap">
            <div className="indo-map" aria-hidden="true">
              <Image
                className="real-map"
                src="/asset-map-id.svg"
                alt=""
                fill
                sizes="(max-width: 650px) 100vw, 88vw"
              />
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="island main-island" d="M11 19l9-5 10 3 5 8-3 8 4 10-5 11-8-2-3-10-8-7 2-7-3-5z" />
                <path className="island" d="M38 62l11-2 14 1 17 4-2 4-20 2-18-2z" />
                <path className="island" d="M50 26l11-5 10 6 4 13-6 13-13-1-7-10z" />
                <path className="island" d="M76 35l6-5 7 3-2 7 7 4-5 5-6-2-3 8-6-4 2-7-4-3z" />
                <path className="island" d="M83 61l9-2 4 4-6 3-8-1zM82 75l10-4 5 5-11 6-6-2zM62 76l10 1 3 4-14 1-3-3z" />
                <path className="island island-small" d="M40 53l5 1-2 3-5-1zM72 57l4 1-2 3-4-1z" />
              </svg>
              {shown.map((r) => (
                <Fragment key={r.slug}>
                  <span className="map-dot" style={{ left: `${r.map.x}%`, top: `${r.map.y}%` }} title={r.name} />
                  <span className="pin" style={{ left: `${r.map.labelX}%`, top: `${r.map.labelY}%` }}>{r.code}</span>
                </Fragment>
              ))}
            </div>
            <p className="map-caption">
              Sebaran regional CSI di Indonesia. Pilih kartu regional di bawah
              untuk membuka halaman wilayah.
            </p>
          </div>
          <div className="region-grid">
            {shown.map((r) => (
              <RegionCard key={r.slug} r={r} />
            ))}
          </div>
        </section>
        <section id="gallery" className="section gallery">
          <div className="section-head">
            <div>
              <p className="kicker">04 / DOCUMENTATION</p>
              <h2>
                THE ROAD,
                <br />
                <span>IN FRAMES.</span>
              </h2>
            </div>
            <p>
              Dokumentasi resmi per kegiatan dapat ditambahkan tanpa mengubah
              tata letak ini.
            </p>
          </div>
          <div className="filters">
            {[
              "Semua",
              "Touring",
              "Kopdar",
              "Safety Riding",
              "Social Activity",
              "Brotherhood",
            ].map((x) => (
              <button
                className={gallery === x ? "selected" : ""}
                onClick={() => setGallery(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="empty-state">
            <span>◈</span>
            <h3>
              {gallery === "Semua" ? "DOKUMENTASI CSI" : gallery.toUpperCase()}
            </h3>
            <p>
              Belum ada foto dokumentasi resmi yang tersedia untuk ditampilkan.
            </p>
          </div>
        </section>
        <section id="activities" className="section activities">
          <p className="kicker">05 / WHAT WE DO</p>
          <h2>
            BUILT FOR
            <br />
            <span>THE ROAD.</span>
          </h2>
          <div className="activity-list">
            {activities.map(([name, copy], i) => (
              <article key={name}>
                <span>0{i + 1}</span>
                <h3>{name}</h3>
                <p>{copy}</p>
                <i>↗</i>
              </article>
            ))}
          </div>
        </section>
        <section id="contact" className="contact">
          <p className="kicker light">06 / KEEP IN TOUCH</p>
          <h2>
            ONE PASSION.
            <br />
            ONE <span>BROTHERHOOD.</span>
          </h2>
          <p>
            Kontak dan kanal sosial resmi CSI akan ditampilkan setelah data
            publik diberikan.
          </p>
          <a className="button dark" href="#territory">
            Lihat Regional ↗
          </a>
        </section>
      </main>
      <a
        className="whatsapp-float"
        href="https://wa.me/6283831658044"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi CSI melalui WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M27.2 4.7A15.7 15.7 0 0 0 2.6 23.6L1 31l7.6-1.5a15.7 15.7 0 0 0 18.6-24.8Zm-11.1 23a12.7 12.7 0 0 1-6.5-1.8l-.5-.3-4.5.9.9-4.4-.3-.5a12.7 12.7 0 1 1 10.9 6.1Zm7-9.5c-.4-.2-2.4-1.2-2.8-1.3-.4-.2-.7-.2-1 .2s-1 1.3-1.2 1.6c-.2.3-.4.3-.8.1a10.4 10.4 0 0 1-3.1-1.9 11.5 11.5 0 0 1-2.1-2.6c-.2-.4 0-.6.1-.8l.6-.7c.2-.2.2-.4.3-.7.1-.2 0-.5-.1-.7l-1.3-3.1c-.3-.8-.7-.7-1-.7h-.8c-.3 0-.7.1-1 .5s-1.4 1.3-1.4 3.3 1.4 3.9 1.6 4.2c.2.3 2.8 4.3 6.9 6 .9.4 1.6.6 2.1.7.9.3 1.8.2 2.4.1.8-.1 2.4-1 2.7-2 .3-1 .3-1.8.2-2-.1-.2-.4-.3-.8-.5Z" />
        </svg>
        <span>WhatsApp CSI</span>
      </a>
      <footer>
        <div className="wordmark">
          <Image
            className="csi-logo"
            src="/asset-9f2a7c.png"
            width={58}
            height={60}
            alt="Logo CBR Squad Indonesia"
          />
          <small>
            CBR SQUAD
            <br />
            INDONESIA
          </small>
        </div>
        <p>KEEP SOLID AND SAFETY RIDE</p>
        <a
          className="instagram-link"
          href="https://www.instagram.com/cbrsquadindonesia_official?stkn=MWV2OXl0M2Y3ODl0YQ=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram resmi CBR Squad Indonesia"
        >
          Instagram ↗
        </a>
        <a href="#home">Kembali ke atas ↑</a>
        <small>© {new Date().getFullYear()} CBR Squad Indonesia</small>
      </footer>
      {profile && <Modal profile={profile} close={() => setProfile(null)} />}
    </>
  );
}
