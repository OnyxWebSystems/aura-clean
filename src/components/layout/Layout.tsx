import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

// Pages that should not show the main navbar (they have their own navigation)
const pagesWithoutNavbar = ['/dashboard', '/admin', '/login', '/forgot-password', '/reset-password'];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const showNavbar = !pagesWithoutNavbar.some((path) => location.pathname.startsWith(path));

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'pt-[120px]' : ''}>{children}</main>
      <ScrollToTop />
    </>
  );
}

