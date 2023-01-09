import { MultiStepForm } from "./sections/multi_step_form/MultiStepForm";
import { MultiStepFormContexProvider } from "./sections/multi_step_form/MultiStepFormContexProvider";

function App() {
	return (
		<MultiStepFormContexProvider>
			<MultiStepForm />
		</MultiStepFormContexProvider>
	);
}

export { App };
