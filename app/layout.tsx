import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Pro-Terra — Ingredientes Proteicos de Soja',
  description:
    'SPI, SPC y TVP de alto valor agregado producidos en el Polo Industrial San Lorenzo, Santa Fe. Entrega en menos de 72 hs.',
  keywords: 'proteína de soja, SPI, SPC, TVP, ingredientes proteicos, industria alimentaria, Argentina',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
