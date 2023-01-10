type FormData = { uuid: { value: string } };

function generateUUID(length = 8): string {
	return crypto.randomUUID().substring(0, length).toUpperCase();
}

function Home() {
	function handleStartNewApplication() {
		const uuid = generateUUID();
		window.location.href = `/${uuid}`;
	}

	function handleOnSubmitContinueApplication(
		event: React.FormEvent<HTMLFormElement> & { elements: FormData }
	) {
		event.preventDefault();
		const { uuid } = event.target.elements;
		window.location.href = `/${uuid.value}`;
	}

	return (
		<section>
			<h4>Ingresar nueva solicitud</h4>
			<button type="button" onClick={handleStartNewApplication}>
				Ingresar
			</button>
			<hr />
			<h4>Continuar con solicitud</h4>
			<form onSubmit={handleOnSubmitContinueApplication}>
				<label htmlFor="uuid">
					Código de solicitud
					<input
						type="text"
						name="uuid"
						id="uuid"
						required
						minLength={8}
						maxLength={8}
						style={{ textTransform: "uppercase" }}
					/>
				</label>
				<button type="submit">Continuar</button>
			</form>
		</section>
	);
}

export { Home };
