import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import DestinosPage from './pages/DestinosPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-20 overflow-hidden">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/destinos" element={<DestinosPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
