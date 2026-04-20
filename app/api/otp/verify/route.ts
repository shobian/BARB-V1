import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
    const { email, code } = await req.json()

    if (!email || !code) {
        return NextResponse.json({ error: 'Email and code are required' }, { status: 400 })
    }

    // Find a valid, unused, non-expired OTP for this email + code
    const { data, error } = await supabase
        .from('email_otps')
        .select('id')
        .eq('email', email)
        .eq('code', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single()

    if (error || !data) {
        return NextResponse.json({ error: 'Invalid or expired code' }, { status: 400 })
    }

    // Mark as used so it can't be reused
    await supabase
        .from('email_otps')
        .update({ used: true })
        .eq('id', data.id)

    return NextResponse.json({ success: true })
}
