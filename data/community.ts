export type RegionalGroup = 'JABODETABEK' | 'CIKAPUR' | 'REGIONAL MANDIRI';
export type Region = { slug: string; name: string; code: string; group: RegionalGroup; map: { x: number; y: number }; leaderName?: string; leaderPhoto?: string };
// Add approved names, contacts, terms and photographs here when CSI provides them.
export const regions: Region[] = [
  { slug: 'jakarta', name: 'Jakarta', code: 'JKT', group: 'JABODETABEK', map: { x: 45, y: 64 } }, { slug: 'bogor', name: 'Bogor', code: 'BGR', group: 'JABODETABEK', map: { x: 47, y: 67 } }, { slug: 'depok', name: 'Depok', code: 'DPK', group: 'JABODETABEK', map: { x: 46, y: 66 } }, { slug: 'tangerang', name: 'Tangerang', code: 'TGR', group: 'JABODETABEK', map: { x: 43, y: 65 }, leaderName: 'Maruf', leaderPhoto: '/Picsart_26-09-26_20-56-44-913.png' }, { slug: 'bekasi', name: 'Bekasi', code: 'BKS', group: 'JABODETABEK', map: { x: 49, y: 65 } },
  { slug: 'cikarang', name: 'Cikarang', code: 'CKR', group: 'CIKAPUR', map: { x: 51, y: 66 }, leaderName: 'Robby', leaderPhoto: '/Picsart_26-09-26_18-09-55-944.png' }, { slug: 'karawang', name: 'Karawang', code: 'KRW', group: 'CIKAPUR', map: { x: 55, y: 66 } }, { slug: 'purwakarta', name: 'Purwakarta', code: 'PWK', group: 'CIKAPUR', map: { x: 54, y: 69 } },
  { slug: 'semarang', name: 'Semarang', code: 'SMG', group: 'REGIONAL MANDIRI', map: { x: 61, y: 68 } }, { slug: 'malang-raya', name: 'Malang Raya', code: 'MLG', group: 'REGIONAL MANDIRI', map: { x: 67, y: 71 } }, { slug: 'deli-serdang', name: 'Deli Serdang', code: 'DLS', group: 'REGIONAL MANDIRI', map: { x: 22, y: 38 } },
];
export type OrganizationRole = {
  title: string;
  description: string;
  name?: string;
  photo?: string;
};

export const nationalRoles: OrganizationRole[] = [
  { title: 'Founder', description: 'Pendiri komunitas', name: 'Bambang Winardi', photo: '/bambang.jpeg' },
  { title: 'Ketua Umum Nasional', description: 'Pimpinan nasional CSI', name: 'Rangga', photo: '/rangga-ketua-umum.jpg' },
  { title: 'Wakil Ketua Umum Nasional', description: 'Wakil pimpinan nasional CSI' },
  { title: 'Bendahara', description: 'Pengelolaan keuangan organisasi', name: 'Donna', photo: '/dona.png' },
  { title: 'IT', description: 'Teknologi dan platform digital', name: 'Trandy', photo: '/Picsart_26-09-26_20-57-05-242.jpg.jpeg' },
  { title: 'Media Nasional', description: 'Publikasi dan komunikasi media nasional CSI', name: 'Wahyu', photo: '/Picsart_26-09-26_20-58-43-716.jpg.jpeg' },
  { title: 'Keanggotaan', description: 'Pengelolaan anggota dan onboarding CSI', name: 'Vico', photo: '/1136f40e-22d9-4e0d-a3d3-3298a7d85e05.png' },
];
export const activities = [['Touring', 'Perjalanan bersama dengan keselamatan sebagai prioritas.'], ['Kopdar', 'Ruang untuk bertemu, berbagi, dan mempererat persaudaraan.'], ['Safety Riding', 'Budaya berkendara yang bertanggung jawab di setiap perjalanan.'], ['Kegiatan Sosial', 'Kebersamaan yang memberi dampak positif bagi sekitar.']] as const;
