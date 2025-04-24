# Supabase Realtime Configuration

To enable realtime updates in your Supabase project, follow these steps:

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Go to your project (with URL: https://nejbsmohatgvtdjvruvg.supabase.co)
3. Navigate to Database > Replication

## Enable Publication for Tables

1. In the Replication section, find "Realtime"
2. Enable realtime for the **suggestions** table:
   - Select the "suggestions" table
   - Make sure all operations (INSERT, UPDATE, DELETE) are enabled

## Verify Project Settings

1. Go to Project Settings > API
2. Ensure "Realtime" functionality is enabled in API settings
3. Check that the anon/public role has SELECT access to the tables

## Test Realtime Functionality

1. Open two browser windows:
   - One with the admin page (/admin)
   - One with the suggestion submission page (/submit)

2. Submit a new suggestion and verify it appears immediately on the admin page without refreshing

## Troubleshooting

If realtime updates are still not working:

1. Check browser console for any errors
2. Verify that the Supabase client is correctly initialized
3. Ensure database triggers are properly set up
4. Confirm that Row Level Security (RLS) policies allow the operations