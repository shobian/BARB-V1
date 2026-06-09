import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="hero-bg relative w-full min-h-[85vh] xl:min-h-[80vh] flex items-center overflow-hidden">
            {/* Subtle gold radial glow */}
            <div className="hero-glow absolute inset-0 z-0" />

            {/* Decorative gold orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="hero-orb-top" />
                <div className="hero-orb-bottom" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-24 pb-20 md:pt-32 md:pb-32">
                <div className="max-w-2xl lg:max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    {/* Badge */}
                    <div className="text-[#C1A033] text-sm font-semibold mb-6 uppercase tracking-widest inline-block px-4 py-1.5 rounded-full border border-[#C1A033]/40 bg-[#C1A033]/10">
                        Sri Lanka&apos;s Regulatory Body
                    </div>

                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-heading text-white mb-6 leading-[1.15] tracking-tight">
                        The Behaviour Analysis <br />
                        Registration Board
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl font-medium text-[#C1A033] mb-6 uppercase tracking-widest">
                        Raising the standard of behaviour therapy in Sri Lanka
                    </p>

                    {/* Body copy */}
                    <p className="text-lg text-blue-100 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
                        The Behaviour Analysis Registration Board (BARB) is Sri Lanka&apos;s regulatory body for behaviour therapy: certifying, guiding, and safeguarding professionals who transform lives through ethical, evidence-based care.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Button asChild size="lg" className="min-w-[200px] h-14 text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-full bg-[#C1A033] hover:bg-[#d4b347] text-[#0A1E3B] border-0">
                            <Link href="/certification/apply">Become Certified</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="min-w-[200px] h-14 text-lg font-semibold hover:-translate-y-1 transition-all duration-300 rounded-full border-2 border-white/60 text-white bg-white/10 hover:bg-white/20">
                            <Link href="/directory">Find a Therapist</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
