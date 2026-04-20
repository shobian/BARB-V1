import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Loader2 } from 'lucide-react';

interface OtpVerificationModalProps {
    isOpen: boolean;
    email: string;
    onClose: () => void;
    onVerify: (otp: string) => Promise<{ success: boolean; message?: string }>;
    onResend: () => Promise<void>;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
    isOpen,
    email,
    onClose,
    onVerify,
    onResend,
}) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleVerify = async () => {
        if (!otp.trim()) return;
        setLoading(true);
        setErrorMsg('');
        const result = await onVerify(otp.trim());
        setLoading(false);
        if (!result.success) {
            setErrorMsg(result.message ?? 'Invalid code. Please try again.');
        }
    };

    const handleResend = async () => {
        setResending(true);
        setErrorMsg('');
        await onResend();
        setResending(false);
        setOtp('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Card className="bg-white p-6 w-96 rounded shadow-lg space-y-4">
                <h2 className="text-xl font-semibold">Verify your email</h2>
                <p className="text-sm text-gray-600">
                    A 6-digit code was sent to <strong>{email}</strong>. Enter it below to continue.
                </p>

                <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                />

                {errorMsg && (
                    <p className="text-sm text-red-600">{errorMsg}</p>
                )}

                <div className="flex justify-end gap-2">
                    <Button onClick={onClose} variant="outline" disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleVerify} disabled={loading || otp.length < 6}>
                        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying…</> : 'Verify'}
                    </Button>
                </div>

                <div className="text-center">
                    <Button onClick={handleResend} variant="link" disabled={resending} className="text-sm">
                        {resending ? 'Sending…' : 'Resend code'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};
