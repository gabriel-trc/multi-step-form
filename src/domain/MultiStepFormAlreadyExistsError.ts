export class MultiStepFormAlreadyExistsError extends Error {
	constructor(name: string) {
		super(`${name} already exists`);
	}
}
