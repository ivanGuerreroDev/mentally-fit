import React from "react";
import { useSelector } from "react-redux";

const Page1 = () => {
	const dataReport = useSelector((state) => state.userReport.current);

	const report =
		dataReport == null &&
		JSON.parse(localStorage.getItem("currentParticipante"))
			? JSON.parse(localStorage.getItem("currentParticipante"))
			: dataReport;

	const dataTableData = useSelector((state) =>
		state.userReport.current
			? state.userReport.current.page1.tableData
			: null
	);

	const tableData =
		dataTableData == null &&
		JSON.parse(localStorage.getItem("tableDataParticipante"))
			? JSON.parse(localStorage.getItem("tableDataParticipante"))
			: dataTableData;

	const vchart = useSelector((state) => {
		const dataResult = state.userReport.current
			? state.userReport.current.chartPage1
			: null;

		const result =
			dataResult == null
				? localStorage.getItem("chartPage1")
				: dataResult;

		return JSON.stringify(result);
	});

	return report && tableData ? (
		<div className="page-container container-fluid" id="print">
			<div className="texto-container">
				<p>Este reporte muestra el resultado final de tu Escaneo de Energía Personal. En el centro del gráfico radial se encuentra el Índice de tu Energía Global y alrededor de este, el promedio de las dimensiones de Energía Física, Energía Mental, Energía Emocional y Energía Espiritual con un código de colores que señala las áreas en de fortalezas (en verde), unas zonas que no se deben descuidar y hay que intentar potenciar (en anaranjado) y áreas en las cuales se deben enfocar los esfuerzos de mejora (rojo).</p>
			</div>

			<div id="pie-chart" className="grafico-container">
				<chart-personal
					data={vchart}
					className="chart-final"
					id="stackD"
				></chart-personal>
			</div>
			<span className="titulo my-5">
				<b>	
					{report.campaign.name} - {report.participant.name} -{" "}
					{report.campaign.date_start} - {report.campaign.date_end}
				</b>
			</span>
			<div className="areas">
				<div class="row mb-4">
					<div className="col-12 col-lg-6">
						<div class="row align-items-center">
							<div class="col-8 col-md-10 mb-4">
								<p className="area-titulo">M - Mental</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.personal_report.M.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								M1 – {report.personal_report.M.areas.M1.name}{" "}
								<span className="puntos">
									{report.personal_report.M.areas.M1.value}
								</span>
							</li>
							<li className="mb-1">
								M2 – {report.personal_report.M.areas.M2.name}{" "}
								<span className="puntos">
									{report.personal_report.M.areas.M2.value}
								</span>
							</li>
							<li className="mb-1">
								M3 – {report.personal_report.M.areas.M3.name}{" "}
								<span className="puntos">
									{report.personal_report.M.areas.M3.value}
								</span>
							</li>
							<li className="mb-1">
								M4 – {report.personal_report.M.areas.M4.name}{" "}
								<span className="puntos">
									{report.personal_report.M.areas.M4.value}
								</span>
							</li>
						</ul>
					</div>
					<div className="col-12 col-lg-6">
						<div class="row align-items-center">
							<div class="col-8 col-md-10 mb-4">
								<p className="area-titulo">F - Fisica</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.personal_report.F.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								F1 – {report.personal_report.F.areas.F1.name}{" "}
								<span className="puntos">
									{report.personal_report.F.areas.F1.value}
								</span>
							</li>
							<li className="mb-1">
								F2 – {report.personal_report.F.areas.F2.name}{" "}
								<span className="puntos">
									{report.personal_report.F.areas.F2.value}
								</span>
							</li>
							<li className="mb-1">
								F3 – {report.personal_report.F.areas.F3.name}{" "}
								<span className="puntos">
									{report.personal_report.F.areas.F3.value}
								</span>
							</li>
							<li className="mb-1">
								F4 – {report.personal_report.F.areas.F4.name}{" "}
								<span className="puntos">
									{report.personal_report.F.areas.F4.value}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="row mb-4">
					<div className="col-12 col-lg-6">
						<div class="row align-items-center">
							<div class="col-8 col-md-10 mb-4">
								<p className="area-titulo">E - Emocional</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.personal_report.E.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								E1 – {report.personal_report.E.areas.E1.name}{" "}
								<span className="puntos">
									{report.personal_report.E.areas.E1.value}
								</span>
							</li>
							<li className="mb-1">
								E2 – {report.personal_report.E.areas.E2.name}{" "}
								<span className="puntos">
									{report.personal_report.E.areas.E2.value}
								</span>
							</li>
							<li className="mb-1">
								E3 – {report.personal_report.E.areas.E3.name}{" "}
								<span className="puntos">
									{report.personal_report.E.areas.E3.value}
								</span>
							</li>
							<li className="mb-1">
								E4 – {report.personal_report.E.areas.E4.name}{" "}
								<span className="puntos">
									{report.personal_report.E.areas.E4.value}
								</span>
							</li>
						</ul>
					</div>
					<div className="col-12 col-lg-6">
						<div class="row align-items-center">
							<div class="col-8 col-md-10 mb-4">
								<p className="area-titulo">S - Espiritual</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.personal_report.S.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								S1 – {report.personal_report.S.areas.S1.name}{" "}
								<span className="puntos">
									{report.personal_report.S.areas.S1.value}
								</span>
							</li>
							<li className="mb-1">
								S2 – {report.personal_report.S.areas.S2.name}{" "}
								<span className="puntos">
									{report.personal_report.S.areas.S2.value}
								</span>
							</li>
							<li className="mb-1">
								S3 – {report.personal_report.S.areas.S3.name}{" "}
								<span className="puntos">
									{report.personal_report.S.areas.S3.value}
								</span>
							</li>
							<li className="mb-1">
								S4 – {report.personal_report.S.areas.S4.name}{" "}
								<span className="puntos">
									{report.personal_report.S.areas.S4.value}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="resumen-container">
				<div className="fila-titulo">
					<div className="titulo-left">CON ENERGÍA</div>
					<div className="titulo-right">NECESITA RECARGAS</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.conEnergia.value}</span>{" "}
						{tableData.conEnergia.name}
					</div>
					<div className="contenido-derecha">
						<span>{tableData.necesitaRecarga.value}</span>{" "}
						{tableData.necesitaRecarga.name}
					</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">

						<span>{tableData.listadoDeAreas[15].value}</span>{" "}
						{tableData.listadoDeAreas[15].name}
					</div>
					<div className="contenido-derecha">
						<span>{tableData.listadoDeAreas[0].value}</span>{" "}
						{tableData.listadoDeAreas[0].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.listadoDeAreas[14].value}</span>{" "}
						{tableData.listadoDeAreas[14].name}
					</div>
					<div className="contenido-derecha">
						<span>{tableData.listadoDeAreas[1].value}</span>{" "}
						{tableData.listadoDeAreas[1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.listadoDeAreas[13].value}</span>{" "}
						{tableData.listadoDeAreas[13].name}
					</div>
					<div className="contenido-derecha">
						<span>{tableData.listadoDeAreas[2].value}</span>{" "}
						{tableData.listadoDeAreas[2].name}
					</div>
				</div>
			</div>
			<div className="resumen-container responsi container">
				<div className="fila-titulo">
					<div className="titulo-left">CON ENERGÍA</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.conEnergia.value}</span>{" "}
						{tableData.conEnergia.name}
					</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.conEnergia.areas[0].value}</span>{" "}
						{tableData.conEnergia.areas[0].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.conEnergia.areas[1].value}</span>{" "}
						{tableData.conEnergia.areas[1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{tableData.conEnergia.areas[2].value}</span>{" "}
						{tableData.conEnergia.areas[2].name}
					</div>
				</div>
				<hr />
				<div className="fila-titulo">
					<div className="titulo-right">NECESITA RECARGAS</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>{tableData.necesitaRecarga.value}</span>{" "}
						{tableData.necesitaRecarga.name}
					</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>{tableData.necesitaRecarga.areas[0].value}</span>{" "}
						{tableData.necesitaRecarga.areas[0].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>{tableData.necesitaRecarga.areas[1].value}</span>{" "}
						{tableData.necesitaRecarga.areas[1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>{tableData.necesitaRecarga.areas[2].value}</span>{" "}
						{tableData.necesitaRecarga.areas[2].name}
					</div>
				</div>
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default Page1;
