/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect } from "react";

import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";
import { UIEvents } from "../../UIEvents";

//function validateForm() {}

function Initial() {
	const { repository, currentStep, saveStep, formRef } = useMultiStepFormContext();

	useEffect(() => {
		const reloadRepositoryWidgets = () => {
			const uuid = formRef.current.elements.uuid.value;
			repository.search(uuid)
			.then(function () {});
			.catch(function (e) { new Error(JSON.stringify(e))});
		};
		document.addEventListener(UIEvents.buildInFormValidateSucess, reloadRepositoryWidgets);

		return () => {
			document.removeEventListener(UIEvents.buildInFormValidateSucess, reloadRepositoryWidgets);
		};
	}, []);

	return (
		<section>
			<h2>Solicitud de Marca País Uruguay</h2>

			<button type="button" onClick={() => {}}>
				Ingresar nueva
			</button>
			<hr />
			<h4>Continuar con solicitud de Marca País Uruguay</h4>
			<label htmlFor="uuid">
				Código de solicitud
				<input
					type="text"
					name="uuid"
					id="uuid"
					required
					minLength={8}
					maxLength={8}
					style={{ textTransform: "uppercase" }}
				/>
			</label>
			<button type="submit">Continuar</button>
		</section>
	);
}

export { Initial };
