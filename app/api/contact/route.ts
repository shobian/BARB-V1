import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, email, phone, inquiry_type, message } = body

    if (!name || !email || !inquiry_type) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { error: dbError } = await supabase
        .from('inquiries')
        .insert([{ name, email, phone, inquiry_type, message, status: 'new' }])

    if (dbError) {
        console.error('Inquiry insert error:', dbError)
        return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Send email notification to admin via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? 'semantixlabs@gmail.com'

    if (resendApiKey) {
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: `BARB Website <${fromEmail}>`,
                to: adminEmail,
                subject: `New Contact Inquiry: ${inquiry_type} from ${name}`,
                html: `
                    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                        <div style="border-left:4px solid #1a3a61;padding-left:16px;margin-bottom:28px">
                            <h2 style="color:#1a3a61;margin:0 0 4px">New Contact Inquiry</h2>
                            <p style="color:#6b7280;margin:0;font-size:14px">Submitted via barb.lk/contact</p>
                        </div>

                        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px">
                            <tr style="background:#f9fafb">
                                <td style="padding:10px 14px;font-weight:600;color:#374151;width:140px">Name</td>
                                <td style="padding:10px 14px;color:#111827">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px 14px;font-weight:600;color:#374151">Email</td>
                                <td style="padding:10px 14px;color:#111827"><a href="mailto:${email}" style="color:#1a3a61">${email}</a></td>
                            </tr>
                            <tr style="background:#f9fafb">
                                <td style="padding:10px 14px;font-weight:600;color:#374151">Phone</td>
                                <td style="padding:10px 14px;color:#111827">${phone || '—'}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px 14px;font-weight:600;color:#374151">Topic</td>
                                <td style="padding:10px 14px">
                                    <span style="background:#dbeafe;color:#1e40af;padding:2px 10px;border-radius:99px;font-size:13px;font-weight:600">${inquiry_type}</span>
                                </td>
                            </tr>
                        </table>

                        <div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:28px">
                            <p style="font-weight:600;color:#374151;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:.5px">Message</p>
                            <p style="color:#111827;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap">${message || '—'}</p>
                        </div>

                        <a href="https://barb.lk/admin/inquiries" style="display:inline-block;background:#1a3a61;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600">
                            View in Admin Panel →
                        </a>

                        <p style="color:#9ca3af;font-size:12px;margin-top:28px">
                            This is an automated notification from BARB. Reply directly to ${email} to respond.
                        </p>
                    </div>
                `,
            }),
        }).catch((err) => console.error('Resend notification failed:', err))
    }

    return NextResponse.json({ success: true })
}
