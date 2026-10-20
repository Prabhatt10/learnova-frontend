import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Notification from '../common/Notification';

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contactUs" className="w-full bg-white py-16 md:py-20 scroll-mt-20 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#333333]">Get in Touch</h2>
          <p className="mt-3 text-base text-gray-600">
            Have questions about setting up classrooms or getting started with Learnova? Our team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#F5F1F1] p-8 rounded-2xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#333333]">Contact Information</h3>
              <p className="text-sm text-gray-600 mt-1">Reach out through any of our support channels.</p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong className="block text-gray-900 font-semibold">Email Support:</strong>
                <span className="text-gray-600">support@learnova.edu</span>
              </div>
              <div>
                <strong className="block text-gray-900 font-semibold">Office Hours:</strong>
                <span className="text-gray-600">Monday – Friday: 9:00 AM – 6:00 PM (EST)</span>
              </div>
              <div>
                <strong className="block text-gray-900 font-semibold">Live Classroom Help:</strong>
                <span className="text-gray-600">Available 24/7 for active educators and verified institutions.</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            {submitted && (
              <Notification
                type="success"
                message="Thank you! Your message has been received. We will get back to you shortly."
                onDismiss={() => setSubmitted(false)}
                className="mb-4"
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="Jane Doe"
              />
              <Input
                type="email"
                label="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="jane@example.com"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contactMessage">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contactMessage"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  placeholder="How can we help your classroom?"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#333333]"
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
