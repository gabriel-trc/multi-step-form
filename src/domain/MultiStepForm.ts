export interface ContactPerson {
	contactPersonName: string;
	contactPersonLastName: string;
	contactPersonPosition: string;
	contactPersonEmail: string;
	contactPersonPhone: string;
}

export interface ApplicantCompanyInformation {
	applicantCompanyBusinessName: string;
	applicantCompanyName: string;
	applicantCompanyId: string;
	applicantCompanyAddress: string;
	applicantCompanyDepartment: string;
	applicantCompanyLocation: string;
	applicantCompanyPhone: string;
	applicantCompanyWeb: string;
	applicantCompanyEmail: string;
	applicantCompanySocialNetworks: string;
}

export interface LegalRepresentative {
	legalRepresentativeName: string;
	legalRepresentativeDocumentType: string;
	legalRepresentativeDocumentNumber: string;
}

export interface OrganizationSite {
	organizationSiteHeadquarter: string;
	organizationSiteOthers: boolean;
	organizationSiteOthersDocuments: string;
}

export interface MultiStepForm
	extends ContactPerson,
		ApplicantCompanyInformation,
		LegalRepresentative,
		OrganizationSite {
	isCompleted: boolean;
	lastStepCompleted: number;
	uuid: string;
}

export function defaultMultiStepForm(uuid: string): MultiStepForm {
	return {
		isCompleted: false,
		lastStepCompleted: 0,
		uuid,
		contactPersonName: "",
		contactPersonLastName: "",
		contactPersonPosition: "",
		contactPersonEmail: "",
		contactPersonPhone: "",
		applicantCompanyBusinessName: "",
		applicantCompanyName: "",
		applicantCompanyId: "",
		applicantCompanyAddress: "",
		applicantCompanyDepartment: "",
		applicantCompanyLocation: "",
		applicantCompanyPhone: "",
		applicantCompanyWeb: "",
		applicantCompanyEmail: "",
		applicantCompanySocialNetworks: "",
		legalRepresentativeName: "",
		legalRepresentativeDocumentType: "",
		legalRepresentativeDocumentNumber: "",
		organizationSiteHeadquarter: "",
		organizationSiteOthers: false,
		organizationSiteOthersDocuments: "",
	} as MultiStepForm;
}

export function generateUUID(length = 8): string {
	return crypto.randomUUID().substring(0, length).toUpperCase();
}
