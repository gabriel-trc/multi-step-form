import { UruguayCountryBrand } from "./UruguayCountryBrand";
import { UruguayCountryBrandAlreadyExistsError } from "./UruguayCountryBrandAlreadyExistsError";

export interface UruguayCountryBrandRepository {
	save(widget: UruguayCountryBrand): Promise<UruguayCountryBrandAlreadyExistsError | void>;
	search(): Promise<UruguayCountryBrand | null>;
}
