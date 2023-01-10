import { DomainEvents } from "../../domain/DomainEvents";
import { MultiStepForm } from "../../domain/MultiStepForm";
import { MultiStepFormAlreadyExistsError } from "../../domain/MultiStepFormAlreadyExistsError";
import { MultiStepFormRepository } from "../../domain/MultiStepFormRepository";

function useAddMultiStepForm({ repository }: { repository: MultiStepFormRepository }): {
	save: (
		uruguayCountryBrand: Partial<MultiStepForm>
	) => Promise<MultiStepFormAlreadyExistsError | void>;
} {
	async function save(
		uruguayCountryBrand: Partial<MultiStepForm>
	): Promise<MultiStepFormAlreadyExistsError | void> {
		// const storedMultiStepForm = await repository.search(uruguayCountryBrand.uuid);

		// if (storedMultiStepForm) {
		// 	return new MultiStepFormAlreadyExistsError(
		// 		storedMultiStepForm.applicantCompanyName
		// 	);
		// }

		await repository.save(uruguayCountryBrand as MultiStepForm);
		document.dispatchEvent(new CustomEvent(DomainEvents.uruguayCountryBrandSaved));
	}

	return { save };
}

export { useAddMultiStepForm };
