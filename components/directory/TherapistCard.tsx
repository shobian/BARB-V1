import { MapPin, BadgeCheck, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Therapist {
    id: string;
    full_name: string;
    designation: string | null;
    registration_number: string | null;
    work_place_address: string | null;
    city: string | null;
    profile_image_url: string | null;
    bio: string | null;
    status: string;
}

export function TherapistCard({ therapist }: { therapist: Therapist }) {
    // Determine badge text and color based on status
    let badgeText = "Unknown Status";
    let badgeColorClass = "bg-gray-500/20 text-gray-200 border-gray-400"; // fallback

    if (therapist.status === "authorized_active") {
        badgeText = "Active";
        badgeColorClass = "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/50";
    } else if (therapist.status === "unauthorized_inactive") {
        badgeText = "Inactive";
        badgeColorClass = "bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/50";
    } else if (therapist.status === "approved_non_certified") {
        badgeText = "Approved Professional";
        badgeColorClass = "bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/50";
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group">
            {/* Header / Banner */}
            <div className={`h-24 bg-gradient-to-r ${therapist.status === 'unauthorized_inactive' ? 'from-[#EAB308]/80 to-[#EAB308]' : 'from-[var(--color-primary)] to-[#1a3a61]'} relative`}>
                <div className={`absolute top-4 right-4 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold border ${badgeColorClass} shadow-sm flex items-center gap-1.5 bg-white`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${therapist.status === 'authorized_active' ? 'bg-[var(--color-primary)]' : 'bg-[#EAB308]'} animate-pulse`} />
                    {badgeText}
                </div>
            </div>

            {/* Profile Image & Info */}
            <div className="px-6 relative flex-grow">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md -mt-12 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {therapist.profile_image_url ? (
                        <img src={therapist.profile_image_url} alt={therapist.full_name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-2xl font-bold text-gray-300">{therapist.full_name.charAt(0)}</span>
                    )}
                </div>

                <div className="mt-4 mb-6">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] flex items-center gap-2">
                        {therapist.full_name}
                        <BadgeCheck className="w-5 h-5 text-[var(--color-secondary)]" />
                    </h3>
                    <p className="text-[var(--color-secondary)] font-medium text-sm mb-1">{therapist.designation}</p>
                    {therapist.registration_number && (
                        <p className="text-xs text-gray-400 font-mono mb-4">Reg: {therapist.registration_number}</p>
                    )}

                    {therapist.work_place_address && (
                        <div className="flex items-start gap-2 text-gray-500 text-sm mb-3">
                            <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                            <span>
                                {[therapist.work_place_address, therapist.city].filter(Boolean).join(', ')}
                            </span>
                        </div>
                    )}

                    {therapist.bio && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {therapist.bio}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer / Actions */}
            <div className="p-6 border-t border-gray-50 mt-auto bg-gray-50/50">
                <Button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-[var(--color-primary)] hover:border-blue-100 transition-colors shadow-sm" asChild>
                    <a href={`mailto:contact@btrb.lk?subject=Inquiry for ${therapist.full_name}`}>
                        <Mail className="w-4 h-4 mr-2 text-[var(--color-secondary)]" />
                        Contact Therapist
                    </a>
                </Button>
            </div>
        </div>
    );
}
