import React, { useState, useEffect } from "react";
import Campaña from "../../assets/forms/Campaña.png";
import { ReactComponent as Volver } from "../../assets/dataTable/Volver.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { actionCrearAdministrador, actionGetDataAdmin, actionActualizarAdministrador } from "../../redux/reducersActions/desktop/desktopAction";
import {
	TOAST_ERROR,
	TOAST_SUCCESS,
	TOAST_WARNING,
} from "../../redux/constants";

const FormularioAdmin = ({admin_id}) => {

	const dispatch = useDispatch();
	let location = useLocation();
	const history = useHistory();

	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);

	const [informacionFormulario, setInformacionFormulario] = useState({
		nombre: "",
		apellido: "",
		email: "",
		notas: ""
	});

	const [classFormulario, setClassFormulario] = useState("");

	const onChangeInput = (e) => {
		setClassFormulario("");
		setInformacionFormulario({
			...informacionFormulario,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(async () => {
		if(admin_id){
			actionGetDataAdmin(admin_id,token)
			.then((response) => response.json())
			.then((res) => {
				if (!res.error) {
					setInformacionFormulario({
						nombre: res.name,
						apellido: res.lastName,
						email: res.email,
						notas: res.notes?res.notes:"",
						level: res.level
					});
				} else {
					dispatch({
						type: TOAST_WARNING,
						payload: res.message
							? res.message
							: "Error de conexión",
					});
				}
			})
			.catch((error) => {
				dispatch({
					type: TOAST_ERROR,
					payload:
						error.response &&
							error.response.data &&
							error.response.data.message
							? error.response.data.message
							: "Error de conexión",
				});
			});
		}
	}, [location]);

	return (
		<div className="section-container formulario-participante-container container-fluid">
			<section className="nombre-boton-volver">
				<label className="texto-formulario-participante">
					Formulario Admin
                        </label>
				<div className="boton-volver"
					onClick={(e) => {
						history.goBack();
					}}
				>
					<Volver alt="Volver" />
					<label className="texto-boton-volver">
						VOLVER
					</label>
				</div>
			</section>
			<section className="formulario-agregar-admin">
				<div className="formulario-inputs-container">
					<div className="inputs-formulario">
						<div className="medios-inputs">
							<div className="dos-inputs">
								<div className="input-left">
									<div className="input-container">
										<label>EMAIL</label>
										<input
											type="email"
											name="email"
											value={
												informacionFormulario.email
											}
											onChange={
												onChangeInput
											}
											className={
												!informacionFormulario
													.email
													.length
													? classFormulario
													: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
														informacionFormulario.email
													) ==
														false
														? classFormulario
														: ""
											}
										/>
									</div>
									<div className="input-container">
										<label>Privilegio</label>
										<select
											name="level"
											value={
												informacionFormulario.level
											}
											onChange={onChangeInput}
											className={
												!informacionFormulario
													.email
													.length
													? classFormulario
													: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
														informacionFormulario.email
													) ==
														false
														? classFormulario
														: ""
											}
										>
											<option disabled selected value="">Seleccionar</option>
											<option selected={informacionFormulario.level==="ADMIN"} value="ADMIN">Administrador</option>											
										</select>
									</div>
								</div>
							</div>
							<div className="dos-inputs">
								<div className="input-left">
									<div className="input-container">
										<label>
											NOMBRE
                                                            </label>
										<input
											type="text"
											name="nombre"
											value={
												informacionFormulario.nombre
											}
											onChange={
												onChangeInput
											}
											className={
												!informacionFormulario
													.nombre
													.length
													? classFormulario
													: ""
											}
										/>
									</div>
									<div className="input-container">
										<label>
											APELLIDO
                                                            </label>
										<input
											type="text"
											name="apellido"
											value={
												informacionFormulario.apellido
											}
											onChange={
												onChangeInput
											}
											className={
												!informacionFormulario
													.apellido
													.length
													? classFormulario
													: ""
											}
										/>
									</div>
								</div>
								
							</div>
							<div className="input-tres-completo">
								<div className="input-container">
									<label>{admin_id?"NUEVA ":null}CONTRASEÑA</label>
									<input
										type="password"
										name="contraseña"
										value={
											informacionFormulario.contraseña
										}
										onChange={
											onChangeInput
										}
										className={
											informacionFormulario.contraseña &&
											!informacionFormulario.contraseña.length
												? classFormulario
												: informacionFormulario.contraseña !==
													informacionFormulario.contraseña1
													? classFormulario
													: ""
										}
									/>
								</div>
								<div className="input-container">
									<label>
										REPETIR CONTRASEÑA
									</label>
									<input
										type="password"
										name="contraseña1"
										value={
											informacionFormulario.contraseña1
										}
										onChange={
											onChangeInput
										}
										className={
											informacionFormulario.contraseña1 &&
											!informacionFormulario.contraseña1.length
												? classFormulario
												: informacionFormulario.contraseña !==
													informacionFormulario.contraseña1
													? classFormulario
													: ""
										}
									/>
								</div>
							</div>
						</div>
						<div className="input-completo">
							<label>NOTAS</label>
							<textarea
								type="text"
								name="notas"
								value={
									informacionFormulario.notas
								}
								onChange={onChangeInput}
							/>
						</div>
						<div className="botones">
							<button className="boton-importar"
								onClick={(e) => {
									history.push(
										"/navegacion/administradores"
									);
								}}
							>
								CANCELAR
							</button>
							{
								admin_id?
								<button
									className="boton-crear"
									onClick={(e) => {
										if (
											!informacionFormulario
												.nombre
												.length ||
											!informacionFormulario
												.apellido
												.length ||
											!informacionFormulario
												.email
												.length ||
											!informacionFormulario
												.level
												.length ||
											!informacionFormulario
												.level === ""
											
										) {
											setClassFormulario("error");
										} else {
											var datos = {
												email: informacionFormulario.email,
												level: informacionFormulario.level,
												name: informacionFormulario.nombre,
												lastName: informacionFormulario.apellido
											}
											if(informacionFormulario.contraseña)
												if ( informacionFormulario.contraseña !== informacionFormulario.contraseña1){
													setClassFormulario("error");
													return false
												}
												datos.password = informacionFormulario.contraseña;
											}
											dispatch(
												actionActualizarAdministrador(
													admin_id,
													datos,
													token
												)
											)
											history.goBack()
										}
									}
								>
									ACTUALIZAR
								</button>
								:
								<button
									className="boton-crear"
									onClick={(e) => {
										if (
											!informacionFormulario
												.nombre === ""
												||
											!informacionFormulario
												.apellido === ""
												||
											!informacionFormulario
												.email === ""
												||
											!informacionFormulario
												.contraseña === ""
												||
											!informacionFormulario
												.contraseña1 === ""
												||
											!informacionFormulario
												.level === ""
												 ||
											!informacionFormulario
												.level === ""
											
										) {
											setClassFormulario("error");
										} else if (
											informacionFormulario.contraseña !== informacionFormulario.contraseña1
										){
											setClassFormulario("error");
										}else {
											const datos = {
												email: informacionFormulario.email,
												level: informacionFormulario.level,
												name: informacionFormulario.nombre,
												lastName: informacionFormulario.apellido,
												password: informacionFormulario.contraseña,
											}
											dispatch(
												actionCrearAdministrador(
													datos,
													token
												)
											)
											history.goBack()
										}
									}}
								>
									GUARDAR
								</button>
							}
						</div>
					</div>
					<div className="imagen-formulario">
						<img
							src={Campaña}
							alt="Imagen-Participante"
							className="imagen-formulario-participante"
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default FormularioAdmin;
