import { useEffect, useState } from 'react';

type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhoto?: string;
};

type ReviewsPayload = {
  rating?: number;
  userRatingsTotal?: number;
  url?: string;
  reviews?: Review[];
};

type Props = {
  fallback: { quote: string; name: string; meta: string };
};

export default function GoogleReviews({ fallback }: Props) {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((d: ReviewsPayload) => {
        if (!cancelled) setData(d);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pick = (data?.reviews ?? []).find((r) => r.text && r.rating >= 4);

  if (error || !pick) {
    return (
      <section className="testimonial">
        <div className="testimonial__inner reveal reveal--scale">
          <div className="quote-mark">&ldquo;</div>
          <blockquote>{fallback.quote}</blockquote>
          <div className="testimonial__attr">
            <span className="name">{fallback.name}</span>
            <span className="sep">·</span>
            <span>{fallback.meta}</span>
          </div>
        </div>
      </section>
    );
  }

  const meta = [
    `${pick.rating} / 5 Sterne`,
    pick.relativeTime,
    'Google Bewertung',
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <section className="testimonial">
      <div className="testimonial__inner reveal reveal--scale">
        <div className="quote-mark">&ldquo;</div>
        <blockquote>{pick.text}</blockquote>
        <div className="testimonial__attr">
          <span className="name">{pick.author}</span>
          <span className="sep">·</span>
          <span>{meta}</span>
        </div>
      </div>
    </section>
  );
}
