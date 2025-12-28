import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Award,
  Users,
  Heart,
  Target,
  ArrowRight,
  CheckCircle2,
  Shield,
  Leaf,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

const team = [
  {
    name: 'Victoria Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: '20+ years in hospitality management',
  },
  {
    name: 'Marcus Thompson',
    role: 'Director of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Former operations lead at luxury hotel chains',
  },
  {
    name: 'Sarah Williams',
    role: 'Head of Training',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Certified ISSA training specialist',
  },
  {
    name: 'David Park',
    role: 'Quality Assurance Manager',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Quality control expert with 15 years experience',
  },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We never settle for good enough. Every cleaning meets our exacting standards.',
  },
  {
    icon: Heart,
    title: 'Care',
    description: 'We treat every home and office as if it were our own, with respect and attention.',
  },
  {
    icon: Users,
    title: 'Team',
    description: 'Our people are our greatest asset. We invest in their growth and wellbeing.',
  },
  {
    icon: Target,
    title: 'Integrity',
    description: 'Honest pricing, reliable service, and transparent communication always.',
  },
];

const milestones = [
  { year: '2008', event: 'Founded in Manhattan with a team of 5' },
  { year: '2012', event: 'Expanded to commercial cleaning services' },
  { year: '2015', event: 'Reached 100 team members milestone' },
  { year: '2018', event: 'Launched eco-friendly product line' },
  { year: '2021', event: 'Expanded to 5 metropolitan areas' },
  { year: '2024', event: '200+ team members serving 50,000+ clients' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-[#1a1a2e] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Setting the Standard for Professional Cleaning
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              For over 15 years, Pristine & Co. has been transforming spaces and exceeding
              expectations. We're not just a cleaning company— we're your partners in creating
              environments where life and work thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              "To deliver exceptional cleaning services that enhance the quality of life for our
              clients while providing meaningful employment and growth opportunities for our team
              members. We believe a clean space is the foundation for productivity, health, and
              happiness."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="values-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-gray-50" aria-labelledby="timeline-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="timeline-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">From humble beginnings to industry leadership</p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-emerald-200"
              aria-hidden="true"
            />
            <ol className="space-y-12" role="list">
              {milestones.map((milestone, index) => (
                <motion.li
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:text-right md:pr-8 pl-12 md:pl-0">
                    {(index % 2 === 0 || typeof window === 'undefined' || window.innerWidth < 768) && (
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <span className="text-emerald-600 font-bold text-lg">{milestone.year}</span>
                        <p className="text-gray-700 mt-1">{milestone.event}</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow"
                    aria-hidden="true"
                  />
                  <div className="flex-1 md:text-left md:pl-8 hidden md:block">
                    {index % 2 !== 0 && (
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <span className="text-emerald-600 font-bold text-lg">{milestone.year}</span>
                        <p className="text-gray-700 mt-1">{milestone.event}</p>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="team-heading" className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the people driving our commitment to excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    className="w-40 h-40 rounded-2xl object-cover mx-auto"
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e]">{member.name}</h3>
                <p className="text-emerald-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Clients Trust Us
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Our reputation is built on a foundation of reliability, quality, and genuine care
                for our clients and their spaces. Here's what sets us apart from the rest.
              </p>
              <ul className="space-y-4" role="list">
                {[
                  { icon: Shield, text: '$2M liability insurance coverage' },
                  { icon: Leaf, text: 'Eco-friendly, non-toxic products' },
                  { icon: Users, text: 'Background-checked, trained professionals' },
                  { icon: Clock, text: 'Flexible scheduling, 7 days a week' },
                  { icon: CheckCircle2, text: '100% satisfaction guarantee' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Professional cleaning team"
                className="rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -left-6 bg-emerald-500 rounded-xl p-6 text-white">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">
            Ready to Experience the Pristine Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied clients who trust us with their spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('Booking')}>
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 px-8">
                Book a Cleaning
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" variant="outline" className="px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

