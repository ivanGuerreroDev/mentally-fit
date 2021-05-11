import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Lapiz from "../../assets/dataTable/Lapiz.png";
import Basura from "../../assets/dataTable/Basura.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionDeleteAdministrador, actionGetDataAdministradores } from "../../redux/reducersActions/desktop/desktopAction";
import DataTable from "../table/DataTable";
import { confirmAlert } from 'react-confirm-alert';

const Administradores = () => {
	useEffect(() => {
		dispatch(actionGetDataAdministradores(token));
	}, []);

	const history = useHistory();

	const dispatch = useDispatch();

	const dataExample = useSelector((state) => state.desktopReducer.campañas);

	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);

	const deleteAdministrator = (id) => {
		confirmAlert({
			title: '¿Estas seguro de eliminar esta administrador?',
			message: 'Si eliminas al administrador perderas toda su información.',
			buttons: [
				{
					label: 'No'
				},
				{
					label: 'Si',
					onClick: () => {
						dispatch(actionDeleteAdministrador(id, token))
					}
				}
			]
		});

	}

	return (
		<section className="section-container">
			<span className="title">Lista de Administradores</span>
			<div className="contenedor-pagina">
				<div className="contenido-pagina">
					<div className="boton-contenedor participantes">
						<button
							className="button-primary"
							onClick={(e) => {
								history.push("/admin/crear");
							}}
						>
							CREAR NUEVO
                                    </button>
					</div>
					<DataTable
						columns={[
							{ title: "Nombre", field: "nombre" },
							{
								title: "Correo",
								field: "correo",
							},
							{
								title: "Privilegio",
								field: "level",
							},
							{
								title: "",
								field: "acciones",
								filtering: false
							},
						]}
						data={dataExample && dataExample.administradores && Array.isArray(dataExample.administradores) ? dataExample.administradores.map(
							(e) => {
								return {
									nombre: `${e.name} ${e.lastName}`,
									correo: e.email,
									level: e.level,
									acciones: (
										<div className="acciones">
											<a 
												href="#"
												onClick={
													a => {
														a.preventDefault()
														history.push({
															pathname: `/admin/editar/`,
															state: { id: e.id }
														})
													}
												}
											>
												<img
													src={
														Lapiz
													}
													alt="Editar"
													className="action-icono-participantes"
												/>
											</a>
											<a 
												href="#"
												onClick={
													a => {
														a.preventDefault()
														deleteAdministrator(e.id, token)
													}
												}
											>
												<img
													src={
														Basura
													}
													alt="Eliminar"
													className="action-icono-participantes"
													
												/>
											</a>
										</div>
									),
								};
							}
						) : []}
					/>
				</div>
			</div>
		</section>
	);
};

export default Administradores;
