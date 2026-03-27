import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutHero() {
    return (
        <section className="relative bg-[#f8f9fa] py-24 md:py-32 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E9F3FF] to-transparent skew-x-12 transform origin-top-right pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-[var(--color-secondary)]/5 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4 md:px-6 z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-tight">
                        The Behaviour Analysis <br />Registration Board
                    </h1>

                    <p className="text-lg md:text-xl font-semibold text-[var(--color-secondary)] mb-6 uppercase tracking-wider">
                        Setting the standard. Protecting the public. Empowering the profession.
                    </p>

                    <p className="text-xl leading-relaxed text-gray-700 font-light mb-10 max-w-3xl mx-auto">
                        Founded in 2023, the Behaviour Analysis Registration Board (BARB) is Sri Lanka’s regulatory body for behaviour therapy.
                    </p>

                    <Button asChild size="lg" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white shadow-xl h-14 px-8 text-lg font-semibold">
                        <Link href="/certification/apply">Become Certified</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
