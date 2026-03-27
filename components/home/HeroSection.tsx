import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative w-full bg-[#f8f9fa] pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden flex items-center min-h-[70vh]">
            {/* Modern Abstract Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-blue-50/50 to-blue-100/30" />

            {/* Decorative Blur Circles */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] pointer-events-none z-0" />

            <div className="container relative mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left side text content */}
                    <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <div className="text-[var(--color-secondary)] text-sm font-semibold mb-4 text-center lg:text-left uppercase tracking-widest">
                            Sri Lanka’s Regulatory Body
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-[1.15] tracking-tight">
                            The Behaviour Analysis <br className="hidden lg:block" />
                            Registration Board
                        </h1>

                        <p className="text-lg md:text-xl font-medium text-[var(--color-secondary)] mb-6 uppercase tracking-widest opacity-90">
                            Raising the standard of behaviour therapy in Sri Lanka
                        </p>

                        <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
                            The Behaviour Analysis Registration Board (BARB) is Sri Lanka’s regulatory body for behaviour therapy: certifying, guiding, and safeguarding professionals who transform lives through ethical, evidence-based care.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Button asChild size="lg" className="min-w-[200px] h-14 text-lg font-semibold shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 rounded-full">
                                <Link href="/certification/apply">Become Certified</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="min-w-[200px] h-14 text-lg font-semibold hover:-translate-y-1 transition-all duration-300 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5">
                                <Link href="/directory">Find a Therapist</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right side image */}
                    <div className="flex-1 w-full max-w-2xl lg:max-w-none animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                        <div className="relative aspect-[4/3] lg:aspect-square xl:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-white/20 backdrop-blur-sm">
                            <Image
                                src="/BARB Homepage Background - Edited.jpg"
                                alt="BARB Homepage Header Background"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
