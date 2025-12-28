import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { handleCarouselNavigation, KEYBOARD_KEYS } from '../../utils/accessibility';
import type { KeyboardEvent } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Homeowner, Upper East Side',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: 'After trying numerous cleaning services over the years, Pristine & Co. has been a revelation. Their attention to detail is unmatched, and I love coming home to a spotless space every week.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner, Midtown',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: 'Our office has never looked better. The team is professional, punctual, and thorough. They work around our schedule and never disrupt our operations.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    rating: 5,
    text: 'I recommend Pristine & Co. to all my clients for move-in/out cleanings. They consistently exceed expectations and help properties sell faster.',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Apartment Resident, Brooklyn',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    rating: 5,
    text: 'The deep cleaning service transformed my apartment. They cleaned areas I didn\'t even know needed attention. Worth every penny.',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    handleCarouselNavigation(e, currentIndex, testimonials.length, setCurrentIndex);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it—hear from satisfied customers
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Customer testimonials carousel"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              <div className="flex items-center gap-1 mb-6" aria-label={`${currentTestimonial.rating} out of 5 stars`}>
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-emerald-500 text-emerald-500"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <Quote className="w-12 h-12 text-emerald-200 mb-6" aria-hidden="true" />
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{currentTestimonial.text}</p>
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.image}
                  alt={`${currentTestimonial.name}, ${currentTestimonial.role}`}
                  className="w-16 h-16 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-[#1a1a2e]">{currentTestimonial.name}</div>
                  <div className="text-sm text-gray-500">{currentTestimonial.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-[#1a1a2e]" aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-[#1a1a2e]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

