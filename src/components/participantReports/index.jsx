import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	actionGetReports,
	actionGetReport,
	actionGetReportByParticipant,
	actionCleanParticipantes,
} from "../../redux/reducersActions/userReport/Actions";
import DataTable from "../table/DataTable";

import { ReactComponent as Ver } from "../../assets/dataTable/Ver.svg";
import { actionGetParticipantReports } from "../../redux/reducersActions/companyReport/AdminReportActions";

const ParticipantReports = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const reports = useSelector(
		(state) => state.AdminReportReducer.listParticipantes
	);

	useEffect(() => {
		localStorage.removeItem('chartPage1')
		localStorage.removeItem('currentParticipante')
		localStorage.removeItem('tableDataParticipante')
		dispatch(actionCleanParticipantes())
	}, [])

	return (
		<section className="section-container clientes-empresas-container">
			<span className="title">Listado de Reportes - Participantes</span>
			<div className="contenedor-pagina">
				<div className="contenido-paginas">
					<DataTable
						columns={[
							{
								title: "Participante",
								field: "participant",
							},
							{
								title: "Empresa",
								field: "company",
							},
							{
								title: "Campaña",
								field: "campaign",
							},
							{
								title: "Fecha",
								field: "date",
							},
							{
								title: "",
								field: "acciones",
								filtering: false,
							},
						]}
						data={
							reports && Array.isArray(reports)
								? reports.map((e) => {
										return {
											participant: e.participant,
											company: e.company,
											campaign: e.campaign,
											date: `${e.dateStart.slice(0,10)} - ${e.dateEnd.slice(0,10)}`,
											acciones: (
												<div className="acciones">
													<a
														href=""
														onClick={(a) => {
															a.preventDefault();
															dispatch(
																//// --------->>>
																actionGetReportByParticipant(
																	{
																		userId:
																			e.participantid,
																		campaignId:
																			e.campaignid,
																		token,
																	}
																)
															);
															history.push({
																pathname: `/reportes/participantes/resultados`,
																state: {name: e.participant, id: e.participantid}
															});
														}}
													>
														<div className="data-table-action">
															Ver
															<Ver
																alt="ver"
																className="icon-ver"
															/>
														</div>
													</a>
												</div>
											),
										};
								  })
								: []
						}
					/>
				</div>
			</div>
		</section>
	);
};

export default ParticipantReports;
