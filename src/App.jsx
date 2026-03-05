import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import PromoSection from './components/PromoSection';
import CategoriesPartners from './components/CategoriesPartners';
import EventsSection from './components/EventsSection';
import TestimonialsSection from './components/TestimonialsSection';
import LocationsSection from './components/LocationsSection';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col pt-20 overflow-hidden">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <HeroSection />
        <ProductGrid />
        <PromoSection />
        <CategoriesPartners />
        <EventsSection />
        <TestimonialsSection />
        <LocationsSection />
      </main>
      <Footer />
      <ScrollToTop />
      <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
