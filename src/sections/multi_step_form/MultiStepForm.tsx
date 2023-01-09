/* eslint-disable no-console */

import { useMultiStepFormContext } from "./MultiStepFormContexProvider";
import { ApplicantCompanyInformationStep, ContactPersonStep } from "./steps";

const rightArrow =
	"https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345";
const leftArrow =
	"https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363";

// /** Group the person input fields in a component */
// function ContactPersonStep({
// 	currentStep,
// 	refForm,
// 	setCurrentStep,
// 	setPrevStep,
// 	uruguayCountryBrand,
// }) {
// 	useEffect(() => {
// 		const reloadRepositoryWidgets = () => {
// 			const contactPersonName = refForm.current.elements.contactPersonName.value;
// 			const contactPersonLastName = refForm.current.elements.contactPersonLastName.value;
// 			const contactPersonPosition = refForm.current.elements.contactPersonPosition.value;
// 			const contactPersonEmail = refForm.current.elements.contactPersonEmail.value;
// 			const contactPersonPhone = refForm.current.elements.contactPersonPhone.value;
// 			repository
// 				.save({
// 					contactPersonName,
// 					contactPersonLastName,
// 					contactPersonPosition,
// 					contactPersonEmail,
// 					contactPersonPhone,
// 				})
// 				.then(function () {
// 					setCurrentStep(currentStep + 1);
// 					setPrevStep(currentStep);
// 				})
// 				.catch(function (e) {
// 					new Error(JSON.stringify(e));
// 				});
// 		};

// 		document.addEventListener("formBuildInValidateSucces", reloadRepositoryWidgets);

// 		return () => {
// 			document.removeEventListener("formBuildInValidateSucces", reloadRepositoryWidgets);
// 		};
// 	}, []);
// 	const {
// 		contactPersonName,
// 		contactPersonLastName,
// 		contactPersonPosition,
// 		contactPersonEmail,
// 		contactPersonPhone,
// 	} = uruguayCountryBrand;

// 	return (
// 		<section>
// 			<h3>1 - Persona de contacto</h3>
// 			<label htmlFor="contactPersonName">
// 				Nombre *
// 				<input
// 					type="text"
// 					name="contactPersonName"
// 					id="contactPersonName"
// 					required
// 					defaultValue={contactPersonName}
// 					// value={contactPersonName}
// 					// onChange={(e) => setContactPersonName(e.target.value)}
// 				/>
// 			</label>
// 			<label htmlFor="contactPersonLastName">
// 				Apellido
// 				<input
// 					type="text"
// 					name="contactPersonLastName"
// 					id="contactPersonLastName"
// 					defaultValue={contactPersonLastName}
// 				/>
// 			</label>
// 			<label htmlFor="contactPersonPosition">
// 				Posición
// 				<input
// 					type="text"
// 					name="contactPersonPosition"
// 					id="contactPersonPosition"
// 					defaultValue={contactPersonPosition}
// 				/>
// 			</label>
// 			<label htmlFor="contactPersonEmail">
// 				Email
// 				<input
// 					type="email"
// 					name="contactPersonEmail"
// 					id="contactPersonEmail"
// 					defaultValue={contactPersonEmail}
// 				/>
// 			</label>
// 			<label htmlFor="contactPersonPhone">
// 				Teléfono
// 				<input
// 					type="tel"
// 					name="contactPersonPhone"
// 					id="contactPersonPhone"
// 					defaultValue={contactPersonPhone}
// 				/>
// 			</label>
// 		</section>
// 	);
// }

// /** Group the contact input fields in a component */
// function ApplicantCompanyInformationStep() {
// 	return (
// 		<section>
// 			<h3>2 - Datos de la empresa solicitante</h3>
// 			<label htmlFor="contactPersonName">
// 				Nombre
// 				<input type="text" name="contactPersonName" id="contactPersonName" required />
// 			</label>
// 			<label htmlFor="contactPersonLastName">
// 				Apellido
// 				<input type="text" name="contactPersonLastName" id="contactPersonLastName" />
// 			</label>
// 		</section>
// 	);
// }

const FORM_STEPS = [<ContactPersonStep />, <ApplicantCompanyInformationStep />];

function MultiStepForm() {
	const { prevStep, currentStep, setCurrentStep, formRef } = useMultiStepFormContext();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		document.dispatchEvent(new CustomEvent("formBuildInValidateSucces"));
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			{FORM_STEPS[currentStep]}
			<section>
				{currentStep > 0 && (
					<button
						type="button"
						onClick={() => {
							setCurrentStep(prevStep);
						}}
					>
						<img src={leftArrow} />
						BACK
					</button>
				)}

				<button type="submit">
					<img src={rightArrow} />
					NEXT
				</button>
			</section>
		</form>
	);
}

export { MultiStepForm };
