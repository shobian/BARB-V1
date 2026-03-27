'use client';

import React, { useState } from 'react';
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
    const [emailVerified, setEmailVerified] = useState(false);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

    const updateFormData = (data: Partial<ApplicationFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setShowError(false); // Clear error when user makes changes
    };

    const validateStep = () => {
        switch (step) {
            case 1:
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
            // Add validation for other steps as needed
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep()) {
            if (step === 1 && !emailVerified) {
                // Trigger OTP verification modal
                setIsOtpModalOpen(true);
            } else {
                setStep((prev) => prev + 1);
                setShowError(false);
            }
        } else {
            setShowError(true);
        }
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
        setShowError(false);
    };

    const handleOtpVerify = (otp: string) => {
        // Simulate OTP verification
        if (otp === '123456') {
            setEmailVerified(true);
            setIsOtpModalOpen(false);
            alert('Email verified successfully.');
            setStep((prev) => prev + 1);
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <PersonalInfo formData={formData} updateFormData={updateFormData} />;
            case 2:
                return <CriteriaSelection formData={formData} updateFormData={updateFormData} />;
            case 3:
                return <AdditionalInfo formData={formData} updateFormData={updateFormData} />;
            case 4:
                return <TermsAndConditions formData={formData} updateFormData={updateFormData} />;
            case 5:
                return <ReviewAndSubmit formData={formData} />;
            default:
                return null;
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
                            <AlertDescription>
                                Please fill in all required fields before proceeding.
                            </AlertDescription>
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
                            <Button onClick={nextStep} className="ml-auto">
                                Next
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            <OtpVerificationModal
                isOpen={isOtpModalOpen}
                onClose={() => setIsOtpModalOpen(false)}
                onVerify={handleOtpVerify}
                onResend={() => alert('OTP resent')}
            />
        </div>
    );
}
