import React from "react";
import muchos from "../../../assets/resultados/muchos.png";
import { useSelector } from "react-redux";

const Page2 = () => {
	const dataReport = useSelector(
		(state) => state.AdminReportReducer.currentEmpresas
	);

	const report = dataReport == null ? JSON.parse(localStorage.getItem('currentEmpresa')) : dataReport


	const dataAllAreas = useSelector(
		(state) => state.AdminReportReducer.currentAllAreas
	);

	const allAreas = dataAllAreas == null ? JSON.parse(localStorage.getItem('allAreasEmpresa')) : dataAllAreas

	const areasOrdenadas = allAreas.sort((a, b) => b.value - a.value);

	const lengthAreasOrdenadas = areasOrdenadas.length;

	const allDimensiones = [
		report.organizational_report.E,
		report.organizational_report.F,
		report.organizational_report.M,
		report.organizational_report.S,
	];

	const dimensionesOrdenadas = allDimensiones.sort(
		(a, b) => b.value - a.value
	);
	const vchart = useSelector((state) =>{
			const dataResult = state.AdminReportReducer.currentEmpresas ? state.AdminReportReducer.currentEmpresas : null
			
			const result = dataResult == null ? JSON.parse(localStorage.getItem('currentEmpresa')) : dataResult


			return JSON.stringify(result);
		}
	);

	return (
		<div className="page-container container-fluid"  id="print" >
			<p className="text-principal">
				Este reporte muestra el promedio de las evaluaciones de todos los participantes que terminaron el test en la empresa. En el centro del gráfico radial se encuentra el Índice de Energía Global de la organización y alrededor de este, el promedio de las dimensiones de Energía Física, Energía Mental, Energía Emocional y Energía Espiritual con un código de colores que señala las áreas en las cuales la empresa tiene fortalezas (en verde), unas zonas que no se deben descuidar y hay que intentar potenciar (en anaranjado) y áreas en las cuales se deben enfocar los esfuerzos de mejora (rojo).
			</p>
			<div className="grafico-container">
				<chart-personal data={vchart} className="chart-final"></chart-personal>
			</div>

			<div className="datos-participantes-empresas row justify-content-between">
				<div className="col-md-12 col-xl-5">
					<div className="dato">
						<div className="row">
							<div className="col-6">
								<p>Completados</p>
								<span className="value">
									{report.participants.completed}
								</span>
							</div>
							<div className="col-6 img">
								<img src={muchos} alt="icono-img" />
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12 col-xl-5">
					<div className="dato">
						<div className="row">
							<div className="col-6">
								<p>Pendientes</p>
								<span className="value">
									{report.participants.pendigns}
								</span>
							</div>
							<div className="col-6 img">
								<img src={muchos} alt="icono-img" />
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12 col-xl-5">
					<div className="dato">
						<div className="row">
							<div className="col-6">
								<p>Sin iniciar</p>
								<span className="value">
									{report.participants.without_starting}
								</span>
							</div>
							<div className="col-6 img">
								<img src={muchos} alt="icono-img" />
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-12 col-xl-5">
					<div className="dato">
						<div className="row">
							<div className="col-6">
								<p>Participantes</p>
								<span className="value">
									{report.participants.total}
								</span>
							</div>
							<div className="col-6 img">
								<img src={muchos} alt="icono-img" />
							</div>
						</div>
					</div>
				</div>
			</div>

			{/*--------------------------------------------*/}

			<div className="informacion-resultado row">
				<span className="col-12">
					{report.campaign.name} - {report.campaign.date_start} -{" "}
					{report.campaign.date_end}
				</span>
			</div>

			{/*--------------------------------------------*/}

			<div className="areas">
				<div className="row mb-4">
					<div className="col-12 col-lg-6">
						<div className="row align-items-center">
							<div className="col-8 col-md-10 mb-4">
								<p className="area-titulo">F - Fisica</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.organizational_report.F.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								F1 –{" "}
								{report.organizational_report.F.areas.F1.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.F.areas.F1
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								F2 –{" "}
								{report.organizational_report.F.areas.F2.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.F.areas.F2
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								F3 –{" "}
								{report.organizational_report.F.areas.F3.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.F.areas.F3
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								F4 –{" "}
								{report.organizational_report.F.areas.F4.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.F.areas.F4
											.value
									}
								</span>
							</li>
						</ul>
					</div>
					<div className="col-12 col-lg-6">
						<div className="row align-items-center">
							<div className="col-8 col-md-10 mb-4">
								<p className="area-titulo">M - Mental</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.organizational_report.M.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								M1 –{" "}
								{report.organizational_report.M.areas.M1.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.M.areas.M1
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								M2 –{" "}
								{report.organizational_report.M.areas.M2.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.M.areas.M2
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								M3 –{" "}
								{report.organizational_report.M.areas.M3.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.M.areas.M3
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								M4 –{" "}
								{report.organizational_report.M.areas.M4.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.M.areas.M4
											.value
									}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="row mb-5">
				<div className="col-12 col-lg-6">
						<div className="row align-items-center">
							<div className="col-8 col-md-10 mb-4">
								<p className="area-titulo">E - Emocional</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.organizational_report.E.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								E1 –{" "}
								{report.organizational_report.E.areas.E1.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.E.areas.E1
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								E2 –{" "}
								{report.organizational_report.E.areas.E2.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.E.areas.E2
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								E3 –{" "}
								{report.organizational_report.E.areas.E3.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.E.areas.E3
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								E4 –{" "}
								{report.organizational_report.E.areas.E4.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.E.areas.E4
											.value
									}
								</span>
							</li>
						</ul>
					</div>
					<div className="col-12 col-lg-6">
						<div className="row align-items-center">
							<div className="col-8 col-md-10 mb-4">
								<p className="area-titulo">S - Espiritual</p>
							</div>
							<div className="col-4 col-md-2 mb-4">
								<p className="area-puntos">
									{report.organizational_report.S.value}
								</p>
							</div>
						</div>
						<ul className="lista">
							<li className="mb-1">
								S1 –{" "}
								{report.organizational_report.S.areas.S1.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.S.areas.S1
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								S2 –{" "}
								{report.organizational_report.S.areas.S2.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.S.areas.S2
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								S3 –{" "}
								{report.organizational_report.S.areas.S3.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.S.areas.S3
											.value
									}
								</span>
							</li>
							<li className="mb-1">
								S4 –{" "}
								{report.organizational_report.S.areas.S4.name}{" "}
								<span className="puntos">
									{
										report.organizational_report.S.areas.S4
											.value
									}
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/*--------------------------------------------*/}

			<div className="resumen-container">
				<div className="fila-titulo">
					<div className="titulo-left">Puntajes más altos</div>
					<div className="titulo-right">Puntajes más bajos</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{dimensionesOrdenadas[0].value}</span>{" "}
						{dimensionesOrdenadas[0].name.slice(7)}
					</div>
					<div className="contenido-derecha">
						<span>
							{
								dimensionesOrdenadas[
									dimensionesOrdenadas.length - 1
								].value
							}
						</span>{" "}
						{dimensionesOrdenadas[
							dimensionesOrdenadas.length - 1
						].name.slice(7)}
					</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{areasOrdenadas[0].value}</span>{" "}
						{areasOrdenadas[0].name}
					</div>
					<div className="contenido-derecha">
						<span>
							{areasOrdenadas[lengthAreasOrdenadas - 1].value}
						</span>{" "}
						{areasOrdenadas[lengthAreasOrdenadas - 1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{areasOrdenadas[1].value}</span>{" "}
						{areasOrdenadas[1].name}
					</div>
					<div className="contenido-derecha">
						<span>
							{areasOrdenadas[lengthAreasOrdenadas - 2].value}
						</span>{" "}
						{areasOrdenadas[lengthAreasOrdenadas - 2].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{areasOrdenadas[2].value}</span>{" "}
						{areasOrdenadas[2].name}
					</div>
					<div className="contenido-derecha">
						<span>
							{areasOrdenadas[lengthAreasOrdenadas - 3].value}
						</span>{" "}
						{areasOrdenadas[lengthAreasOrdenadas - 3].name}
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
						<span>{dimensionesOrdenadas[0].value}</span>{" "}
						{dimensionesOrdenadas[0].name.slice(7)}
					</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{areasOrdenadas[0].value}</span>{" "}
						{areasOrdenadas[0].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{areasOrdenadas[1].value}</span>{" "}
						{areasOrdenadas[1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-izquierda">
						<span>{areasOrdenadas[2].value}</span>{" "}
						{areasOrdenadas[2].name}
					</div>
				</div>
				<hr />
				<div className="fila-titulo">
					<div className="titulo-right">Puntajes más bajos</div>
				</div>
				<div className="fila-gris">Dimensión</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>
							{
								dimensionesOrdenadas[
									dimensionesOrdenadas.length - 1
								].value
							}
						</span>{" "}
						{dimensionesOrdenadas[
							dimensionesOrdenadas.length - 1
						].name.slice(7)}
					</div>
				</div>
				<div className="fila-gris">Áreas</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>
							{areasOrdenadas[lengthAreasOrdenadas - 1].value}
						</span>{" "}
						{areasOrdenadas[lengthAreasOrdenadas - 1].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>
							{areasOrdenadas[lengthAreasOrdenadas - 2].value}
						</span>{" "}
						{areasOrdenadas[lengthAreasOrdenadas - 2].name}
					</div>
				</div>
				<div className="fila-contenido">
					<div className="contenido-derecha">
						<span>
							{areasOrdenadas[lengthAreasOrdenadas - 3].value}
						</span>{" "}
						{areasOrdenadas[lengthAreasOrdenadas - 3].name}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page2;
