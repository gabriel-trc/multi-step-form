import { UruguayCountryBrand } from "./UruguayCountryBrand";
import { UruguayCountryBrandAlreadyExistsError } from "./UruguayCountryBrandAlreadyExistsError";

export interface UruguayCountryBrandRepository {
	getAll(): Promise<UruguayCountryBrand[]>;
	save(
		uruguayCountryBrand: UruguayCountryBrand
	): Promise<UruguayCountryBrandAlreadyExistsError | void>;
	search(uuid: string): Promise<UruguayCountryBrand | null>;
}
