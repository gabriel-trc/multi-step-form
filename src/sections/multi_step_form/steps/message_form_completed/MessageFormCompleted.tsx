import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";

function MessageFormCompleted() {
	const { multiStepForm } = useMultiStepFormContext();

	const { uuid } = multiStepForm;

	return (
		<section>
			<h4>La solicitud {uuid} fue completada</h4>
		</section>
	);
}

export { MessageFormCompleted };
