'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { Loader2, ChevronRight, Search, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface ApplicationRow {
    id: string;
    first_name: string;
    surname: string;
    email: string;
    city: string | null;
    designation: string | null;
    review_status: 'pending' | 'approved' | 'rejected';
    submitted_at: string;
}

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Not Approved' },
] as const;

const STATUS_STYLES: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    approved: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
    pending: <Clock className="w-3.5 h-3.5" />,
    approved: <CheckCircle2 className="w-3.5 h-3.5" />,
    rejected: <XCircle className="w-3.5 h-3.5" />,
};

function StatusDropdown({
    appId,
    current,
    token,
    onUpdated,
}: {
    appId: string;
    current: string;
    token: string;
    onUpdated: (id: string, newStatus: string) => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleChange = async (newStatus: string) => {
        if (newStatus === current) return;
        setLoading(true);
        const res = await fetch(`/api/admin/applications/${appId}/status`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        setLoading(false);
        if (res.ok) {
            onUpdated(appId, newStatus);
        } else {
            const { error } = await res.json();
            alert(`Failed to update status: ${error}`);
        }
    };

    return (
        <div className="relative flex items-center gap-2">
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-400 shrink-0" />}
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[current] ?? ''}`}>
                {STATUS_ICONS[current]}
                <select
                    value={current}
                    disabled={loading}
                    onChange={(e) => handleChange(e.target.value)}
                    className="bg-transparent border-none outline-none cursor-pointer text-xs font-medium appearance-none pr-1"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default function AdminDashboard() {
    const [applications, setApplications] = useState<ApplicationRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [token, setToken] = useState('');

    useEffect(() => {
        const load = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const t = session?.access_token ?? '';
            setToken(t);

            const res = await fetch('/api/admin/applications', {
                headers: { Authorization: `Bearer ${t}` },
            });
            const json = await res.json();
            if (res.ok) setApplications(json.data ?? []);
            else setError(json.error ?? 'Failed to load');
            setLoading(false);
        };
        load();
    }, []);

    const handleStatusUpdated = useCallback((id: string, newStatus: string) => {
        setApplications((prev) =>
            prev.map((a) => a.id === id ? { ...a, review_status: newStatus as ApplicationRow['review_status'] } : a)
        );
    }, []);

    const filtered = applications.filter((a) => {
        const matchStatus = statusFilter === 'all' || a.review_status === statusFilter;
        const q = search.toLowerCase();
        const matchSearch = !q ||
            `${a.first_name} ${a.surname}`.toLowerCase().includes(q) ||
            a.email.toLowerCase().includes(q) ||
            (a.city ?? '').toLowerCase().includes(q);
        return matchStatus && matchSearch;
    });

    const counts = {
        all: applications.length,
        pending: applications.filter((a) => a.review_status === 'pending').length,
        approved: applications.filter((a) => a.review_status === 'approved').length,
        rejected: applications.filter((a) => a.review_status === 'rejected').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {counts.all} total · <span className="text-yellow-700">{counts.pending} pending</span>
                        {counts.approved > 0 && <> · <span className="text-green-700">{counts.approved} approved</span></>}
                    </p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {[
                    { key: 'all', label: 'All', count: counts.all },
                    { key: 'pending', label: 'Pending', count: counts.pending },
                    { key: 'approved', label: 'Approved', count: counts.approved },
                    { key: 'rejected', label: 'Not Approved', count: counts.rejected },
                ].map(({ key, label, count }) => (
                    <button
                        key={key}
                        onClick={() => setStatusFilter(key)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            statusFilter === key
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {label} <span className="opacity-60 ml-1">({count})</span>
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search name, email, city…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                />
            </div>

            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold">Applicant</th>
                                <th className="text-left px-5 py-3 font-semibold">City</th>
                                <th className="text-left px-5 py-3 font-semibold">Designation</th>
                                <th className="text-left px-5 py-3 font-semibold">Submitted</th>
                                <th className="text-left px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-14 text-gray-400">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <p className="font-semibold text-gray-900">
                                                {app.first_name} {app.surname}
                                            </p>
                                            <p className="text-gray-400 text-xs mt-0.5">{app.email}</p>
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-600">{app.city ?? '—'}</td>
                                        <td className="px-5 py-3.5 text-gray-600 max-w-[180px] truncate">
                                            {app.designation ?? '—'}
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                                            {new Date(app.submitted_at).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <StatusDropdown
                                                appId={app.id}
                                                current={app.review_status}
                                                token={token}
                                                onUpdated={handleStatusUpdated}
                                            />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <Link
                                                href={`/admin/applications/${app.id}`}
                                                className="flex items-center gap-1 text-[var(--color-primary)] text-xs font-medium hover:underline whitespace-nowrap"
                                            >
                                                View <ChevronRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
