import React, { useState } from "react";
import Knob from '../../../utils/Knob';
import { useSelector } from "react-redux";

const Page6 = () => {
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
		report.personal_report.E.areas.E1,
		report.personal_report.E.areas.E2,
		report.personal_report.E.areas.E3,
		report.personal_report.E.areas.E4,
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
							Reporte Energía Emocional
						</span>
						<span className="col-12 text-bold">
							Gestión de la energía emocional
						</span>
						<span className="col-12 px-0">
							Estos resultados hablan del manejo de tu energía emocional. En muchos casos, la emocionalidad es vista como un signo de debilidad en el lugar de trabajo y no como un elemento importante del rendimiento en campo profesional. Sin embargo, es muy importante prestar atención a cómo manejas tus emociones ya que consciente e inconscientemente las utilizas con el fin de actuar y de tomar decisiones. Si experimentas poca energía emocional, te resultará más difícil ser productivo/a, disfrutar del trabajo y de tu vida privada debido a dificultades para manejar el estrés, socializar, tomar buenas decisiones y actuar.
						</span>
					</div>
					<div className="indice-energia col-md-5 col-12">
						<div className="icono-text-container">
							<div className="contain">
								<div className="icono-container">
									<Knob
										value={parseInt(
											report.personal_report.E.value
										)}
										width={110}
										height={110}
										angleArc={240}
										angleOffset={240}
										className="page4-icono-progress"
										fgColor={setColor(
											report.personal_report.E.value
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
									Índice de energía emocional
								</span>
							</div>
							<div className="tarjeta-container participante">
								<div className="tarjeta mt-2">
									<span className="numero-color">
										{report.company_report.E.value} {DiffFunction(report.personal_report.E.value,report.company_report.E.value)}
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

export default Page6;
