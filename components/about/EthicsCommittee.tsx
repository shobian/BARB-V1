import { FileText, Gavel, Scale, ShieldAlert } from "lucide-react";

export function EthicsCommittee() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    <div className="lg:w-1/2">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-6">Governance</div>
                        <h2 className="text-3xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-tight">
                            BARB’s Ethics Committee
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            The Ethics Committee of the Behaviour Analysis Registration Board (BARB) plays a vital role in maintaining the highest standards of professionalism, fairness, and ethical conduct within the field of behaviour therapy.
                        </p>
                        <p className="text-gray-600 leading-relaxed opacity-80">
                            The committee operates under a clear mandate to protect the public and preserve trust in the profession. Its members are appointed based on their expertise in behaviour therapy, psychology, ethics, law, or related disciplines.
                        </p>

                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center">
                            <span className="text-sm font-semibold text-gray-500 italic"> Committee Members To be Appointed Soon</span>
                        </div>
                    </div>

                    <div className="lg:w-1/2 bg-[var(--color-primary)] text-white p-8 md:p-12 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                            <Scale className="w-6 h-6 text-[#C1A033]" />
                            Key Responsibilities
                        </h3>

                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <ShieldAlert className="w-5 h-5 text-[#C1A033]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-80 mb-1">Review</h4>
                                    <p className="text-blue-100 text-sm leading-relaxed">Reviewing ethical complaints and concerns raised by clients, families, or institutions.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 text-[#C1A033]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-80 mb-1">Enforce</h4>
                                    <p className="text-blue-100 text-sm leading-relaxed">Ensuring certified professionals adhere to BARB’s Code of Ethics.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Gavel className="w-5 h-5 text-[#C1A033]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-80 mb-1">Support</h4>
                                    <p className="text-blue-100 text-sm leading-relaxed">Supporting transparency, due process, and impartial decision-making.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
