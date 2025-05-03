'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function SubmitStruggle() {
  const [struggle, setStruggle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(true);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!struggle.trim()) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('suggestions')
        .insert([{ 
          content: struggle,
          created_at: new Date().toISOString()
        }]);
        
      if (error) throw error;
      
      setStruggle('');
      setSubmitted(true);
      setShowContactForm(true);
      setShowSubmitForm(false);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to submit struggle. Please try again.');
      console.error('Error submitting struggle:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('contact_details')
        .insert([{ 
          name,
          phone,
          created_at: new Date().toISOString()
        }]);
        
      if (error) throw error;
      
      setName('');
      setPhone('');
      setShowContactForm(false);
      setContactSubmitted(true);
      setShowSubmitForm(true);
      setTimeout(() => setContactSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to submit contact details. Please try again.');
      console.error('Error submitting contact details:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleSkip = () => {
    setShowContactForm(false);
    setShowSubmitForm(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div style={{ backgroundColor: '#F4BEC4', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <div className="flex justify-center mb-2">
            <img 
              src="https://nejbsmohatgvtdjvruvg.supabase.co/storage/v1/object/sign/test-bucket-euro/Screenshot%202025-04-27%20at%2013.58.00.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzRlNmQxYTY1LWQxMmQtNDdlNy04MDk1LTc5ZDBiNGQ0YThiYSJ9.eyJ1cmwiOiJ0ZXN0LWJ1Y2tldC1ldXJvL1NjcmVlbnNob3QgMjAyNS0wNC0yNyBhdCAxMy41OC4wMC5wbmciLCJpYXQiOjE3NDU3NTcyNzEsImV4cCI6MTc3NzI5MzI3MX0.5fVQus6rlNW70O1lXxkmY9rfJHYBqCMb_xXVxfCE94Q"
              alt="Eurotrash Comedy Logo"
              className="w-64 h-auto"
            />
          </div>
          <h2 className="text-xl text-center text-white">Submit Your Struggle</h2>
        </div>
        
        {showSubmitForm && (
          <form onSubmit={handleSubmit} className="space-y-4" style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <div>
              <textarea
                value={struggle}
                onChange={(e) => setStruggle(e.target.value)}
                placeholder="Enter your struggle as a European woman..."
                className="w-full p-3 rounded-md focus:ring-2 focus:border-transparent"
                style={{ border: '1px solid var(--accent)', backgroundColor: 'white', color: 'var(--foreground)' }}
                rows={4}
                disabled={submitting}
              />
            </div>
            
            <button
              type="submit"
              disabled={submitting || !struggle.trim()}
              className="w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50"
              style={{ 
                backgroundColor: submitting || !struggle.trim() ? 'var(--accent)' : 'var(--button)',
              }}
              onMouseOver={(e) => {
                if (!submitting && struggle.trim()) {
                  e.currentTarget.style.backgroundColor = 'var(--link)';
                }
              }}
              onMouseOut={(e) => {
                if (!submitting && struggle.trim()) {
                  e.currentTarget.style.backgroundColor = 'var(--button)';
                }
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Struggle'}
            </button>
          </form>
        )}
        
        {submitted && !showContactForm && (
          <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: 'var(--secondary-accent)', color: 'var(--foreground)' }}>
            Thanks for your struggle!
          </div>
        )}
        
        {showContactForm && (
          <div className="mt-6">
            <div className="mb-4" style={{ backgroundColor: 'var(--secondary-accent)', padding: '1rem', borderRadius: '0.5rem' }}>
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>Stay Updated</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--foreground)' }}>
                Would you like to be notified about upcoming shows? Leave your contact details below.
              </p>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4" style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '0.5rem' }}>
              <div>
                <label htmlFor="name" className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-3 rounded-md focus:ring-2 focus:border-transparent"
                  style={{ border: '1px solid var(--accent)', backgroundColor: 'white', color: 'var(--foreground)' }}
                  disabled={submitting}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full p-3 rounded-md focus:ring-2 focus:border-transparent"
                  style={{ border: '1px solid var(--accent)', backgroundColor: 'white', color: 'var(--foreground)' }}
                  disabled={submitting}
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !phone.trim()}
                  className="flex-grow text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50"
                  style={{ 
                    backgroundColor: submitting || !name.trim() || !phone.trim() ? 'var(--accent)' : 'var(--button)',
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
                
                <button
                  type="button"
                  onClick={handleSkip}
                  className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)'
                  }}
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        )}
        
        {contactSubmitted && (
          <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: 'var(--secondary-accent)', color: 'var(--foreground)' }}>
            Thanks for your contact details! We'll be in touch about upcoming shows.
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: 'var(--alert)', color: 'white' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}