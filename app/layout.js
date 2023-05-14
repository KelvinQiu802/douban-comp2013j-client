import './globals.css';
import { Roboto } from 'next/font/google';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const roboto = Roboto({ subsets: ['latin'] });

export const metadata = {
  title: 'Douban Movies',
  description: 'A webstie helps you find movies.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={Roboto.className}>
      <body>{children}</body>
    </html>
  );
}
