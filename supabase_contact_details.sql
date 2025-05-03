-- Table for contact details
CREATE TABLE contact_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_contact_details_created_at ON contact_details(created_at);

-- Enable Row Level Security
ALTER TABLE contact_details ENABLE ROW LEVEL SECURITY;

-- Anyone can insert contact details
CREATE POLICY "Anyone can add contact details" 
ON contact_details FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view contact details
CREATE POLICY "Only authenticated users can view contact details" 
ON contact_details FOR SELECT 
USING (auth.role() = 'authenticated');