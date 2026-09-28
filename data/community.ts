export type RegionalGroup = 'JABODETABEK' | 'CIKAPUR' | 'REGIONAL MANDIRI';
export type Region = { slug: string; name: string; code: string; group: RegionalGroup; map: { x: number; y: number; labelX: number; labelY: number }; logo?: string; leaderName?: string; leaderPhoto?: string; roles?: OrganizationRole[]; meetup?: { schedule: string; location: string }; instagram?: { url: string; handle: string } };
// Add approved names, contacts, terms and photographs here when CSI provides them.
export const regions: Region[] = [
  { slug: 'jakarta', name: 'Jakarta', code: 'JKT', group: 'JABODETABEK', map: { x: 24.8, y: 77.5, labelX: 21, labelY: 68 }, logo: '/asset-13d8a1.png' }, { slug: 'bogor', name: 'Bogor', code: 'BGR', group: 'JABODETABEK', map: { x: 24.7, y: 80.3, labelX: 26, labelY: 91 }, logo: '/asset-4c7e92.png' }, { slug: 'depok', name: 'Depok', code: 'DPK', group: 'JABODETABEK', map: { x: 24.9, y: 78.6, labelX: 23, labelY: 84 }, logo: '/asset-8b1f36.png', leaderName: 'Vico', leaderPhoto: '/asset-7d3e50.png' }, { slug: 'tangerang', name: 'Tangerang', code: 'TGR', group: 'JABODETABEK', map: { x: 24.2, y: 78, labelX: 17, labelY: 75 }, logo: '/asset-5e2c79.png', leaderName: 'Maruf', leaderPhoto: '/asset-3c8d72.png' }, { slug: 'bekasi', name: 'Bekasi', code: 'BKS', group: 'JABODETABEK', map: { x: 25.5, y: 77.6, labelX: 28, labelY: 71 }, logo: '/asset-6a9d04.png' },
  { slug: 'cikarang', name: 'Cikarang', code: 'CKR', group: 'CIKAPUR', map: { x: 26.5, y: 78.1, labelX: 31, labelY: 76 }, logo: '/asset-0f3b68.png', leaderName: 'Robby', leaderPhoto: '/asset-6e1a45.png' }, { slug: 'karawang', name: 'Karawang', code: 'KRW', group: 'CIKAPUR', map: { x: 27.2, y: 79.1, labelX: 34, labelY: 82 }, logo: '/asset-71ce25.png', leaderName: 'Fadli', leaderPhoto: '/asset-4f9a20.png' }, { slug: 'purwakarta', name: 'Purwakarta', code: 'PWK', group: 'CIKAPUR', map: { x: 28.2, y: 81.3, labelX: 31, labelY: 89 }, logo: '/asset-b42d90.png' },
  { slug: 'semarang', name: 'Semarang', code: 'SMG', group: 'REGIONAL MANDIRI', map: { x: 34.6, y: 80.3, labelX: 36, labelY: 73 }, logo: '/asset-2d5f81.png' }, { slug: 'malang-raya', name: 'Malang Raya', code: 'MLG', group: 'REGIONAL MANDIRI', map: { x: 37.1, y: 86.8, labelX: 39, labelY: 89 }, logo: '/asset-96a4e7.png' }, { slug: 'deli-serdang', name: 'Deli Serdang', code: 'DLS', group: 'REGIONAL MANDIRI', map: { x: 9.4, y: 27.1, labelX: 11, labelY: 20 }, logo: '/asset-c8e316.png', leaderName: 'Ardi Poetra', leaderPhoto: '/asset-b7e412.jpeg',
    roles: [
      { title: 'Ketua Umum', description: 'Pimpinan regional', name: 'Ardi Poetra' },
      { title: 'Ketua Harian', description: 'Koordinasi kegiatan harian', name: 'Rolan Sinaga' },
      { title: 'Keanggotaan', description: 'Pengelolaan anggota regional', name: 'Indra Irawan' },
      { title: 'Humas', description: 'Hubungan masyarakat', name: 'Indra Irawan' },
      { title: 'Media', description: 'Publikasi dan dokumentasi regional', name: 'Utomo Pambudi dan Zein Syahputra' },
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
export const activities = [['Touring', 'Perjalanan bersama dengan keselamatan sebagai prioritas.'], ['Kopdar', 'Ruang untuk bertemu, berbagi, dan mempererat persaudaraan.'], ['Safety Riding', 'Budaya berkendara yang bertanggung jawab di setiap perjalanan.'], ['Kegiatan Sosial', 'Kebersamaan yang memberi dampak positif bagi sekitar.']] as const;
