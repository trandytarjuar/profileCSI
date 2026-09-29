"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { OrganizationRole, Chapter } from "../data/community";
import ChapterMap from "./ChapterMap";
import partnership from "./Partnership.module.css";
const groups = ["JABODETABEK", "CIKAPUR", "CHAPTER MANDIRI"] as const;
type Language = "id" | "en";

const copy = {
  id: {
    language: "EN", nav: ["Tentang", "Logo CSI", "Aturan Member", "Organisasi", "Wilayah", "Galeri", "Kegiatan"], join: "Gabung CSI ↗",
    explore: "Jelajahi Wilayah Kami", about: "Tentang CSI", scroll: "JELAJAHI HALAMAN",
    marquee: "SATU HOBI ✦ SATU PERSAUDARAAN ✦ TETAP SOLID ✦ BERKENDARA AMAN ✦",
    aboutKicker: "01 / TENTANG CSI", aboutTitle: <>LEBIH DARI<br /><span>SEBUAH KOMUNITAS.</span></>,
    lead: "Sejak 26 Desember 2022, CBR Squad Indonesia menjadi keluarga besar pecinta Honda CBR di seluruh Indonesia.",
    aboutCopy: "Kami semua bersaudara: berdiri sejajar, duduk sama rata, berkembang bersama tanpa saling menjatuhkan. Kegiatan kami mencakup riding, touring, kopdar, sharing, dan kegiatan sosial dengan safety riding sebagai dasar setiap perjalanan.",
    values: ["Persaudaraan", "Berkendara Aman", "Solidaritas"], territoryKicker: "05 / WILAYAH KAMI",
    territoryTitle: <>DARI KOTA<br /><span>MENUJU PERSAUDARAAN.</span></>, territoryCopy: "Pilih wilayah untuk melihat halaman profil dan informasi yang tersedia.",
    galleryKicker: "06 / DOKUMENTASI", galleryTitle: <>PERJALANAN,<br /><span>DALAM KENANGAN.</span></>, galleryCopy: "Dokumentasi resmi per kegiatan dapat ditambahkan tanpa mengubah tata letak ini.",
    filters: ["Semua", "Touring", "Kopdar", "Berkendara Aman", "Kegiatan Sosial", "Persaudaraan"], empty: "Belum ada foto dokumentasi resmi yang tersedia untuk ditampilkan.",
    activitiesKicker: "07 / KEGIATAN KAMI", activitiesTitle: <>DIBUAT UNTUK<br /><span>PERJALANAN.</span></>, contactKicker: "08 / TETAP TERHUBUNG",
    contactTitle: <>SATU HOBI.<br />SATU <span>PERSAUDARAAN.</span></>, contactCopy: "Kontak dan kanal sosial resmi CSI akan ditampilkan setelah data publik diberikan.",
    partnershipKicker: "02 / KEMITRAAN", partnershipTitle: <>DIDUKUNG<br /><span>BERSAMA.</span></>, partnershipCopy: "Partner yang tumbuh bersama semangat persaudaraan dan budaya berkendara aman CBR Squad Indonesia.",
    chapters: "Lihat Chapter ↗", footer: "TETAP SOLID, BERKENDARA AMAN", top: "Kembali ke atas ↑", all: "DOKUMENTASI CSI",
  },
  en: {
    language: "ID", nav: ["About", "CSI Logo", "Member Rules", "Organization", "Territories", "Gallery", "Activities"], join: "Join CSI ↗",
    explore: "Explore Our Territories", about: "About CSI", scroll: "EXPLORE THE PAGE",
    marquee: "ONE PASSION ✦ ONE BROTHERHOOD ✦ STAY SOLID ✦ RIDE SAFELY ✦",
    aboutKicker: "01 / ABOUT CSI", aboutTitle: <>MORE THAN<br /><span>A COMMUNITY.</span></>,
    lead: "Since 26 December 2022, CBR Squad Indonesia has been a large family for Honda CBR enthusiasts across Indonesia.",
    aboutCopy: "We are all brothers and sisters: equal, growing together, and never bringing one another down. Our activities include riding, touring, meetups, sharing, and social initiatives, with safe riding as the foundation of every journey.",
    values: ["Brotherhood", "Safe Riding", "Solidarity"], territoryKicker: "05 / OUR TERRITORIES",
    territoryTitle: <>FROM CITIES<br /><span>TO BROTHERHOOD.</span></>, territoryCopy: "Choose a territory to view its profile and the available information.",
    galleryKicker: "06 / DOCUMENTATION", galleryTitle: <>JOURNEYS,<br /><span>REMEMBERED.</span></>, galleryCopy: "Official activity documentation can be added without changing this layout.",
    filters: ["All", "Touring", "Meetups", "Safe Riding", "Social Activities", "Brotherhood"], empty: "No official photos are available to display yet.",
    activitiesKicker: "07 / OUR ACTIVITIES", activitiesTitle: <>MADE FOR<br /><span>THE JOURNEY.</span></>, contactKicker: "08 / STAY CONNECTED",
    contactTitle: <>ONE PASSION.<br />ONE <span>BROTHERHOOD.</span></>, contactCopy: "Official CSI contact details and social channels will appear once public information is provided.",
    partnershipKicker: "02 / PARTNERSHIP", partnershipTitle: <>SUPPORTED<br /><span>TOGETHER.</span></>, partnershipCopy: "Partners who share CBR Squad Indonesia's spirit of brotherhood and culture of safe riding.",
    chapters: "View Chapters ↗", footer: "STAY SOLID, RIDE SAFELY", top: "Back to top ↑", all: "CSI DOCUMENTATION",
  },
} as const;
type Profile = { title: string; photo?: string };
// Temporarily retained for future profile content; modal rendering is disabled below.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  chapters: Chapter[];
  nationalRoles: OrganizationRole[];
  activities: readonly (readonly [string, string])[];
};

export default function CommunityClient({ chapters, nationalRoles, activities }: CommunityClientProps) {
  const [menu, setMenu] = useState(false),
    [org, setOrg] = useState("Nasional"),
    [, setProfile] = useState<string | Profile | null>(null),
    [gallery, setGallery] = useState(0),
    [language, setLanguage] = useState<Language>("id");
  const t = copy[language];
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
        <button className="language-button" style={{ border: "1px solid #555", background: "transparent", color: "white", padding: ".45rem .6rem", fontSize: ".62rem", fontWeight: 800, letterSpacing: ".12em" }} onClick={() => setLanguage(language === "id" ? "en" : "id")} aria-label={language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}>
          {t.language}
        </button>
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
          {t.nav.map((l, i) => (
            <a key={l} href={["#about", "#logo-history", "#member-rules", "#organization", "#territory", "#gallery", "#activities"][i]} onClick={() => setMenu(false)}>
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
              KOMUNITAS CBR INDONESIA <em>●</em> SATU BANGSA
            </p>
            <h1>
              CBR SQUAD
              <br />
              <span>INDONESIA.</span>
            </h1>
            <p className="hero-copy">KEEP SOLID AND SAFETY RIDE</p>
            <div className="actions">
              <a className="button red" href="#territory">
                {t.explore} <b>↘</b>
              </a>
              <a className="button line" href="#about">
                {t.about}
              </a>
            </div>
          </div>
          <a className="scroll" href="#about">
            {t.scroll} <span>↓</span>
          </a>
        </section>
        <div className="marquee">
          {t.marquee}
        </div>
        <section id="about" className="section split">
          <div>
            <p className="kicker">{t.aboutKicker}</p>
            <h2>{t.aboutTitle}</h2>
          </div>
          <div className="prose">
            <p className="lead">
              {t.lead}
            </p>
            <p>
              {t.aboutCopy}
            </p>
            <div className="value-list">
              {t.values.map((value) => <span key={value}>{value}</span>)}
            </div>
          </div>
        </section>
        <section className={partnership.section} aria-labelledby="partnership-title">
          <div className={partnership.copy}>
            <p className="kicker">{t.partnershipKicker}</p>
            <h2 id="partnership-title">{t.partnershipTitle}</h2>
            <p>{t.partnershipCopy}</p>
          </div>
          <div className={partnership.logos} aria-label="Partner resmi CSI">
            {[
              { name: "Repsol Lubricants", src: "/partnership/repsol.png" },
              { name: "RCB", src: "/partnership/rcb.png" },
            ].map((partner) => (
              <div className={partnership.slot} key={partner.name}>
                <Image src={partner.src} width={600} height={220} alt={`Logo ${partner.name}`} />
                <b>{partner.name}</b>
              </div>
            ))}
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
            <p className="kicker">03 / IDENTITAS CSI</p>
            <h2>
              SEJARAH
              <br />
              <span>LOGO CSI.</span>
            </h2>
            <p className="logo-copy">
              Profil komunitas CSI mendokumentasikan perjalanan transformasi logo
              CBR Squad Indonesia dari identitas awal chapter hingga logo nasional.
            </p>
            <ol className="logo-timeline">
              <li>
                <Image className="timeline-logo" src="/asset-2020a7.png" width={160} height={168} alt="Logo awal CBR Squad Depok tahun 2020" />
                <b>2020</b><span>Pembuat: Wahyu Tri Setiyadi</span>
              </li>
              <li>
                <Image className="timeline-logo" src="/asset-2021b4.png" width={160} height={168} alt="Logo CBR Squad Depok tahun 2021" />
                <b>2021</b><span>Pembuat: Wahyu Tri Setiyadi</span>
              </li>
              <li>
                <Image className="timeline-logo" src="/asset-9f2a7c.png" width={160} height={168} alt="Logo CBR Squad Indonesia tahun 2022" />
                <b>2022</b><span>Pembuat: Alm. Fendi Mustofa</span>
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
              <p className="kicker">{language === "en" ? "04 / MEMBER GUIDE" : "04 / PEDOMAN ANGGOTA"}</p>
              <h2>
                {language === "en" ? "SOLID ON THE ROAD." : "SOLID DI JALAN."}
                <br />
                <span>{language === "en" ? "SAFE ON EVERY JOURNEY." : "AMAN DI SETIAP PERJALANAN."}</span>
              </h2>
            </div>
            <p>{language === "en" ? "Core rules and responsibilities that guide CSI members." : "Aturan dasar dan kewajiban yang menjadi pedoman bagi anggota CSI."}</p>
          </div>
          <div className="rule-grid">
            <article>
              <b>01</b>
              <h3>{language === "en" ? "Safe Riding" : "Berkendara Aman"}</h3>
              <p>{language === "en" ? "Wear a helmet, jacket, gloves, long trousers, and shoes. Ensure your vehicle is roadworthy and your documents are complete." : "Gunakan helm, jaket, sarung tangan, celana panjang, dan sepatu. Pastikan kendaraan layak jalan serta dokumen berkendara lengkap."}</p>
            </article>
            <article>
              <b>02</b>
              <h3>{language === "en" ? "Convoy Discipline" : "Disiplin Konvoi"}</h3>
              <p>Patuhi rambu lalu lintas, utamakan kendaraan prioritas, dan jangan mendahului barisan kecuali menjalankan tugas RC, sweeper, atau korlap.</p>
            </article>
            <article>
              <b>03</b>
              <h3>{language === "en" ? "Member Ethics" : "Etika Anggota"}</h3>
              <p>Jaga nama baik CSI. Narkoba, SARA, politik, kekerasan, ugal-ugalan, strobo, dan merokok saat berkendara dilarang.</p>
            </article>
            <article>
              <b>04</b>
              <h3>{language === "en" ? "Becoming a Member" : "Menjadi Anggota"}</h3>
              <p>Ikuti proses rekrutmen, kopdar empat kali berturut-turut, aktif dalam agenda CSI, dan penuhi ketentuan untuk memperoleh NRA.</p>
            </article>
          </div>
        </section>
        <section id="organization" className="section organization">
          <div className="section-head">
            <div>
              <p className="kicker">05 / STRUKTUR ORGANISASI</p>
              <h2>
                SATU TIM.
                <br />
                <span>SATU ARAH.</span>
              </h2>
            </div>
            <p>
              Struktur disajikan tanpa mengisi nama atau masa jabatan yang belum
              dikonfirmasi.
            </p>
          </div>
          <div className="org-tabs" role="tablist">
            {["Nasional", "Koordinator Wilayah", "Chapter Mandiri"].map(
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
                  <span>0{i + 1} / NASIONAL</span>
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
                  {chapters
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
          {org === "Chapter Mandiri" && (
            <div className="territory-org single">
              {chapters
                .filter((r) => r.group === "CHAPTER MANDIRI")
                .map((r) => (
                  <article key={r.slug}>
                    <p className="kicker">CHAPTER MANDIRI</p>
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
              <p className="kicker">{t.territoryKicker.replace("05", "06")}</p>
              <h2>{t.territoryTitle}</h2>
            </div>
            <p>
              {t.territoryCopy}
            </p>
          </div>
          <ChapterMap chapters={chapters} language={language} />
        </section>
        <section id="gallery" className="section gallery">
          <div className="section-head">
            <div>
              <p className="kicker">{t.galleryKicker.replace("06", "07")}</p>
              <h2>{t.galleryTitle}</h2>
            </div>
            <p>
              {t.galleryCopy}
            </p>
          </div>
          <div className="filters">
            {t.filters.map((x, i) => (
              <button
                className={gallery === i ? "selected" : ""}
                onClick={() => setGallery(i)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="empty-state">
            <span>◈</span>
            <h3>
              {gallery === 0 ? t.all : t.filters[gallery].toUpperCase()}
            </h3>
            <p>
              {t.empty}
            </p>
          </div>
        </section>
        <section id="activities" className="section activities">
          <p className="kicker">{t.activitiesKicker.replace("07", "08")}</p>
          <h2>{t.activitiesTitle}</h2>
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
          <p className="kicker light">09 / {language === "en" ? "STAY CONNECTED" : "TETAP TERHUBUNG"}</p>
          <h2>{t.contactTitle}</h2>
          <p>
            {t.contactCopy}
          </p>
          <a className="button dark" href="#territory">
            {t.chapters}
          </a>
        </section>
      </main>
      <a
        className="whatsapp-float"
        href="https://wa.me/6283831658044?text=Halo%20Admin%20CSI%2C%20saya%20ingin%20mendapatkan%20informasi%20tentang%20CBR%20Squad%20Indonesia.%0A%0ANama%3A%0ADomisili%3A%0AMotor%20CBR%3A%0AKeperluan%3A"
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
        <p>{t.footer}</p>
        <a
          className="instagram-link"
          href="https://www.instagram.com/cbrsquadindonesia_official?stkn=MWV2OXl0M2Y3ODl0YQ=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram resmi CBR Squad Indonesia"
        >
          Instagram ↗
        </a>
        <a href="#home">{t.top}</a>
        <small>© {new Date().getFullYear()} CBR Squad Indonesia</small>
      </footer>
    </>
  );
}
