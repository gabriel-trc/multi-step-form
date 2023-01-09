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
}

export interface UruguayCountryBrand extends ContactPerson, ApplicantCompanyInformation {
	uuid: string;
}

export function defaultUruguayCountryBrand(): UruguayCountryBrand {
	return {
		uuid: generateUUID(),
		contactPersonName: "",
		contactPersonLastName: "",
		contactPersonPosition: "",
		contactPersonEmail: "",
		contactPersonPhone: "",
		applicantCompanyBusinessName: "",
		applicantCompanyName: "",
	} as UruguayCountryBrand;
}

export function generateUUID(length = 8): string {
	return crypto.randomUUID().substring(0, length).toUpperCase();
}
