import React, { useState, useEffect } from "react";
import Participante from "../../assets/forms/Participante.png";
import { ReactComponent as Volver } from "../../assets/dataTable/Volver.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	actionCrearParticipante,
	actionGetDataFormularioParticipante,
	actionActualizaParticipante,
	actionGetDataParticipante,
} from "../../redux/reducersActions/desktop/desktopAction";
import departamentosArr from "../../datos/departamentos";
import { actionGetPaisesEmpresa } from "../../redux/reducersActions/companyReport/AdminReportActions";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
	dd = "0" + dd;
}
if (mm < 10) {
	mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;

const FormularioParticipante = ({ participante }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	let location = useLocation();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const dataSelect = useSelector(
		(state) => state.desktopReducer.participantes
	);
	const paisesEmpresas = useSelector(
		(state) => state.AdminReportReducer.currentPaises
	);

	// console.log('PAISES', paisesEmpresas[0].countrys)

	if (!dataSelect.empresas)
		dispatch(actionGetDataFormularioParticipante(token));

	const [countries, setCountries] = useState([]);

	if (location.state != undefined && countries.length == 0) {
		setCountries(location.state.countries);
	}
	const [informacionFormulario, setInformacionFormulario] = useState({
		nombre: null,
		apellido: null,
		fecha: null,
		genero: null,
		empresa: null,
		campaign: null,
		email: null,
		pais: null,
		departamento: null,
		funcion: null,
		notas: null,
	});

	if (location.state != undefined && informacionFormulario.empresa == null) {
		setInformacionFormulario({
			...informacionFormulario,
			empresa: location.state.nombreEmpresa,
		});
	}
	if (location.state != undefined && informacionFormulario.campaign == null) {
		setInformacionFormulario({
			...informacionFormulario,
			campaign: location.state.idCampaña,
		});
	}

	const onChangeInput = (e) => {
		setClassFormulario("");
		setInformacionFormulario({
			...informacionFormulario,
			[e.target.name]: e.target.value,
		});
	};

	const selectEmpresa = (e) => {
		dispatch(actionGetPaisesEmpresa(e.target.value, token));
	};

	const [classFormulario, setClassFormulario] = useState("");

	useEffect(async () => {
		if (participante) {
			actionGetDataParticipante(participante, token)
				.then((response) => response.json())
				.then((dataParticipante) => {
					setInformacionFormulario({
						nombre: dataParticipante.name,
						apellido: dataParticipante.lastName,
						fecha: dataParticipante.birthdate,
						genero: dataParticipante.gender,
						empresa: dataParticipante.Company,
						email: dataParticipante.email,
						pais: dataParticipante.country,
						departamento: dataParticipante.department,
						funcion: dataParticipante.function,
						notas: dataParticipante.notes,
					});
				});
		}
	}, [location]);

	return (
		<div className="section-container formulario-participante-container container-fluid">
			<section className="nombre-boton-volver">
				<label className="texto-formulario-participante">
					Formulario Participante
				</label>
				<div
					className="boton-volver"
					onClick={(e) => {
						history.goBack();
					}}
				>
					<Volver alt="Volver" />
					<label className="texto-boton-volver">VOLVER</label>
				</div>
			</section>
			<section className="formulario-agregar-participante">
				<div className="formulario-inputs-container">
					<div className="inputs-formulario">
						<div class="input-empresa">
							<div className="input-select">
								{!participante ? (
									<>
										<label>EMPRESA</label>
										<select
											name="empresa"
											value={
												informacionFormulario.empresa
											}
											onChange={(e) => {
												onChangeInput(e);
												selectEmpresa(e);
											}}
											className={
												!informacionFormulario.empresa
													? classFormulario
													: ""
											}
										>
											<option
												value={null}
												selected={true}
												disabled={true}
											>
												Seleccionar Opcion
											</option>
											{dataSelect &&
											dataSelect.empresas &&
											Array.isArray(dataSelect.empresas)
												? dataSelect.empresas.map(
														(e) => {
															return (
																<option
																	value={e.id}
																>
																	{e.name}
																</option>
															);
														}
												  )
												: null}
										</select>
									</>
								) : null}
							</div>
						</div>
						<div className="medios-inputs">
							<div className="input-left">
								<label>NOMBRE(S)</label>
								<input
									type="text"
									name="nombre"
									value={informacionFormulario.nombre}
									onChange={onChangeInput}
									className={
										!informacionFormulario.nombre
											? classFormulario
											: ""
									}
								/>
								<label>FECHA DE NACIMIENTO</label>
								<input
									type="date"
									name="fecha"
									max={today}
									value={informacionFormulario.fecha}
									onChange={onChangeInput}
									className={
										!informacionFormulario.fecha
											? classFormulario
											: ""
									}
								/>
								<label>EMAIL</label>
								<input
									type="text"
									name="email"
									value={informacionFormulario.email}
									onChange={onChangeInput}
									className={
										!informacionFormulario.email
											? classFormulario
											: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
													informacionFormulario.email
											  ) == false
											? classFormulario
											: ""
									}
								/>
								<label>DEPARTAMENTO</label>
								<select
									name="departamento"
									value={informacionFormulario.departamento}
									onChange={onChangeInput}
									className={
										!informacionFormulario.departamento
											? classFormulario
											: ""
									}
								>
									<option
										value={null}
										selected={
											informacionFormulario.departamento
												? false
												: true
										}
									>
										Seleccionar Opcion
									</option>
									{departamentosArr &&
									Array.isArray(departamentosArr)
										? departamentosArr.map(
												(departamento) => (
													<option
														value={departamento}
														selected={
															departamento ===
															informacionFormulario.departamento
																? true
																: false
														}
													>
														{departamento}
													</option>
												)
										  )
										: null}
								</select>
							</div>
							<div className="input-right">
								<label>APELLIDO(S)</label>
								<input
									type="text"
									name="apellido"
									value={informacionFormulario.apellido}
									onChange={onChangeInput}
									className={
										!informacionFormulario.apellido
											? classFormulario
											: ""
									}
								/>
								<label>GÉNERO</label>
								<select
									name="genero"
									value={informacionFormulario.genero}
									onChange={onChangeInput}
									className={
										!informacionFormulario.genero
											? classFormulario
											: ""
									}
								>
									<option
										value={null}
										selected={
											informacionFormulario.genero
												? false
												: true
										}
									>
										Seleccionar Opcion
									</option>
									<option
										value="Masculino"
										selected={
											"Masculino" ===
											informacionFormulario.genero
												? true
												: false
										}
									>
										Masculino
									</option>
									<option
										value="Femenino"
										selected={
											"Femenino" ===
											informacionFormulario.genero
												? true
												: false
										}
									>
										Femenino
									</option>
									<option
										value="Otro"
										selected={
											"Otro" ===
											informacionFormulario.genero
												? true
												: false
										}
									>
										Otro
									</option>
								</select>

								<label>PAÍS DONDE TRABAJA</label>
								<select
									name="pais"
									value={informacionFormulario.pais}
									onChange={onChangeInput}
									className={
										!informacionFormulario.pais
											? classFormulario
											: ""
									}
								>
									<option value="Seleccionar">
										Seleccionar Opcion
									</option>
									{informacionFormulario &&
									informacionFormulario.empresa &&
									countries &&
									Array.isArray(countries) &&
									paisesEmpresas.length > 0
										? paisesEmpresas[0].countrys.map(
												(country, index) => (
													<option
														key={index}
														value={country}
														selected={
															country ===
															informacionFormulario.pais
																? true
																: false
														}
													>
														{
															JSON.parse(country)
																.name
														}
													</option>
												)
										  )
										: null}
								</select>
								<label>FUNCIÓN</label>
								<input
									type="text"
									name="funcion"
									value={informacionFormulario.funcion}
									onChange={onChangeInput}
									className={
										!informacionFormulario.funcion
											? classFormulario
											: ""
									}
								/>
							</div>
						</div>
						<div className="input-completo">
							<label>NOTAS</label>
							<textarea
								type="text"
								name="notas"
								value={informacionFormulario.notas}
								onChange={onChangeInput}
							/>
						</div>
					</div>
					<div className="imagen-formulario">
						<img
							src={Participante}
							alt="Imagen-Participante"
							className="imagen-formulario-participante"
						/>
					</div>
				</div>
				<div className="botones">
					{!participante ? (
						<button
							className="boton-crear"
							onClick={async (e) => {
								e.preventDefault();
								if (
									!informacionFormulario.nombre ||
									!informacionFormulario.apellido ||
									!informacionFormulario.fecha ||
									!informacionFormulario.genero ||
									!informacionFormulario.empresa ||
									!informacionFormulario.email ||
									!informacionFormulario.pais ||
									!informacionFormulario.departamento ||
									!informacionFormulario.funcion
								) {
									setClassFormulario("error");
								} else {
									console.log(
										await dispatch(
											actionCrearParticipante(
												informacionFormulario,
												token
											)
										)
									);
								}
							}}
						>
							CREAR NUEVO
						</button>
					) : (
						<button
							className="boton-crear"
							onClick={async (e) => {
								e.preventDefault();
								if (
									!informacionFormulario.nombre ||
									!informacionFormulario.apellido ||
									!informacionFormulario.fecha ||
									!informacionFormulario.genero ||
									!informacionFormulario.email ||
									!informacionFormulario.pais ||
									!informacionFormulario.departamento ||
									!informacionFormulario.funcion
								) {
									setClassFormulario("error");
								} else {
									console.log(
										await dispatch(
											actionActualizaParticipante(
												informacionFormulario,
												token
											)
										)
									);
								}
							}}
						>
							ACTUALIZAR
						</button>
					)}
				</div>
			</section>
		</div>
	);
};

export default FormularioParticipante;
