import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Service role client — bypasses RLS. NEVER import this in client components.
// Only used in API routes and Server Actions.
let _admin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
    if (!_admin) {
        _admin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { persistSession: false } }
        )
    }
    return _admin
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_, prop: string) {
        return getSupabaseAdmin()[prop as keyof SupabaseClient]
    }
})
