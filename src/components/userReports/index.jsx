import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	actionGetReports,
	actionGetReport,
	actionGetReportsParticipants
} from "../../redux/reducersActions/userReport/Actions";
import DataTable from "../table/DataTable";

import { ReactComponent as Ver } from "../../assets/dataTable/Ver.svg";
import moment from "moment"

const UserResults = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector(state => state.authenticationReducer.user.token)
	const reports = useSelector(state => state.userReport.list)

	console.log('list', reports)

	useEffect(() => {
		dispatch(actionGetReportsParticipants(token))
	}, [])

	return (
		<section className="section-container clientes-empresas-container">
			<span className="title">Lista de resultados de encuestas</span>
			<div className="contenedor-pagina">
				<div className="contenido-paginas">
					<DataTable
						columns={
							[
								{ 
									title: "Campaña", 
									field: "campaign" 
								},
								{
									title: "Fecha",
									field: "date",
								},
								{
									title: "",
									field: "acciones",
									filtering: false
								},
							]
						}

						data={reports && Array.isArray(reports) ? reports.map((e) => {
							return {
								campaign: e.name,
								date: `${moment(e.dateStart).format('YYYY-MM-DD')} al ${moment(e.dateEnd).format('YYYY-MM-DD')}`,
								acciones: (
									<div className="acciones">
										<a
											href=""
											onClick={
												a => {
													a.preventDefault();
													dispatch(actionGetReport({id: e.id, token}))
													history.push({
														pathname: `/user/result/`,
														state: {name: 'none'}
													})
												}
											}
										>
											<div className="data-table-action">
													Ver
												<Ver alt="ver" className="icon-ver" />
											</div>
										</a>
									</div>
								),
							};
						}) : []}
					/>
				</div>
			</div>
		</section>
	);
};

export default UserResults;
