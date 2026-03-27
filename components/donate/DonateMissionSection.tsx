import { CheckCircle2, HeartHandshake } from "lucide-react";

export function DonateMissionSection() {
    const missions = [
        "Regulate a growing field",
        "Train and certify ethical professionals",
        "Protect families through credible, science-backed care"
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-bold uppercase tracking-widest mb-6">
                            Why Support BARB
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-tight">
                            With Your Help, We Can Do More
                        </h2>
                        <div className="prose prose-lg text-gray-700 leading-relaxed mb-8">
                            <p className="mb-4">
                                BARB is a not-for-profit organisation working to regulate the field of behaviour therapy and expand access to qualified, certified professionals. We don’t sell services. We raise standards, train therapists, and protect families.
                            </p>
                            <p>
                                With your help, we can do more; reach more districts, educate more parents, and certify more professionals. As Sri Lanka’s regulatory body for behaviour therapy, we rely on partnerships, donations, and sponsorships to deliver on a bold, necessary mission:
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {missions.map((mission, index) => (
                                <li key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-[var(--color-secondary)]" />
                                    </div>
                                    <span className="text-gray-900 font-bold">{mission}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-[var(--color-primary)] flex items-center justify-center p-12">
                            {/* Abstract Pattern */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                            <div className="text-center relative z-10">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                    <HeartHandshake className="w-12 h-12 text-[var(--color-secondary)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">A Shared Mission</h3>
                                <p className="text-blue-100 max-w-xs mx-auto">
                                    Raising standards, training therapists, and protecting families together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
