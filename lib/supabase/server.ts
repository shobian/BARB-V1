import { createClient } from '@supabase/supabase-js'

// Service role client — bypasses RLS. NEVER import this in client components.
// Only used in API routes and Server Actions.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
})
