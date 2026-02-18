# Supabase Setup for Portfolio Chat Logging

This document covers the Supabase configuration needed for the digital resume's chat system to log unanswered questions and chat sessions.

## Prerequisites

- A Supabase account at [supabase.com](https://supabase.com)
- A Supabase project created

## 1. Create the `unanswered_questions` Table

Run this SQL in Supabase Dashboard > SQL Editor:

```sql
CREATE TABLE unanswered_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  user_name TEXT,
  user_email TEXT,
  user_role TEXT,
  session_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE unanswered_questions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for chat visitors)
CREATE POLICY "Allow anonymous insert"
  ON unanswered_questions
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated reads (for admin review)
CREATE POLICY "Allow authenticated read"
  ON unanswered_questions
  FOR SELECT
  USING (true);
```

## 2. Create the `trained_qa` Table (Training Mode)

This table stores Q&A pairs added via the secret training mode (`castro train`).

```sql
CREATE TABLE trained_qa (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  keywords TEXT[] NOT NULL,
  answer TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE trained_qa ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads (so all visitors get trained responses)
CREATE POLICY "Allow anonymous read"
  ON trained_qa FOR SELECT USING (true);

-- Allow anonymous inserts (for training mode)
CREATE POLICY "Allow anonymous insert"
  ON trained_qa FOR INSERT WITH CHECK (true);

-- Allow anonymous updates (for deactivating pairs)
CREATE POLICY "Allow anonymous update"
  ON trained_qa FOR UPDATE USING (true);
```

## 3. Existing Tables

The resume also uses these tables (already set up if chat logging works):

### `chat_logs`
```sql
CREATE TABLE chat_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT,
  user_name TEXT,
  user_email TEXT,
  user_role TEXT,
  message_type TEXT,
  user_message TEXT,
  bot_response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON chat_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read"
  ON chat_logs FOR SELECT USING (true);
```

### `contact_messages`
```sql
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON contact_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read"
  ON contact_messages FOR SELECT USING (true);
```

## 3. Configure the Resume

In `resume/index.html`, update these constants near the top of the chat JavaScript section:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

Find your values in Supabase Dashboard > Settings > API:
- **Project URL** = `SUPABASE_URL`
- **anon public key** = `SUPABASE_ANON_KEY`

## 4. How It Works

- **Chat sessions**: Every chat message is logged to `chat_logs` with user info, session ID, and the question/response pair.
- **Unanswered questions**: When the chat bot returns its default "I don't have an answer" response, the question is additionally logged to `unanswered_questions` with status `pending` for later review.
- **Contact form**: Messages from the contact modal are saved to `contact_messages`.

All logging is fire-and-forget (non-blocking). If Supabase is unreachable, the chat continues working normally.

## 5. Optional: Email Notifications for Unanswered Questions

To receive email alerts when visitors ask questions the chat can't answer, set up a Supabase Database Webhook:

1. Go to Supabase Dashboard > Database > Webhooks
2. Create a new webhook:
   - **Table**: `unanswered_questions`
   - **Events**: `INSERT`
   - **URL**: Your notification endpoint (e.g., Zapier, Make.com, or custom API)
3. The webhook payload will include the question, user info, and timestamp
