import React from "react";
import RoseComparacion from "../../charts/RoseComparacion";
import { useDispatch, useSelector } from "react-redux";

const Page3 = () => {
	const dataReport = useSelector((state) => state.userReport.current);

	const report =
		dataReport == null &&
		JSON.parse(localStorage.getItem("currentParticipante"))
			? JSON.parse(localStorage.getItem("currentParticipante"))
			: dataReport;

	const vchart = useSelector((state) =>{
	    const dataResult =state.userReport.current ? state.userReport.current : null

		const result =
			dataResult == null
				? localStorage.getItem("currentParticipante")
				: dataResult;

		return JSON.stringify(result);
		}
	);

	function DiffFunction(a, b) {
		
		if( (a - b) < 0 ){

			return (
				'-' + ((a - b) * -1)
			  );

		}else{
			if( (a - b) > 0 ){

				return (
					'+' + (a - b)
				  );

			}else{
				return (
					 (a - b)
				  );
			}
		}	
	}


	return report && vchart ? (
		<div className="page-container container-fluid"  id="print">
			<div className="texto-container">
				<p>El siguiente informe muestra la comparación entre el resultado de tu Escaneo de Energía Personal y de todos los participantes de tu misma Empresa.</p>
			</div>
			<div id="pie-chart" className="grafico-container">
				<chart-behavior
					data={vchart}
					className="chart-final"
				></chart-behavior>
			</div>
			<div className="comparacion-puntajes-container">
				<div className="row titles d-flex justify-content-end">
					<div className="col-2 px-0 table-puntajes-header">
						Mi puntaje
					</div>
					<div className="col-2 px-0 table-puntajes-header">
						Empresa
					</div>
					<div
						className="col-2 px-0 table-puntajes-header"
						style={{ color: "#F56C27" }}
					>
						Dif
					</div>
				</div>
				
				<div className="col-12 titulos-tabla">Energía Física</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					    {report.personal_report.F.areas.F1.sufix} {report.personal_report.F.areas.F1.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.F.areas.F1.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.F.areas.F1.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.F.areas.F1.value,report.company_report.F.areas.F1.value)}						
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.F.areas.F2.sufix} {report.personal_report.F.areas.F2.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.F.areas.F2.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.F.areas.F2.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.F.areas.F2.value,report.company_report.F.areas.F2.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.F.areas.F3.sufix} {report.personal_report.F.areas.F3.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.F.areas.F3.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.F.areas.F3.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.F.areas.F3.value,report.company_report.F.areas.F3.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.F.areas.F4.sufix} {report.personal_report.F.areas.F4.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.F.areas.F4.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.F.areas.F4.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.F.areas.F4.value,report.company_report.F.areas.F4.value)}
					</div>
				</div>
				
				<div className="col-12 titulos-tabla">Energía Mental</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.M.areas.M1.sufix} {report.personal_report.M.areas.M1.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.M.areas.M1.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.M.areas.M1.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.M.areas.M1.value,report.company_report.M.areas.M1.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.M.areas.M2.sufix} {report.personal_report.M.areas.M2.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.M.areas.M2.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.M.areas.M2.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.M.areas.M2.value,report.company_report.M.areas.M2.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.M.areas.M3.sufix} {report.personal_report.M.areas.M3.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.M.areas.M3.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.M.areas.M3.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.M.areas.M3.value,report.company_report.M.areas.M3.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.M.areas.M4.sufix} {report.personal_report.M.areas.M4.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.M.areas.M4.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.M.areas.M4.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.M.areas.M4.value,report.company_report.M.areas.M4.value)}
					</div>
				</div>
				
				<div className="col-12 titulos-tabla">Energía Emocional</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E1.sufix} {report.personal_report.E.areas.E1.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E1.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E1.value}
					</div>
					<div className="col-2 diferencia-contenido">						
						{DiffFunction(report.personal_report.E.areas.E1.value,report.company_report.E.areas.E1.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E2.sufix} {report.personal_report.E.areas.E2.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E2.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E2.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E2.value,report.company_report.E.areas.E2.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E3.sufix} {report.personal_report.E.areas.E3.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E3.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E3.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E3.value,report.company_report.E.areas.E3.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E4.sufix} {report.personal_report.E.areas.E4.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E4.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E4.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E4.value,report.company_report.E.areas.E4.value)}
					</div>
				</div>

				<div className="col-12 titulos-tabla">Energía Espiritual</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E1.sufix} {report.personal_report.E.areas.E1.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E1.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E1.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E1.value,report.company_report.E.areas.E1.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E2.sufix} {report.personal_report.E.areas.E2.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E2.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E1.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E2.value,report.company_report.E.areas.E2.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E3.sufix} {report.personal_report.E.areas.E3.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E3.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E3.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E3.value,report.company_report.E.areas.E3.value)}
					</div>
				</div>
				<div className="row contenido-tabla">
					<div className="col-6 nombre-contenido">
					{report.personal_report.E.areas.E4.sufix} {report.personal_report.E.areas.E4.name}
					</div>
					<div className="col-2 puntaje-contenido">
						{report.personal_report.E.areas.E4.value}
					</div>
					<div className="col-2 empresa-contenido">
						{report.company_report.E.areas.E4.value}
					</div>
					<div className="col-2 diferencia-contenido">
						{DiffFunction(report.personal_report.E.areas.E4.value,report.company_report.E.areas.E4.value)}
					</div>
				</div>
			
			
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default Page3;
