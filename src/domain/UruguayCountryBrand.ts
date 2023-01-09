interface ContactPerson {
	contactPersonName: string;
	contactPersonLastName: string;
	contactPersonPosition: string;
	contactPersonEmail: string;
	contactPersonPhone: string;
}

interface ApplicantCompanyInformation {
	applicantCompanyBusinessName: string;
	applicantCompanyName: string;
}

interface UruguayCountryBrand
	extends Partial<ContactPerson>,
		Partial<ApplicantCompanyInformation> {}

export type { ApplicantCompanyInformation, ContactPerson, UruguayCountryBrand };
