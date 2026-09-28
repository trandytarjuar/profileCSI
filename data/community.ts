export type RegionalGroup = 'JABODETABEK' | 'CIKAPUR' | 'REGIONAL MANDIRI';
export type Region = { slug: string; name: string; code: string; group: RegionalGroup; map: { x: number; y: number }; logo?: string; leaderName?: string; leaderPhoto?: string };
// Add approved names, contacts, terms and photographs here when CSI provides them.
export const regions: Region[] = [
  { slug: 'jakarta', name: 'Jakarta', code: 'JKT', group: 'JABODETABEK', map: { x: 46, y: 46 }, logo: '/asset-13d8a1.png' }, { slug: 'bogor', name: 'Bogor', code: 'BGR', group: 'JABODETABEK', map: { x: 56, y: 80 }, logo: '/asset-4c7e92.png' }, { slug: 'depok', name: 'Depok', code: 'DPK', group: 'JABODETABEK', map: { x: 48, y: 65 }, logo: '/asset-8b1f36.png' }, { slug: 'tangerang', name: 'Tangerang', code: 'TGR', group: 'JABODETABEK', map: { x: 35, y: 59 }, logo: '/asset-5e2c79.png', leaderName: 'Maruf', leaderPhoto: '/asset-3c8d72.png' }, { slug: 'bekasi', name: 'Bekasi', code: 'BKS', group: 'JABODETABEK', map: { x: 59, y: 51 }, logo: '/asset-6a9d04.png' },
  { slug: 'cikarang', name: 'Cikarang', code: 'CKR', group: 'CIKAPUR', map: { x: 69, y: 65 }, logo: '/asset-0f3b68.png', leaderName: 'Robby', leaderPhoto: '/asset-6e1a45.png' }, { slug: 'karawang', name: 'Karawang', code: 'KRW', group: 'CIKAPUR', map: { x: 79, y: 48 }, logo: '/asset-71ce25.png' }, { slug: 'purwakarta', name: 'Purwakarta', code: 'PWK', group: 'CIKAPUR', map: { x: 81, y: 78 }, logo: '/asset-b42d90.png' },
  { slug: 'semarang', name: 'Semarang', code: 'SMG', group: 'REGIONAL MANDIRI', map: { x: 61, y: 68 }, logo: '/asset-2d5f81.png' }, { slug: 'malang-raya', name: 'Malang Raya', code: 'MLG', group: 'REGIONAL MANDIRI', map: { x: 67, y: 71 }, logo: '/asset-96a4e7.png' }, { slug: 'deli-serdang', name: 'Deli Serdang', code: 'DLS', group: 'REGIONAL MANDIRI', map: { x: 22, y: 38 }, logo: '/asset-c8e316.png' },
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
