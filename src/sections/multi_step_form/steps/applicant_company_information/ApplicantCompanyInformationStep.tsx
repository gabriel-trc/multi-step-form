/* eslint-disable @typescript-eslint/no-misused-promises */
function ApplicantCompanyInformationStep() {
	return (
		<section>
			<h3>2 - Datos de la empresa solicitante</h3>
			<label htmlFor="contactPersonName">
				Nombre
				<input type="text" name="contactPersonName" id="contactPersonName" required />
			</label>
			<label htmlFor="contactPersonLastName">
				Apellido
				<input type="text" name="contactPersonLastName" id="contactPersonLastName" />
			</label>
		</section>
	);
}

export { ApplicantCompanyInformationStep };
