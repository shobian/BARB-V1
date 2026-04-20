import { NextRequest, NextResponse } from 'next/server'
import { createAuthClient, getToken } from '@/lib/supabase/admin-client'

function generateRegistrationNumber() {
    const year = new Date().getFullYear()
    const seq = String(Math.floor(Math.random() * 900) + 100)
    return `BARB-${year}-${seq}`
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = getToken(req)
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const { status } = await req.json() // 'pending' | 'approved' | 'rejected'

    if (!['pending', 'approved', 'rejected'].includes(status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const db = createAuthClient(token)

    // Fetch the application
    const { data: app, error: fetchErr } = await db
        .from('therapist_applications')
        .select('*')
        .eq('id', id)
        .single()

    if (fetchErr || !app) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    let registration_number: string | null = null

    if (status === 'approved') {
        // Check if a therapist record already exists for this application
        const { data: existing } = await db
            .from('therapists')
            .select('id')
            .eq('application_id', id)
            .single()

        if (existing) {
            // Re-approve: make visible again
            await db
                .from('therapists')
                .update({ directory_visible: true, status: 'authorized_active' })
                .eq('application_id', id)
        } else {
            // Create new therapist record — this flows into the public_directory view
            registration_number = generateRegistrationNumber()
            const { error: insertErr } = await db
                .from('therapists')
                .insert({
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
                    status: 'authorized_active',
                    directory_visible: true,
                })

            if (insertErr) {
                return NextResponse.json({ error: insertErr.message }, { status: 500 })
            }
        }
    }

    if (status === 'rejected') {
        // Hide from directory if a therapist record exists
        await db
            .from('therapists')
            .update({ directory_visible: false })
            .eq('application_id', id)
    }

    // Update the application review_status
    const { error: updateErr } = await db
        .from('therapist_applications')
        .update({ review_status: status })
        .eq('id', id)

    if (updateErr) {
        return NextResponse.json({ error: updateErr.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, registration_number })
}
