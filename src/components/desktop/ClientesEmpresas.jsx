import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	actionGetDataEmpresas,
	actionSearchDataEmpresas,
	actionEliminarEmpresa
} from "../../redux/reducersActions/desktop/desktopAction";
import DataTable from "../table/DataTable";
import Lapiz from "../../assets/dataTable/Lapiz.png";
import Basura from "../../assets/dataTable/Basura.png";
import { confirmAlert } from 'react-confirm-alert';

import { ReactComponent as Ver } from "../../assets/dataTable/Ver.svg";

const ClientesEmpresas = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector(state => state.authenticationReducer.user.token)

	useEffect(() => {
		dispatch(actionGetDataEmpresas(token))
	}, [])

	const infoEmpresas = useSelector(
		(state) => state.desktopReducer.empresas
	);


	const deleteCompany = (id) => {
		confirmAlert({
			title: '¿Estas seguro de eliminar esta empresa?',
			message: 'Si eliminas la empresa, se eliminara tambien las campañas y participantes ligados a esta empresa.',
			buttons: [
				{
					label: 'No'
				},
				{
					label: 'Si',
					onClick: () => {
						dispatch(actionEliminarEmpresa(id, token))
					}
				}

			]
		});

	}
	const numeroTotalEmpresas = infoEmpresas.companiesTotal ? infoEmpresas.companiesTotal : 0;
	const numeroTotalParticipantes = infoEmpresas.employeesTotal ? infoEmpresas.employeesTotal : 0;
	const campañasEjecucion = infoEmpresas.campaignsOn ? infoEmpresas.campaignsOn : 0;
	const campañasEjecutadas = infoEmpresas.campaignsOff ? infoEmpresas.campaignsOff : 0;

	return (
		<section className="section-container clientes-empresas-container">
			<span className="title">Lista General de Empresas</span>
			<div className="menu-lista-empresas">
				<div className="informacion-contenedor">
					<div className="numero-total-empresas">
						<label>
							Número Total de Empresas
                                    </label>
						<div className="numero">
							{numeroTotalEmpresas}
						</div>
					</div>
					<div className="numero-total-participantes">
						<label>
							Número Total de Participantes
                                    </label>
						<div className="numero">
							{numeroTotalParticipantes}
						</div>
					</div>
					<div className="campanas-ejecucion">
						<label>Campañas en Ejecución</label>
						<div className="numero">
							{campañasEjecucion}
						</div>
					</div>
					<div className="campanas-ejecutadas">
						<label>Campañas Ejecutadas</label>
						<div className="numero">
							{campañasEjecutadas}
						</div>
					</div>
				</div>
				<div className="boton-contenedor">
					<button
						className="button-primary"
						onClick={(e) =>
							history.push(
								"/navegacion/empresas/agregar"
							)
						}
					>
						AGREGAR EMPRESA
					</button>
				</div>
			</div>
			<div className="contenedor-pagina">
				<div className="contenido-paginas">
					<DataTable
						columns={
							[
								{ title: "Empresa", field: "nombre" },
								{
									title: "N° de Participantes",
									field: "participantes",
								},
								{
									title: "Campañas",
									field: "campañas",
								},
								{
									title: "Estado",
									field: "estado",
								},
								{
									title: "",
									field: "acciones",
									filtering: false
								},
							]
						}

						data={infoEmpresas && infoEmpresas.companies && Array.isArray(infoEmpresas.companies) ? infoEmpresas.companies.map((e) => {
							return {
								nombre: e.name,
								participantes: e.employees + " " + "Participantes",
								campañas: e.campaigns + " " + "Campaña",
								estado: e.status ? "Activo" : "Inactivo",
								acciones: (
									<div className="acciones">
										<a
											href=""
											onClick={
												a => {
													a.preventDefault();
													history.push({
														pathname: `/empresas/campañas/`,
														state: { id: e.id }
													})
												}
											}
										>
											<div className="data-table-action">
												Ver
												<Ver alt="ver" className="icon-ver" />
											</div>
										</a>
										<a
											href=""
											onClick={
												a => {
													a.preventDefault();
													deleteCompany(e.id)

												}
											}
										>
											<div className="data-table-action">

												<img
													src={
														Basura
													}
													alt="Eliminar"
													className="action-icono-participantes"
												/>
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

export default ClientesEmpresas;
