import { FacebookIcon, InstagramIcon, YoutubeIcon } from './icons';

export default function SocialRail() {
  return (
    <aside className="pv-social-rail" aria-label="Soziale Medien">
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
