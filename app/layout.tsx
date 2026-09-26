import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'CBR Squad Indonesia | One Passion, One Brotherhood',description:'Profil komunitas CBR Squad Indonesia: nasional, Jabodetabek, Cikapur, Semarang, dan Deli Serdang.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
