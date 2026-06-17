import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'ACME Sign & Graphics Company — Dartmouth, Nova Scotia',
  description:
    'ACME SIGN & Graphics specializes in creating highly effective signs, programmable LED signs and displays, vehicle wrap designs, custom apparel and branding assets for businesses of any size.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
