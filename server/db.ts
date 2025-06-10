import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "../shared/schema";

neonConfig.webSocketConstructor = ws;

// Use either provided DATABASE_URL or construct from Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL || 'https://aocttoqwlpiqvikealbi.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvY3R0b3F3bHBpcXZpa2VhbGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NDI0NzgsImV4cCI6MjA1OTUxODQ3OH0.2hrd5_9jNPxzQ3XtskUAVD4SQ7SAE6zZqFTRgN7J93E';

const DATABASE_URL = process.env.DATABASE_URL || 
                     `postgresql://postgres:${supabaseKey}@db.${supabaseUrl.replace('https://', '')}/postgres`;

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle({ client: pool, schema });
