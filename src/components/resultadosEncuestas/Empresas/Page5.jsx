import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Knob from '../../../utils/Knob';

const Page5 = () => {
	const dataReport = useSelector(
		(state) => state.AdminReportReducer.currentEmpresas
	);

	const report = dataReport == null ? JSON.parse(localStorage.getItem('currentEmpresa')) : dataReport

	const data = {
		...report.organizational_report.E,
	};

	const informacion = [
		data.areas.E1,
		data.areas.E2,
		data.areas.E3,
		data.areas.E4,
	];
	const criterios = [
		Object.values(data.areas.E1.criterias),
		Object.values(data.areas.E2.criterias),
		Object.values(data.areas.E3.criterias),
		Object.values(data.areas.E4.criterias),
	];

	const newCriterios = [
		...Object.values(report.company_report.E.areas.E1.criterias),
		...Object.values(report.company_report.E.areas.E2.criterias),
		...Object.values(report.company_report.E.areas.E3.criterias),
		...Object.values(report.company_report.E.areas.E4.criterias),
	];

	const newAreas = [
		{
			name: report.company_report.E.areas.E1.name,
			value: report.company_report.E.areas.E1.value,
		},
		{
			name: report.company_report.E.areas.E2.name,
			value: report.company_report.E.areas.E2.value,
		},
		{
			name: report.company_report.E.areas.E3.name,
			value: report.company_report.E.areas.E3.value,
		},
		{
			name: report.company_report.E.areas.E4.name,
			value: report.company_report.E.areas.E4.value,
		},
	];

	const areasOrdenadas = newAreas.sort((a, b) => b.value - a.value);

	const criteriosOrdenados = newCriterios.sort((a, b) => b.value - a.value);

	const setColor = (value) => {
		if (0 <= value && value <= 20) return "#FF0000";
		if (21 <= value && value <= 40) return "#E69138";
		if (41 <= value && value <= 60) return "#F9CB9C";
		if (61 <= value && value <= 80) return "#D9EAD3";
		if (81 <= value && value <= 100) return "#93C47D";
	};

	return (
		<div className="page-container container-fluid"  id="print" >
			<div className="row">
				<div className="col-md-8 col-12">
					<h2 className="title-page-3">Reporte Organizacional</h2>
					<div className="texto-container">
						<div className="">
							<h3>Gestión de la energía emocional</h3>
							<p>
								Estos resultados hablan del manejo de la energía emocional de los empleados. En muchos casos, la emocionalidad es vista como un signo de debilidad en el lugar de trabajo y no como un elemento importante del rendimiento en campo profesional. Sin embargo, es muy importante prestar atención a cómo los colaboradores manejan sus emociones ya que consciente e inconscientemente las utilizan con el fin de actuar y de tomar decisiones. Si ellos experimentan poca energía emocional, les resultará más difícil ser productivos, disfrutar del trabajo y de su vida privada debido a dificultades para manejar el estrés, socializar, tomar buenas decisiones y actuar.
							</p>
						</div>
					</div>
				</div>
				<div className="col-md-4 col-12 indice-energia">
					<div className="icono-text-container">
						<div className="icono-container">
							<Knob
								value={parseInt(
									report.organizational_report.E.value
								)}
								width={110}
								height={110}
								angleArc={240}
								angleOffset={240}
								className="page4-icono-progress"
								fgColor={setColor(
									report.organizational_report.E.value
								)}
								readOnly
								disableTextInput
								inputColor="#099baa"
							/>
						</div>
						<span className="texto-indice">
							Índice de energía física
						</span>
					</div>
				</div>
			</div>
			{informacion.map((area, index) => {
				return (
					<div className="grafico-container" key={index}>
						<p class="titulo-area">
							{area.sufix} - {area.name}
						</p>
						{criterios[index] ? (
							criterios[index].map((criterio, ind) => {
								return (
									<div
										key={ind}
										className="row d-flex justify-content-between mb-3"
									>
										<div class="col-md-3 col-12 criterio-titulo">
											{criterio.sufix} {criterio.name}
										</div>
										<div className="dimensiones-page-3 col-md-9 col-12">
											<div className="dimension">
												<div className="bar-progress">
													{criterio.requiere_atencion !==
													"0.00" ? (
														<div
															className="progress"
															style={{
																width: `${criterio.requiere_atencion}%`,
																backgroundColor:
																	"#FF0000",
																color:
																	parseInt(
																		criterio.requiere_atencion
																	) < 3.0
																		? "#FF0000"
																		: "white",
															}}
														>{`${criterio.requiere_atencion}%`}</div>
													) : (
														<div
															style={{
																display: "none",
															}}
														></div>
													)}

													{criterio.necesita_mejorar !==
													"0.00" ? (
														<div
															className="progress"
															style={{
																width: `${criterio.necesita_mejorar}%`,
																backgroundColor:
																	"#E69138",
																color:
																	parseInt(
																		criterio.necesita_mejorar
																	) > 3.0
																		? "#44546a"
																		: "#E69138",
															}}
														>{`${criterio.necesita_mejorar}%`}</div>
													) : (
														<div
															style={{
																display: "none",
															}}
														></div>
													)}

													{criterio.razonable !==
													"0.00" ? (
														<div
															className="progress"
															style={{
																width: `${criterio.razonable}%`,
																backgroundColor:
																	"#F9CB9C",
																color:
																	parseInt(
																		criterio.razonable
																	) > 3.0
																		? "#44546a"
																		: "#F9CB9C",
															}}
														>{`${criterio.razonable}%`}</div>
													) : (
														<div
															style={{
																display: "none",
															}}
														></div>
													)}

													{criterio.bueno !==
													"0.00" ? (
														<div
															className="progress"
															style={{
																width: `${criterio.bueno}%`,
																backgroundColor:
																	"#D9EAD3",
																color:
																	parseInt(
																		criterio.bueno
																	) > 3.0
																		? "#44546a"
																		: "#D9EAD3",
															}}
														>{`${criterio.bueno}%`}</div>
													) : (
														<div
															style={{
																display: "none",
															}}
														></div>
													)}

													{criterio.excelente !==
													"0.00" ? (
														<div
															className="progress"
															style={{
																width: `${criterio.excelente}%`,
																backgroundColor:
																	"#93C47D",
																color:
																	parseInt(
																		criterio.excelente
																	) > 3.0
																		? "#44546a"
																		: "#93C47D",
															}}
														>{`${criterio.excelente}%`}</div>
													) : (
														<div
															style={{
																display: "none",
															}}
														></div>
													)}
												</div>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div></div>
						)}
						<div className="row">
							<div className="referencia-colores col-12 row d-flex flex-row-reverse">
								<div className="color col-2">
									<div className="cuadrado-color uno" />
									<div className="texto-referencia">
										Requiere atención
									</div>
								</div>
								<div className="color col-2">
									<div className="cuadrado-color dos" />
									<div className="texto-referencia">
										Necesita mejorar
									</div>
								</div>
								<div className="color col-2">
									<div className="cuadrado-color tres" />
									<div className="texto-referencia">
										Razonable
									</div>
								</div>
								<div className="color col-2">
									<div className="cuadrado-color cuatro" />
									<div className="texto-referencia">
										Bueno
									</div>
								</div>
								<div className="color col-2">
									<div className="cuadrado-color cinco" />
									<div className="texto-referencia">
										Excelente
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
			<div className="resumen-container">
				<div className="fila-titulo">
					<div className="titulo-left">Puntajes más altos</div>
					<div className="titulo-right">Puntajes más bajos</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									areasOrdenadas[0].value
								),
								color:
									areasOrdenadas[areasOrdenadas.length - 1]
										.value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{areasOrdenadas[0].value}
						</span>{" "}
						{areasOrdenadas[0].name}
					</div>
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									areasOrdenadas[areasOrdenadas.length - 1]
										.value
								),
								color:
									areasOrdenadas[areasOrdenadas.length - 1]
										.value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{areasOrdenadas[areasOrdenadas.length - 1].value}
						</span>{" "}
						{areasOrdenadas[areasOrdenadas.length - 1].name}
					</div>
				</div>
				<div className="fila-gris">Criterios</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[0].value
								),
								color:
									criteriosOrdenados[0].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{criteriosOrdenados[0].value}
						</span>{" "}
						{criteriosOrdenados[0].name}
					</div>
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[
										criteriosOrdenados.length - 1
									].value
								),
								color:
									criteriosOrdenados[
										criteriosOrdenados.length - 1
									].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{
								criteriosOrdenados[
									criteriosOrdenados.length - 1
								].value
							}
						</span>{" "}
						{criteriosOrdenados[criteriosOrdenados.length - 1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[1].value
								),
								color:
									criteriosOrdenados[1].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{criteriosOrdenados[1].value}
						</span>{" "}
						{criteriosOrdenados[1].name}
					</div>
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[
										criteriosOrdenados.length - 2
									].value
								),
								color:
									criteriosOrdenados[
										criteriosOrdenados.length - 2
									].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{
								criteriosOrdenados[
									criteriosOrdenados.length - 2
								].value
							}
						</span>{" "}
						{criteriosOrdenados[criteriosOrdenados.length - 2].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[2].value
								),
								color:
									criteriosOrdenados[2].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{criteriosOrdenados[2].value}
						</span>{" "}
						{criteriosOrdenados[2].name}
					</div>
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[
										criteriosOrdenados.length - 3
									].value
								),
								color:
									criteriosOrdenados[
										criteriosOrdenados.length - 3
									].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{
								criteriosOrdenados[
									criteriosOrdenados.length - 3
								].value
							}
						</span>{" "}
						{criteriosOrdenados[criteriosOrdenados.length - 3].name}
					</div>
				</div>
			</div>
			{/*--------------------------------------------*/}

			<div className="resumen-container responsi container">
				<div className="fila-titulo">
					<div className="titulo-left">Puntajes más altos</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									areasOrdenadas[0].value
								),
								color:
									areasOrdenadas[areasOrdenadas.length - 1]
										.value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{areasOrdenadas[0].value}
						</span>{" "}
						{areasOrdenadas[0].name}
					</div>
				</div>
				<div className="fila-gris">Criterios</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[0].value
								),
								color:
									criteriosOrdenados[0].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{criteriosOrdenados[0].value}
						</span>{" "}
						{criteriosOrdenados[0].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[1].value
								),
								color:
									criteriosOrdenados[1].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{criteriosOrdenados[1].value}
						</span>{" "}
						{criteriosOrdenados[1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[2].value
								),
								color:
									criteriosOrdenados[2].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{criteriosOrdenados[2].value}
						</span>{" "}
						{criteriosOrdenados[2].name}
					</div>
				</div>
				<hr />
				<div className="fila-titulo">
					<div className="titulo-right">Puntajes más bajos</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									areasOrdenadas[areasOrdenadas.length - 1]
										.value
								),
								color:
									areasOrdenadas[areasOrdenadas.length - 1]
										.value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{areasOrdenadas[areasOrdenadas.length - 1].value}
						</span>{" "}
						{areasOrdenadas[areasOrdenadas.length - 1].name}
					</div>
				</div>
				<div className="fila-gris">Criterios</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[
										criteriosOrdenados.length - 1
									].value
								),
								color:
									criteriosOrdenados[
										criteriosOrdenados.length - 1
									].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{
								criteriosOrdenados[
									criteriosOrdenados.length - 1
								].value
							}
						</span>{" "}
						{criteriosOrdenados[criteriosOrdenados.length - 1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[
										criteriosOrdenados.length - 2
									].value
								),
								color:
									criteriosOrdenados[
										criteriosOrdenados.length - 2
									].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{
								criteriosOrdenados[
									criteriosOrdenados.length - 2
								].value
							}
						</span>{" "}
						{criteriosOrdenados[criteriosOrdenados.length - 2].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span
							style={{
								padding: "10px",
								backgroundColor: setColor(
									criteriosOrdenados[
										criteriosOrdenados.length - 3
									].value
								),
								color:
									criteriosOrdenados[
										criteriosOrdenados.length - 3
									].value > 40
										? "#44546a"
										: "white",
								width: "39px",
								height: "27px",
								borderRadius: "5px",
							}}
						>
							{
								criteriosOrdenados[
									criteriosOrdenados.length - 3
								].value
							}
						</span>{" "}
						{criteriosOrdenados[criteriosOrdenados.length - 3].name}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page5;
