import { useEffect, useState } from "react";

import { defaultUruguayCountryBrand, UruguayCountryBrand } from "../../domain/UruguayCountryBrand";
import { UruguayCountryBrandRepository } from "../../domain/UruguayCountryBrandRepository";

function useUruguayCountryBrand({
	repository,
	uuid,
}: {
	repository: UruguayCountryBrandRepository;
	uuid: string;
}): {
	uruguayCountryBrand: UruguayCountryBrand;
	isLoading: boolean;
} {
	const [uruguayCountryBrand, setUruguayCountryBrand] = useState<UruguayCountryBrand>(() => {
		return defaultUruguayCountryBrand();
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		repository
			.search(uuid)
			.then((storedUruguayCountryBrand) => {
				if (storedUruguayCountryBrand) {
					setUruguayCountryBrand(storedUruguayCountryBrand);
				}
				setIsLoading(false);
			})
			.catch((e) => {
				new Error(JSON.stringify(e));
			});
	}, [repository]);

	return { uruguayCountryBrand, isLoading };
}

export { useUruguayCountryBrand };
