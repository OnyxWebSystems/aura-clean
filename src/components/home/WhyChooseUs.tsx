import React from 'react';
import { Shield, Leaf, Users, Clock, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Fully Insured & Bonded',
    description: '$2 million liability coverage for your complete peace of mind.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'We use only non-toxic, environmentally safe cleaning solutions.',
  },
  {
    icon: Users,
    title: 'Vetted Professionals',
    description: 'All team members undergo background checks and comprehensive training.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Available 7 days a week to fit your busy lifestyle.',
  },
  {
    icon: Award,
    title: 'Satisfaction Guaranteed',
    description: 'Not happy? We\'ll return and make it right—no questions asked.',
  },
  {
    icon: CheckCircle2,
    title: 'Consistent Quality',
    description: 'Every cleaning meets our exacting standards, every time.',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-24 bg-[#1a1a2e] relative overflow-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 id="why-choose-us-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Pristine & Co.?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're not just another cleaning service—we're your trusted partner in maintaining
            pristine spaces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div
                className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <feature.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

