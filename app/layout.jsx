import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from './Header';

export const metadata = {
  title: 'Douban Movies',
  description: 'A webstie helps you find movies.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' sizes='any' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Kalam&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
