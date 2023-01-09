import { DomainEvents } from "../../domain/DomainEvents";
import { UruguayCountryBrand } from "../../domain/UruguayCountryBrand";
import { UruguayCountryBrandAlreadyExistsError } from "../../domain/UruguayCountryBrandAlreadyExistsError";
import { UruguayCountryBrandRepository } from "../../domain/UruguayCountryBrandRepository";

function useAddUruguayCountryBrand({ repository }: { repository: UruguayCountryBrandRepository }): {
	save: (
		uruguayCountryBrand: Partial<UruguayCountryBrand>
	) => Promise<UruguayCountryBrandAlreadyExistsError | void>;
} {
	async function save(
		uruguayCountryBrand: Partial<UruguayCountryBrand>
	): Promise<UruguayCountryBrandAlreadyExistsError | void> {
		// const storedUruguayCountryBrand = await repository.search(uruguayCountryBrand.uuid);

		// if (storedUruguayCountryBrand) {
		// 	return new UruguayCountryBrandAlreadyExistsError(
		// 		storedUruguayCountryBrand.applicantCompanyName
		// 	);
		// }

		await repository.save(uruguayCountryBrand as UruguayCountryBrand);
		document.dispatchEvent(new CustomEvent(DomainEvents.uruguayCountryBrandSaved));
	}

	return { save };
}

export { useAddUruguayCountryBrand };
