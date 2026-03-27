import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[var(--color-primary)] text-white mt-auto">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/logo-white.png"
                                alt="BARB Logo"
                                width={300}
                                height={100}
                                className="h-15 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            The Behaviour Analysis Registration Board (BARB)
                            is Sri Lanka’s body regulating and certifying
                            behaviour therapy professionals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--color-accent)]">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/certification" className="hover:text-white">Certification</Link></li>
                            <li><Link href="/training" className="hover:text-white">Training</Link></li>
                            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
                        </ul>
                    </div>

                    {/* Resources & Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--color-accent)]">Information</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="/therapy" className="hover:text-white">About Therapy</Link></li>
                            <li><Link href="/directory" className="hover:text-white">Therapist Directory</Link></li>
                            <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Partnerships */}
                    <div>
                        <h4 className="font-semibold mb-4 text-[var(--color-accent)]">Legal & Partnerships</h4>
                        <ul className="space-y-2 text-sm text-gray-300 mb-6">
                            <li><a href="/IBAO-Ethical-Guidelines-V100.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white">Ethical Standards</a></li>
                            <li><Link href="/legal/terms" className="hover:text-white">Terms & Conditions</Link></li>
                        </ul>

                        <div className="pt-4 border-t border-gray-700/50">
                            <p className="text-xs text-gray-300 font-medium mb-3 leading-tight">
                                Proudly collaborating with the International Behavior Analysis Organization (IBAO).
                            </p>
                            <Image
                                src="/IBAO logo.png"
                                alt="IBAO Logo"
                                width={100}
                                height={50}
                                className="w-24 h-auto object-contain bg-white/10 rounded pt-1 pb-1 pl-2 pr-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-xs text-gray-400">
                    <p className="mb-2">© {new Date().getFullYear()} Behaviour Analysis Registration Board of Sri Lanka. All rights reserved.</p>
                    <p>
                        Developed by <a href="https://www.semantixlabs.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline">Semantix Labs (Pvt) Ltd</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
