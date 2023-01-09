import React, { createContext, useContext, useRef, useState } from "react";

import { defaultUruguayCountryBrand, UruguayCountryBrand } from "../../domain/UruguayCountryBrand";
// import { config } from "../../../devdash_config";
// import { DomainEvents } from "../../../domain/DomainEvents";
import { UruguayCountryBrandRepository } from "../../domain/UruguayCountryBrandRepository";
import { LocalStorageUruguayCountryBrandRepository } from "../../infrastructure/LocalStorageUruguayCountryBrandRepository";
import { useAddUruguayCountryBrand } from "./useAddUruguayCountryBrand";
import { useUruguayCountryBrand } from "./useUruguayCountryBrand";

const repository = new LocalStorageUruguayCountryBrandRepository();

const MultiStepFormContex = createContext<{
	repository: UruguayCountryBrandRepository;
	uruguayCountryBrand: UruguayCountryBrand;
	currentStep: number;
	goToPreviousStep: React.MouseEventHandler<HTMLButtonElement>;
	formRef: React.MutableRefObject<null> | null;
	saveStep: Function;
}>({
	repository,
	uruguayCountryBrand: defaultUruguayCountryBrand(),
	currentStep: 0,
	goToPreviousStep: () => {},
	saveStep: () => {},
	formRef: null,
});

function MultiStepFormContexProvider({ children }: { children: React.ReactElement }) {
	const [uuid, setUuid] = useState("");
	const [currentStep, setCurrentStep] = useState(0);
	const [previousStep, setPreviousStep] = useState(0);
	const { uruguayCountryBrand } = useUruguayCountryBrand({ repository, uuid });
	const { save } = useAddUruguayCountryBrand({ repository });

	const formRef = useRef(null);

	function saveStep({
		stepData,
		previousStep,
		nextStep,
	}: {
		stepData: Partial<UruguayCountryBrand>;
		previousStep: number;
		nextStep: number;
	}) {
		save(stepData)
			.then(function () {
				setCurrentStep(nextStep);
				setPreviousStep(previousStep);
			})
			.catch(function (e) {
				new Error(JSON.stringify(e));
			});
	}

	function goToPreviousStep() {
		setCurrentStep(previousStep);
	}

	return (
		<MultiStepFormContex.Provider
			value={{
				repository,
				uruguayCountryBrand,
				currentStep,
				goToPreviousStep,
				saveStep,
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
