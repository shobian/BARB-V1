"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inquiryType, setInquiryType] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Prepare data for submission
        const data: any = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            inquiry_type: formData.get("inquiry_type") as string,
            message: formData.get("message") as string,
            status: 'new'
        };

        // Add donation specific data if applicable
        if (inquiryType === "Donation") {
            const tier = formData.get("donation_tier") as string;
            const customAmount = formData.get("custom_amount") as string;
            data.message = `[DONATION PLEDGE] Tier: ${tier}${tier === 'Other' ? ` - Custom Amount: ${customAmount}` : ''}\n\nMessage: ${data.message}`;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || 'Failed to send message');
            }

            setSuccess(true);
            setInquiryType(""); // Reset state
            e.currentTarget.reset();
        } catch (err: any) {
            console.error("Submission error:", err);
            setError(err.message || "Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center animate-in fade-in zoom-in duration-500 h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 max-w-sm mx-auto mb-8">
                    Thank you for reaching out. We aim to respond within 3-5 business days.
                </p>
                <Button
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                    onClick={() => setSuccess(false)}
                >
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-bold font-heading text-[var(--color-primary)] mb-4">Send us a Message</h2>
            <p className="text-gray-600 mb-8 text-sm">
                We'd love to hear more about you and what you're looking for! Please provide as much information as possible so we can help you more efficiently.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</label>
                    <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
                        <input
                            required
                            name="phone"
                            type="tel"
                            placeholder="+94 77 123 4567"
                            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="inquiry_type" className="text-sm font-medium text-gray-700">What’s your purpose for contact? *</label>
                    <select
                        required
                        name="inquiry_type"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all bg-white"
                        onChange={(e) => setInquiryType(e.target.value)}
                        value={inquiryType}
                    >
                        <option value="">Select a Topic</option>
                        <option value="Certification">Certification</option>
                        <option value="Training">Training</option>
                        <option value="Donation">Donation</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Complaints">Complaints</option>
                        <option value="General">General</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Conditional Donation Section */}
                {inquiryType === "Donation" && (
                    <div className="bg-blue-50 p-6 rounded-xl space-y-4 border border-blue-100 animate-in fade-in slide-in-from-top-2">
                        <h3 className="font-bold text-[var(--color-primary)]">Donation Details</h3>

                        <div className="space-y-2">
                            <label htmlFor="donation_tier" className="text-sm font-medium text-gray-700">Please select your preferred donation tier</label>
                            <select
                                name="donation_tier"
                                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all bg-white"
                            >
                                <option value="First Tier: $500">First Tier: $500 (Or LKR equivalent)</option>
                                <option value="Second Tier: $300">Second Tier: $300 (Or LKR equivalent)</option>
                                <option value="Third Tier: $100">Third Tier: $100 (Or LKR equivalent)</option>
                                <option value="Other">Other (I’d like to donate a different amount)</option>
                            </select>
                        </div>

                        <div className="p-3 bg-white/50 rounded-lg text-sm text-blue-800 border border-blue-100">
                            We currently do not accept online payments. Once you submit your pledge, our team will contact you with the bank transfer details and guide you through the donation process.
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        {inquiryType === "Donation" ? "Additional comments or sponsorship questions" : "Message"}
                    </label>
                    <textarea
                        required={inquiryType !== "Donation"}
                        name="message"
                        rows={5}
                        placeholder={inquiryType === "Donation" ? "If you'd like to donate more or discuss sponsorship opportunities, please let us know here." : "How can we help you?"}
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 transition-all resize-none"
                    />
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <input
                        type="checkbox"
                        required
                        id="privacy_consent"
                        className="mt-1 w-4 h-4 text-[var(--color-secondary)] rounded border-gray-300 focus:ring-[var(--color-secondary)]"
                    />
                    <label htmlFor="privacy_consent" className="text-sm text-gray-600 cursor-pointer select-none">
                        By submitting this form, I certify that I have read and accepted the Privacy Policy of BARB.
                    </label>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] transition-all gap-2 shadow-lg"
                    disabled={loading}
                >
                    {loading ? "Sending..." : (
                        <>
                            Submit
                            <Send className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
