/* eslint-disable no-console */

import { useMultiStepFormContext } from "./MultiStepFormContexProvider";
import { ApplicantCompanyInformationStep, ContactPersonStep, LegalRepresentative } from "./steps";
import { OrganizationSite } from "./steps/organization_site/OrganizationSite";
import { UIEvents } from "./UIEvents";

const rightArrow =
	"https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345";
const leftArrow =
	"https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363";

const FORM_STEPS = [
	// <ContactPersonStep />,
	// <ApplicantCompanyInformationStep />,
	// <LegalRepresentative />,
	<OrganizationSite />,
];

function MultiStepForm() {
	const { currentStep, goToPreviousStep, formRef } = useMultiStepFormContext();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		document.dispatchEvent(new CustomEvent(UIEvents.buildInFormValidateSucess));
	}

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			{FORM_STEPS[0]}

			<section>
				{currentStep > 0 && (
					<button type="button" onClick={goToPreviousStep}>
						<img src={leftArrow} alt="Flecha paso previo" />
						ATRAS
					</button>
				)}

				{currentStep < FORM_STEPS.length && (
					<button type="submit">
						<img src={rightArrow} alt="Flecha paso siguiente" />
						{currentStep === FORM_STEPS.length - 1 ? "FINALIZAR" : "SIGUIENTE"}
					</button>
				)}
			</section>
		</form>
	);
}

export { MultiStepForm };
