import { MultiStepForm } from "./MultiStepForm";
import { MultiStepFormAlreadyExistsError } from "./MultiStepFormAlreadyExistsError";

export interface MultiStepFormRepository {
	getAll(): Promise<MultiStepForm[]>;
	save(
		uruguayCountryBrand: MultiStepForm
	): Promise<MultiStepFormAlreadyExistsError | MultiStepForm>;
	search(uuid: string): Promise<MultiStepForm | null>;
}
