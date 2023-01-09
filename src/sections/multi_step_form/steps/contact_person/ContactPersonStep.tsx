/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect } from "react";

import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";
import { UIEvents } from "../../UIEvents";

//function validateForm() {}

function ContactPersonStep() {
	const { currentStep, uruguayCountryBrand, saveStep, formRef } = useMultiStepFormContext();

	const {
		contactPersonName,
		contactPersonLastName,
		contactPersonPosition,
		contactPersonEmail,
		contactPersonPhone,
	} = uruguayCountryBrand;

	useEffect(() => {
		const reloadRepositoryWidgets = () => {
			const contactPersonName = formRef.current.elements.contactPersonName.value;
			const contactPersonLastName = formRef.current.elements.contactPersonLastName.value;
			const contactPersonPosition = formRef.current.elements.contactPersonPosition.value;
			const contactPersonEmail = formRef.current.elements.contactPersonEmail.value;
			const contactPersonPhone = formRef.current.elements.contactPersonPhone.value;

			saveStep({
				stepData: {
					contactPersonName,
					contactPersonLastName,
					contactPersonPosition,
					contactPersonEmail,
					contactPersonPhone,
				},
				previousStep: currentStep,
				nextStep: currentStep + 1,
			});
		};
		document.addEventListener(UIEvents.buildInFormValidateSucess, reloadRepositoryWidgets);

		return () => {
			document.removeEventListener(UIEvents.buildInFormValidateSucess, reloadRepositoryWidgets);
		};
	}, []);

	return (
		<section>
			<h3>1 - Persona de contacto</h3>
			<label htmlFor="contactPersonName">
				Nombre *
				<input
					type="text"
					name="contactPersonName"
					id="contactPersonName"
					required
					defaultValue={contactPersonName}
				/>
			</label>
			<label htmlFor="contactPersonLastName">
				Apellido
				<input
					type="text"
					name="contactPersonLastName"
					id="contactPersonLastName"
					defaultValue={contactPersonLastName}
				/>
			</label>
			<label htmlFor="contactPersonPosition">
				Posición
				<input
					type="text"
					name="contactPersonPosition"
					id="contactPersonPosition"
					defaultValue={contactPersonPosition}
				/>
			</label>
			<label htmlFor="contactPersonEmail">
				Email
				<input
					type="email"
					name="contactPersonEmail"
					id="contactPersonEmail"
					defaultValue={contactPersonEmail}
				/>
			</label>
			<label htmlFor="contactPersonPhone">
				Teléfono
				<input
					type="tel"
					name="contactPersonPhone"
					id="contactPersonPhone"
					defaultValue={contactPersonPhone}
				/>
			</label>
		</section>
	);
}

export { ContactPersonStep };
