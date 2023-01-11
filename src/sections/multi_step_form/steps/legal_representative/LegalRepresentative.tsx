/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect, useRef, useState } from "react";

import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";
import { UIEvents } from "../../UIEvents";

function LegalRepresentative() {
	const [legalRepresentativeDocumentType, setLegalRepresentativeDocumentType] = useState("CI");
	const { currentStep, multiStepForm, saveStep, formRef } = useMultiStepFormContext();

	const { legalRepresentativeName, legalRepresentativeDocumentNumber } = multiStepForm;

	const legalRepresentativeDocumentTypeOtherRef = useRef(null);

	useEffect(() => {
		setLegalRepresentativeDocumentType(multiStepForm.legalRepresentativeDocumentType);
	}, [multiStepForm]);

	useEffect(() => {
		legalRepresentativeDocumentTypeOtherRef.current.style.display =
			legalRepresentativeDocumentType === "Other" ? "block" : "none";
	}, [legalRepresentativeDocumentType]);

	useEffect(() => {
		const submitStepData = () => {
			const legalRepresentativeName = formRef.current.elements.legalRepresentativeName.value;
			let legalRepresentativeDocumentType =
				formRef.current.elements.legalRepresentativeDocumentType.value;
			const legalRepresentativeDocumentNumber =
				formRef.current.elements.legalRepresentativeDocumentNumber.value;
			if (legalRepresentativeDocumentType === "Other") {
				legalRepresentativeDocumentType =
					formRef.current.elements.legalRepresentativeDocumentTypeOther.value;
			}
			saveStep({
				stepData: {
					legalRepresentativeName,
					legalRepresentativeDocumentType,
					legalRepresentativeDocumentNumber,
				},
				previousStep: currentStep,
				nextStep: currentStep + 1,
			});
		};
		document.addEventListener(UIEvents.buildInFormValidateSucess, submitStepData);

		return () => {
			document.removeEventListener(UIEvents.buildInFormValidateSucess, submitStepData);
		};
	}, []);

	function handleOnChangeLegalRepresentativeDocumentType(
		event: React.ChangeEventHandler<HTMLSelectElement>
	) {
		setLegalRepresentativeDocumentType(event.target.value);
	}

	return (
		<section>
			<h3>3 - Representante legal</h3>
			<label htmlFor="legalRepresentativeName">
				Nombre *
				<input
					type="text"
					name="legalRepresentativeName"
					id="legalRepresentativeName"
					required
					defaultValue={legalRepresentativeName}
				/>
			</label>
			<label htmlFor="legalRepresentativeDocumentType">
				Tipo de documento
				<select
					name="legalRepresentativeDocumentType"
					id="legalRepresentativeDocumentType"
					value={legalRepresentativeDocumentType}
					onChange={handleOnChangeLegalRepresentativeDocumentType}
				>
					<option value="CI">CI</option>
					<option value="DNI">DNI</option>
					<option value="Passport">Pasaporte</option>
					<option value="Other">Otro</option>
				</select>
				<input
					ref={legalRepresentativeDocumentTypeOtherRef}
					type="text"
					name="legalRepresentativeDocumentTypeOther"
					id="legalRepresentativeDocumentTypeOther"
					placeholder="Tipo"
					defaultValue={legalRepresentativeDocumentType}
				/>
			</label>
			<label htmlFor="legalRepresentativeDocumentNumber">
				Numero de documento
				<input
					type="text"
					name="legalRepresentativeDocumentNumber"
					id="legalRepresentativeDocumentNumber"
					defaultValue={legalRepresentativeDocumentNumber}
				/>
			</label>
		</section>
	);
}

export { LegalRepresentative };
