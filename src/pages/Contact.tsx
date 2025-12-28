import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { useMutation } from '@tanstack/react-query';
import { contactMessageQueries, emailTemplates } from '../lib';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  subtext: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: 'Phone',
    value: '1-800-PRISTINE',
    subtext: 'Mon-Sat, 7AM-8PM',
    href: 'tel:1-800-PRISTINE',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@pristineco.com',
    subtext: 'We respond within 24 hours',
    href: 'mailto:hello@pristineco.com',
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    value: '123 Madison Avenue',
    subtext: 'New York, NY 10016',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon-Sat: 7AM-8PM',
    subtext: 'Sun: Closed',
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        // Save message to Supabase
        const message = await contactMessageQueries.create({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
          status: 'new',
        });

        // Send confirmation email (non-blocking)
        try {
          await emailTemplates.sendContactConfirmation({
            to: data.email,
            name: data.name,
            subject: data.subject || 'General Inquiry',
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the submission if email fails
        }

        return message;
      } catch (error: any) {
        console.error('Contact form submission error:', error);
        throw new Error(error.message || 'Failed to send message. Please try again.');
      }
    },
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    },
    onError: (error: any) => {
      console.error('Contact form error:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1a1a2e] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full"
                    aria-label={`Contact us via ${item.title}: ${item.value}`}
                  >
                    <div
                      className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
                      aria-hidden="true"
                    >
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-sm text-gray-500 mb-1">{item.title}</h3>
                    <p className="font-semibold text-[#1a1a2e] mb-1">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.subtext}</p>
                  </a>
                ) : (
                  <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                    <div
                      className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4"
                      aria-hidden="true"
                    >
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-sm text-gray-500 mb-1">{item.title}</h3>
                    <p className="font-semibold text-[#1a1a2e] mb-1">{item.value}</p>
                    <p className="text-sm text-gray-500">{item.subtext}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1a1a2e]">Send us a Message</h2>
                    <p className="text-gray-500">Fill out the form and we'll get back to you</p>
                  </div>
                </div>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    role="alert"
                    aria-live="polite"
                  >
                    <div
                      className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      aria-hidden="true"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder="John Smith"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="john@example.com"
                          required
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          required
                          aria-required="true"
                        >
                          <option value="">Select a topic</option>
                          <option value="quote">Request a Quote</option>
                          <option value="booking">Booking Inquiry</option>
                          <option value="feedback">Feedback</option>
                          <option value="careers">Careers</option>
                          <option value="other">Other</option>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us how we can help..."
                        rows={5}
                        required
                        aria-required="true"
                      />
                    </div>
                    {submitMutation.isError && (
                      <div 
                        className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm" 
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <p className="font-medium mb-1">Error sending message</p>
                        <p>{submitMutation.error?.message || 'Failed to send message. Please try again.'}</p>
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Whether you're looking for a quote, have questions about our services, or want to
                provide feedback, we're here to help. Our customer service team is dedicated to
                ensuring you have the best experience possible.
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">Need Immediate Assistance?</h3>
                  <p className="text-gray-600 mb-4">
                    Call our customer service line for urgent inquiries or to book same-day service.
                  </p>
                  <a
                    href="tel:1-800-PRISTINE"
                    className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
                    aria-label="Call us at 1-800-PRISTINE"
                  >
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    1-800-PRISTINE
                  </a>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-semibold text-[#1a1a2e] mb-2">Ready to Book?</h3>
                  <p className="text-gray-600 mb-4">
                    Skip the form and book your cleaning directly through our online scheduling
                    system.
                  </p>
                  <Link to={createPageUrl('Booking')}>
                    <Button className="bg-[#1a1a2e] hover:bg-[#2a2a3e]">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">Service Areas</h2>
            <p className="text-gray-600">
              We proudly serve the greater metropolitan area and surrounding communities
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center" role="img" aria-label="Service area map">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-500">Interactive map would appear here</p>
                <p className="text-sm text-gray-400 mt-2">
                  Serving Manhattan, Brooklyn, Queens, and surrounding areas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

