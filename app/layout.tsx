import type { Metadata } from 'next';
import { DM_Sans, Sora, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuildFlow Pro — Gestion de chantiers',
  description:
    'Plateforme intelligente de gestion de chantiers pour les entreprises du BTP. Suivi de projets, tâches, budget et ressources.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${dmSans.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased bg-dark-950 text-text`}
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
