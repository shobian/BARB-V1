'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { PersonalInfo } from './components/personal-info';
import { CriteriaSelection } from './components/criteria-selection';
import { AdditionalInfo } from './components/additional-info';
import { TermsAndConditions } from './components/terms-and-conditions';
import { ReviewAndSubmit } from './components/review-and-submit';
import { OtpVerificationModal } from './components/OtpVerificationModal';
import type { ApplicationFormData } from './types/form-types';

export function MembershipForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ApplicationFormData>({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please fill in all required fields before proceeding.');
    const [emailVerified, setEmailVerified] = useState(false);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    const updateFormData = (data: Partial<ApplicationFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setShowError(false);
    };

    const validateStep = () => {
        if (step === 1) {
            return (
                formData.firstName?.trim() &&
                formData.surname?.trim() &&
                formData.dateOfBirth?.trim() &&
                formData.addressLine?.trim() &&
                formData.city?.trim() &&
                formData.postCode?.trim() &&
                formData.phone?.trim() &&
                formData.email?.trim() &&
                formData.nicOrPassport?.trim()
            );
        }
        return true;
    };

    const sendOtp = async () => {
        setOtpLoading(true);
        setShowError(false);
        const res = await fetch('/api/otp/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email }),
        });
        const json = await res.json();
        setOtpLoading(false);
        if (!res.ok) {
            setErrorMessage(`Could not send verification email: ${json.error}`);
            setShowError(true);
            return false;
        }
        return true;
    };

    const nextStep = async () => {
        if (!validateStep()) {
            setErrorMessage('Please fill in all required fields before proceeding.');
            setShowError(true);
            return;
        }

        if (step === 1 && !emailVerified) {
            const sent = await sendOtp();
            if (sent) setIsOtpModalOpen(true);
            return;
        }

        setStep((prev) => prev + 1);
        setShowError(false);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
        setShowError(false);
    };

    const handleOtpVerify = async (otp: string) => {
        const res = await fetch('/api/otp/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, code: otp }),
        });
        const json = await res.json();
        if (!res.ok) {
            return { success: false, message: json.error as string };
        }
        setEmailVerified(true);
        setIsOtpModalOpen(false);
        setStep((prev) => prev + 1);
        return { success: true };
    };

    const handleResendOtp = async () => {
        await sendOtp();
    };

    const renderStep = () => {
        switch (step) {
            case 1: return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
            case 2: return <CriteriaSelection formData={formData} updateFormData={updateFormData} />;
            case 3: return <AdditionalInfo formData={formData} updateFormData={updateFormData} />;
            case 4: return <TermsAndConditions formData={formData} updateFormData={updateFormData} />;
            case 5: return <ReviewAndSubmit formData={formData} />;
            default: return null;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center pt-4">
                        Application to become Registered Behaviour Therapist or Registered Behaviour Analyst.
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {showError && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                    {renderStep()}
                    <div className="mt-8 flex justify-between">
                        {step > 1 && (
                            <Button onClick={prevStep} variant="outline">
                                Previous
                            </Button>
                        )}
                        {step < 5 && (
                            <Button onClick={nextStep} className="ml-auto" disabled={otpLoading}>
                                {otpLoading ? 'Sending email…' : 'Next'}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <OtpVerificationModal
                isOpen={isOtpModalOpen}
                email={formData.email ?? ''}
                onClose={() => setIsOtpModalOpen(false)}
                onVerify={handleOtpVerify}
                onResend={handleResendOtp}
            />
        </div>
    );
}
