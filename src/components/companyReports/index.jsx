import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DataTable from "../table/DataTable";

import { ReactComponent as Ver } from "../../assets/dataTable/Ver.svg";
import {
	actionCleanCurrentEmpresa,
	actionGetCurrentEmpresa,
} from "../../redux/reducersActions/companyReport/AdminReportActions";

const CompanyResults = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionCleanCurrentEmpresa());
		localStorage.removeItem("currentEmpresa");
		localStorage.removeItem("allAreasEmpresa");
	}, []);

	const history = useHistory();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const reports = useSelector(
		(state) => state.AdminReportReducer.listEmpresas
	);

	return (
		<section className="section-container clientes-empresas-container">
			<span className="title">Listado de Reportes - Empresas</span>
			<div className="contenedor-pagina">
				<div className="contenido-paginas">
					<DataTable
						columns={[
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
											company: e[0].company,
											campaign: e[0].campaign,
											date: `${e[0].datestart.slice(
												0,
												10
											)} - ${e[0].dateend.slice(0, 10)}`,
											acciones: (
												<div className="acciones">
													<a
														href=""
														onClick={(a) => {
															a.preventDefault();
															dispatch(
																//// --------->>>
																actionGetCurrentEmpresa(
																	{
																		campaign:
																			e[0]
																				.campaignid,
																		company:
																			e[0]
																				.companyid,
																		token,
																	}
																)
															);
															history.push({
																pathname: `/reportes/empresas/resultados`,
																state: {
																	name:
																		e[0]
																			.company,
																},
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

export default CompanyResults;
