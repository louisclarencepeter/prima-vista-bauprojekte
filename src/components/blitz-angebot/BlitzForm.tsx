import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BLITZ_ART_OPTIONS,
  BLITZ_GEWERKE_OPTIONS,
  INITIAL_BLITZ_FORM,
  formatKalkulatorMessage,
  formatPickAmount,
  formatRowQuantity,
  groupPicksByTrade,
  mapKalkulatorPicksToBlitzGewerke,
  type BlitzFormState,
  type KalkulatorHandoff,
} from '../../data/blitzAngebot';

type BlitzErrors = Partial<Record<keyof BlitzFormState, string>>;

type LocationState = { kalkulator?: KalkulatorHandoff } | null;

const STARTTERMIN_LABELS: Record<string, string> = {
  sofort: 'So schnell wie möglich',
  '1-3m': 'In 1 – 3 Monaten',
  '3-6m': 'In 3 – 6 Monaten',
  spaeter: 'Noch unklar / Nächstes Jahr',
};

export default function BlitzForm() {
  const location = useLocation();
  const handoff = (location.state as LocationState)?.kalkulator ?? null;

  const [form, setForm] = useState<BlitzFormState>(() => {
    if (!handoff) return INITIAL_BLITZ_FORM;
    return {
      ...INITIAL_BLITZ_FORM,
      art: handoff.kind,
      groesse: String(handoff.area),
      gewerke: mapKalkulatorPicksToBlitzGewerke(handoff.picks),
      // Leave msg empty: the kalkulator detail block is rendered read-only
      // in step 4, and prepended to the user's note at submit time.
      msg: '',
    };
  });
  const pickGroups = handoff ? groupPicksByTrade(handoff.picks) : [];
  const [allExpanded, setAllExpanded] = useState(false);
  // Bump to force <details> elements to re-sync their `open` state when the
  // master toggle changes (since uncontrolled <details> remember user toggles).
  const [expandSync, setExpandSync] = useState(0);
  function toggleAll() {
    setAllExpanded((v) => !v);
    setExpandSync((n) => n + 1);
  }
  const [errors, setErrors] = useState<BlitzErrors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // If we came in from the kalkulator, skip the object-type step
  const [step, setStep] = useState(handoff ? 2 : 1);

  const totalSteps = 5;

  // Auto-grow the Besonderheiten textarea so the full prefilled summary
  // (and anything the user adds) is visible without internal scrolling.
  const msgRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    const el = msgRef.current;
    if (!el || step !== 4) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [step, form.msg]);

  function update<K extends keyof BlitzFormState>(key: K, value: BlitzFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function toggleGewerk(gewerk: string) {
    if (form.gewerke.includes(gewerk)) {
      update('gewerke', form.gewerke.filter(g => g !== gewerk));
    } else {
      update('gewerke', [...form.gewerke, gewerk]);
    }
  }

  function onNext() {
    if (step === 2) {
      const nextErrors: BlitzErrors = {};
      if (!form.groesse) nextErrors.groesse = 'Bitte geben Sie die geschätzte Fläche an.';
      if (!form.starttermin) nextErrors.starttermin = 'Bitte wählen Sie einen Baubeginn.';
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        // Focus the first invalid field for accessibility
        requestAnimationFrame(() => {
          const firstKey = Object.keys(nextErrors)[0];
          document.getElementById(firstKey)?.focus();
        });
        return;
      }
    }
    setErrors({});
    setStep(s => Math.min(s + 1, totalSteps));
  }

  function onBack() {
    setStep(s => Math.max(s - 1, 1));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (step !== totalSteps || submitting) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      const artLabel =
        BLITZ_ART_OPTIONS.find((o) => o.value === form.art)?.label ?? form.art;
      const starterminLabel =
        STARTTERMIN_LABELS[form.starttermin] ?? form.starttermin;
      const userNote = form.msg.trim();
      const kalkulatorBlock = handoff ? formatKalkulatorMessage(handoff) : '';
      const fullMsg = [kalkulatorBlock, userNote].filter(Boolean).join('\n\n');
      const res = await fetch('/api/blitz', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          art: form.art,
          artLabel,
          groesse: form.groesse,
          starttermin: form.starttermin,
          starterminLabel,
          gewerke: form.gewerke,
          msg: fullMsg,
          name: form.name.trim(),
          email: form.email.trim(),
          tel: form.tel.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
      }
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setSubmitError(
        `Ihre Anfrage konnte nicht gesendet werden (${msg}). Bitte versuchen Sie es erneut oder schreiben Sie uns direkt an office@primavista-bauprojekte.com.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    const firstName = form.name.trim().split(/\s+/)[0] ?? '';
    const email = form.email.trim();
    const tel = form.tel.trim();
    return (
      <div className="kontakt__form-wrap kontakt__form-wrap--success reveal reveal--right" data-delay="1">
        <div className="kontakt__form-success">
          <div className="kontakt__form-eyebrow"><span className="rule-red"></span> Gesendet</div>
          <h3 className="kontakt__form-title">
            Vielen Dank{firstName && <>, <em>{firstName}</em></>}.
          </h3>
          <p className="kontakt__form-success-body">
            Ihre Blitz-Anfrage ist bei uns eingegangen. Wir werten Ihr Projekt aus und
            stellen Ihnen innerhalb von <strong>24&nbsp;Stunden</strong> eine erste
            Kostenschätzung zu — per E-Mail an <strong>{email}</strong>
            {tel && <> oder telefonisch unter <strong>{tel}</strong></>}.
          </p>
          <ol className="kontakt__form-success-steps">
            <li><span className="num">01</span>Bauleitung prüft Fläche, Standort und gewünschte Gewerke.</li>
            <li><span className="num">02</span>Sie erhalten eine schriftliche Vorab-Kostenschätzung.</li>
            <li><span className="num">03</span>Auf Wunsch verfeinern wir das Angebot vor Ort — verbindlich nach Aufmaß.</li>
          </ol>
          <div className="kontakt__form-success-actions">
            <Link className="btn btn--light" to="/">Zur Startseite <span className="arrow">&gt;</span></Link>
            <Link className="btn btn--light" to="/projekte">Projekte ansehen <span className="arrow">&gt;</span></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kontakt__form-wrap reveal reveal--right" data-delay="1">
      <form onSubmit={onSubmit}>
          <div className="kontakt__form-eyebrow">
            Schritt {step} von {totalSteps}
          </div>

          {submitError && (
            <div className="form-submit-error" role="alert">{submitError}</div>
          )}

          {handoff && (
            <div className="blitz-handoff" role="status">
              <span className="blitz-handoff__eyebrow">
                <span className="rule-red"></span> Aus dem Kalkulator übernommen
              </span>
              <p>
                <strong>{handoff.kindLabel}</strong> · {handoff.area}&nbsp;m² ·{' '}
                {handoff.picks.length} {handoff.picks.length === 1 ? 'Gewerk' : 'Gewerke'} ·
                Vorab-Schätzung € {Math.round(handoff.totalMin / 1000).toLocaleString('de-DE')} – {Math.round(handoff.totalMax / 1000).toLocaleString('de-DE')}&nbsp;Tsd.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="form-step fade-in">
              <div className="form-field">
                <label>Um was für ein Objekt handelt es sich?</label>
                <div className="form-chips">
                  {BLITZ_ART_OPTIONS.map(({ value, label }) => (
                    <span key={value}>
                      <input type="radio" name="blitz-art" id={`blitz-art-${value}`} checked={form.art === value} onChange={() => update('art', value)} />
                      <label htmlFor={`blitz-art-${value}`}>{label}</label>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step fade-in">
              <div className="form-row">
                <div className={`form-field${errors.groesse ? ' is-invalid' : ''}`}>
                  <label htmlFor="groesse">Geschätzte Fläche (m²)</label>
                  <input
                    id="groesse"
                    type="number"
                    placeholder="z. B. 120"
                    value={form.groesse}
                    onChange={(e) => update('groesse', e.target.value)}
                    aria-invalid={errors.groesse ? true : undefined}
                    aria-describedby={errors.groesse ? 'groesse-error' : undefined}
                    required
                  />
                  {errors.groesse && (
                    <span id="groesse-error" className="form-field__error" role="alert">
                      {errors.groesse}
                    </span>
                  )}
                </div>
                <div className={`form-field form-field--select${errors.starttermin ? ' is-invalid' : ''}`}>
                  <label htmlFor="starttermin">Gewünschter Baubeginn</label>
                  <select
                    id="starttermin"
                    value={form.starttermin}
                    onChange={(e) => update('starttermin', e.target.value)}
                    aria-invalid={errors.starttermin ? true : undefined}
                    aria-describedby={errors.starttermin ? 'starttermin-error' : undefined}
                    required
                  >
                    <option value="" disabled>Bitte wählen</option>
                    <option value="sofort">So schnell wie möglich</option>
                    <option value="1-3m">In 1 – 3 Monaten</option>
                    <option value="3-6m">In 3 – 6 Monaten</option>
                    <option value="spaeter">Noch unklar / Nächstes Jahr</option>
                  </select>
                  {errors.starttermin && (
                    <span id="starttermin-error" className="form-field__error" role="alert">
                      {errors.starttermin}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step fade-in">
              <div className="form-field">
                <label>Welche Gewerke werden in etwa benötigt? (Mehrfachauswahl)</label>
                <div className="form-chips">
                  {BLITZ_GEWERKE_OPTIONS.map((g) => (
                    <span key={g}>
                      <input type="checkbox" id={`blitz-g-${g}`} checked={form.gewerke.includes(g)} onChange={() => toggleGewerk(g)} />
                      <label htmlFor={`blitz-g-${g}`}>{g}</label>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step fade-in">
              {handoff && pickGroups.length > 0 && (
                <div className="blitz-summary" aria-label="Übernommene Kalkulation">
                  <div className="blitz-summary__head">
                    <span className="blitz-summary__eyebrow">
                      <span className="rule-red"></span> Aus dem Kalkulator
                    </span>
                    <span className="blitz-summary__meta">
                      {handoff.kindLabel} · {handoff.area}&nbsp;m²
                    </span>
                  </div>
                  <div className="blitz-summary__toolbar">
                    <span className="blitz-summary__count">
                      {pickGroups.length} {pickGroups.length === 1 ? 'Gewerk' : 'Gewerke'}
                    </span>
                    <button
                      type="button"
                      className="blitz-summary__toggle"
                      onClick={toggleAll}
                      aria-expanded={allExpanded}
                    >
                      {allExpanded ? 'Alle einklappen' : 'Alle Details anzeigen'}
                    </button>
                  </div>
                  <ul className="blitz-summary__groups">
                    {pickGroups.map((group) => {
                      const showItems =
                        group.items.length > 1 || group.items[0]?.label !== group.label;
                      return (
                        <li key={group.key} className="blitz-summary__group">
                          <details
                            key={`${group.key}-${expandSync}`}
                            className="blitz-summary__details"
                            open={allExpanded}
                          >
                            <summary className="blitz-summary__group-head">
                              <span className="blitz-summary__group-name">{group.label}</span>
                              <span className="blitz-summary__group-value">
                                {formatPickAmount(group.subtotal)}
                              </span>
                            </summary>
                            {showItems && (
                              <ul className="blitz-summary__items">
                                {group.items.map((item) => (
                                  <li key={item.key} className="blitz-summary__item">
                                    <div className="blitz-summary__item-head">
                                      <span className="blitz-summary__item-name">{item.label}</span>
                                      <span className="blitz-summary__item-value">
                                        {formatPickAmount(item.subtotal)}
                                      </span>
                                    </div>
                                    {item.rows && item.rows.length > 0 && (
                                      <ul className="blitz-summary__rows">
                                        {item.rows.map((row, ri) => (
                                          <li key={`${item.key}-${ri}`} className="blitz-summary__row">
                                            <span className="blitz-summary__row-name">{row.label}</span>
                                            <span className="blitz-summary__row-qty">
                                              {formatRowQuantity(row.quantity, row.unit)}
                                            </span>
                                            <span className="blitz-summary__row-value">
                                              {formatPickAmount(row.subtotal)}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {!showItems && group.items[0]?.rows && group.items[0].rows.length > 0 && (
                              <ul className="blitz-summary__rows blitz-summary__rows--top">
                                {group.items[0].rows.map((row, ri) => (
                                  <li key={`${group.key}-r-${ri}`} className="blitz-summary__row">
                                    <span className="blitz-summary__row-name">{row.label}</span>
                                    <span className="blitz-summary__row-qty">
                                      {formatRowQuantity(row.quantity, row.unit)}
                                    </span>
                                    <span className="blitz-summary__row-value">
                                      {formatPickAmount(row.subtotal)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="blitz-summary__hint">
                    Diese Aufstellung wird mit Ihrer Anfrage übernommen.
                  </p>
                </div>
              )}
              <div className="form-field">
                <label htmlFor="msg">Besonderheiten / Kurzfassung Ihres Vorhabens</label>
                <textarea
                  ref={msgRef}
                  id="msg"
                  placeholder="Gibt es Besonderheiten, wie z.B. Denkmalschutz, spezielle Wünsche, oder Herausforderungen? Beschreiben Sie es kurz hier."
                  value={form.msg}
                  onChange={(e) => update('msg', e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-step fade-in">
              <div className="form-field form-field--eyebrow" style={{ marginBottom: '16px' }}>
                <label style={{ color: 'var(--pv-copper)' }}>Ihre Kontaktdaten</label>
              </div>

              <div className="form-field">
                <label htmlFor="name">Vollständiger Name</label>
                <input id="name" type="text" placeholder="Vor- und Nachname" value={form.name} onChange={(e) => update('name', e.target.value)} required />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="email">E-Mail</label>
                  <input id="email" type="email" placeholder="ihre@email.de" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                </div>
                <div className="form-field">
                  <label htmlFor="tel">Telefon</label>
                  <input id="tel" type="tel" placeholder="Für eventuelle Rückfragen" value={form.tel} onChange={(e) => update('tel', e.target.value)} required />
                </div>
              </div>
            </div>
          )}

          <div className="form-actions" style={{ marginTop: '40px' }}>
            <span className="form-actions__note">
              <span className="dot"></span>Schätzung in 24 Std.
            </span>
            <div className="form-actions__buttons">
              {step > 1 && (
                <button type="button" className="btn btn--light" onClick={onBack}>
                  Zurück
                </button>
              )}
              {step < totalSteps ? (
                <button type="button" className="btn btn--solid" onClick={onNext}>
                  Weiter <span className="arrow">&gt;</span>
                </button>
              ) : (
                <button type="submit" className="btn btn--solid" disabled={submitting}>
                  {submitting ? 'Wird gesendet…' : <>Angebot anfordern <span className="arrow">&gt;</span></>}
                </button>
              )}
            </div>
          </div>
      </form>
    </div>
  );
}
