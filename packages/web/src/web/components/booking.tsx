import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Check, Clock, CalendarDays } from 'lucide-react';

const times = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00'];
const today = new Date(2026, 9, 8);
const initialDate = '2026-10-09';
export default function Booking({ service }: { service: string }) {
  const [month, setMonth] = useState(new Date(2026, 9, 1));
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState('10:30');
  const [done, setDone] = useState(false);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const offset = (month.getDay() + 6) % 7;
  const dateKey = (day: number) => `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const selectedLabel = new Date(`${date}T12:00:00`).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' });
  return <section className="booking-section section" id="prenota">
    <div className="section-heading centered"><span className="eyebrow">IL TUO TEMPO, FINALMENTE</span><h2>Il prossimo momento<br />è <em>tutto tuo.</em></h2><p>Scegli quando rallentare. Al resto pensiamo noi.</p></div>
    <div className="booking-panel">
      <div className="calendar-wrap">
        <div className="calendar-label"><CalendarDays size={17} /><span>Scegli il tuo giorno</span><span className="demo-chip">DEMO</span></div>
        <div className="month-nav"><button aria-label="Mese precedente" disabled={month <= new Date(2026, 9, 1)} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={18} /></button><strong>{month.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}</strong><button aria-label="Mese successivo" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={18} /></button></div>
        <div className="calendar-grid"><div className="weekdays">{['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((d, i) => <span key={i}>{d}</span>)}</div><div className="days">{Array.from({ length: offset }, (_, i) => <span key={`blank-${i}`} />)}{Array.from({ length: days }, (_, i) => { const day = i + 1; const obj = new Date(month.getFullYear(), month.getMonth(), day); const disabled = obj < today || obj.getDay() === 0; return <button type="button" key={day} disabled={disabled} aria-label={obj.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })} aria-pressed={date === dateKey(day)} className={date === dateKey(day) ? 'selected' : ''} onClick={() => { setDate(dateKey(day)); setDone(false); }}>{day}</button>; })}</div></div>
        <div className="time-title"><Clock size={15} /> Orari per il {selectedLabel}</div><div className="time-options">{times.map(t => <button type="button" key={t} aria-pressed={time === t} className={time === t ? 'selected' : ''} onClick={() => { setTime(t); setDone(false); }}>{t}</button>)}</div>
        <p className="calendar-footnote"><span className="availability-dot" /> Disponibilità illustrativa, non in tempo reale</p>
      </div>
      <div className="booking-form-wrap"><span className="eyebrow">UN PICCOLO GESTO PER TE</span><h3>Richiedi appuntamento</h3><p className="form-intro">Lasciaci i tuoi dati per provare la prenotazione.</p>
        <form onSubmit={e => { e.preventDefault(); setDone(true); }} onChange={() => setDone(false)}>
          <label>Trattamento<input aria-label="Trattamento" key={service} name="servizio" defaultValue={service || 'Consulenza personalizzata'} required /></label>
          <div className="form-row"><label>Data<input aria-label="Data" type="date" min="2026-10-08" name="data" value={date} onChange={e => setDate(e.target.value)} required /></label><label>Ora<select aria-label="Ora" name="ora" value={time} onChange={e => setTime(e.target.value)}>{times.map(t => <option key={t}>{t}</option>)}</select></label></div>
          <label>Nome e cognome<input aria-label="Nome e cognome" name="nome" placeholder="Come ti chiami?" autoComplete="name" required minLength={2} /></label>
          <label>Telefono<input aria-label="Telefono" type="tel" name="telefono" placeholder="Il tuo numero di telefono" autoComplete="tel" required pattern="[+]?[0-9 ]{7,20}" /></label>
          <p className="privacy-note">Modalità demo: i dati restano nel browser e non vengono inviati né salvati.</p>
          <button className="button primary form-submit" type="submit">Invia richiesta <ArrowRight size={17} /></button>
          {done && <output className="success-message"><Check size={20} /><span>Simulazione completata per il {selectedLabel}, ore {time}. Nessuna richiesta inviata e nessun appuntamento confermato.</span></output>}
        </form>
      </div>
    </div>
  </section>;
}