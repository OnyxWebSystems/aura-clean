import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Button } from '@/components/ui/button';
import { Play, Star, Shield, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center" aria-label="Hero section">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Luxury home interior"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/95 via-[#1a1a2e]/80 to-[#1a1a2e]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Trust Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
              role="region"
              aria-label="Customer rating"
            >
              <div className="flex -space-x-1" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white text-sm">Rated 4.9/5 by 2,500+ clients</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Impeccable Spaces, <span className="block text-emerald-400">Effortless Living</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              Experience the gold standard in professional cleaning. We transform spaces with
              meticulous attention to detail that discerning homeowners and businesses demand.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to={createPageUrl('Booking')} aria-label="Schedule your cleaning">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg h-auto shadow-lg hover:shadow-xl"
                >
                  Schedule Your Cleaning
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg h-auto shadow-lg hover:shadow-xl"
                aria-label="Watch our story video"
              >
                <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                Watch Our Story
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20" role="list">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Insured</p>
                  <p className="text-gray-400 text-sm">$2M Coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">15+ Years</p>
                  <p className="text-gray-400 text-sm">Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Certified</p>
                  <p className="text-gray-400 text-sm">ISSA Member</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

