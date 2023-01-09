export class UruguayCountryBrandAlreadyExistsError extends Error {
	constructor(name: string) {
		super(`${name} already exists`);
	}
}
