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
        <div style={{ backgroundColor: 'var(--header)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <h1 className="text-3xl font-bold mb-2 text-center text-white">Eurotrash Comedy</h1>
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