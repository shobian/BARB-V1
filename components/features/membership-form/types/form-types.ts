export interface ApplicationFormData {
    // Personal Information
    firstName?: string;
    surname?: string;
    dateOfBirth?: string;
    addressLine?: string;
    city?: string;
    postCode?: string;
    phone?: string;
    phoneOptional?: string; // Optional phone number
    email?: string;
    nicOrPassport?: string; // NIC or Passport field
    nicFrontFileName?: string; // NIC Front file name field
    nicBackFileName?: string; // NIC Back file name field

    // Criteria Selection
    currentRBT?: boolean;
    rbtCertificationNo?: string;
    currentIBT?: boolean;
    ibtCertificationNo?: string;
    expiredRBT?: boolean;
    expiredRBTFileName?: string;
    voluntaryInactiveRBT?: boolean;
    voluntaryInactiveRBTCertificationNo?: string;
    voluntaryInactiveRBTReactivationDate?: string;
    expiredIBT?: boolean;
    expiredIBTFileName?: string;
    practicingBehaviorTherapist?: boolean;
    otherABAQualifications?: boolean;
    behaviourAnalyst?: boolean;


    // Additional Information
    institution?: string;
    periodOfEducation?: string;
    qualifications?: string;
    educationFileName?: string;
    workPlaceName?: string;
    workPlaceAddress?: string;
    employmentPeriod?: string;
    designation?: string;
    fullTimePartTime?: string;
    explanationOfServices?: string;
    workExperienceFileName?: string;
    cvFileName?: string;
    insuranceFileName?: string;

    // Terms and Conditions
    resident?: boolean;
    agreeObjectives?: boolean;
    agreeMaintenance?: boolean;
    agreeLicense?: boolean;
    agreeUpdate?: boolean;
    agreeMalpractice?: boolean;
    agreeEthics?: boolean;
    agreePoliceClearance?: boolean;

    // Actual File objects, keyed by field name — lifted up so review-and-submit can upload them
    files?: Record<string, File>;
}

export interface ComponentProps {
    formData: ApplicationFormData;
    updateFormData: (data: Partial<ApplicationFormData>) => void;
}
