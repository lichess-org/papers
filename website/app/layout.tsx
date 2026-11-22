import './globals.css';

import { type Metadata } from 'next';
import { Geist, Roboto_Slab } from 'next/font/google';

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/lichess-papers' : '';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lichess Bibliography',
  description:
    'Publications that study Lichess, use Lichess data, or otherwise use or mention Lichess in a meaningful way.',
  icons: {
    icon: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geist.variable} ${robotoSlab.variable} h-full antialiased`}>
      <body className="bg-paper text-ink selection:text-ink flex min-h-full flex-col font-sans selection:bg-[#d9b8a7]">
        {children}
      </body>
    </html>
  );
}
