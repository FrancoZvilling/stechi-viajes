import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import CategoriesPartners from '../components/CategoriesPartners';
import EventsSection from '../components/EventsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import LocationsSection from '../components/LocationsSection';

const Home = () => {
    return (
        <>
            <HeroSection />
            <ProductGrid />
            <CategoriesPartners />
            <EventsSection />
            <TestimonialsSection />
            <LocationsSection />
        </>
    );
};

export default Home;
