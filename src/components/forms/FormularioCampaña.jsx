import React, { useState, useEffect } from "react";
import Campaña from "../../assets/forms/Campaña.png";
import { ReactComponent as Volver } from "../../assets/dataTable/Volver.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	actionCrearCampaña,
	actionGetDataFormularioCampañas,
	actionGetDataCampaña,
	actionActualizarCampaña,
} from "../../redux/reducersActions/desktop/desktopAction";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../redux/constants";
import DataTable from "../table/DataTable";
import moment from "moment";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

const today = moment().format("YYYY-MM-DD");
// var today = moment().add(1,'days').format('YYYY-MM-DD, 00:00:00')
var tomorrow = moment().add(2, "days").format("YYYY-MM-DD");

console.log("today", today);
console.log("tomorrow", tomorrow);
/*
var today_1 = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){
	dd='0'+dd
} 
if(mm<10){
	mm='0'+mm
}
today = yyyy+'-'+mm+'-'+dd;*/

const FormularioCampaña = ({ campaña }) => {
	const history = useHistory();
	let location = useLocation();

	const [informacionFormulario, setInformacionFormulario] = useState({
		name: null,
		dateStart: today,
		dateEnd: tomorrow,
		company: null,
		numberParticipant: null,
		priceParticipant: null,
		costoTotal: 0,
		notes: null,
		participantes: [],
	});

	const onChangeInput = (e) => {
		setClassFormulario("");

		if (e.target.name === "numberParticipant") {
			setInformacionFormulario({
				...informacionFormulario,
				numberParticipant: e.target.value,
				costoTotal:
					e.target.value * informacionFormulario.priceParticipant,
			});
		} else if (e.target.name === "priceParticipant") {
			setInformacionFormulario({
				...informacionFormulario,
				priceParticipant: e.target.value,
				costoTotal:
					e.target.value * informacionFormulario.numberParticipant,
			});
		} else {
			setInformacionFormulario({
				...informacionFormulario,
				[e.target.name]: e.target.value,
			});
		}
	};

	const dispatch = useDispatch();

	const [classFormulario, setClassFormulario] = useState("");

	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);

	const dataSelect = useSelector((state) => state.desktopReducer.campañas);

	const crearCampaña = (inputs) => {
		actionCrearCampaña(inputs, token)
			.then((response) => response.json())
			.then((res) => {
				if (res.error) {
					dispatch({
						type: TOAST_ERROR,
						payload:
							res && res.message
								? res.message
								: "Error de conexión",
					});
				} else {
					dispatch({
						type: TOAST_SUCCESS,
						payload: res.message ? res.message : "Campaña Creada",
					});
					history.push({
						pathname: "/navegacion/campañas",
					});
				}
			})
			.catch(async (error) => {
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
	};
	if (!dataSelect.empresas) dispatch(actionGetDataFormularioCampañas(token));

	const actualizarCampaña = (inputs) => {
		var request = inputs;
		var newArr = [];
		request.id = campaña;
		request.participantes.forEach((e) => {
			if (e.list) newArr.push(e.id);
		});
		request.participantes = newArr;

		actionActualizarCampaña(request, token)
			.then((response) => response.json())
			.then((res) => {
				if (res.error) {
					dispatch({
						type: TOAST_ERROR,
						payload:
							res && res.message
								? res.message
								: "Error de conexión",
					});
				} else {
					dispatch({
						type: TOAST_SUCCESS,
						payload: res.message ? res.message : "Campaña Creada",
					});
					history.push({
						pathname: "/navegacion/campañas",
					});
				}
			})
			.catch(async (error) => {
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
	};

	const verificarFechaInicio = (fechaI) => {
		const ahora = moment().format("YYYY-MM-DD");

		if (new Date(ahora) < new Date(fechaI)) return false;

		else return true;
	};



	useEffect(async () => {
		if (campaña) {
			actionGetDataCampaña(campaña, token)
				.then((response) => response.json())
				.then((res) => {
					if (!res.error) {
						var str_ini = "";
						str_ini = moment(res.campaign.dateStart.toString())
							.format("YYYY-MM-DD")
							.toString();
						var str_fin = "";
						str_fin = moment(res.campaign.dateEnd.toString())
							.format("YYYY-MM-DD")
							.toString();

						setInformacionFormulario({
							name: res.campaign.name,
							dateStart: str_ini,
							dateEnd: str_fin,
							company: res.campaign.company,
							numberParticipant: res.campaign.numberParticipant,
							priceParticipant: parseFloat(
								res.campaign.priceParticipant
							),
							costoTotal:
								parseFloat(res.campaign.priceParticipant) *
								res.campaign.numberParticipant,
							notes: res.campaign.notes,
							participantes: res.participants,
						});
					} else {
						dispatch({
							type: TOAST_ERROR,
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

	if (dataSelect.empresas) {
		return (
			<div className="section-container formulario-participante-container container-fluid">
				<section className="nombre-boton-volver">
					<label className="texto-formulario-participante">
						Formulario Campaña
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
				<section className="formulario-agregar-campaña">
					<div className="formulario-inputs-container">
						<div className="inputs-formulario">
							<Tabs className="tabs">
								<TabList>
									<Tab>Campaña</Tab>
									{campaña ? <Tab>Participantes</Tab> : null}
								</TabList>
								<TabPanel>
									<div className="medios-inputs">
										<div className="input-container">
											<div className="input-completo">
												{!campaña ? (
													<>
														<label>EMPRESA</label>
														<select
															name="company"
															value={
																informacionFormulario.company
															}
															onChange={
																onChangeInput
															}
															className={
																!informacionFormulario.company
																	? classFormulario
																	: ""
															}
														>
															<option value="Seleccionar">
																Seleccionar
																Opcion
															</option>
															{dataSelect &&
															dataSelect.empresas &&
															Array.isArray(
																dataSelect.empresas
															)
																? dataSelect.empresas.map(
																		(e) => {
																			return (
																				<option
																					value={
																						e.id
																					}
																				>
																					{
																						e.name
																					}
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
										<div className="input-container">
											<div className="input-completo">
												<label>NOMBRE CAMPAÑA</label>
												<input
													type="text"
													name="name"
													value={
														informacionFormulario.name
													}
													onChange={onChangeInput}
													className={
														!informacionFormulario.name
															? classFormulario
															: ""
													}
												/>
											</div>
										</div>
										<div className="dos-inputs">
											<div className="input-left">
												<label>FECHA DE INICIO</label>
												<input
													disabled={verificarFechaInicio(
														informacionFormulario.dateStart, informacionFormulario.dateEnd
													)}
													type="date"
													name="dateStart"
													min={today}
													value={
														informacionFormulario.dateStart
													}
													onChange={onChangeInput}
													className={
														!informacionFormulario.fechaInicio
															? classFormulario
															: ""
													}
												/>
											</div>
											<div className="input-right">
												<label>FECHA DE FIN</label>
												<input
													type="date"
													name="dateEnd"
													min={today}
													value={
														informacionFormulario.dateEnd
													}
													onChange={onChangeInput}
													className={
														!informacionFormulario.dateEnd
															? classFormulario
															: ""
													}
												/>
											</div>
										</div>
										<div className="input-tres-completo">
											<div className="input-container">
												<label>
													NÚMERO DE PARTICIPANTES
												</label>
												<input
													type="number"
													name="numberParticipant"
													value={
														informacionFormulario.numberParticipant
													}
													onChange={onChangeInput}
													className={
														!informacionFormulario.numberParticipant
															? classFormulario
															: ""
													}
												/>
											</div>
											<div className="input-container">
												<label>
													COSTO POR PARTICIPANTES
												</label>
												<input
													type="number"
													name="priceParticipant"
													value={
														informacionFormulario.priceParticipant
													}
													onChange={onChangeInput}
													className={
														!informacionFormulario.priceParticipant
															? classFormulario
															: ""
													}
												/>
											</div>
											<div className="input-container">
												<label>COSTO TOTAL(S)</label>
												<input
													readOnly
													type="number"
													name="costoTotal"
													value={
														informacionFormulario.costoTotal
													}
													onChange={onChangeInput}
												/>
											</div>
										</div>
									</div>
									<div className="input-completo">
										<label>NOTAS</label>
										<textarea
											type="text"
											name="notes"
											value={informacionFormulario.notes}
											onChange={onChangeInput}
										/>
									</div>
								</TabPanel>
								{campaña &&
								informacionFormulario.participantes ? (
									<TabPanel>
										<DataTable
											columns={[
												{
													title: "",
													field: "checkbox",
													cellStyle: { width: 50 },
													headerStyle: { width: 50 },
													filtering: false,
												},
												{
													title: "Nombre",
													field: "name",
												},
												{
													title: "Departamento",
													field: "department",
												},
												{
													title: "Email",
													field: "email",
												},
											]}
											data={
												informacionFormulario &&
												informacionFormulario.participantes &&
												Array.isArray(
													informacionFormulario.participantes
												)
													? informacionFormulario.participantes.map(
															(
																participante,
																indice
															) => ({
																checkbox: (
																	<input
																		type="checkbox"
																		checked={
																			participante.list
																		}
																		onChange={() => {
																			var participantes =
																				informacionFormulario.participantes;
																			participantes[
																				indice
																			] = {
																				...participantes[
																					indice
																				],
																				list: !participantes[
																					indice
																				]
																					.list,
																			};
																			setInformacionFormulario(
																				{
																					...informacionFormulario,
																					participantes: participantes,
																				}
																			);
																		}}
																	/>
																),
																name:
																	participante.name,
																department:
																	participante.department,
																email:
																	participante.email,
															})
													  )
													: []
											}
											options={{
												headerStyle: {
													width: 50,
												},
											}}
											containerClassName="fist-column-auto"
										/>
									</TabPanel>
								) : null}
							</Tabs>

							<div className="botones">
								<button
									className="boton-importar"
									onClick={(e) => {
										history.push("/navegacion/campañas");
									}}
								>
									CANCELAR
								</button>
								{campaña ? (
									<button
										className="boton-crear"
										onClick={async (e) => {
											e.preventDefault();
											if (
												!informacionFormulario.name ||
												!informacionFormulario.dateStart ||
												!informacionFormulario.dateEnd ||
												!informacionFormulario.company ||
												!informacionFormulario.numberParticipant ||
												!informacionFormulario.priceParticipant
											) {
												setClassFormulario("error");
											} else {
												actualizarCampaña(
													informacionFormulario
												);
											}
										}}
									>
										ACTUALIZAR
									</button>
								) : (
									<button
										className="boton-crear"
										onClick={async (e) => {
											e.preventDefault();
											if (
												!informacionFormulario.name ||
												!informacionFormulario.dateStart ||
												!informacionFormulario.dateEnd ||
												!informacionFormulario.company ||
												!informacionFormulario.numberParticipant ||
												!informacionFormulario.priceParticipant
											) {
												setClassFormulario("error");
											} else {
												crearCampaña(
													informacionFormulario
												);
											}
										}}
									>
										GUARDAR
									</button>
								)}
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
	} else {
		return <div></div>;
	}
};

export default FormularioCampaña;
