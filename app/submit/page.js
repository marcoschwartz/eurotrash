'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function SubmitStruggle() {
  const [struggle, setStruggle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to submit struggle. Please try again.');
      console.error('Error submitting struggle:', err);
    } finally {
      setSubmitting(false);
    }
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
        
        {submitted && (
          <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: 'var(--secondary-accent)', color: 'var(--foreground)' }}>
            Thanks for your struggle!
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