import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Certification", href: "/certification" },
    { label: "Training", href: "/training" },
    { label: "Directory", href: "/directory" },
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex py-5 md:py-6 items-center justify-between px-4 md:px-6">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="BARB Logo"
                        width={240}
                        height={80}
                        className="h-16 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-base font-medium text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Menu Trigger */}
                <div className="flex items-center gap-4">
                    <Button asChild className="hidden md:inline-flex bg-[var(--color-accent)] text-white hover:bg-[#b0902b]">
                        <Link href="/certification/apply">Apply for Certification</Link>
                    </Button>
                    <MobileNav items={navItems} />
                </div>
            </div>
        </header>
    );
}
