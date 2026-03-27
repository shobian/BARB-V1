import { User } from "lucide-react";
import Image from "next/image";

// Static data based on provided copy
const members = [
    {
        id: "1",
        name: "Dr. Anton James",
        role: "President",
        credentials: "PhD, FBPsS, CPsychol, CSci, CEA, BCBA, IBA",
        bio: "Dr. Anton James introduced certified behaviour therapy to Sri Lanka and established the country’s first ABA-based school for children with additional needs, The Tree House International, run by certified Behaviour Therapists and Behaviour Analysts. A leader in Applied Behaviour Analysis with over 20 years of global experience, he is the first professional from Sri Lanka to be certified as a Behaviour Analyst by the Behaviour Analyst Certification Board. He is also certified as a Behaviour Analyst in Ontario and the United Kingdom. He serves as a Professional Advisory Board Member for the International Behaviour Analysis Organisation and is a Subject Matter Expert in Applied Behaviour Analysis, contributing to the development of pre-approved ABA curricula for institutions worldwide. He is a Chartered Behavioural Psychologist, a Chartered Scientist, and a Chartered Educational Assessor.",
        image: "/Dr. Anton.jpeg",
        imageClassName: "object-cover object-top"
    },
    {
        id: "2",
        name: "Chrystal (CJ) Honsaker",
        role: "Secretary",
        credentials: "BCBA | IBA | LBA | MEd | PhD Candidate",
        bio: "Chrystal (CJ) Honsaker is a Behavior Analyst with over 23 years of experience in Applied Behavior Analysis (ABA). She has directed regional ABA programs, supervised clinical teams, and trained emerging behavior analysts, with a strong emphasis on ethical, data-driven service delivery and professional accountability. Her expertise in International Psychology, specializing in Organizations and Systems, informs her work in strengthening regulatory frameworks and developing sustainable behavioral service systems.",
        image: "/Chrystal (CJ) Honsaker.jpeg",
        imageClassName: "object-cover object-top"
    },
    {
        id: "3",
        name: "Samantha Fernando",
        role: "Treasurer",
        credentials: "RBT, IBT, MSC APPLIED PSYCHOLOGY",
        bio: "Samantha is a highly qualified advocate and Co Founder of a multidisciplinary centre for children with developmental disabilities, including autism, called Reach Beyond. She is a Registered Behaviour Technician (USA) and an International Behaviour Therapist specialising in autism and ADHD. She has over 15 years of experience working with children with special needs and is the mother of a son on the autism spectrum. Her pioneering work in Sri Lanka includes launching the nation’s first trilingual disability parent support group in 2016 and organising the first ABA awareness conference in 2007. Samantha is deeply committed to promoting societal acceptance and inclusion in both life and work for all persons.",
        image: "/Samantha Profile Photo.jpeg",
        imageClassName: "object-cover scale-[1.7] translate-y-1"
    }
];

export function BoardSection() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-[var(--color-primary)] mb-4">Meet the Professionals Guiding BARB’s Vision</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Our leadership combines international expertise with local insight ensuring our standards align with global benchmarks while staying culturally relevant and community-responsive.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member) => (
                        <div key={member.id} className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-[var(--color-primary)]/20 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                            <div className="flex flex-col items-center text-center mb-6 min-h-[230px]">
                                <div className="w-24 h-24 rounded-full bg-gray-50 border-4 border-white shadow-md flex items-center justify-center text-gray-400 group-hover:border-[var(--color-secondary)] transition-colors mb-4 overflow-hidden relative">
                                    {member.image ? (
                                        <Image src={member.image} alt={member.name} fill className={member.imageClassName || "object-cover"} />
                                    ) : (
                                        <User className="w-10 h-10" />
                                    )}
                                </div>
                                <h3 className="font-bold text-xl text-[var(--color-primary)] mb-1">{member.name}</h3>
                                <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-secondary)] mb-2">{member.role}</p>
                                <div className="bg-blue-50 px-3 py-1 rounded-full mt-auto">
                                    <p className="text-[10px] font-semibold text-blue-800 uppercase tracking-tight text-center leading-tight">
                                        {member.credentials}
                                    </p>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-6">
                                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
