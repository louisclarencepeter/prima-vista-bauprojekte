import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SocialRail from './SocialRail';
import Chat from './Chat';
import CookieConsent from './CookieConsent';
import { LightboxProvider } from './Lightbox';
import { useReveal } from '../hooks/useReveal';

const DESKTOP_MEDIA = '(min-width: 881px)';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_MEDIA).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_MEDIA);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [hash, pathname]);

  return null;
}

export default function Layout() {
  useReveal();
  const isDesktop = useIsDesktop();
  return (
    <LightboxProvider>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <SocialRail />
      {isDesktop && <Chat />}
      <CookieConsent />
      <Footer />
    </LightboxProvider>
  );
}
