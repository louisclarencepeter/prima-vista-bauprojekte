import { useRevealMidPage } from '../hooks/useRevealMidPage';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './icons';

export default function SocialRail() {
  const revealed = useRevealMidPage();
  return (
    <aside
      className={`pv-social-rail${revealed ? ' is-visible' : ''}`}
      aria-label="Soziale Medien"
      aria-hidden={revealed ? undefined : true}
    >
      <a href="https://www.facebook.com/profile.php?id=61584837772416" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <FacebookIcon />
      </a>
      <a href="https://www.instagram.com/primavista.bauprojekte" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <InstagramIcon />
      </a>
      <a href="https://www.youtube.com/@PrimaVistaBauprojekte" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
        <YoutubeIcon />
      </a>
    </aside>
  );
}
