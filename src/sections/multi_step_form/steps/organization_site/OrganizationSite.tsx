import { useEffect, useRef, useState } from "react";

import { useMultiStepFormContext } from "../../MultiStepFormContexProvider";
import { UIEvents } from "../../UIEvents";

function OrganizationSite() {
	const [subsidiaries, setSubsidiaries] = useState([
		{ id: 1, dir: "a", name: "a" },
		{ id: 2, dir: "b", name: "b" },
	]);
	const [showRowForm, setShowRowForm] = useState(false);
	const [editingRowId, setEditingRowId] = useState(0);
	const [subsidiaryName, setSubsidiaryName] = useState("");
	const [subsidiaryDirecction, setSubsidiaryDirecction] = useState("");

	function handleChangeSubsidiaryName(event) {
		setSubsidiaryName(event.target.value);
	}

	function handleChangeSubsidiaryDirecction(event) {
		setSubsidiaryDirecction(event.target.value);
	}

	function handleClickShowAddRow() {
		if (showRowForm) {
			setShowRowForm(false);
			setSubsidiaryName("");
			setSubsidiaryDirecction("");
		} else {
			setShowRowForm(true);
		}
	}

	function handleClickSaveRow() {
		if (editingRowId) {
			setSubsidiaries(
				subsidiaries.map((s) =>
					s.id === editingRowId
						? {
								id: editingRowId,
								dir: subsidiaryName,
								name: subsidiaryDirecction,
						  }
						: { ...s }
				)
			);
		} else {
			setSubsidiaries([
				...subsidiaries,
				{ id: Math.floor(Math.random() * 10000), dir: subsidiaryName, name: subsidiaryDirecction },
			]);
		}

		setShowRowForm(false);
		setSubsidiaryName("");
		setSubsidiaryDirecction("");
	}

	function handleClickCancelRow() {
		setShowRowForm(false);
		setEditingRowId(0);
		setSubsidiaryName("");
		setSubsidiaryDirecction("");
	}

	function handleClickEditRow(subsidiary) {
		setEditingRowId(subsidiary.id);
		setSubsidiaryName(subsidiary.name);
		setSubsidiaryDirecction(subsidiary.dir);
	}
	function handleClickDeleteRow(subsidiaryId) {
		setSubsidiaries(subsidiaries.filter((e) => e.id !== subsidiaryId));
	}

	return (
		<table>
			<thead>
				<tr>
					<th colSpan={2}>Sucursales</th>
					<th>
						<button type="button" disabled={showRowForm} onClick={handleClickShowAddRow}>
							Agregar
						</button>
					</th>
				</tr>
				<tr>
					<th>Nombre</th>
					<th>Dirección</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{showRowForm && (
					<tr>
						<td>
							<input
								name="otherHeadquarterName"
								id="otherHeadquarterName"
								type="text"
								value={subsidiaryName}
								onChange={handleChangeSubsidiaryName}
							/>
						</td>
						<td>
							<input
								name="otherHeadquarterDirecction"
								id="otherHeadquarterDirecction"
								type="text"
								value={subsidiaryDirecction}
								onChange={handleChangeSubsidiaryDirecction}
							/>
						</td>
						<td>
							<button type="button" onClick={handleClickSaveRow}>
								Guardar
							</button>
							<button type="button" onClick={handleClickCancelRow}>
								Cancelar
							</button>
						</td>
					</tr>
				)}
				{subsidiaries.map((d) => {
					return editingRowId === d.id ? (
						<tr key={d.id}>
							<td>
								<input
									name="otherHeadquarterName"
									id="otherHeadquarterName"
									type="text"
									value={subsidiaryName}
									onChange={handleChangeSubsidiaryName}
								/>
							</td>
							<td>
								<input
									name="otherHeadquarterDirecction"
									id="otherHeadquarterDirecction"
									type="text"
									value={subsidiaryDirecction}
									onChange={handleChangeSubsidiaryDirecction}
								/>
							</td>
							<td>
								<button type="button" onClick={handleClickSaveRow}>
									Guardar
								</button>
								<button type="button" onClick={handleClickCancelRow}>
									Cancelar
								</button>
							</td>
						</tr>
					) : (
						<tr key={d.id}>
							<td>{d.dir}</td>
							<td>{d.name}</td>
							<td>
								<button type="button" onClick={() => handleClickEditRow(d)}>
									Editar
								</button>
								<button type="button" onClick={() => handleClickDeleteRow(d.id)}>
									Borrar
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

function aOrganizationSite() {
	const [organizationSiteHasOthersHeadquarters, setOrganizationSiteHasOthersHeadquarters] =
		useState(false);
	const { currentStep, multiStepForm, saveStep, formRef } = useMultiStepFormContext();

	const { organizationSiteHeadquarter, organizationSiteOthersHeadquartersDocuments } =
		multiStepForm;

	const othersHeadquartersTableRef = useRef(null);
	const othersHeadquartersAddButtonRef = useRef(null);

	useEffect(() => {
		setOrganizationSiteHasOthersHeadquarters(multiStepForm.organizationSiteHasOthersHeadquarters);
	}, [multiStepForm]);

	// useEffect(() => {
	// 	othersHeadquartersTableRef.current.style.display = organizationSiteHasOthersHeadquarters
	// 		? "table"
	// 		: "none";
	// 	othersHeadquartersAddButtonRef.current.style.display = organizationSiteHasOthersHeadquarters
	// 		? "block"
	// 		: "none";
	// }, [organizationSiteHasOthersHeadquarters]);

	useEffect(() => {
		const submitStepData = () => {
			const organizationSiteHeadquarter =
				formRef.current.elements.organizationSiteHeadquarter.value;
			let organizationSiteOthers = formRef.current.elements.organizationSiteOthers.value;
			const organizationSiteOthersDocuments =
				formRef.current.elements.organizationSiteOthersDocuments.value;

			saveStep({
				stepData: {
					organizationSiteHeadquarter,
					organizationSiteOthers,
					organizationSiteOthersDocuments,
				},
				previousStep: currentStep,
				nextStep: currentStep + 1,
			});
		};
		document.addEventListener(UIEvents.buildInFormValidateSucess, submitStepData);

		return () => {
			document.removeEventListener(UIEvents.buildInFormValidateSucess, submitStepData);
		};
	}, []);

	function handleOnChangeOrganizationSiteHasOthersHeadquarters(
		event: React.ChangeEventHandler<HTMLInputElement>
	) {
		setOrganizationSiteHasOthersHeadquarters(event.target.checked);
	}

	return (
		<section>
			<h3>4- Sitio de la organización</h3>
			<label htmlFor="organizationSiteHeadquarter">
				Dirección *
				<input
					type="text"
					name="organizationSiteHeadquarter"
					id="organizationSiteHeadquarter"
					required
					defaultValue={organizationSiteHeadquarter}
				/>
			</label>
			<label htmlFor="organizationSiteHasOthersHeadquarters">
				Tiene más sitios
				<input
					name="organizationSiteHasOthersHeadquarters"
					id="organizationSiteHasOthersHeadquarters"
					type="checkbox"
					checked={organizationSiteHasOthersHeadquarters}
					onChange={handleOnChangeOrganizationSiteHasOthersHeadquarters}
				/>
			</label>
			<Table />
		</section>
	);
}

export { OrganizationSite };
