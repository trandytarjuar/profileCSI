import Link from 'next/link';

export default function UnderConstructionPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: '#111111',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '720px' }}>
        <p style={{ letterSpacing: '0.28rem', textTransform: 'uppercase', opacity: 0.8, marginBottom: '1rem' }}>
          CSI / Membership
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', margin: 0, lineHeight: 1 }}>UNDER CONSTRUCTION</h1>
        <p style={{ fontSize: '1.15rem', marginTop: '1.5rem', opacity: 0.85 }}>
          Pendaftaran anggota CSI sedang dalam tahap pengembangan. Segera hadir di sini.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '2rem',
            padding: '0.9rem 1.4rem',
            background: '#ffffff',
            color: '#111111',
            textDecoration: 'none',
            fontWeight: 700,
            borderRadius: '0.5rem'
          }}
        >
          KEMBALI KE HOME
        </Link>
      </div>
    </main>
  );
}
