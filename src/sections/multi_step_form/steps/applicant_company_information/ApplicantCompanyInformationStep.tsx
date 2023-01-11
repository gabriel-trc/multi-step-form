/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useEffect } from "react";

import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";
import { UIEvents } from "../../UIEvents";

type FormData = {
	applicantCompanyBusinessName: { value: string };
	applicantCompanyName: { value: string };
	applicantCompanyId: { value: string };
	applicantCompanyAddress: { value: string };
	applicantCompanyDepartment: { value: string };
	applicantCompanyLocation: { value: string };
	applicantCompanyPhone: { value: string };
	applicantCompanyWeb: { value: string };
	applicantCompanyEmail: { value: string };
	applicantCompanySocialNetworks: { value: string };
};

function ApplicantCompanyInformationStep() {
	const { currentStep, multiStepForm, saveStep, formRef } = useMultiStepFormContext();

	const {
		applicantCompanyBusinessName,
		applicantCompanyName,
		applicantCompanyId,
		applicantCompanyAddress,
		applicantCompanyDepartment,
		applicantCompanyLocation,
		applicantCompanyPhone,
		applicantCompanyWeb,
		applicantCompanyEmail,
		applicantCompanySocialNetworks,
	} = multiStepForm;

	useEffect(() => {
		const submitStepData = () => {
			const {
				applicantCompanyBusinessName,
				applicantCompanyName,
				applicantCompanyId,
				applicantCompanyAddress,
				applicantCompanyDepartment,
				applicantCompanyLocation,
				applicantCompanyPhone,
				applicantCompanyWeb,
				applicantCompanyEmail,
				applicantCompanySocialNetworks,
			} = formRef.current.elements;

			saveStep({
				stepData: {
					applicantCompanyBusinessName: applicantCompanyBusinessName.value,
					applicantCompanyName: applicantCompanyName.value,
					applicantCompanyId: applicantCompanyId.value,
					applicantCompanyAddress: applicantCompanyAddress.value,
					applicantCompanyDepartment: applicantCompanyDepartment.value,
					applicantCompanyLocation: applicantCompanyLocation.value,
					applicantCompanyPhone: applicantCompanyPhone.value,
					applicantCompanyWeb: applicantCompanyWeb.value,
					applicantCompanyEmail: applicantCompanyEmail.value,
					applicantCompanySocialNetworks: applicantCompanySocialNetworks.value,
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

	return (
		<section>
			<h3>2 - Datos de la empresa solicitante</h3>
			<label htmlFor="applicantCompanyBusinessName">
				Razón social *
				<input
					type="text"
					name="applicantCompanyBusinessName"
					id="applicantCompanyBusinessName"
					required
					defaultValue={applicantCompanyBusinessName}
				/>
			</label>
			<label htmlFor="applicantCompanyName">
				Nombre comercial
				<input
					type="text"
					name="applicantCompanyName"
					id="applicantCompanyName"
					defaultValue={applicantCompanyName}
				/>
			</label>
			<label htmlFor="applicantCompanyId">
				RUT
				<input
					type="text"
					name="applicantCompanyId"
					id="applicantCompanyId"
					defaultValue={applicantCompanyId}
				/>
			</label>
			<label htmlFor="applicantCompanyAddress">
				Dirección
				<input
					type="text"
					name="applicantCompanyAddress"
					id="applicantCompanyAddress"
					defaultValue={applicantCompanyAddress}
				/>
			</label>
			<label htmlFor="applicantCompanyDepartment">
				Departamento
				<select
					name="applicantCompanyDepartment"
					id="applicantCompanyDepartment"
					defaultValue={applicantCompanyDepartment}
				>
					<option value="Artigas">Artigas</option>
					<option value="Canelones">Canelones</option>
					<option value="Montevideo">Montevideo</option>
				</select>
			</label>
			<label htmlFor="applicantCompanyLocation">
				Localidad
				<input
					type="text"
					name="applicantCompanyLocation"
					id="applicantCompanyLocation"
					defaultValue={applicantCompanyLocation}
				/>
			</label>
			<label htmlFor="applicantCompanyPhone">
				Teléfono
				<input
					type="tel"
					name="applicantCompanyPhone"
					id="applicantCompanyPhone"
					defaultValue={applicantCompanyPhone}
				/>
			</label>
			<label htmlFor="applicantCompanyWeb">
				Página web
				<input
					type="text"
					name="applicantCompanyWeb"
					id="applicantCompanyWeb"
					defaultValue={applicantCompanyWeb}
				/>
			</label>
			<label htmlFor="contactPersonEmail">
				Email
				<input
					type="email"
					name="applicantCompanyEmail"
					id="applicantCompanyEmail"
					defaultValue={applicantCompanyEmail}
				/>
			</label>
			<label htmlFor="applicantCompanySocialNetworks">
				Redes sociales
				<select
					name="applicantCompanySocialNetworks"
					id="applicantCompanySocialNetworks"
					defaultValue={applicantCompanySocialNetworks}
				>
					<option value="Facebook">Facebook</option>
					<option value="Instagram">Instagram</option>
					<option value="LinkedIn">LinkedIn</option>
					<option value="Twitter">Twitter</option>
				</select>
			</label>
		</section>
	);
}

export { ApplicantCompanyInformationStep };
