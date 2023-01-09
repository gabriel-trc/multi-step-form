import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { UruguayCountryBrand } from "../../domain/UruguayCountryBrand";
// import { config } from "../../../devdash_config";
// import { DomainEvents } from "../../../domain/DomainEvents";
import { UruguayCountryBrandRepository } from "../../domain/UruguayCountryBrandRepository";

const MultiStepFormContex = createContext<{
	repository: UruguayCountryBrandRepository | null;
	uruguayCountryBrand: UruguayCountryBrand | null;
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>> | null;
	prevStep: number;
	setPrevStep: React.Dispatch<React.SetStateAction<number>> | null;
	formRef: React.MutableRefObject<null> | null;
}>({
	repository: null,
	uruguayCountryBrand: null,
	currentStep: 0,
	setCurrentStep: null,
	prevStep: 0,
	setPrevStep: null,
	formRef: null,
});

function MultiStepFormContexProvider({
	children,
	repository,
}: {
	children: React.ReactElement;
	repository: UruguayCountryBrandRepository;
}) {
	const [uruguayCountryBrand, setUruguayCountryBrand] = useState<UruguayCountryBrand>({
		contactPersonName: "",
		contactPersonLastName: "",
		contactPersonPosition: "",
		contactPersonEmail: "",
		contactPersonPhone: "",
		applicantCompanyBusinessName: "",
		applicantCompanyName: "",
	});
	const [currentStep, setCurrentStep] = useState(0);
	const [prevStep, setPrevStep] = useState(0);

	useEffect(() => {
		repository
			.search()
			.then((storedUruguayCountryBrand) => {
				if (storedUruguayCountryBrand) {
					setUruguayCountryBrand(storedUruguayCountryBrand);

					return;
				}
			})
			.catch((e) => {
				new Error(JSON.stringify(e));
			});
	}, [repository]);

	const formRef = useRef(null);

	return (
		<MultiStepFormContex.Provider
			value={{
				repository,
				uruguayCountryBrand,
				currentStep,
				setCurrentStep,
				prevStep,
				setPrevStep,
				formRef,
			}}
		>
			{children}
		</MultiStepFormContex.Provider>
	);
}

function useMultiStepFormContext() {
	return useContext(MultiStepFormContex);
}

export { MultiStepFormContexProvider, useMultiStepFormContext };
