-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Create RLS policies
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone can view shows
CREATE POLICY "Shows are viewable by everyone" 
ON shows FOR SELECT 
USING (true);

-- Anyone can insert suggestions
CREATE POLICY "Anyone can add suggestions" 
ON suggestions FOR INSERT 
WITH CHECK (true);

-- Anyone can view suggestions
CREATE POLICY "Suggestions are viewable by everyone" 
ON suggestions FOR SELECT 
USING (true);

-- Insert sample show for testing
INSERT INTO shows (title, date) 
VALUES ('Eurotrash Comedy Night', NOW());