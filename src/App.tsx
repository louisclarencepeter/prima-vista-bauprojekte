import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gewerke from './pages/Gewerke';
import KomplettPakete from './pages/KomplettPakete';
import Projekte from './pages/Projekte';
import Kontakt from './pages/Kontakt';
import BlitzAngebot from './pages/BlitzAngebot';
import Kalkulator from './pages/Kalkulator';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gewerke" element={<Gewerke />} />
        <Route path="/komplett-pakete" element={<KomplettPakete />} />
        <Route path="/projekte" element={<Projekte />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/blitz-angebot" element={<BlitzAngebot />} />
        <Route path="/kalkulator" element={<Kalkulator />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Route>
    </Routes>
  );
}
