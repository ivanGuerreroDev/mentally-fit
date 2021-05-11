import React from "react";
import Knob from '../../../utils/Knob';
import { useSelector } from "react-redux";

const Page8 = () => {
	const dataReport = useSelector((state) => state.userReport.current);

	const report =
		dataReport == null &&
		JSON.parse(localStorage.getItem("currentParticipante"))
			? JSON.parse(localStorage.getItem("currentParticipante"))
			: dataReport;

	const allCriterios = [
		report.energy_lost[1],
		report.energy_lost[2],
		report.energy_lost[3],
	];

	const setColor = (value) => {
		if (0 <= value && value <= 20) return "#FF0000";
		if (21 <= value && value <= 40) return "#E69138";
		if (41 <= value && value <= 60) return "#F9CB9C";
		if (61 <= value && value <= 80) return "#D9EAD3";
		if (81 <= value && value <= 100) return "#93C47D";
	};

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
		<div className="page5-container container-fluid row"  id="print">
			<div className="header-page col-12">
				<span className="text-title">
					Principales pérdidas de energía
				</span>			
			</div>
			<div class="texto col-12 row">
				<span>
					Este reporte muestra el resultado final de tu Escaneo de Energía Personal. En el centro del gráfico radial se encuentra el Índice de tu Energía Global y alrededor de este, el promedio de las dimensiones de Energía Física, Energía Mental, Energía Emocional y Energía Espiritual con un código de colores que señala las áreas en de fortalezas (en verde), unas zonas que no se deben descuidar y hay que intentar potenciar (en anaranjado) y áreas en las cuales se deben enfocar los esfuerzos de mejora (rojo).
				</span>
			</div>
			<br/>
			<div className="indice-energia col-md-12 col-12">
				<div className="icono-text-container">
					<div className="icono-tarjeta-container">
						<div className="icono-texto-abajo-container col-md-12 col-12">
							<div className="otro-contain">
								<div className="icono-container">
									<Knob
										value={parseInt(
											report.energy_lost[0].score
										)}
										width={150}
										height={150}
										angleArc={240}
										angleOffset={240}
										fgColor={setColor(
											report.energy_lost[0].score
										)}
										className="page4-icono-progress"
										readOnly
										disableTextInput
									/>
								</div>
								<div className="tarjeta-container col-md-6 col-6 row ml-5">
									<div className="tarjeta">
										<span className="numero-color">
											{
												report.energy_lost[0]
													.score_company
											} {DiffFunction(report.energy_lost[0].score,report.energy_lost[0]
												.score_company)}
										</span>
										<span className="col-12 texto">
											vs Empresa
										</span>
									</div>
								</div>
							</div>
							<div className="texto-container">
								<span className="texto-bold col-12">
									{report.energy_lost[0].name} 
								</span>
							</div>
							<div className="recomendaciones-container">
								<div style={{ color: "black", textAlign: "justify"}}
											dangerouslySetInnerHTML={{
												__html:
													report.energy_lost[0]
														.recommendations,
											}}
										></div>
								{/*<ul
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<li>
										<div
											style={{ color: "black" }}
											dangerouslySetInnerHTML={{
												__html:
													report.energy_lost[0]
														.recommendations,
											}}
										></div>
									</li>
										</ul>*/}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="indice-energia row">
				<div className="icono-text-container col-12 col-md-6">
					<div className="icono-tarjeta-container ">
						<div className="icono-texto-abajo-container col-md-12 col-12">
							<div className="otro-contain">
								<div className="icono-container">
									<Knob
											value={parseInt(allCriterios[0].score)}
										width={150}
										height={150}
										angleArc={240}
										angleOffset={240}
										fgColor={setColor(
											allCriterios[0].score
										)}
										className="page4-icono-progress"
										readOnly
										disableTextInput
									/>
								</div>
								<div className="tarjeta-container col-md-6 col-6 row ml-5">
									<div className="tarjeta">
										<span className="numero-color">
											{allCriterios[0].score_company} {DiffFunction(allCriterios[0].score,allCriterios[0].score_company)}
										</span>
										<span className="col-12 texto">
											vs Empresa
										</span>
									</div>
								</div>
							</div>
							<div className="texto-container">
								<span className="texto-bold col-12">
									Pérdidas de Energía #{1} -{" "}
									{allCriterios[0].name}
								</span>
							</div>
							<div className="recomendaciones-container">
								<div
											style={{ color: "black",
											justifyContent: "center", textAlign: "justify"}}
											dangerouslySetInnerHTML={{
												__html:
													allCriterios[0]
														.recommendations,
											}}
										></div>
								{/*<ul
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<li>
										<div
											style={{ color: "black" }}
											dangerouslySetInnerHTML={{
												__html:
													allCriterios[0]
														.recommendations,
											}}
										></div>
									</li>
										</ul>*/}
							</div>
						</div>
					</div>
				</div>
				<div className="icono-text-container col-12 col-md-6">
					<div className="icono-tarjeta-container ">
						<div className="icono-texto-abajo-container col-md-12 col-12">
							<div className="otro-contain">
								<div className="icono-container mr-5">
									<Knob
										value={parseInt(allCriterios[1].score)}
										width={150}
										height={150}
										angleArc={240}
										angleOffset={240}
										fgColor={setColor(
											allCriterios[1].score
										)}
										className="page4-icono-progress"
										readOnly
										disableTextInput
									/>
								</div>
								<div className="tarjeta-container col-md-6 col-6 row ml-5">									<div className="tarjeta">
										<span className="numero-color">
											{allCriterios[1].score_company} {DiffFunction(allCriterios[1].score,allCriterios[1].score_company)}
										</span>
										<span className="col-12 texto">
											vs Empresa
										</span>
									</div>
								</div>
							</div>
							<div className="texto-container">
								<span className="texto-bold col-12">
									Pérdidas de Energía #{2} -{" "}
									{allCriterios[1].name}
								</span>
							</div>
							<div className="recomendaciones-container">
							<div
											style={{ color: "black",
											justifyContent: "center", textAlign: "justify"}}
											dangerouslySetInnerHTML={{
												__html:
													allCriterios[1]
														.recommendations,
											}}
										></div>
								{/*<ul
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<li>
										<div
											style={{ color: "black" }}
											dangerouslySetInnerHTML={{
												__html:
													allCriterios[1]
														.recommendations,
											}}
										></div>
									</li>
										</ul>*/}
							</div>
						</div>
					</div>
				</div>
				<div className="icono-text-container col-12 col-md-6">
					<div className="icono-tarjeta-container ">
						<div className="icono-texto-abajo-container col-md-12 col-12">
							<div className="otro-contain">
								<div className="icono-container mr-5">
									<Knob
										value={parseInt(allCriterios[2].score)}
										width={150}
										height={150}
										angleArc={240}
										angleOffset={240}
										fgColor={setColor(
											allCriterios[2].score
										)}
										className="page4-icono-progress"
										readOnly
										disableTextInput
									/>
								</div>
								<div className="tarjeta-container col-md-6 col-6 row ml-5">									<div className="tarjeta">
										<span className="numero-color">
											{allCriterios[2].score_company} {DiffFunction(allCriterios[2].score,allCriterios[2].score_company)}
										</span>
										<span className="col-12 texto">
											vs Empresa
										</span>
									</div>
								</div>
							</div>
							<div className="texto-container">
								<span className="texto-bold col-12">
									Pérdidas de Energía #{3} -{" "}
									{allCriterios[2].name}
								</span>
							</div>
							<div className="recomendaciones-container">
							<div
											style={{ color: "black",
											justifyContent: "center", textAlign: "justify"}}
											dangerouslySetInnerHTML={{
												__html:
													allCriterios[2]
														.recommendations,
											}}
										></div>
								{/*<ul
									style={{
										display: "flex",
										justifyContent: "center",
									}}
								>
									<li>
										<div
											style={{ color: "black" }}
											dangerouslySetInnerHTML={{
												__html:
													allCriterios[2]
														.recommendations,
											}}
										></div>
									</li>
										</ul>*/}
							</div>
						</div>
					</div>
				</div>
				{/* {allCriterios.map((criterio, index) => {
					return (
						<div className="icono-text-container col-5 row" key={index}>
							<div className="icono-tarjeta-container ">
								<div className="icono-texto-abajo-container col-md-5 col-5">
									<div className="otro-contain">
										<div className="icono-container mr-5">
											<Knob
												value={parseInt(criterio.score)}
												width={150}
												height={150}
												angleArc={240}
												angleOffset={240}
												fgColor={setColor(
													criterio.score
												)}
												className="page4-icono-progress"
												readOnly
												disableTextInput
											/>
										</div>
										<div className="tarjeta-container col-md-6 col-12 row ml-5 mb-5">
											<div className="tarjeta">
												<span className="col-4 numero-color">
													{criterio.score -
														criterio.score_company}
												</span>
												<span className="col-12 texto">
													vs Empresa
												</span>
											</div>
										</div>
									</div>
									<div className="texto-container">
										<span className="texto-bold col-12">
											Pérdidas de Energía #{index + 1} -{" "}
											{criterio.name}
										</span>
									</div>
									<div className="recomendaciones-container">
										<ul
											style={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<li>
												<div
													style={{ color: "black" }}
													dangerouslySetInnerHTML={{
														__html:
															criterio.recommendations,
													}}
												></div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					);
				})} */}
			</div>
		</div>
	);
};

export default Page8;
