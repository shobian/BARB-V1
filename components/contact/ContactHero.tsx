export function ContactHero() {
    return (
        <section className="relative bg-[#f8f9fa] py-24 md:py-32 overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E9F3FF] to-transparent skew-x-12 transform origin-top-right pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-[var(--color-secondary)]/5 rounded-full blur-3xl opacity-50" />

            <div className="container relative mx-auto px-4 md:px-6 text-center z-10">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Let’s build a better standard of care together.
                    </h1>

                    <p className="text-xl md:text-2xl font-light text-[var(--color-primary)]/80 max-w-3xl mx-auto mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        Whether you're a therapist with a question, a parent looking for guidance, or a partner ready to collaborate, you're in the right place.
                    </p>

                    <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        The Behaviour Analysis Registration Board (BARB) is committed to transparency, accountability, and accessibility. We welcome your enquiries, ideas, and feedback.
                    </p>

                    <div className="mt-8 pt-8 border-t border-[var(--color-primary)]/10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                        <p className="font-medium text-gray-900">
                            If you’re unsure where to start, send us a message anyway; we’ll help you find your way.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            * We aim to respond within 3-5 business days.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
