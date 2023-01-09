import { UruguayCountryBrand } from "../domain/UruguayCountryBrand";
import { UruguayCountryBrandRepository } from "../domain/UruguayCountryBrandRepository";

class LocalStorageUruguayCountryBrandRepository implements UruguayCountryBrandRepository {
	localStorageKey = "uruguayCountryBrandApplications";

	async getAll(): Promise<UruguayCountryBrand[]> {
		const data = localStorage.getItem(this.localStorageKey);

		return data ? (JSON.parse(data) as UruguayCountryBrand[]) : [];
	}

	async search(uuid: string): Promise<UruguayCountryBrand | null> {
		const uruguayCountryBrandsApplications = await this.getAll();
		const uruguayCountryBrand = uruguayCountryBrandsApplications.find(
			(application) => application.uuid === uuid
		);

		return uruguayCountryBrand ?? null;
	}

	async save(uruguayCountryBrand: UruguayCountryBrand): Promise<void> {
		let uruguayCountryBrandsApplicationsToStore = [];
		const uruguayCountryBrandsApplications = await this.getAll();
		const uruguayCountryBrandIsStored = uruguayCountryBrandsApplications.some(
			(application) => application.uuid === uruguayCountryBrand.uuid
		);
		if (uruguayCountryBrandIsStored) {
			uruguayCountryBrandsApplicationsToStore = uruguayCountryBrandsApplications.map(
				(application) =>
					application.uuid === uruguayCountryBrand.uuid
						? { ...application, ...uruguayCountryBrand }
						: application
			);
		} else {
			uruguayCountryBrandsApplicationsToStore = [
				...uruguayCountryBrandsApplications,
				uruguayCountryBrand,
			];
		}

		localStorage.setItem(
			this.localStorageKey,
			JSON.stringify(uruguayCountryBrandsApplicationsToStore)
		);
	}
}

export { LocalStorageUruguayCountryBrandRepository };
