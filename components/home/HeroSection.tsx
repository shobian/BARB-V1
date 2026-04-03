import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative w-full min-h-[85vh] xl:min-h-[80vh] flex items-center overflow-hidden bg-white">
            {/* Full-width background image, centered to show all subjects */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/BARB Homepage Background - Edited.jpg"
                    alt="BARB Homepage Header Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>

            {/* Uniform faded overlay across the full width */}
            <div className="absolute inset-0 z-0 bg-white/55" />

            {/* Decorative Overlay Gradient (giving it that premium colorful feel) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-blue-100/40 via-blue-50/20 to-transparent mix-blend-multiply" />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-24 pb-20 md:pt-32 md:pb-32">
                <div className="max-w-2xl lg:max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="text-[var(--color-secondary)] text-sm font-semibold mb-6 uppercase tracking-widest inline-block px-4 py-1.5 bg-[var(--color-secondary)]/10 rounded-full backdrop-blur-sm">
                        Sri Lanka’s Regulatory Body
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-[1.15] tracking-tight drop-shadow-sm">
                        The Behaviour Analysis <br />
                        Registration Board
                    </h1>

                    <p className="text-lg md:text-xl font-medium text-[var(--color-secondary)] mb-6 uppercase tracking-widest opacity-90">
                        Raising the standard of behaviour therapy in Sri Lanka
                    </p>

                    <p className="text-lg text-gray-700 mb-10 leading-relaxed font-light max-w-2xl mx-auto drop-shadow-sm bg-white/40 backdrop-blur-[2px] rounded-xl p-4">
                        The Behaviour Analysis Registration Board (BARB) is Sri Lanka’s regulatory body for behaviour therapy: certifying, guiding, and safeguarding professionals who transform lives through ethical, evidence-based care.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Button asChild size="lg" className="min-w-[200px] h-14 text-lg font-semibold shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 rounded-full">
                            <Link href="/certification/apply">Become Certified</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="min-w-[200px] h-14 text-lg font-semibold hover:-translate-y-1 transition-all duration-300 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-white/60 backdrop-blur-md hover:bg-white/90">
                            <Link href="/directory">Find a Therapist</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
