export class UruguayCountryBrandAlreadyExistsError extends Error {
	constructor(url: string) {
		super(`The repository with url ${url} already exists`);
	}
}
