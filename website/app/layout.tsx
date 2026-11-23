import './globals.css';

import { type Metadata } from 'next';
import { Noto_Sans_Display, Roboto_Slab } from 'next/font/google';

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/lichess-papers' : '';

const notoSansDisplay = Noto_Sans_Display({
  variable: '--font-noto-sans-display',
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
    <html
      lang="en"
      className={`${notoSansDisplay.variable} ${robotoSlab.variable} h-full antialiased`}
      suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `try {
              const savedMode = localStorage.getItem('lichess-papers-theme');
              const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
              const mode = ['automatic', 'light', 'dark'].includes(savedMode) ? savedMode : 'automatic';
              document.documentElement.dataset.themeMode = mode;
              document.documentElement.dataset.theme = mode === 'automatic' ? (prefersDark ? 'dark' : 'light') : mode;
            } catch {
              document.documentElement.dataset.themeMode = 'automatic';
              document.documentElement.dataset.theme =
                matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }`,
          }}
        />
      </head>
      <body className="bg-paper text-ink selection:text-ink flex min-h-full flex-col font-sans selection:bg-[#d9b8a7cc] dark:selection:bg-[#d9b8a755]">
        {children}
      </body>
    </html>
  );
}
