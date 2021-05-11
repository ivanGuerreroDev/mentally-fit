import React, { useEffect } from "react";
import Lapiz from "../../assets/dataTable/Lapiz.png";
import Basura from "../../assets/dataTable/Basura.png";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	actionGetDataCampañas,
	actionUpdateStateCampaña,
	actionEliminarCampana,
} from "../../redux/reducersActions/desktop/desktopAction";
import DataTable from "../table/DataTable";
import { confirmAlert } from "react-confirm-alert";

const Campañas = (props) => {
	const history = useHistory();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actionGetDataCampañas(token));
	}, []);

	const dataExample = useSelector((state) => state.desktopReducer.campañas);

	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const deleteCampana = (id) => {
		confirmAlert({
			title: "¿Estas seguro de eliminar esta campaña?",
			message: "Si eliminas al campaña perderas toda su información.",
			buttons: [
				{
					label: "No",
				},
				{
					label: "Si",
					onClick: () => {
						dispatch(actionEliminarCampana(id, token));
					},
				},
			],
		});
	};

	const verificarFechaFin = (fechaF) => {
		const ahora = moment().format("YYYY-MM-DD");

		if (new Date(ahora) < new Date(fechaF)) return 'block';

		else return 'none';
	}


	return (
		<section className="section-container">
			<span className="title">Lista General Campañas</span>
			<div className="menu-lista-campañas">
				<div className="informacion-campañas-contenedor">
					<div className="numero-total-campañas-ejecutadas">
						<label>CAMPAÑAS EJECUTADAS</label>
						<div className="numero">
							{dataExample.campañas
								? dataExample.campañas.filter(
										(e) => e.finalizada > 0
								  ).length
								: 0}
						</div>
					</div>

					<div className="numero-total-campañas-ejecucion">
						<label>CAMPAÑAS EN EJECUCIÓN</label>
						<div className="numero">
							{dataExample.campañas
								? dataExample.campañas.filter(
										(e) => e.finalizada === 0
								  ).length
								: 0}
						</div>
					</div>
					<div className="numero-total-participantes">
						<label>NÚMERO TOTAL DE PARTICIPANTES</label>
						<div className="numero">
							{dataExample.participantes
								? dataExample.participantes.length
								: 0}
						</div>
					</div>
				</div>
			</div>
			<div className="contenedor-pagina">
				<div className="contenido-pagina">
					<div className="boton-contenedor participantes">
						<button
							className="button-primary"
							onClick={(e) => {
								history.push("/campañas/crear");
							}}
						>
							CREAR CAMPAÑA
						</button>
					</div>
					<DataTable
						columns={[
							{
								title: "Nombre Campaña",
								field: "nombre",
							},
							{
								title: "Organización",
								field: "empresa",
							},
							{
								title: "Período",
								field: "periodo",
							},
							{
								title: "Progeso",
								field: "progreso",
							},
							{
								title: "Estado",
								field: "estado",
							},
							{
								title: "",
								field: "acciones",
								filtering: false,
							},
						]}
						data={
							dataExample &&
							dataExample.campañas &&
							Array.isArray(dataExample.campañas)
								? dataExample.campañas.map((e, index) => {
										return {
											nombre: e.name,
											empresa: e.company,
											periodo:
												e.dateStart.slice(0, 10) +
												" - " +
												e.dateEnd.slice(0, 10),
											progreso:
												Date.parse(e.dateEnd) >
												Date.now()
													? "Pendiente"
													: "Completado",
											estado:
												Date.parse(e.dateEnd) >
												Date.now() ? (
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
																		actionUpdateStateCampaña(
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
												) : (
													"Completado"
												),
											acciones: (
												<div>
													<div className="acciones">
														<a
															href=""
															onClick={(a) => {
																a.preventDefault();
																history.push({
																	pathname: `/campañas/editar/`,
																	state: {
																		id:
																			e.id,
																	},
																});
															}}
															style={{display: `${verificarFechaFin(e.dateEnd)}`}}
														>
															<img
																src={Lapiz}
																alt="Editar"
																className="action-icono-participantes"
															/>
														</a>
														<a
															href=""
															onClick={(a) => {
																a.preventDefault();
																deleteCampana(
																	e.id
																);
															}}
														>
															<img
																src={Basura}
																alt="Eliminar"
																className="action-icono-participantes"
															/>
														</a>
													</div>
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

export default Campañas;
