/* eslint-disable no-console */

import { LocalStorageUruguayCountryBrandRepository } from "./infrastructure/LocalStorageUruguayCountryBrandRepository";
import { MultiStepForm } from "./sections/multi_step_form/MultiStepForm";
import { MultiStepFormContexProvider } from "./sections/multi_step_form/MultiStepFormContexProvider";

const repository = new LocalStorageUruguayCountryBrandRepository();

function App() {
	return (
		<MultiStepFormContexProvider repository={repository}>
			<MultiStepForm />
		</MultiStepFormContexProvider>
	);
}

export { App };
