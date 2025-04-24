# Eurotrash Comedy Show App

A Next.js application for Eurotrash Comedy Show that allows audience members to submit suggestions and provides a real-time dashboard for show hosts.

## Features

- Audience suggestion submission form
- Real-time dashboard for viewing audience suggestions
- Built with Next.js and Supabase

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a Supabase project at https://supabase.com
4. Create the following tables in Supabase:

   ```sql
   -- Table for shows
   CREATE TABLE shows (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title TEXT NOT NULL,
     date TIMESTAMP WITH TIME ZONE NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Table for audience suggestions
   CREATE TABLE suggestions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     content TEXT NOT NULL,
     show_id UUID REFERENCES shows(id),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Index for faster queries
   CREATE INDEX idx_suggestions_created_at ON suggestions(created_at);
   ```

5. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

- **Audience members**: Visit `/submit` to submit comedy suggestions
- **Show hosts**: Visit `/admin` to view all suggestions in real-time

## Future Enhancements

- Authentication for the admin page
- Show selection dropdown to filter suggestions by show
- Ability to mark suggestions as "used" or "favorite"
- Mobile-optimized interface for on-stage use