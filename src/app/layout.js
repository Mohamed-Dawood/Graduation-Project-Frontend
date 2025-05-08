'use client';
import { Cairo } from 'next/font/google';
import './globals.css';
import ToastContainerWrapper from '@/Components/Toast/Toast';
import { usePathname } from 'next/navigation';
import Navbar from '@/Components/Navbar/Navbar';
import Footer from '@/Components/Footer/Footer';
const cairoFont = Cairo({
  variable: '--font-Cairo',
  subsets: ['latin'],
});

export default function Layout({ children }) {
  let pathname = usePathname();
  const hiddenRoutes = [
    '/signin',
    '/forget-password',
    '/logout',
    '/404',
    '/not-found',
    '/signup',
  ];

  const shouldHideComponents = hiddenRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className={`${cairoFont.variable}`}>
        <ToastContainerWrapper />
        {!shouldHideComponents && <Navbar />}
        {children}
        {!shouldHideComponents && <Footer />}
      </body>
    </html>
  );
}
