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
  const { hash, pathname, state } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    if (state && state.targetId) {
      const frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(state.targetId);
        if (target) {
          // Force all reveal elements to be visible instantly to prevent a sluggish feeling
          document.querySelectorAll('.reveal, .reveal-group').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.transition = 'none';
            htmlEl.style.animation = 'none';
            htmlEl.classList.add('is-in');
          });
          target.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
          
          // Cleanup inline styles after a moment so future reveals work
          setTimeout(() => {
            document.querySelectorAll('.reveal, .reveal-group').forEach((el) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.transition = '';
              htmlEl.style.animation = '';
            });
          }, 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [hash, pathname, state]);

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
