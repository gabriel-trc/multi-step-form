import { UruguayCountryBrand } from "../domain/UruguayCountryBrand";
import { UruguayCountryBrandRepository } from "../domain/UruguayCountryBrandRepository";

class LocalStorageUruguayCountryBrandRepository implements UruguayCountryBrandRepository {
	localStorageKey = "uruguayCountryBrand";

	async search(): Promise<UruguayCountryBrand | null> {
		const data = localStorage.getItem(this.localStorageKey);

		if (!data) {
			return Promise.resolve(null);
		}

		return Promise.resolve(JSON.parse(data) as UruguayCountryBrand);
	}

	async save(widget: UruguayCountryBrand): Promise<void> {
		const currentRepositoryWidget = await this.search();
		localStorage.setItem(
			this.localStorageKey,
			JSON.stringify({ ...currentRepositoryWidget, ...widget })
		);
	}
}

export { LocalStorageUruguayCountryBrandRepository };
