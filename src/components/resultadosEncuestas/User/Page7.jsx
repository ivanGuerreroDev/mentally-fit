import React, { useState } from "react";
import Knob from '../../../utils/Knob';
import { useSelector } from "react-redux";

const Page7 = () => {
	const dataReport = useSelector((state) => state.userReport.current);

	const report =
		dataReport == null &&
		JSON.parse(localStorage.getItem("currentParticipante"))
			? JSON.parse(localStorage.getItem("currentParticipante"))
			: dataReport;

	const setColor = (value) => {
		if (0 <= value && value <= 20) return "#FF0000";
		if (21 <= value && value <= 40) return "#E69138";
		if (41 <= value && value <= 60) return "#F9CB9C";
		if (61 <= value && value <= 80) return "#D9EAD3";
		if (81 <= value && value <= 100) return "#93C47D";
	};

	const energiaMental = [
		report.personal_report.S.areas.S1,
		report.personal_report.S.areas.S2,
		report.personal_report.S.areas.S3,
		report.personal_report.S.areas.S4,
	];

	const allCriterios = [
		...Object.values(energiaMental[0].criterias),
		...Object.values(energiaMental[1].criterias),
		...Object.values(energiaMental[2].criterias),
		...Object.values(energiaMental[3].criterias),
	];

	const criteriosMayor = allCriterios
		.sort((a, b) => b.value - a.value)
		.slice(0, 3);

	const criteriosMenor = allCriterios
		.sort((a, b) => a.value - b.value)
		.slice(0, 3);

	let max = -Infinity;
	let min = Infinity;
	let keyMax = 0;
	let keyMin = 0;

	energiaMental.forEach((v, k) => {
		if (max < +v.value) {
			max = +v.value;
			keyMax = k;
		}
	});

	energiaMental.forEach((v, k) => {
		if (min > +v.value) {
			min = +v.value;
			keyMin = k;
		}
	});

	function DiffFunction(a, b) {
		
		if( (a - b) < 0 ){

			return (
				<span style={{color:`#FF0000`, }}>{'-' + ((a - b) * -1)}</span>
			  );

		}else{
			if( (a - b) > 0 ){

				return (
					<span style={{color:`#93C47D`}}>{'+' + (a - b)}</span>
				  );

			}else{
				return (
					<span> = </span>
				  );
			}
		}	
	}

	return (
		<div className="page4-container container-fluid"  id="print">
			<div className="header-page-4 row">
				<div className="col-12 row px-0 d-flex justify-content-center">
					<div className="texto col-md-7 col-12 row">
						<span className="col-12 text-title">
							Reporte Energía Espiritual
						</span>
						<span className="col-12 text-bold">
							Gestión de la energía espiritual
						</span>
						<span className="col-12 px-0">
							En los siguientes resultados se observan tus niveles de energía espiritual. La espiritualidad en el lugar de trabajo tiene una relevancia con la prosperidad de los empleados, las organizaciones y las sociedades. Conectando tu esencia con tus actividades y tareas, lo que resulta en un mayor motivación, compromiso con la organización y satisfacción laboral, que como último objetivo proporciona firmeza a tu carrera y aumenta el desempeño aportando todo tu potencial hacia tus metas.
						</span>
					</div>
					<div className="indice-energia col-md-5 col-12">
						<div className="icono-text-container">
							<div className="contain">
								<div className="icono-container">
									<Knob
										value={parseInt(
											report.personal_report.S.value
										)}
										width={110}
										height={110}
										angleArc={240}
										angleOffset={240}
										className="page4-icono-progress"
										fgColor={setColor(
											report.personal_report.S.value
										)}
										readOnly
										disableTextInput
										inputColor="#099baa"
									/>
								</div>
								<span
									className="col-12"
									style={{ textAlign: "center" }}
								>
									Índice de energía espiritual
								</span>
							</div>
							<div className="tarjeta-container participante">
								<div className="tarjeta mt-2">
									<span className="numero-color">
										{report.company_report.S.value} {DiffFunction(report.personal_report.S.value,report.company_report.S.value)}
									</span>
									<span className="texto">vs Empresa</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="tabla-container">
					<div className="titulos-tabla primero row">
						<div className="titulo-left col-6">Área más fuerte</div>
						<div className="titulo-left col-6">Área más débil</div>
					</div>
					<div className="contenido-tabla row">
						<div className="tabla-arriba-left col-6 row">
							<div className="datos col-12">
								<span
									className="numero-color"
									style={{
										backgroundColor: setColor(
											energiaMental[keyMax].value
										),
									}}
								>
									{energiaMental[keyMax].value}
								</span>
								<span className="texto-normal">
									{energiaMental[keyMax].name}
								</span>
							</div>
						</div>
						<div className="tabla-arriba-right col-6 row">
							<div className="datos col-12">
								<span
									className="numero-color"
									style={{
										backgroundColor: setColor(
											energiaMental[keyMin].value
										),
									}}
								>
									{energiaMental[keyMin].value}
								</span>

								<span className="texto-normal">
									{energiaMental[keyMin].name}
								</span>
							</div>
						</div>
					</div>
					<div className="titulos-tabla row">
						<div className="titulo-left col-6">
							3 Criterios con mas energía
						</div>
						<div className="titulo-left col-6">
							3 Criterios con menos energía
						</div>
					</div>
					<div className="contenido-tabla row">
						<div className="tabla-arriba-left col-6 row">
							{criteriosMayor.map((e, index) => {
								return (
									<div className="datos col-12" key={index}>
										<span
											className="numero-color"
											style={{
												backgroundColor: setColor(
													e.value
												),
											}}
										>
											{e.value}
										</span>
										<span className="texto-normal">
											{e.name}
										</span>
									</div>
								);
							})}
						</div>
						<div className="tabla-arriba-right col-6 row">
							{criteriosMenor.map((e, index) => {
								return (
									<div className="datos col-12" key={index}>
										<span
											className="numero-color"
											style={{
												backgroundColor: setColor(
													e.value
												),
											}}
										>
											{e.value}
										</span>
										<span className="texto-normal">
											{e.name}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="tabla-container responsiv">
					<div className="titulos-tabla primero row">
						<div className="titulo-left col-12 d-flex justify-content-center">
							Área más fuerte
						</div>
					</div>
					<div className="contenido-tabla row d-flex justify-content-center">
						<div className="tabla-arriba-left col-12 row">
							<div className="datos col-12">
								<span
									className="numero-color"
									style={{
										backgroundColor: setColor(
											energiaMental[keyMax].value
										),
									}}
								>
									{energiaMental[keyMax].value}
								</span>
								<span className="texto-normal">
									{energiaMental[keyMax].name}
								</span>
							</div>
						</div>
					</div>
					<div className="titulos-tabla row">
						<div className="titulo-left col-12 d-flex justify-content-center">
							3 Criterios con mas energía
						</div>
					</div>
					<div className="contenido-tabla row d-flex justify-content-center">
						<div className="tabla-arriba-left col-12 row">
							{criteriosMayor.map((e, index) => {
								return (
									<div className="datos col-12" key={index}>
										<span
											className="numero-color"
											style={{
												backgroundColor: setColor(
													e.value
												),
											}}
										>
											{e.value}
										</span>
										<span className="texto-normal">
											{e.name}
										</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className="titulos-tabla primero row">
						<div className="titulo-left col-12 d-flex justify-content-center">
							Área más débil
						</div>
					</div>
					<div className="contenido-tabla row d-flex justify-content-center">
						<div className="tabla-arriba-right col-12 row">
							<div className="datos col-12">
								<span
									className="numero-color"
									style={{
										backgroundColor: setColor(
											energiaMental[keyMin].value
										),
									}}
								>
									{energiaMental[keyMin].value}
								</span>

								<span className="texto-normal">
									{energiaMental[keyMin].name}
								</span>
							</div>
						</div>
					</div>
					<div className="titulos-tabla row">
						<div className="titulo-left col-12 d-flex justify-content-center">
							3 Criterios con menos energía
						</div>
					</div>
					<div className="contenido-tabla row d-flex justify-content-center">
						<div className="tabla-arriba-right col-12 row">
							{criteriosMenor.map((e, index) => {
								return (
									<div className="datos col-12" key={index}>
										<span
											className="numero-color"
											style={{
												backgroundColor: setColor(
													e.value
												),
											}}
										>
											{e.value}
										</span>
										<span className="texto-normal">
											{e.name}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page7;
