'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

export default function AdminView() {
  const [struggles, setStruggles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch struggles
    const fetchStruggles = async () => {
      try {
        // Get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Fetch suggestions from the last 24 hours
        const { data, error } = await supabase
          .from('suggestions')
          .select('*')
          .gte('created_at', yesterday.toISOString())
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setStruggles(data || []);
      } catch (err) {
        setError('Failed to load struggles');
        console.error('Error fetching struggles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStruggles();

    // Set up real-time subscription
    const channel = supabase
      .channel('any')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'suggestions' 
      }, (payload) => {
        console.log('New struggle received:', payload);
        setStruggles(prev => [payload.new, ...prev]);
      })
      .subscribe();

    // Cleanup function
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{ color: 'var(--foreground)', backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '0.5rem', border: '1px solid var(--accent)' }}>
          Loading struggles...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{ color: 'white', backgroundColor: 'var(--alert)', padding: '2rem', borderRadius: '0.5rem' }}>
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4">
      <div style={{ backgroundColor: 'var(--header)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <h1 className="text-3xl font-bold mb-2 text-white">Eurotrash Comedy</h1>
        <h2 className="text-xl mb-0 text-white">Struggles of European Women</h2>
      </div>
      
      <div className="mb-4" style={{ backgroundColor: 'var(--secondary-accent)', padding: '0.5rem', borderRadius: '0.25rem' }}>
        <p className="text-sm" style={{ color: 'var(--foreground)' }}>
          {struggles.length} struggles loaded
        </p>
      </div>
      
      {struggles.length === 0 ? (
        <p style={{ color: 'var(--foreground)' }}>No struggles yet. Waiting for audience input...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {struggles.map((struggle) => (
            <div 
              key={struggle.id} 
              className="p-4 rounded-md shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--accent)' }}
            >
              <p className="text-lg" style={{ color: 'var(--foreground)' }}>{struggle.content}</p>
              <p className="text-sm mt-2" style={{ color: 'var(--accent)' }}>{formatDate(struggle.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}