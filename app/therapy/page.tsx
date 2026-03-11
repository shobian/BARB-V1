import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'About Behaviour Therapy - BARB',
    description: "Behaviour therapy, explained. Learn about the science-backed approach to helping individuals develop meaningful skills and reduce behaviours that interfere with daily life.",
}

export default function AboutTherapyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-[#f8f9fa] py-24 md:py-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-transparent pointer-events-none" />
                <div className="container relative mx-auto px-4 md:px-6 z-10 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-[var(--color-primary)] mb-6 leading-tight tracking-tight">
                            BEHAVIOUR THERAPY, EXPLAINED.
                        </h1>
                    </div>
                </div>
            </section>

            {/* Section 1 - What is Behaviour Therapy? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">What is Behaviour Therapy?</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-4">
                            Behaviour therapy is the professional application of the science of Applied Behaviour Analysis (ABA) delivered by certified and regulated practitioners.
                        </p>
                        <p className="mb-6">
                            It ensures that professionals practising behaviour therapy meet defined minimum standards of qualification, supervised experience, competence, and successful completion of recognised examinations. Practitioners must comply with established ethical standards and maintain ongoing continuing professional development.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 2 - What is ABA? */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">What is Applied Behaviour Analysis?</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-4">
                            Applied Behaviour Analysis is a scientific discipline devoted to the study of behaviour and the environmental variables that influence it. It is grounded in decades of experimental and applied research in the science of learning and behaviour.
                        </p>
                        <p className="mb-4">
                            Since the mid twentieth century, behaviour analytic research has produced a large body of peer reviewed evidence demonstrating effective methods for teaching skills, increasing adaptive behaviour, and reducing behaviours that interfere with learning and quality of life. The discipline is characterised by systematic measurement, data-based decision making, functional assessment, and conceptual consistency.
                        </p>
                        <p className="mb-4 font-medium text-[var(--color-primary)]">
                            Applied Behaviour Analysis is recognised internationally as a research driven and evidence-based field with strong methodological standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3 - What Criteria Must an Approach Meet to Be Considered ABA? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">What Criteria Must an Approach Meet to Be Considered ABA?</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-8">
                            For an intervention to be classified as Applied Behaviour Analysis, it must meet the seven defining dimensions of the field:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Applied", desc: "Targets behaviour of clear social significance." },
                                { title: "Behavioural", desc: "Uses objective, observable, and measurable definitions of behaviour." },
                                { title: "Analytic", desc: "Demonstrates a functional relationship between the intervention and behaviour change." },
                                { title: "Technological", desc: "Procedures are described clearly enough for replication by a competent practitioner." },
                                { title: "Conceptually Systematic", desc: "Interventions are consistent with established behavioural principles." },
                                { title: "Effective", desc: "Produces meaningful and practical behaviour change." },
                                { title: "Generality", desc: "Behaviour change maintains over time and across settings." }
                            ].map((item, index) => (
                                <div key={index} className="bg-[#f8f9fa] p-5 rounded-xl border border-gray-100 shadow-sm">
                                    <h3 className="font-bold text-[var(--color-secondary)] mb-2 text-lg">{item.title}</h3>
                                    <p className="text-gray-700 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4 - Quality Criterion */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">Quality Criterion</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <div className="bg-white p-6 rounded-xl border-l-4 border-[var(--color-secondary)] shadow-sm">
                            <p className="text-lg">
                                All ABA practice must also demonstrate social validity. Goals, methods, and outcomes must be acceptable, ethically sound, and meaningful to the individual and relevant stakeholders.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5 - How ABA is practised? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">How ABA is practised?</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-6">
                            ABA is heavily based on research and requires a rigorous, data-driven approach. It involves:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[var(--color-secondary)] mb-2">Precise Assessment</h3>
                                <p className="text-sm">Identifying the function of a behaviour.</p>
                            </div>
                            <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[var(--color-secondary)] mb-2">Planned Intervention</h3>
                                <p className="text-sm">Developing specific strategies for change.</p>
                            </div>
                            <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[var(--color-secondary)] mb-2">Continuous Measurement</h3>
                                <p className="text-sm">Objectively tracking progress with data.</p>
                            </div>
                            <div className="bg-[#f8f9fa] p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[var(--color-secondary)] mb-2">Data-Based Decision Making</h3>
                                <p className="text-sm">Adjusting interventions based on measured results.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6 - What Can Behaviour Therapy Help With? */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-8 font-heading text-[var(--color-primary)]">What Can Behaviour Therapy Help With?</h2>

                    <p className="text-lg text-gray-700 mb-8">
                        Behaviour therapy has proven effective in treating a wide range of challenges, including:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {[
                            "Autism Spectrum Disorder (ASD)",
                            "Developmental delays",
                            "ADHD and self-regulation difficulties",
                            "Communication and social skills challenges",
                            "Daily living skills",
                            "Aggression, tantrums, or disruptive behaviours",
                            "Academic and learning issues",
                            "Anxiety and avoidance behaviours (in some applications)"
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] flex-shrink-0" />
                                <span className="text-gray-800 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[var(--color-primary)]/5 p-6 rounded-xl border-l-4 border-[var(--color-primary)]">
                        <p className="text-lg text-[var(--color-primary)] font-medium">
                            ABA-based therapy is particularly effective for children and is often used in homes, schools, and clinical settings.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 7 - How Does Behaviour Therapy Work? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">How Does Behaviour Therapy Work?</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Certified behaviour therapists or analysts begin with an assessment to understand what triggers a behaviour and what reinforces it.
                    </p>

                    <p className="text-lg text-gray-700 mb-6 font-medium">They then:</p>

                    <div className="relative border-l-2 border-blue-200 ml-4 md:ml-6 pl-8 py-2 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-sm font-bold shadow-md">1</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Design a personalised intervention plan</h3>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-sm font-bold shadow-md">2</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Use reinforcement to increase desired behaviours</h3>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-sm font-bold shadow-md">3</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Track progress with data</h3>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[var(--color-secondary)] flex items-center justify-center text-white text-sm font-bold shadow-md">4</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Adjust interventions over time for long-term success</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 8 - Why Controversial? */}
            <section className="py-20 bg-[#f8f9fa]">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">Why Do Some People Consider ABA or Behaviour Therapy Controversial?</h2>
                    <div className="prose prose-lg text-gray-700 max-w-none">
                        <p className="mb-4">
                            Concerns largely stem from historical unregulated practice, not from the science of Applied Behaviour Analysis (ABA) itself.
                        </p>
                        <p className="mb-4">
                            In the early development of behavioural interventions during the 1960s and 1970s, some punishment based and poorly regulated practices occurred. At that time, there were no consistent international certification or regulatory standards.
                        </p>
                        <p className="mb-4 font-medium text-[var(--color-primary)]">
                            Modern ABA is grounded in decades of research and operates under formal ethical codes, certification requirements, and increasing regulatory oversight. Current concerns in many regions relate to unregulated practice rather than to the scientific foundations of ABA.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 9 - The Importance of Certification */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold mb-6 font-heading text-[var(--color-primary)]">The Importance of Certification</h2>
                    <p className="text-xl text-gray-700 leading-relaxed font-light mb-6">
                        Because behaviour therapy is a powerful and highly technical professional service, it must be delivered by appropriately trained and qualified practitioners. Unqualified providers may unintentionally cause harm to the public and undermine professional standards in Applied Behaviour Analysis (ABA).
                    </p>
                    <p className="text-xl text-[var(--color-secondary)] font-semibold">
                        That is why the Behaviour Analysis Registration Board Sri Lanka exists: to regulate practice, certify qualified professionals, and protect the public.
                    </p>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24 bg-blue-50 border-t border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
                <div className="container relative mx-auto px-4 md:px-6 z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 text-[var(--color-primary)]">Have Questions or Need Support?</h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
                        Whether you're a parent exploring options or a professional seeking training, we’re here to help you find the answers.
                    </p>
                    <Button asChild size="lg" className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 font-semibold h-14 px-8 text-lg">
                        <Link href="/contact">Get in Touch With Us →</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
