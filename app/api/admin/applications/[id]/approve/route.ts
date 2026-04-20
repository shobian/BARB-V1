import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'

async function getAuthUser(req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1]
    if (!token) return null
    const anonClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    const { data: { user } } = await anonClient.auth.getUser(token)
    return user
}

function generateRegistrationNumber() {
    const year = new Date().getFullYear()
    const seq = String(Math.floor(Math.random() * 900) + 100)
    return `BARB-${year}-${seq}`
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getAuthUser(req)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    // Optional overrides from admin (status, bio, profile_image_url)
    const {
        status = 'authorized_active',
        bio = null,
        profile_image_url = null,
    } = body

    // Fetch the application
    const { data: app, error: fetchError } = await supabaseAdmin
        .from('therapist_applications')
        .select('*')
        .eq('id', id)
        .single()

    if (fetchError || !app) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    if (app.review_status === 'approved') {
        return NextResponse.json({ error: 'Application already approved' }, { status: 400 })
    }

    const registration_number = generateRegistrationNumber()

    // Create therapist record
    const { error: insertError } = await supabaseAdmin
        .from('therapists')
        .insert([{
            application_id: id,
            registration_number,
            first_name: app.first_name,
            surname: app.surname,
            email: app.email,
            phone: app.phone,
            work_place_name: app.work_place_name,
            work_place_address: app.work_place_address,
            city: app.city,
            post_code: app.post_code,
            designation: app.designation,
            bio,
            profile_image_url,
            status,
            directory_visible: true,
        }])

    if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Update application review_status
    const { error: updateError } = await supabaseAdmin
        .from('therapist_applications')
        .update({ review_status: 'approved' })
        .eq('id', id)

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, registration_number })
}
