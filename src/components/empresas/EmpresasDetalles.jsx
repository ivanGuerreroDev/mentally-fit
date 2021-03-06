import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	TOAST_ERROR,
	TOAST_SUCCESS,
} from "../../redux/constants";
import {
	actionGetDataEmpresasCampa├▒as,
	actionEliminarCampana,
	actionUpdateStateCampa├▒a,
	actionEliminarParticipante,
	sendInvitation,
	sendRemember,
	sendReport,
	forgotPass,
	sendInvitationCampaign,
	sendRememberCampaign,
	sendReportCampaign
} from "../../redux/reducersActions/desktop/desktopAction";
import { actionUpdateStateParticipant } from "../../redux/reducersActions/authentication/authenticationAction";
import DataTable from "../table/DataTable";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { confirmAlert } from 'react-confirm-alert';

import { ReactComponent as ExportIcon } from '../../assets/desktop/export-icon.svg'
import futch from '../../api/request'
import Lapiz from "../../assets/dataTable/Lapiz.png";
import { ReactComponent as Bajar } from "../../assets/dataTable/Bajar.svg";
import Basura from "../../assets/dataTable/Basura.png";
import { ReactComponent as Imprimir } from "../../assets/dataTable/Imprimir.svg";
import { ReactComponent as Ojo } from "../../assets/dataTable/Ojo.svg";
import Logo from "../../assets/forms/Logo.png";
import { ReactComponent as Volver } from "../../assets/dataTable/Volver.svg";
import { ReactComponent as Options } from "../../assets/dataTable/options.svg";
import { Popover } from 'react-tiny-popover'

import config from '../../config'
const URL = config[config.enviroment].host;

const EmpresasDetalles = (props) => {
	const [importOpen, setImportOpen] = useState(false)
	const [file, setFile] = useState(null)
	const [isPopoverOpen, setIsPopoverOpen] = useState({})
	const [progress, setProgress] = useState({
		status: "",
		charge: 0
	});

	const dispatch = useDispatch();
	const history = useHistory();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const dataEmpresasCampa├▒as = useSelector(
		(state) => state.desktopReducer.dataEmpresas
	);
	
	const deleteCampana = (id) => {
		confirmAlert({
			title: '┬┐Estas seguro de eliminar esta campa├▒a?',
			message: 'Si eliminas al campa├▒a perderas toda su informaci├│n.',
			buttons: [
				{
					label: 'No'
				},
				{
					label: 'Si',
					onClick: () => {
						dispatch(actionEliminarCampana(id, token))
					}
				}
			]
		});
	}
	const deleteParticipante = (id) => {
		confirmAlert({
			title: '┬┐Estas seguro de eliminar esta participante?',
			message: 'Si eliminas al participante perderas toda su informaci├│n.',
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
	const updateState = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({
			id: props.empresaId,
		});
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
		};
		fetch(URL + "/company/modifyStatus", requestOptions)
		.then((response) => response.json())
		.then((res) => {
			if(res.error){
				dispatch({
					type: TOAST_ERROR,
					payload:
						res &&
						res.message
							? res.message
							: "Error de conexi├│n",
				});
			}else{
				dispatch({
					type: TOAST_SUCCESS,
					payload: res.message
						? res.message
						: "Estado de la empresa actualizado",
				});
				dispatch(actionGetDataEmpresasCampa├▒as(props.empresaId, token));
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
						: "Error de conexi├│n",
			});
		});
	}
	let fileInput = useRef(null);
	const importarParticipantes = (inputs) => {
		const data = new FormData();
		data.append("file", file);
		data.append("inputsData", JSON.stringify(inputs));
		futch(
			URL + "/participant/upload", 
			{
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`
				},
				body: data
			}, 
			(progress)=>{
				setProgress({
					status: "Subiendo",
					charge: ( progress.loaded * 100 ) / progress.total
				})
			}
		)
		.then(res=>{
			
			setProgress({
				status: "Completado",
				charge: ( progress.loaded * 100 ) / progress.total
			})
			dispatch({
				type: TOAST_SUCCESS,
				payload:
					res &&
					res.message
						? res.message
						: "",
			});
			setTimeout(() => {
				setProgress({
					status: "",
					charge: 0
				})
				setImportOpen(false)
				dispatch(actionGetDataEmpresasCampa├▒as(props.empresaId, token));
			}, 1000);
			
		})
		.catch(error=>{
			dispatch({
				type: TOAST_ERROR,
				payload:
					error.response &&
						error.response.data &&
						error.response.data.message
						? error.response.data.message
						: "Error de conexi├│n",
			});
		})

		
	}

	const actionOption = ({index,action,id}) => {
		if(action === "participante-invitacion") dispatch( sendInvitation({email: id, token}) )
		if(action === "participante-recordatorio") dispatch( sendRemember({email: id, token}) )
		if(action === "participante-reporte") dispatch( sendReport({email: id, token}) )
		if(action === "participante-contrase├▒a") dispatch( forgotPass({email: id, token}) )

		if(action === "campa├▒a-invitacion") dispatch( sendInvitationCampaign({campaign: id, token}) )
		if(action === "campa├▒a-recordatorio") dispatch( sendRememberCampaign({campaign: id, token}) )
		if(action === "campa├▒a-reporte") dispatch( sendReportCampaign({campaign: id, token}) )

		setIsPopoverOpen({
			...isPopoverOpen, 
			[index]: false
		})
	}

	useEffect(()=>{
		dispatch(actionGetDataEmpresasCampa├▒as(props.empresaId, token));
	},[])
	return (
		<>
			<section className="nombre-empresa-container-view">
				<div className="nombre-logo-empresa">
					<img src={dataEmpresasCampa├▒as.logo ? URL + "/" + dataEmpresasCampa├▒as.logo : Logo} alt="Logo" className="logo-empresa" />
					<span className="nombre-empresa"></span>
				</div>
				<div className="estado-empresa">
					<a
						className="boton-volver-container"
						href=""
						onClick={() => history.push("/navegacion/empresas")}
					>
						<Volver alt="volver" className="icono-volver"/>
						<span className="texto-volver">VOLVER</span>
					</a>
					<div className="boton-estado-empresa">
						{
							dataEmpresasCampa├▒as&&
							dataEmpresasCampa├▒as.status
								?
									<span className="texto-estado">Activo</span>
								:	<span className="texto-estado">Inactivo</span>
						}						
						<label class="switch">
							<input
								type="checkbox"
								checked={
									dataEmpresasCampa├▒as&&
									dataEmpresasCampa├▒as.status
										?
											dataEmpresasCampa├▒as.status
										:	false
								}
								onClick={(e) => updateState()}
							/>
							<span class="slider round"></span>
						</label>						
					</div>
				</div>
			</section>
			<div className="empresas-campa├▒as-container">
				<section className="campa├▒as-realizadas">
					<div className="informacion-campa├▒as-container">
						<div className="ejecucion">
							<span>Campa├▒as en Ejecuci├│n</span>
							<div className="number">
								{dataEmpresasCampa├▒as.campaigns ? dataEmpresasCampa├▒as.campaigns.filter(
									(e) => {
										return Date.parse(
											e.dateEnd
										) > Date.now();
									}
								).length : 0}
							</div>
						</div>
						<div className="ejecutadas">
							<span>Campa├▒as Completadas</span>
							<div className="number">{dataEmpresasCampa├▒as.campaigns ? dataEmpresasCampa├▒as.campaigns.filter(
								(e) => {
									return Date.parse(
										e.dateEnd
									) < Date.now();
								}
							).length : 0}</div>
						</div>
					</div>
					<div className="numero-participantes">
						<div className="participantes">
							<span>N├║mero de Participantes</span>
							<div className="number">
								{dataEmpresasCampa├▒as.employees ? dataEmpresasCampa├▒as.employees.length : 0}
							</div>
						</div>
					</div>
					<div className="informacion">
						<a onClick={()=>history.push({
							pathname: '/navegacion/empresas/editar',
							state:{
								empresa: dataEmpresasCampa├▒as.id
							}							
						})} className="informacion">
							EDITAR INFORMACI├ôN
						</a>
					</div>
				</section>
				<section className="contenedor-pagina campa├▒as">
					<div className="contenido-pagina">
						<Tabs className="tabs">
							<TabList>
								<Tab>Campa├▒as</Tab>
								<Tab>Participantes</Tab>
							</TabList>

							<TabPanel>
								<div className="boton-contenedor">
									<button
										className="button-primary"
										onClick={(e) => {
											history.push("/campa├▒as/crear");
										}}
									>
										CREAR CAMPA├ĹA
									</button>
								</div>
								<DataTable
									columns={[
										{
											title: "Nombre",
											field: "nombre",
										},
										{
											title: "Participantes",
											field: "participantes",
										},
										{
											title: "Inicio",
											field: "inicio",
										},
										{
											title: "Fin",
											field: "fin",
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
											filtering: false
										},
									]}
									data={dataEmpresasCampa├▒as && dataEmpresasCampa├▒as.campaigns && Array.isArray(dataEmpresasCampa├▒as.campaigns) ? dataEmpresasCampa├▒as.campaigns.map(
										(e, index) => {
											return {
												nombre: e.name,
												participantes: e.numberParticipant ? e.numberParticipant : 0,
												inicio: e.dateStart.slice(
														0,
														10
													),
												fin: e.dateEnd.slice(
													0,
													10
												),
												progreso:
													e.totalCompletada + "/"+e.numberParticipant,
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
																		actionUpdateStateCampa├▒a(
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
													<div style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
														<div className="acciones">
															<a href="" onClick={(a) => {
																a.preventDefault();
																history.push({
																	pathname: `/campa├▒as/editar/`,
																	state: { id: e.id }
																})
															}}>
																<img src={Lapiz} alt="Editar" className="action-icono-participantes" />
															</a>
															<a href="" onClick={(a) => {
																a.preventDefault();
																deleteCampana(e.id)
															}}>
																<img src={Basura} alt="Eliminar" className="action-icono-participantes" />
															</a>
														</div>
														<Popover id='popover-listaDeOpciones'
															isOpen={isPopoverOpen["campaign-"+index]?isPopoverOpen["campaign-"+index]:false}
															position={['right', 'left', "bottom"]} // if you'd like, you can limit the positions
															padding={10} // adjust padding here!
															reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
															onClickOutside={() => setIsPopoverOpen({...isPopoverOpen, ["campaign-"+index]: false})} // handle click events outside of the popover/target here!
															content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
																<div className="listaDeOpciones" style={{zIndex:999}}>
																	<a onClick={()=>{
																		actionOption({
																			action: "campa├▒a-invitacion",
																			id: e.id,
																			index: "campaign-"+index
																		})
																	}}>
																		Enviar invitaci├│n
																	</a>
																	<a onClick={()=>{
																		actionOption({
																			action: "campa├▒a-recordatorio",
																			id: e.id,
																			index: "campaign-"+index
																		})
																	}}>
																		Enviar recordatorio
																	</a>
																	<a onClick={()=>{
																		actionOption({
																			action: "campa├▒a-reporte",
																			id: e.id,
																			index: "campaign-"+index
																		})
																	}}>
																		Enviar reporte
																	</a>
																</div>
															)}
															>
																<a onClick={() => setIsPopoverOpen({
																	...isPopoverOpen, 
																	["campaign-"+index]: 
																		isPopoverOpen["campaign-"+index]
																			?
																				!isPopoverOpen["campaign-"+index]
																			:
																				true
																})}>
																	<Options />
																</a>
														</Popover>
													</div>
												),
											};
										}
									) : []}
								/>
							</TabPanel>
							<TabPanel>
								<div className="boton-contenedor">
									<button
										className="button-secondary"
										style={{ marginRight: 20 }}
										onClick={(e) =>
											setImportOpen(true)
										}
									>
										<ExportIcon />
										IMPORTAR PARTICIPANTES
									</button>
									<button
										className="button-primary"
										onClick={(e) => {
											history.push({
												pathname: "/participantes/agregar",
												state: {
													idCampa├▒a: dataEmpresasCampa├▒as.campaigns[0].id,
													nombreEmpresa: dataEmpresasCampa├▒as.id,
													countries: dataEmpresasCampa├▒as.countries
												}
											})
										}}
									>
										A├ĹADIR PARTICIPANTE
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
												title: "Pais",
												field: "pais",
											},
											{
												title: "Campa├▒as",
												field: "campa├▒as",
											},
											{
												title: "Estado Campa├▒as",
												field: "estadoCampa├▒as",
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
										dataEmpresasCampa├▒as && dataEmpresasCampa├▒as.employees && Array.isArray(dataEmpresasCampa├▒as.employees) ? dataEmpresasCampa├▒as.employees.map((e, index) => {
											return {
												nombre: e.name,
												correo: e.email,
												pais: e.country,
												campa├▒as: e.totalCampaings,
												estadoCampa├▒as: e.lastCampaings,
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
													<div style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
														{
															e.lastCampaings === "Completada" 
															? (
																<div className="acciones">
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
																			<img src={Lapiz} alt="Editar" className="action-icono-participantes" />
																			
																		</div>
																	</a>
																	<a href="" onClick={(a) => {
																		a.preventDefault();
																		deleteParticipante(e.id)
																	}}>
																		<img src={Basura} alt="Eliminar" className="action-icono-participantes" />
																	</a>
																	
																</div>
															) : (
																<div className="acciones">
																	<Ojo alt="Ver" className="action-icono-participantes" />
																	<Bajar alt="Descargar" className="action-icono-participantes" />
																	<Imprimir alt="Imprimir" className="action-icono-participantes" />
																	
																</div>
															)}
															<Popover id='popover-listaDeOpciones'
																isOpen={isPopoverOpen["campaign-"+index]?isPopoverOpen["campaign-"+index]:false}
																position={['right', 'left', "bottom"]} // if you'd like, you can limit the positions
																padding={10} // adjust padding here!
																reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
																onClickOutside={() => setIsPopoverOpen({...isPopoverOpen, ["campaign-"+index]: false})} // handle click events outside of the popover/target here!
																content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
																	<div className="listaDeOpciones" style={{zIndex:"999 !important"}}>
																		<a onClick={()=>{
																			actionOption({
																				action: "participante-invitacion",
																				id: e.email,
																				index: "campaign-"+index
																			})
																		}}>
																			Enviar invitaci├│n
																		</a>
																		<a onClick={()=>{
																			actionOption({
																				action: "participante-recordatorio",
																				id: e.email,
																				index: "campaign-"+index
																			})
																		}}>
																			Enviar recordatorio
																		</a>
																		<a onClick={()=>{
																			actionOption({
																				action: "participante-reporte",
																				id: e.email,
																				index: "campaign-"+index
																			})
																		}}>
																			Enviar reporte
																		</a>
																		<a onClick={()=>{
																			actionOption({
																				action: "participante-contrase├▒a",
																				id: e.email,
																				index: "campaign-"+index
																			})
																		}}>
																			Restablecer contrase├▒a
																		</a>
																	</div>
																)}
																>
																	<a onClick={() => setIsPopoverOpen({
																		...isPopoverOpen, 
																		["campaign-"+index]: 
																			isPopoverOpen["campaign-"+index]
																				?
																					!isPopoverOpen["campaign-"+index]
																				:
																					true
																	})}>
																		<Options />
																	</a>
															</Popover>
													</div>
												),
											};
										}) : []
									}
								/>
								<div className={"modal modal-import" + " " + (importOpen ? "active" : "")} >
									<div className="backdrop" onClick={() => setImportOpen(false)}></div>
									<div className="modal-body">
										<h3 className="title">Importar participantes</h3>
										<form>
											<input
												type="file" name=""
												ref={fileInput}
												onChange={(e) => {
													setFile(e.target
														.files[0])
												}}
												style={{ display: "block" }}
											/>
											<div className={"progress-bar"+" "+(progress.status)}>
												<div style={{width:progress.charge+"%"}}>
													{progress.status}
												</div>
											</div>
											<div style={{textAlign:"center"}}>
												<button
													className={progress.status!=="Subiendo"?"button-primary":"button-disabled"}
													onClick={(e) => {
														e.preventDefault()
														if(progress.status!=="Subiendo"){
															importarParticipantes({
																company: props.empresaId
															})
														}									
													}}
													href="#"
												>
													Importar
												</button>
											</div>
										</form>
									</div>
								</div>
							</TabPanel>
						</Tabs>
					</div>
				</section>
			</div>
		</>
	);
};

export default EmpresasDetalles;
