"use client";

import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function DirectorySearch({
    cities = [],
    specialities = []
}: {
    cities?: string[];
    specialities?: string[];
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    const handleFilter = useDebouncedCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    const handleStatusFilter = (status: string) => {
        const params = new URLSearchParams(searchParams);
        if (status && status !== 'all') {
            params.set('status', status);
        } else {
            params.delete('status');
        }
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const currentStatus = searchParams.get('status') || 'all';

    return (
        <div className="relative max-w-4xl mx-auto mb-8">
            {/* Main Universal Search */}
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name or general keywords..."
                    className="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-transparent transition-all text-base"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </div>

            {/* Specific Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-transparent transition-all text-sm appearance-none bg-white cursor-pointer"
                        onChange={(e) => handleFilter('city', e.target.value)}
                        defaultValue={searchParams.get('city')?.toString() || ""}
                    >
                        <option value="">All Cities</option>
                        {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-transparent transition-all text-sm appearance-none bg-white cursor-pointer"
                        onChange={(e) => handleFilter('speciality', e.target.value)}
                        defaultValue={searchParams.get('speciality')?.toString() || ""}
                    >
                        <option value="">All Specialities</option>
                        {specialities.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Status (Certification) Filter Container */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-600 mr-2">Filter by Certification:</span>

                <button
                    onClick={() => handleStatusFilter('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${currentStatus === 'all'
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => handleStatusFilter('authorized')}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors border ${currentStatus === 'authorized'
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <span className={`w-2 h-2 rounded-full ${currentStatus === 'authorized' ? 'bg-white' : 'bg-[var(--color-primary)]'}`} />
                    Active
                </button>

                <button
                    onClick={() => handleStatusFilter('unauthorized')}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors border ${currentStatus === 'unauthorized'
                        ? 'bg-[#EAB308] text-white border-[#EAB308]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <span className={`w-2 h-2 rounded-full ${currentStatus === 'unauthorized' ? 'bg-white' : 'bg-[#EAB308]'}`} />
                    Inactive
                </button>

                <button
                    onClick={() => handleStatusFilter('approved')}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors border ${currentStatus === 'approved'
                        ? 'bg-[#EAB308] text-white border-[#EAB308]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <span className={`w-2 h-2 rounded-full ${currentStatus === 'approved' ? 'bg-white' : 'bg-[#EAB308]'}`} />
                    Approved Professionals
                </button>
            </div>
        </div>
    );
}
