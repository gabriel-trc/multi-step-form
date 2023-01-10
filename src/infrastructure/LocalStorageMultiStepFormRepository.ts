/* eslint-disable @typescript-eslint/require-await */
import { MultiStepForm } from "../domain/MultiStepForm";
import { MultiStepFormRepository } from "../domain/MultiStepFormRepository";

class LocalStorageMultiStepFormRepository implements MultiStepFormRepository {
	localStorageKey = "uruguayCountryBrandApplications";

	async getAll(): Promise<MultiStepForm[]> {
		const data = localStorage.getItem(this.localStorageKey);

		return data ? (JSON.parse(data) as MultiStepForm[]) : [];
	}

	async search(uuid: string): Promise<MultiStepForm | null> {
		const multiStepFormApplications = await this.getAll();
		const multiStepForm = multiStepFormApplications.find(
			(application) => application.uuid === uuid
		);

		return multiStepForm ?? null;
	}

	async save(multiStepForm: MultiStepForm): Promise<MultiStepForm> {
		let multiStepFormApplicationsToStore = [];
		const multiStepFormApplications = await this.getAll();

		const storedMultiStepForm = multiStepFormApplications.find(
			(application) => application.uuid === multiStepForm.uuid
		);

		const toStoreMultiStepForm = storedMultiStepForm
			? { ...storedMultiStepForm, ...multiStepForm }
			: multiStepForm;

		if (storedMultiStepForm) {
			multiStepFormApplicationsToStore = multiStepFormApplications.map((application) =>
				application.uuid === multiStepForm.uuid ? toStoreMultiStepForm : application
			);
		} else {
			multiStepFormApplicationsToStore = [...multiStepFormApplications, toStoreMultiStepForm];
		}

		localStorage.setItem(this.localStorageKey, JSON.stringify(multiStepFormApplicationsToStore));

		return toStoreMultiStepForm;
	}
}

export { LocalStorageMultiStepFormRepository };
