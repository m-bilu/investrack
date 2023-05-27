import Providers from '@/components/redux/Providers';
import Header from '@/components/navigation/Header';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Research the Markets | Investrack',
  description: 'Research the financial markets with Investrack.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`w-100dvw relative m-0 overflow-x-hidden overflow-y-scroll scroll-smooth bg-black p-0 ${inter.className}`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
