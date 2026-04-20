import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

// Creates a Supabase client authenticated as the calling user (via their JWT).
// Respects RLS policies for the `authenticated` role — no service role key needed.
export function createAuthClient(token: string) {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } }
    )
}

export function getToken(req: NextRequest): string | null {
    return req.headers.get('authorization')?.split(' ')[1] ?? null
}
