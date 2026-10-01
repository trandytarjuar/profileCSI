export type ChapterGroup = 'JABODETABEK' | 'CIKAPUR' | 'CHAPTER MANDIRI';
export type Chapter = { slug: string; name: string; code: string; group: ChapterGroup; map: { latitude: number; longitude: number }; description?: string; logo?: string; leaderName?: string; leaderPhoto?: string; roles?: OrganizationRole[]; gallery?: { src: string; alt: string; width: number; height: number }[]; meetup?: { schedule: string; location: string }; instagram?: { url: string; handle: string }; tiktok?: { url: string; handle: string } };
// Coordinates are approximate geographic reference points, never secretariat addresses.
// Add approved names, contacts, terms and photographs here when CSI provides them.
export const chapters: Chapter[] = [
  { slug: 'jakarta', name: 'Jakarta', code: 'JKT', group: 'JABODETABEK', map: { latitude: -6.2, longitude: 106.85 }, logo: '/asset-13d8a1.png' }, { slug: 'bogor', name: 'Bogor', code: 'BGR', group: 'JABODETABEK', map: { latitude: -6.6, longitude: 106.8 }, logo: '/asset-4c7e92.png' }, { slug: 'depok', name: 'Depok', code: 'DPK', group: 'JABODETABEK', map: { latitude: -6.4, longitude: 106.82 }, logo: '/asset-8b1f36.png', leaderName: 'Vico', leaderPhoto: '/asset-7d3e50.png' }, { slug: 'tangerang', name: 'Tangerang', code: 'TGR', group: 'JABODETABEK', map: { latitude: -6.18, longitude: 106.63 }, logo: '/asset-5e2c79.png', leaderName: 'Maruf', leaderPhoto: '/asset-3c8d72.png' }, { slug: 'bekasi', name: 'Bekasi', code: 'BKS', group: 'JABODETABEK', map: { latitude: -6.24, longitude: 106.99 }, logo: '/asset-6a9d04.png' },
  { slug: 'cikarang', name: 'Cikarang', code: 'CKR', group: 'CIKAPUR', map: { latitude: -6.31, longitude: 107.15 }, logo: '/asset-0f3b68.png', leaderName: 'Robby', leaderPhoto: '/asset-6e1a45.png' },
  {
    slug: 'karawang', name: 'Karawang', code: 'KRW', group: 'CIKAPUR', map: { latitude: -6.3, longitude: 107.3 }, logo: '/asset-71ce25.png',
    description: 'Chapter CBR Squad Indonesia Karawang. Ruang bagi rider untuk bertemu, berkegiatan, dan tumbuh bersama.',
    leaderName: 'Fadli Dzulfikar', leaderPhoto: '/asset-4f9a20.png',
    gallery: [
      { src: '/kerawang/WhatsApp%20Image%202026-09-29%20at%2022.15.47.jpeg', alt: 'Anggota CSI Chapter Karawang berfoto bersama motor CBR saat kopdar malam', width: 1600, height: 1200 },
      { src: '/kerawang/WhatsApp%20Image%202026-09-29%20at%2022.15.47%20%281%29.jpeg', alt: 'Anggota dan motor CBR CSI Chapter Karawang saat kopdar malam', width: 720, height: 537 },
    ],
    roles: [
      { title: 'Ketua Umum', description: 'Pimpinan chapter', name: 'Fadli Dzulfikar' },
      { title: 'Wakil Ketua', description: 'Wakil pimpinan chapter', name: 'Fiqri Herdiansyah' },
      { title: 'Bendahara', description: 'Pengelolaan keuangan chapter', name: 'Muhammad Rizki' },
      { title: 'Div. Keanggotaan', description: 'Pengelolaan anggota chapter', name: 'Raju C.S.' },
      { title: 'Div. Tata Tertib', description: 'Tata tertib dan kedisiplinan chapter', name: 'Riqki C.S.' },
      { title: 'Humas', description: 'Hubungan masyarakat', name: 'Muhammad Rizal (MBE)' },
      { title: 'Div. Multimedia', description: 'Publikasi dan dokumentasi chapter', name: 'Tri Varrel & Johan Vicky P.W.' },
    ],
    meetup: { schedule: 'Sabtu, pukul 20:00 s/d selesai', location: 'Untuk tempat kopdar, hubungi admin.' },
    instagram: { url: 'https://www.instagram.com/cbrsquadindonesia_karawang?stkn=bjVwOHRlNzByZjY3', handle: '@cbrsquadindonesia_karawang' },
    tiktok: { url: 'https://www.tiktok.com/@csikarawang?_r=1&_t=ZS-9A8kUc82Th6', handle: '@csikarawang' },
  },
  { slug: 'purwakarta', name: 'Purwakarta', code: 'PWK', group: 'CIKAPUR', map: { latitude: -6.55, longitude: 107.44 }, logo: '/asset-b42d90.png' },
  { slug: 'semarang', name: 'Semarang', code: 'SMG', group: 'CHAPTER MANDIRI', map: { latitude: -6.99, longitude: 110.42 }, logo: '/asset-2d5f81.png' }, { slug: 'malang-raya', name: 'Malang Raya', code: 'MLG', group: 'CHAPTER MANDIRI', map: { latitude: -7.98, longitude: 112.63 }, logo: '/asset-96a4e7.png' }, { slug: 'deli-serdang', name: 'Deli Serdang', code: 'DLS', group: 'CHAPTER MANDIRI', map: { latitude: 3.56, longitude: 98.87 }, logo: '/asset-c8e316.png', leaderName: 'Ardi Poetra', leaderPhoto: '/asset-b7e412.jpeg',
    gallery: [
      { src: '/gallery/deli-serdang/img-2237.webp', alt: 'Anggota CSI Chapter Deli Serdang berfoto bersama di jalan perbukitan', width: 1920, height: 1440 },
      { src: '/gallery/deli-serdang/img-2269.webp', alt: 'Anggota CSI Chapter Deli Serdang berkumpul bersama deretan motor di perbukitan', width: 1920, height: 1440 },
    ],
    roles: [
      { title: 'Ketua Umum', description: 'Pimpinan chapter', name: 'Ardi Poetra' },
      { title: 'Ketua Harian', description: 'Koordinasi kegiatan harian', name: 'Rolan Sinaga' },
      { title: 'Keanggotaan', description: 'Pengelolaan anggota chapter', name: 'Indra Irawan' },
      { title: 'Humas', description: 'Hubungan masyarakat', name: 'Indra Irawan' },
      { title: 'Media', description: 'Publikasi dan dokumentasi chapter', name: 'Utomo Pambudi dan Zein Syahputra' },
    ],
    meetup: { schedule: "Jum'at, pukul 20:00 s/d selesai", location: 'Untuk tempat kopdar, hubungi admin.' },
    instagram: { url: 'https://www.instagram.com/cbrsquadindonesia_deliserdang/', handle: '@cbrsquadindonesia_deliserdang' },
   },
];
export type OrganizationRole = {
  title: string;
  description: string;
  name?: string;
  photo?: string;
};

export const nationalRoles: OrganizationRole[] = [
  { title: 'Founder', description: 'Pendiri komunitas', name: 'Bambang Winardi', photo: '/asset-a8f349.jpeg' },
  { title: 'Ketua Umum Nasional', description: 'Pimpinan nasional CSI', name: 'Rangga', photo: '/asset-f27c18.jpg' },
  { title: 'Wakil Ketua Umum Nasional', description: 'Wakil pimpinan nasional CSI' },
  { title: 'Hukum & Legalitas', description: 'Pengelolaan hukum dan legalitas organisasi', name: 'Maruf', photo: '/asset-3c8d72.png' },
  { title: 'Bendahara', description: 'Pengelolaan keuangan organisasi', name: 'Donna', photo: '/asset-5b1e96.png' },
  { title: 'IT', description: 'Teknologi dan platform digital', name: 'Trandy', photo: '/asset-d4a713.jpeg' },
  { title: 'Media Nasional', description: 'Publikasi dan komunikasi media nasional CSI', name: 'Wahyu', photo: '/asset-91f2bc.jpeg' },
  { title: 'Keanggotaan', description: 'Pengelolaan anggota dan onboarding CSI', name: 'Vico', photo: '/asset-7d3e50.png' },
];
export const activities = [['Tur Bersama', 'Perjalanan bersama dengan keselamatan sebagai prioritas.'], ['Kopdar', 'Ruang untuk bertemu, berbagi, dan mempererat persaudaraan.'], ['Berkendara Aman', 'Budaya berkendara yang bertanggung jawab di setiap perjalanan.'], ['Kegiatan Sosial', 'Kebersamaan yang memberi dampak positif bagi sekitar.']] as const;
