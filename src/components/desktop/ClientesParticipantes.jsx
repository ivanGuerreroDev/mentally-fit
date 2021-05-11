import React, { useEffect, useState, useRef } from "react";
import Lapiz from "../../assets/dataTable/Lapiz.png";
import Basura from "../../assets/dataTable/Basura.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	actionGetDataParticipantes,
	actionEliminarParticipante
} from "../../redux/reducersActions/desktop/desktopAction";
import { actionUpdateStateParticipant } from "../../redux/reducersActions/authentication/authenticationAction";
import DataTable from "../table/DataTable";
import { confirmAlert } from 'react-confirm-alert';
import config from '../../config.js'

const URL = config[config.enviroment].host;

const ClientesParticipantes = () => {
	

	useEffect(() => {
		dispatch(actionGetDataParticipantes(token));
	}, []);

	const history = useHistory();

	const dispatch = useDispatch();

	const dataExample = useSelector(
		(state) => state.desktopReducer.participantes
	);

	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const deleteParticipante = (id) => {
		confirmAlert({
			title: '¿Estas seguro de eliminar esta participante?',
			message: 'Si eliminas al participante perderas toda su información.',
			buttons: [
				{
					label: 'No'
				},
				{
					label: 'Si',
					onClick: () => {
						dispatch(actionEliminarParticipante(id, token))
					}
				}

			]
		});

	}

	
	return (
		<section className="section-container clientes-empresas-container">
			<span className="title">
				Lista General de Participantes
			</span>
			<div className="contenedor-pagina">
				<div className="contenido-pagina">
					<div className="boton-contenedor">
						
						<button
							className="button-primary"

							onClick={(e) =>
								history.push(
									"/participantes/agregar"
								)
							}
						>
							AÑADIR PARTICIPANTE
					</button>
					</div>
					<DataTable
						columns={
							[
								{ title: "Nombre", field: "nombre" },
								{
									title: "Correo",
									field: "correo",
								},
								{
									title: "Empresa",
									field: "empresa",
								},
								{
									title: "Pais",
									field: "pais",
								},
								{
									title: "Campañas",
									field: "campañas",
								},
								{
									title: "Estado Campañas",
									field: "estadoCampañas",
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

						data={
							dataExample && Array.isArray(dataExample) ? dataExample.map((e, index) => {
								return {
									nombre: e.name + e.lastName,
									correo: e.email,
									empresa: e.company,
									pais: e.country,
									campañas: e.totalCampaigns,
									estadoCampañas: e.Campaign,
									estado: (
										<div>
											{e.status
												? "Activo"
												: "Inactivo"}
											<label class="switch">
												<input
													type="checkbox"
													checked={
														e.status
													}
													onClick={(
														a
													) => {
														dispatch(
															actionUpdateStateParticipant(
																e.id,
																index,
																token
															)
														);
													}}
												/>
												<span class="slider round"></span>
											</label>
										</div>
									),
									acciones: (
										<div>
											{e.estadoCampañas ===
												"Pendiente" ? (
													<div className="acciones">
														<img
															src={
																Lapiz
															}
															alt="Editar"
															className="action-icono-participantes"
														/>
														<a href="" onClick={(a) => {
															a.preventDefault();
															deleteParticipante(e.id)
														}}>
															<img
																src={
																	Basura
																}
																alt="Eliminar"
																className="action-icono-participantes"
															/>
														</a>
													</div>
												) : (
													<div className="acciones">
														{
														/*
														<img
															src={
																Ojo
															}
															alt="Ver"
															className="action-icono-participantes"
														/>
														<img
															src={
																Bajar
															}
															alt="Descargar"
															className="action-icono-participantes"
														/>
														<img
															src={
																Imprimir
															}
															alt="Imprimir"
															className="action-icono-participantes"
														/>
														*/
														}
														<a
															href=""
															onClick={
																a => {
																	a.preventDefault();
																	history.push({
																		pathname: `/participantes/editar/`,
																		state: { id: e.id }
																	})
																}
															}
														>
															<div className="data-table-action">
																<img
																	src={
																		Lapiz
																	}
																	alt="Editar"
																	className="action-icono-participantes"
																/>
															</div>
														</a>
														<a
															href=""
															onClick={
																a => {
																	a.preventDefault();
																	deleteParticipante(e.id)
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
												)}
										</div>
									),
								};
							}) : []
						}
					/>
				</div>
			</div>

		</section>
	);
}

export default ClientesParticipantes;
