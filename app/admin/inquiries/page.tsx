'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2, Search, Mail, Phone, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    inquiry_type: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    created_at: string;
}

const STATUS_STYLES: Record<string, string> = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    read: 'bg-gray-50 text-gray-600 border-gray-200',
    replied: 'bg-green-50 text-green-700 border-green-200',
    archived: 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

const STATUS_OPTIONS = [
    { value: 'new', label: 'New' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' },
    { value: 'archived', label: 'Archived' },
];

const TYPE_COLORS: Record<string, string> = {
    Certification: 'bg-purple-50 text-purple-700',
    Training: 'bg-indigo-50 text-indigo-700',
    Donation: 'bg-emerald-50 text-emerald-700',
    Collaboration: 'bg-sky-50 text-sky-700',
    Complaints: 'bg-red-50 text-red-700',
    General: 'bg-gray-100 text-gray-600',
    Other: 'bg-orange-50 text-orange-700',
};

function StatusDropdown({
    inquiryId,
    current,
    token,
    onUpdated,
}: {
    inquiryId: string;
    current: string;
    token: string;
    onUpdated: (id: string, status: string) => void;
}) {
    const [loading, setLoading] = useState(false);

    const handleChange = async (newStatus: string) => {
        if (newStatus === current) return;
        setLoading(true);
        const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });
        setLoading(false);
        if (res.ok) onUpdated(inquiryId, newStatus);
    };

    return (
        <div className="flex items-center gap-1.5">
            {loading && <Loader2 className="w-3 h-3 animate-spin text-gray-400 shrink-0" />}
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${STATUS_STYLES[current] ?? ''}`}>
                <select
                    value={current}
                    disabled={loading}
                    onChange={(e) => handleChange(e.target.value)}
                    className="bg-transparent border-none outline-none cursor-pointer text-xs font-medium appearance-none"
                >
                    {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

function InquiryRow({
    inquiry,
    token,
    onUpdated,
}: {
    inquiry: Inquiry;
    token: string;
    onUpdated: (id: string, status: string) => void;
}) {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded((v) => !v);
        // Auto-mark as read when opened
        if (!expanded && inquiry.status === 'new') {
            onUpdated(inquiry.id, 'read');
            fetch(`/api/admin/inquiries/${inquiry.id}`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'read' }),
            });
        }
    };

    return (
        <>
            <tr
                className={`hover:bg-gray-50/60 transition-colors cursor-pointer ${inquiry.status === 'new' ? 'bg-blue-50/30' : ''}`}
                onClick={handleExpand}
            >
                <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                        {inquiry.status === 'new' && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                        <div>
                            <p className={`font-semibold text-gray-900 ${inquiry.status === 'new' ? 'font-bold' : ''}`}>
                                {inquiry.name}
                            </p>
                            <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {inquiry.email}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-3.5">
                    {inquiry.phone ? (
                        <span className="text-gray-600 text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {inquiry.phone}
                        </span>
                    ) : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_COLORS[inquiry.inquiry_type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {inquiry.inquiry_type}
                    </span>
                </td>
                <td className="px-5 py-3.5 max-w-[220px]">
                    <p className="text-gray-500 text-sm truncate">{inquiry.message || '—'}</p>
                </td>
                <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(inquiry.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                    })}
                </td>
                <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <StatusDropdown
                        inquiryId={inquiry.id}
                        current={inquiry.status}
                        token={token}
                        onUpdated={onUpdated}
                    />
                </td>
                <td className="px-4 py-3.5 text-gray-400">
                    {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </td>
            </tr>
            {expanded && (
                <tr className="bg-blue-50/20 border-b border-blue-100">
                    <td colSpan={7} className="px-8 py-5">
                        <div className="flex items-start gap-3 mb-2">
                            <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Message</p>
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    {inquiry.message || '(no message provided)'}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-3">
                            <a
                                href={`mailto:${inquiry.email}?subject=Re: Your ${inquiry.inquiry_type} inquiry to BARB`}
                                className="text-xs font-medium text-[var(--color-primary)] bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Mail className="w-3.5 h-3.5" /> Reply via Email
                            </a>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [token, setToken] = useState('');

    useEffect(() => {
        const load = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const t = session?.access_token ?? '';
            setToken(t);

            const res = await fetch('/api/admin/inquiries', {
                headers: { Authorization: `Bearer ${t}` },
            });
            const json = await res.json();
            if (res.ok) setInquiries(json.data ?? []);
            else setError(json.error ?? 'Failed to load');
            setLoading(false);
        };
        load();
    }, []);

    const handleUpdated = useCallback((id: string, status: string) => {
        setInquiries((prev) =>
            prev.map((i) => i.id === id ? { ...i, status: status as Inquiry['status'] } : i)
        );
    }, []);

    const uniqueTypes = Array.from(new Set(inquiries.map((i) => i.inquiry_type)));

    const filtered = inquiries.filter((i) => {
        const matchStatus = statusFilter === 'all' || i.status === statusFilter;
        const matchType = typeFilter === 'all' || i.inquiry_type === typeFilter;
        const q = search.toLowerCase();
        const matchSearch = !q ||
            i.name.toLowerCase().includes(q) ||
            i.email.toLowerCase().includes(q) ||
            (i.message ?? '').toLowerCase().includes(q);
        return matchStatus && matchType && matchSearch;
    });

    const counts = {
        all: inquiries.length,
        new: inquiries.filter((i) => i.status === 'new').length,
        read: inquiries.filter((i) => i.status === 'read').length,
        replied: inquiries.filter((i) => i.status === 'replied').length,
        archived: inquiries.filter((i) => i.status === 'archived').length,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {counts.all} total
                        {counts.new > 0 && <> · <span className="text-blue-700 font-semibold">{counts.new} new</span></>}
                        {counts.replied > 0 && <> · <span className="text-green-700">{counts.replied} replied</span></>}
                    </p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
                {[
                    { key: 'all', label: 'All', count: counts.all },
                    { key: 'new', label: 'New', count: counts.new },
                    { key: 'read', label: 'Read', count: counts.read },
                    { key: 'replied', label: 'Replied', count: counts.replied },
                    { key: 'archived', label: 'Archived', count: counts.archived },
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

            {/* Search + type filter */}
            <div className="flex flex-wrap gap-3">
                <div className="relative max-w-sm flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search name, email, message…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                    />
                </div>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 bg-white"
                >
                    <option value="all">All Topics</option>
                    {uniqueTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="text-left px-5 py-3 font-semibold">Sender</th>
                                <th className="text-left px-5 py-3 font-semibold">Phone</th>
                                <th className="text-left px-5 py-3 font-semibold">Topic</th>
                                <th className="text-left px-5 py-3 font-semibold">Message</th>
                                <th className="text-left px-5 py-3 font-semibold">Date</th>
                                <th className="text-left px-5 py-3 font-semibold">Status</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-14 text-gray-400">
                                        No inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((inquiry) => (
                                    <InquiryRow
                                        key={inquiry.id}
                                        inquiry={inquiry}
                                        token={token}
                                        onUpdated={handleUpdated}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
