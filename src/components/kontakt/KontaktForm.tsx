import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  CONTACT_ART_OPTIONS,
  INITIAL_CONTACT_FORM,
  type ContactFormState,
} from '../../data/kontakt';

type KontaktErrors = Partial<Record<keyof ContactFormState, string>>;

// Lightweight email shape check — server still does the real work.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function KontaktForm() {
  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [errors, setErrors] = useState<KontaktErrors>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): KontaktErrors {
    const next: KontaktErrors = {};
    if (!form.vorname.trim()) next.vorname = 'Bitte geben Sie Ihren Vornamen an.';
    if (!form.nachname.trim()) next.nachname = 'Bitte geben Sie Ihren Nachnamen an.';
    if (!form.email.trim()) {
      next.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = 'Bitte prüfen Sie das Format der E-Mail-Adresse.';
    }
    if (!form.msg.trim()) next.msg = 'Bitte beschreiben Sie kurz Ihr Vorhaben.';
    if (!form.dsgvo) next.dsgvo = 'Bitte bestätigen Sie die Datenschutzhinweise.';
    return next;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        const firstKey = Object.keys(nextErrors)[0];
        document.getElementById(firstKey)?.focus();
      });
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <div className="kontakt__form-wrap reveal reveal--right" data-delay="1" style={sent ? { opacity: 0.7 } : undefined}>
      <div className="kontakt__form-eyebrow"><span className="rule-red"></span> Anfrage senden</div>
      <h3 className="kontakt__form-title">
        Erzählen Sie uns von<br />
        Ihrem <em>Vorhaben.</em>
      </h3>

      <form onSubmit={onSubmit} noValidate>
        <div className="form-row">
          <div className={`form-field${errors.vorname ? ' is-invalid' : ''}`}>
            <label htmlFor="vorname">Vorname</label>
            <input
              id="vorname"
              type="text"
              placeholder="Vorname"
              value={form.vorname}
              onChange={(e) => update('vorname', e.target.value)}
              aria-invalid={errors.vorname ? true : undefined}
              aria-describedby={errors.vorname ? 'vorname-error' : undefined}
            />
            {errors.vorname && (
              <span id="vorname-error" className="form-field__error" role="alert">
                {errors.vorname}
              </span>
            )}
          </div>
          <div className={`form-field${errors.nachname ? ' is-invalid' : ''}`}>
            <label htmlFor="nachname">Nachname</label>
            <input
              id="nachname"
              type="text"
              placeholder="Nachname"
              value={form.nachname}
              onChange={(e) => update('nachname', e.target.value)}
              aria-invalid={errors.nachname ? true : undefined}
              aria-describedby={errors.nachname ? 'nachname-error' : undefined}
            />
            {errors.nachname && (
              <span id="nachname-error" className="form-field__error" role="alert">
                {errors.nachname}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className={`form-field${errors.email ? ' is-invalid' : ''}`}>
            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              placeholder="ihre@email.de"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="form-field__error" role="alert">
                {errors.email}
              </span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="tel">Telefon <span className="form-field__hint">(optional)</span></label>
            <input id="tel" type="tel" placeholder="+49 …" value={form.tel} onChange={(e) => update('tel', e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label>Art des Vorhabens</label>
          <div className="form-chips">
            {CONTACT_ART_OPTIONS.map(({ value, label }) => (
              <span key={value}>
                <input
                  type="radio"
                  name="art"
                  id={`art-${value}`}
                  checked={form.art === value}
                  onChange={() => update('art', value)}
                />
                <label htmlFor={`art-${value}`}>{label}</label>
              </span>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field form-field--select">
            <label htmlFor="region">Region</label>
            <select id="region" value={form.region} onChange={(e) => update('region', e.target.value)}>
              <option>Frankfurt &amp; Hessen</option>
              <option>Innerschweiz</option>
              <option>Außerhalb</option>
            </select>
          </div>
          <div className="form-field form-field--select">
            <label htmlFor="budget">Budget-Rahmen</label>
            <select id="budget" value={form.budget} onChange={(e) => update('budget', e.target.value)}>
              <option>Bitte wählen</option>
              <option>Unter € 50.000</option>
              <option>€ 50.000 – € 150.000</option>
              <option>€ 150.000 – € 500.000</option>
              <option>Über € 500.000</option>
            </select>
          </div>
        </div>

        <div className={`form-field${errors.msg ? ' is-invalid' : ''}`}>
          <label htmlFor="msg">Worum geht es?</label>
          <textarea
            id="msg"
            placeholder="Beschreiben Sie Ihr Vorhaben in ein paar Sätzen — wir melden uns innerhalb von 24 Stunden."
            value={form.msg}
            onChange={(e) => update('msg', e.target.value)}
            aria-invalid={errors.msg ? true : undefined}
            aria-describedby={errors.msg ? 'msg-error' : undefined}
          />
          {errors.msg && (
            <span id="msg-error" className="form-field__error" role="alert">
              {errors.msg}
            </span>
          )}
        </div>

        <div className={`form-check${errors.dsgvo ? ' is-invalid' : ''}`}>
          <input
            type="checkbox"
            id="dsgvo"
            checked={form.dsgvo}
            onChange={(e) => update('dsgvo', e.target.checked)}
            aria-invalid={errors.dsgvo ? true : undefined}
            aria-describedby={errors.dsgvo ? 'dsgvo-error' : undefined}
          />
          <label htmlFor="dsgvo">
            Ich bin damit einverstanden, dass meine Angaben zur Beantwortung verwendet werden. Eine Weitergabe an Dritte erfolgt nicht. <Link to="/datenschutz">Datenschutz</Link>.
            {errors.dsgvo && (
              <span id="dsgvo-error" className="form-field__error" role="alert">
                {errors.dsgvo}
              </span>
            )}
          </label>
        </div>

        <div className="form-actions">
          <span className="form-actions__note"><span className="dot"></span>Antwort in 24 Std.</span>
          <button className="btn btn--solid" type="submit" disabled={sent}>
            {sent ? 'Gesendet ✓' : <>Absenden <span className="arrow">&gt;</span></>}
          </button>
        </div>
      </form>
    </div>
  );
}
