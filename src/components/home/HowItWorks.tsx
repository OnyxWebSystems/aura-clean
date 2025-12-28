import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Step {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: CalendarDays,
    title: 'Book Online',
    description:
      'Choose your service, select a convenient date and time, and provide your address. Our booking takes less than 2 minutes.',
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'We Confirm',
    description:
      'Receive instant confirmation and meet your dedicated cleaning professional. All team members are vetted and trained.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Enjoy Your Space',
    description:
      'Come home to a pristine environment. We handle everything so you can focus on what matters most.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these three easy steps to transform your space.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                  <step.icon className="w-10 h-10 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to={createPageUrl('Booking')}>
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 px-8 shadow-lg hover:shadow-xl">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

