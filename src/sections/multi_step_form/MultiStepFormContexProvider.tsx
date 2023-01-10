import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { defaultMultiStepForm, MultiStepForm } from "../../domain/MultiStepForm";
import { MultiStepFormRepository } from "../../domain/MultiStepFormRepository";
import { LocalStorageMultiStepFormRepository } from "../../infrastructure/LocalStorageMultiStepFormRepository";

const repository = new LocalStorageMultiStepFormRepository();

const MultiStepFormContex = createContext<{
	repository: MultiStepFormRepository;
	multiStepForm: MultiStepForm;
	currentStep: number;
	goToPreviousStep: React.MouseEventHandler<HTMLButtonElement>;
	formRef: React.MutableRefObject<null> | null;
	saveStep: Function;
}>({
	repository,
	multiStepForm: defaultMultiStepForm("a"),
	currentStep: 0,
	goToPreviousStep: () => {},
	saveStep: () => {},
	formRef: null,
});

function MultiStepFormContexProvider({ children }: { children: React.ReactElement }) {
	const { uuid } = useParams() as { uuid: string };
	const [multiStepForm, setMultiStepForm] = useState<MultiStepForm>(() => {
		return defaultMultiStepForm(uuid);
	});
	const [isLoading, setIsLoading] = useState(true);

	const [currentStep, setCurrentStep] = useState(0);
	const [previousStep, setPreviousStep] = useState(0);

	const formRef = useRef(null);

	useEffect(() => {
		setIsLoading(true);
		repository
			.search(uuid)
			.then((storedMultiStepForm) => {
				if (storedMultiStepForm) {
					setMultiStepForm(storedMultiStepForm);
				}
				setIsLoading(false);
			})
			.catch((e) => {
				new Error(JSON.stringify(e));
			});
	}, [repository, uuid]);

	function saveStep({
		stepData,
		previousStep,
		nextStep,
	}: {
		stepData: Partial<MultiStepForm>;
		previousStep: number;
		nextStep: number;
	}) {
		stepData.uuid = uuid;
		repository
			.save(stepData as MultiStepForm)
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
				multiStepForm,
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
