'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import {
    Loader2, CheckCircle2, XCircle, ArrowLeft,
    User, MapPin, Phone, Mail, Briefcase, GraduationCap, FileText, ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

interface Application {
    id: string;
    review_status: string;
    first_name: string;
    surname: string;
    date_of_birth: string;
    address_line: string;
    city: string;
    post_code: string;
    phone: string;
    phone_optional: string;
    email: string;
    nic_or_passport: string;
    current_rbt: boolean;
    rbt_certification_no: string;
    current_ibt: boolean;
    ibt_certification_no: string;
    expired_rbt: boolean;
    expired_ibt: boolean;
    voluntary_inactive_rbt: boolean;
    practicing_behavior_therapist: boolean;
    other_aba_qualifications: boolean;
    behaviour_analyst: boolean;
    institution: string;
    period_of_education: string;
    qualifications: string;
    work_place_name: string;
    work_place_address: string;
    employment_period: string;
    designation: string;
    full_time_part_time: string;
    explanation_of_services: string;
    submitted_at: string;
}

const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

function Field({ label, value }: { label: string; value?: string | boolean | null }) {
    if (!value && value !== false) return null;
    return (
        <div className="py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
            <p className="text-sm text-gray-800 mt-0.5">{String(value)}</p>
        </div>
    );
}

function BoolBadge({ label, value }: { label: string; value: boolean }) {
    return value ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
            <CheckCircle2 className="w-3 h-3" /> {label}
        </span>
    ) : null;
}

export default function ApplicationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [app, setApp] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<'approve' | 'reject' | null>(null);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const load = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            if (!token) return;

            const res = await fetch(`/api/admin/applications/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const json = await res.json();
            if (res.ok) setApp(json.data);
            else setError(json.error ?? 'Failed to load application');
            setLoading(false);
        };
        load();
    }, [id]);

    const handleAction = async (action: 'approve' | 'reject') => {
        setActionLoading(action);
        setError('');
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        const newStatus = action === 'approve' ? 'approved' : 'rejected';

        const res = await fetch(`/api/admin/applications/${id}/status`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        const json = await res.json();
        setActionLoading(null);

        if (!res.ok) {
            setError(json.error ?? 'Action failed');
        } else {
            const msg = action === 'approve'
                ? `Approved! Registration number: ${json.registration_number}`
                : 'Application marked as Not Approved.';
            setSuccessMsg(msg);
            setApp((prev) => prev ? { ...prev, review_status: newStatus } : prev);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>;
    }

    if (!app) {
        return <p className="text-red-500">{error || 'Application not found.'}</p>;
    }

    const isActionable = app.review_status === 'pending' || app.review_status === 'under_review';

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link href="/admin" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-3">
                        <ArrowLeft className="w-4 h-4" /> Back to applications
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {app.first_name} {app.surname}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">{app.email} · Submitted {new Date(app.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${STATUS_COLORS[app.review_status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {app.review_status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
            </div>

            {successMsg && (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {successMsg}
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="md:col-span-2 space-y-4">
                    {/* Personal info */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <User className="w-4 h-4 text-gray-400" /> Personal Information
                        </h2>
                        <Field label="Date of Birth" value={app.date_of_birth} />
                        <Field label="NIC / Passport" value={app.nic_or_passport} />
                        <Field label="Phone" value={app.phone} />
                        <Field label="Phone (optional)" value={app.phone_optional} />
                    </section>

                    {/* Address */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-gray-400" /> Address
                        </h2>
                        <Field label="Address" value={app.address_line} />
                        <Field label="City" value={app.city} />
                        <Field label="Post Code" value={app.post_code} />
                    </section>

                    {/* Certification criteria */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <ShieldCheck className="w-4 h-4 text-gray-400" /> Certification Criteria
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-3">
                            <BoolBadge label="Current RBT" value={app.current_rbt} />
                            <BoolBadge label="Current IBT" value={app.current_ibt} />
                            <BoolBadge label="Expired RBT" value={app.expired_rbt} />
                            <BoolBadge label="Expired IBT" value={app.expired_ibt} />
                            <BoolBadge label="Voluntary Inactive RBT" value={app.voluntary_inactive_rbt} />
                            <BoolBadge label="Practicing Behaviour Therapist" value={app.practicing_behavior_therapist} />
                            <BoolBadge label="Behaviour Analyst" value={app.behaviour_analyst} />
                            <BoolBadge label="Other ABA Qualifications" value={app.other_aba_qualifications} />
                        </div>
                        <Field label="RBT Certification No." value={app.rbt_certification_no} />
                        <Field label="IBT Certification No." value={app.ibt_certification_no} />
                    </section>

                    {/* Education */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <GraduationCap className="w-4 h-4 text-gray-400" /> Education
                        </h2>
                        <Field label="Institution" value={app.institution} />
                        <Field label="Period of Education" value={app.period_of_education} />
                        <Field label="Qualifications" value={app.qualifications} />
                    </section>

                    {/* Work experience */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <Briefcase className="w-4 h-4 text-gray-400" /> Work Experience
                        </h2>
                        <Field label="Work Place" value={app.work_place_name} />
                        <Field label="Address" value={app.work_place_address} />
                        <Field label="Designation" value={app.designation} />
                        <Field label="Employment Period" value={app.employment_period} />
                        <Field label="Full / Part Time" value={app.full_time_part_time} />
                        <Field label="Explanation of Services" value={app.explanation_of_services} />
                    </section>
                </div>

                {/* Right column — actions */}
                <div className="space-y-4">
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-4">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
                            <FileText className="w-4 h-4 text-gray-400" /> Decision
                        </h2>

                        {isActionable ? (
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleAction('approve')}
                                    disabled={!!actionLoading}
                                    className="w-full h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                                >
                                    {actionLoading === 'approve'
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <CheckCircle2 className="w-4 h-4" />}
                                    Approve & Add to Directory
                                </button>
                                <button
                                    onClick={() => handleAction('reject')}
                                    disabled={!!actionLoading}
                                    className="w-full h-10 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                                >
                                    {actionLoading === 'reject'
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <XCircle className="w-4 h-4" />}
                                    Reject Application
                                </button>
                                <p className="text-xs text-gray-400 text-center">
                                    Approving will create a therapist record and publish to the directory.
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                This application has already been <strong>{app.review_status}</strong>.
                            </p>
                        )}
                    </section>

                    {/* Contact */}
                    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                        <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                            <Mail className="w-4 h-4 text-gray-400" /> Contact Applicant
                        </h2>
                        <a
                            href={`mailto:${app.email}`}
                            className="text-sm text-[var(--color-primary)] hover:underline"
                        >
                            {app.email}
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                            <Phone className="w-3.5 h-3.5 inline mr-1 text-gray-400" />
                            {app.phone}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
