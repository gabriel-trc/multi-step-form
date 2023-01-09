/* eslint-disable @typescript-eslint/no-misused-promises */
//import { ContactPerson } from "../../../../domain/UruguayCountryBrand";

import { useEffect } from "react";

import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";

//function validateForm() {}

function ContactPersonStep() {
	const { uruguayCountryBrand, currentStep, setCurrentStep, formRef, setPrevStep } =
		useMultiStepFormContext();

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
			repository
				.save({
					contactPersonName,
					contactPersonLastName,
					contactPersonPosition,
					contactPersonEmail,
					contactPersonPhone,
				})
				.then(function () {
					setCurrentStep(currentStep + 1);
					setPrevStep(currentStep);
				})
				.catch(function (e) {
					new Error(JSON.stringify(e));
				});
		};

		document.addEventListener("formBuildInValidateSucces", reloadRepositoryWidgets);

		return () => {
			document.removeEventListener("formBuildInValidateSucces", reloadRepositoryWidgets);
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
					// value={contactPersonName}
					// onChange={(e) => setContactPersonName(e.target.value)}
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
