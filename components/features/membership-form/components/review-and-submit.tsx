'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase/client';
import type { ApplicationFormData } from '../types/form-types';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const BUCKET = 'application-documents';

export function ReviewAndSubmit({ formData }: { formData: ApplicationFormData }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getSpecialization = (data: ApplicationFormData) => {
        const specs = [];
        if (data.currentRBT) specs.push('RBT');
        if (data.currentIBT) specs.push('IBT');
        if (data.practicingBehaviorTherapist) specs.push('Behavior Therapist');
        if (data.behaviourAnalyst) specs.push('Behavior Analyst');
        if (data.otherABAQualifications) specs.push('Other ABA');
        return specs.join(', ') || 'Not specified';
    };

    const uploadFile = async (fileKey: string, folder: string): Promise<string | null> => {
        const file = formData.files?.[fileKey];
        if (!file) return null;
        const filePath = `${folder}/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage.from(BUCKET).upload(filePath, file);
        if (error) throw new Error(`Upload failed for ${fileKey}: ${error.message}`);
        return filePath;
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            // Upload all files to Supabase Storage
            const [
                nicFrontPath,
                nicBackPath,
                expiredRbtPath,
                expiredIbtPath,
                educationPath,
                workExpPath,
                cvPath,
                insurancePath,
            ] = await Promise.all([
                uploadFile('nicFrontFile', 'nic'),
                uploadFile('nicBackFile', 'nic'),
                uploadFile('expiredRBTFile', 'certifications'),
                uploadFile('expiredIBTFile', 'certifications'),
                uploadFile('educationFile', 'education'),
                uploadFile('workExperienceFile', 'work'),
                uploadFile('cvFile', 'cv'),
                uploadFile('insuranceFile', 'insurance'),
            ]);
            // behaviourAnalystFile is uploaded separately (no dedicated DB column)
            await uploadFile('behaviourAnalystFile', 'certifications');

            // Insert into therapist_applications (column names match database_schema_update.sql)
            const { error: insertError } = await supabase
                .from('therapist_applications')
                .insert([{
                    // Status
                    review_status: 'pending',

                    // Personal Info
                    first_name: formData.firstName,
                    surname: formData.surname,
                    date_of_birth: formData.dateOfBirth,
                    address_line: formData.addressLine,
                    city: formData.city,
                    post_code: formData.postCode,
                    phone: formData.phone,
                    phone_optional: formData.phoneOptional,
                    email: formData.email,
                    nic_or_passport: formData.nicOrPassport,
                    nic_front_file_name: nicFrontPath,
                    nic_back_file_name: nicBackPath,

                    // Criteria
                    current_rbt: formData.currentRBT || false,
                    rbt_certification_no: formData.rbtCertificationNo,
                    current_ibt: formData.currentIBT || false,
                    ibt_certification_no: formData.ibtCertificationNo,
                    expired_rbt: formData.expiredRBT || false,
                    expired_rbt_file_name: expiredRbtPath,
                    voluntary_inactive_rbt: formData.voluntaryInactiveRBT || false,
                    voluntary_inactive_rbt_certification_no: formData.voluntaryInactiveRBTCertificationNo,
                    voluntary_inactive_rbt_reactivation_date: formData.voluntaryInactiveRBTReactivationDate,
                    expired_ibt: formData.expiredIBT || false,
                    expired_ibt_file_name: expiredIbtPath,
                    practicing_behavior_therapist: formData.practicingBehaviorTherapist || false,
                    other_aba_qualifications: formData.otherABAQualifications || false,
                    behaviour_analyst: formData.behaviourAnalyst || false,

                    // Education & Work
                    institution: formData.institution,
                    period_of_education: formData.periodOfEducation,
                    qualifications: formData.qualifications,
                    education_file_name: educationPath,
                    work_place_name: formData.workPlaceName,
                    work_place_address: formData.workPlaceAddress,
                    employment_period: formData.employmentPeriod,
                    designation: formData.designation,
                    full_time_part_time: formData.fullTimePartTime,
                    explanation_of_services: formData.explanationOfServices,
                    work_experience_file_name: workExpPath,
                    cv_file_name: cvPath,
                    insurance_file_name: insurancePath,

                    // Behaviour analyst doc (stored separately, same field unused in schema)
                    // behaviourAnalystPath is uploaded to storage but schema has no dedicated column

                    // Agreements
                    resident: formData.resident || false,
                    agree_objectives: formData.agreeObjectives || false,
                    agree_maintenance: formData.agreeMaintenance || false,
                    agree_license: formData.agreeLicense || false,
                    agree_update: formData.agreeUpdate || false,
                    agree_malpractice: formData.agreeMalpractice || false,
                    agree_ethics: formData.agreeEthics || false,
                    agree_police_clearance: formData.agreePoliceClearance || false,
                }]);

            if (insertError) throw insertError;

            setSuccess(true);
        } catch (err: unknown) {
            console.error('Submission error:', err);
            const message = err instanceof Error ? err.message : 'Failed to submit application. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Application Submitted!</h3>
                <p className="text-green-700 max-w-md mx-auto">
                    Thank you for applying. Your application has been received and is under review.
                    We will contact you at <strong>{formData.email}</strong>.
                </p>
                <div className="mt-6">
                    <Button
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-100"
                        onClick={() => window.location.href = '/'}
                    >
                        Return to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Review Application</h2>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 space-y-4 text-sm text-gray-700">
                <div>
                    <span className="font-semibold block text-gray-900">Name:</span>
                    {formData.firstName} {formData.surname}
                </div>
                <div>
                    <span className="font-semibold block text-gray-900">Email:</span>
                    {formData.email}
                </div>
                <div>
                    <span className="font-semibold block text-gray-900">Phone:</span>
                    {formData.phone}
                </div>
                <div>
                    <span className="font-semibold block text-gray-900">Address:</span>
                    {[formData.addressLine, formData.city, formData.postCode].filter(Boolean).join(', ')}
                </div>
                <div>
                    <span className="font-semibold block text-gray-900">Specialization:</span>
                    {getSpecialization(formData)}
                </div>
                <div>
                    <span className="font-semibold block text-gray-900">Documents attached:</span>
                    {Object.keys(formData.files ?? {}).length} file(s)
                </div>
            </div>

            <p className="text-sm text-gray-500">
                Please verify all information is correct before submitting.
                By clicking submit, you confirm the information provided is accurate.
            </p>

            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {error}
                </div>
            )}

            <Button onClick={handleSubmit} className="w-full h-12 text-base" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading & Submitting...
                    </>
                ) : (
                    'Submit Application'
                )}
            </Button>
        </div>
    );
}
