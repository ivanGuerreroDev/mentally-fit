import React, { useState, useRef, useEffect } from "react";
import Basura from "../../assets/forms/Basura.png";
import { ReactComponent as Volver } from "../../assets/dataTable/Volver.svg";
import { ReactComponent as Subir } from "../../assets/dataTable/Subir.svg";
import { actionCrearEmpresa } from "../../redux/reducersActions/desktop/desktopAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTags from 'react-tag-autocomplete'
import {
	TOAST_ERROR,
	TOAST_SUCCESS,
} from "../../redux/constants";
import {
	actionGetDataEmpresa,
	actionEditarEmpresa,
	actionGetDataEmpresas
} from "../../redux/reducersActions/desktop/desktopAction";
import defaultLogo from '../../assets/forms/Logo.png'
import config from '../../config'
const URLAPI= config[config.enviroment].host

const FormularioEmpresa = ({location}) => {
	const dispatch = useDispatch();
	const history = useHistory()
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const [formularioEmpresa, setFormularioEmpresa] = useState({
		name: "",
		businessName: "",
		address: "",
		industry: "",
		countrys: [],
		languages: [],
		numberParticipant: 0,
		companystaff: [],
		notes: "",
	});
	const [logoEmpresa, setLogoEmpresa] = useState(null);
	const [logoUp, setLogoUp] = useState(true);

	const [informacionParticipantes, setInformacionParticipantes] = useState({
		name: "",
		email: "",
		phone: "",
		function: "",
	});
	const [classParticipantes, setClassParticipantes] = useState("");
	const [classFormulario, setClassFormulario] = useState("");
	const [type, setType] = useState("crear")
	const eliminarIdioma = (i) => {
		setFormularioEmpresa({
			...formularioEmpresa,
			languages: formularioEmpresa.languages.filter((e, ind) => ind !== i),
		});
	};

	const eliminarPais = (i) => {
		setFormularioEmpresa({
			...formularioEmpresa,
			countrys: formularioEmpresa.countrys.filter((e, ind) => ind !== i),
		});
	};
	const agregarPais = (pais) => {
		setFormularioEmpresa(
			{
				...formularioEmpresa,
				countrys: [
					...formularioEmpresa.countrys,
					pais,
				],
			}
		);
	}
	const agregarIdioma = (idioma) => {
		setFormularioEmpresa(
			{
				...formularioEmpresa,
				languages: [
					...formularioEmpresa.languages,
					idioma,
				],
			}
		);
	}
	const reactPaises = React.createRef()
	const reactIdiomas = React.createRef()

	const handleChange = (e) => {
		setClassFormulario("");
		setFormularioEmpresa({
			...formularioEmpresa,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeParticipantes = (e) => {
		setClassParticipantes("");
		setInformacionParticipantes({
			...informacionParticipantes,
			[e.target.name]: e.target.value,
		});
	};
	const eliminarParticipante = (index) => {
		setFormularioEmpresa({
			...formularioEmpresa,
			companystaff: formularioEmpresa.companystaff.filter(
				(e, ind) => {
					return ind !== index;
				}
			),
		});
	};


	const getDataCompany = (empresa) => {
		actionGetDataEmpresa(empresa, token)
			.then((response) => response.json())
			.then((res) => {
				const datosEmpresa = res.company
				const languages = datosEmpresa.languages.map((e,i)=>{
					const data = JSON.parse(e)
					return data
				})
				const countrys = datosEmpresa.countrys.map((e,i)=>{
					const data = JSON.parse(e)
					return data
				})
				const contactos = res.companystaff
				if (!res.error) {
					setFormularioEmpresa({
						name: datosEmpresa.name,
						businessName: datosEmpresa.businessName,
						address: datosEmpresa.address,
						industry: datosEmpresa.industry,
						countrys,
						languages,
						numberParticipant: datosEmpresa.numberParticipant,
						companystaff: contactos,
						notes: datosEmpresa.notes,
					})
					if(datosEmpresa.logo && datosEmpresa !== "") setLogoEmpresa(datosEmpresa.logo)
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

	useEffect(()=>{
		if(location && location.state && location.state.empresa){
			setType("editar")
			setLogoUp(false)
			getDataCompany(location.state.empresa)
		}
	},[])

	let fileInput = useRef(null);

	const industrias = [
		{name: 'Industria siderúrgicas'},
		{name: 'Industria química'},
		{name: 'Industria petroquímica'},
		{name: 'Industria automovilística'},
		{name: 'Industria alimentaria'},
		{name: 'Industria textil'},
		{name: 'Industria farmacéutica'},
		{name: 'Industria armamentística'},
		{name: 'Industria informática'},
		{name: 'Industria mecánica'},
		{name: 'Industria peletería'},
		{name: 'Industria energética'},
	]

	return (
		<div className="section-container formulario-empresas-container">
			<section className="nombre-boton-volver">
				<label className="texto-formulario-participante">
					Formulario Empresa
				</label>
				<div
					className="boton-volver"
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
			<div className="formulario-container">
				<div>
					<section className="seccion-logo">
						<div className={"logo-empresa " + (logoEmpresa ? "" : "empty")}>
							{
								logoEmpresa
									?
									<img
										src={logoUp ? URL.createObjectURL(logoEmpresa) : URLAPI + "/" + logoEmpresa}
										alt="Logo-Empresa"
									/>
									:
									<img
										src={defaultLogo}
										style={{ width: 70, heigh: 70 }}
										alt="Logo-Empresa"
									/>
							}
						</div>
						<div className="acciones-logo">
							<div className="subir">
								<label class="custom-file-upload">
									<input
										type="file"
										ref={fileInput}
										onChange={(e) => {
											setLogoUp(true)
											setLogoEmpresa(e.target
												.files[0])
										}
										}
									/>
									<Subir 
										alt="Subir"
										className="icono-subir-logo"
									/>
									<span className="subir-logo">
										Subir
									</span>
								</label>
							</div>
							<div className="eliminar">
								<a
									onClick={(e) => {
										fileInput.current.value = null;
										setLogoEmpresa(null);
									}}
								>
									<img
										src={Basura}
										alt="Eliminar"
										className="icono-eliminar-logo"
									/>
									<span className="eliminar-logo">
										Eliminar
									</span>
								</a>
							</div>
						</div>
					</section>
					<section className="informacion-formulario-container">
						<form

							action=""
							className="informacion-formulario"
						>
							<label className="titulo-input">
								NOMBRE COMERCIAL
							</label>
							<input
								type="text"
								name="name"
								value={
									formularioEmpresa.name
								}
								onChange={handleChange}
								className={
									!formularioEmpresa
										.name
										.length
										? classFormulario
										: ""
								}
							/>
							<label className="titulo-input">
								RAZÓN SOCIAL
							</label>
							<input
								type="text"
								name="businessName"
								value={
									formularioEmpresa.businessName
								}
								onChange={handleChange}
								className={
									!formularioEmpresa
										.businessName.length
										? classFormulario
										: ""
								}
							/>
							<label className="titulo-input">
								DIRECCIÓN
							</label>
							<textarea
								name="address"
								value={
									formularioEmpresa.address
								}
								onChange={handleChange}
								className={
									!formularioEmpresa
										.address.length
										? classFormulario
										: ""
								}
							/>
							<label className="titulo-input">
								INDUSTRIA
							</label>
							<select
								value={
									formularioEmpresa.industry
								}
								onChange={handleChange}
								name="industry"
								className={
									!formularioEmpresa
										.industry.length
										? classFormulario
										: ""
								}
							>
								<option value="value1">
									Seleccionar Opcion
                                                </option>
								{industrias.map( (e, i) => {
									return (
								<option value={i+1} key={i}>
									{e.name}
                                                </option>

									)
								})}
							</select>
							<label className="titulo-input">
								PAISES
							</label>

							<div
								className={
									!formularioEmpresa.countrys
										.length
										? classFormulario +
										" idiomas-container"
										: "idiomas-container"
								}
							>
								<ReactTags
									ref={reactPaises}
									tags={formularioEmpresa.countrys}
									suggestions={countrys}
									onDelete={eliminarPais}
									onAddition={agregarPais}
									placeholderText="Ingrese país"
								/>
							</div>

							<label className="titulo-input">
								IDIOMAS
                                          </label>
							<div
								className={
									!formularioEmpresa.languages
										.length
										? classFormulario +
										" idiomas-container"
										: "idiomas-container"
								}
							>
								<ReactTags
									ref={reactIdiomas}
									tags={formularioEmpresa.languages}
									suggestions={languages}
									onDelete={eliminarIdioma}
									onAddition={agregarIdioma}
									placeholderText="Ingrese idioma"
								/>
							</div>
							<label className="titulo-input">
								NÚMERO DE PARTICIPANTES
							</label>
							<input
								type="number"
								name="numberParticipant"
								min="0"
								value={
									formularioEmpresa.numberParticipant
								}
								onChange={handleChange}
							/>

							{/* --> Seccion Participantes <-- */}

							<section className="datos-participantes">
								<table style={{ width: '100%' }}>
									<thead>
										<tr className="titulos">
											<th>Nombre de contacto</th>
											<th>Email</th>
											<th>Teléfono</th>
											<th>Función</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{
										formularioEmpresa && 
										formularioEmpresa.companystaff && 
										Array.isArray(formularioEmpresa.companystaff) ? 
										formularioEmpresa.companystaff.map(
											(participant, index) => {
												return (
													<tr className="participante-container">
														<td>{participant.name}</td>
														<td>{participant.email}</td>
														<td>{participant.phone}</td>
														<td>{participant.function}</td>
														<td>
															<div>
																<a
																	onClick={
																		(e) => {
																			eliminarParticipante(index);
																		}}
																>
																	<img
																		src={Basura}
																		alt="delete"
																	/>
																</a>
															</div>
														</td>
													</tr>
												);
											}
										):null
										}
									</tbody>
								</table>
								<form
									className="input-datos-participantes"
									style={{
										display: "flex",
										flexWrap: "wrap"
									}}
								>
									<input
										type="text"
										name="name"
										placeholder="Nombre de contacto"
										value={
											informacionParticipantes.name
										}
										onChange={
											handleChangeParticipantes
										}
										className={
											!informacionParticipantes
												.name
												.length
												? classParticipantes
												: ""
										}
									/>
									<input
										type="email"
										name="email"
										placeholder="Email"
										value={
											informacionParticipantes.email
										}
										onChange={
											handleChangeParticipantes
										}
										className={
											!informacionParticipantes
												.email
												.length
												? classParticipantes
												: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
													informacionParticipantes.email
												) ==
													false
													? classParticipantes
													: ""
										}
									/>
									<input
										type="tel"
										name="phone"
										placeholder="Teléfono"
										value={
											informacionParticipantes.phone
										}
										onChange={
											handleChangeParticipantes
										}
										className={
											!informacionParticipantes
												.phone
												.length
												? classParticipantes
												: ""
										}
									/>
									<input
										type="text"
										name="function"
										placeholder="Función"
										value={
											informacionParticipantes.function
										}
										onChange={
											handleChangeParticipantes
										}
										className={
											!informacionParticipantes
												.function
												.length
												? classParticipantes
												: ""
										}
									/>
									<input
										type="submit"
										className="input-submit"
										value="+ AÑADIR"
										onClick={(e) => {
											e.preventDefault();
											if (
												!informacionParticipantes
													.name
													.length ||
												!informacionParticipantes
													.email
													.length ||
												/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
													informacionParticipantes.email
												) ==
												false ||
												!informacionParticipantes
													.phone
													.length ||
												!informacionParticipantes
													.function
													.length
											) {
												setClassParticipantes(
													"error"
												);
											} else {
												setFormularioEmpresa(
													{
														...formularioEmpresa,
														companystaff: [
															...formularioEmpresa.companystaff,
															informacionParticipantes,
														]
													}
												);
												setInformacionParticipantes(
													{
														name:
															"",
														email:
															"",
														phone:
															"",
														function:
															"",
													}
												);
											}
										}}
									/>
								</form>
							</section>

							<label className="titulo-input">
								NOTAS
							</label>
							<textarea
								name="notes"
								value={formularioEmpresa.notes}
								onChange={handleChange}
							/>
						</form>
					</section>
				</div>
				<div className="boton-contenedor" style={{ marginTop: 20 }}>
					{
						type === "crear" 
							?
							<button
								className="button-primary"
								onClick={(e) => {
									e.preventDefault();
									if (
										!formularioEmpresa
											.name.length ||
										!formularioEmpresa.businessName
											.length ||
										!formularioEmpresa.address
											.length ||
										!formularioEmpresa.industry
											.length ||
										!formularioEmpresa.countrys
											.length ||
										!formularioEmpresa.languages
											.length
									) {
										setClassFormulario("error");
									} else {
										dispatch(
											actionCrearEmpresa(
												formularioEmpresa,
												logoEmpresa,
												token
											)
										);
										dispatch(actionGetDataEmpresas(token))
										history.push('/navegacion/empresas')
									}
								}}
							>
								AGREGAR EMPRESA
							</button>
							:
							<button
								className="button-primary"
								onClick={(e) => {
									e.preventDefault();
									if (
										!formularioEmpresa
											.name.length ||
										!formularioEmpresa.businessName
											.length ||
										!formularioEmpresa.address
											.length ||
										!formularioEmpresa.industry
											.length ||
										!formularioEmpresa.countrys
											.length ||
										!formularioEmpresa.languages
											.length
									) {
										setClassFormulario("error");
									} else {
										const datos =  {
											inputs: formularioEmpresa,
											logo: logoEmpresa,
											token,
											id: location.state.empresa
										} 
										actionEditarEmpresa(datos)
										.then((response) => response.json())
										.then((res) => {
											if(res.error){
												dispatch({
													type: TOAST_ERROR,
													payload:
														res &&
														res.message
															? res.message
															: "Error de conexión",
												});
											}else{
												dispatch({
													type: TOAST_SUCCESS,
													payload: res.message
														? res.message
														: "Empresa Acutalziada.",
												});
												dispatch(actionGetDataEmpresas(token))
												history.push({
													pathname: `/empresas/campañas/`,
													state: { id: location.state.empresa }
												})
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
								}}
							>
								ACTUALIZAR EMPRESA
							</button>
					}
					
				</div>
			</div>
		</div>
	);
};

export default FormularioEmpresa;




const countrys = [{
	id: "AF",
	name: "Afganistán"
}, {
	id: "AL",
	name: "Albania"
}, {
	id: "DZ",
	name: "Argelia"
}, {
	id: "AS",
	name: "Samoa Americana"
}, {
	id: "AD",
	name: "Andorra"
}, {
	id: "AO",
	name: "Angola"
}, {
	id: "AI",
	name: "Anguilla"
}, {
	id: "AQ",
	name: "Antártida"
}, {
	id: "AG",
	name: "Antigua y Barbuda"
}, {
	id: "AR",
	name: "Argentina"
}, {
	id: "AM",
	name: "Armenia"
}, {
	id: "AW",
	name: "Aruba"
}, {
	id: "AU",
	name: "Australia"
}, {
	id: "AT",
	name: "Austria"
}, {
	id: "AZ",
	name: "Azerbaiyán"
}, {
	id: "BS",
	name: "Bahamas"
}, {
	id: "BH",
	name: "Baréin"
}, {
	id: "BD",
	name: "Banglades"
}, {
	id: "BB",
	name: "Barbados"
}, {
	id: "BY",
	name: "Bielorrusia"
}, {
	id: "BE",
	name: "Bélgica"
}, {
	id: "BZ",
	name: "Belice"
}, {
	id: "BJ",
	name: "Benin"
}, {
	id: "BM",
	name: "Bermudas"
}, {
	id: "BT",
	name: "Butan"
}, {
	id: "BO",
	name: "Bolivia"
}, {
	id: "BA",
	name: "Bosnia-Herzegovina"
}, {
	id: "BW",
	name: "Botsuana"
}, {
	id: "BR",
	name: "Brasil"
}, {
	id: "IO",
	name: "Territorio Británico del Océano Índico"
}, {
	id: "BN",
	name: "Brunei"
}, {
	id: "BG",
	name: "Bulgaria"
}, {
	id: "BF",
	name: "Burkina Faso"
}, {
	id: "BI",
	name: "Burundi"
}, {
	id: "KH",
	name: "Camboya"
}, {
	id: "CM",
	name: "Camerún"
}, {
	id: "CA",
	name: "Canadá"
}, {
	id: "CV",
	name: "Cabo Verde"
}, {
	id: "KY",
	name: "Islas Caimán"
}, {
	id: "CF",
	name: "República Centroafricana"
}, {
	id: "TD",
	name: "Chad"
}, {
	id: "CL",
	name: "Chile"
}, {
	id: "CN",
	name: "China"
}, {
	id: "CX",
	name: "Isla de Navidad"
}, {
	id: "CC",
	name: "Islas Cocos"
}, {
	id: "CO",
	name: "Colombia"
}, {
	id: "KM",
	name: "Comoras"
}, {
	id: "CG",
	name: "Congo"
}, {
	id: "CD",
	name: "República Democrática del Congo"
}, {
	id: "CK",
	name: "Islas Cook"
}, {
	id: "CR",
	name: "Costa Rica"
}, {
	id: "CI",
	name: "Costa de Marfil"
}, {
	id: "HR",
	name: "Croacia"
}, {
	id: "CU",
	name: "Cuba"
}, {
	id: "CY",
	name: "Chipre"
}, {
	id: "CZ",
	name: "Chequia"
}, {
	id: "DK",
	name: "Dinamarca"
}, {
	id: "DJ",
	name: "Yibuti"
}, {
	id: "DM",
	name: "Dominica"
}, {
	id: "DO",
	name: "República Dominicana"
}, {
	id: "EC",
	name: "Ecuador"
}, {
	id: "EG",
	name: "Egipto"
}, {
	id: "SV",
	name: "El Salvador"
}, {
	id: "GQ",
	name: "Guinea Ecuatorial"
}, {
	id: "ER",
	name: "Eritrea"
}, {
	id: "EE",
	name: "Estonia"
}, {
	id: "ET",
	name: "Etiopía"
}, {
	id: "FK",
	name: "Islas Malvinas"
}, {
	id: "FO",
	name: "Islas Feroe"
}, {
	id: "FJ",
	name: "Fiyi"
}, {
	id: "FI",
	name: "Finlandia"
}, {
	id: "FR",
	name: "Francia"
}, {
	id: "GF",
	name: "Guayana Francesa"
}, {
	id: "PF",
	name: "Polinesia Francesa"
}, {
	id: "GA",
	name: "Gabón"
}, {
	id: "GM",
	name: "Gambia"
}, {
	id: "GE",
	name: "Georgia"
}, {
	id: "DE",
	name: "Alemania"
}, {
	id: "GH",
	name: "Ghana"
}, {
	id: "GI",
	name: "Gibraltar"
}, {
	id: "GR",
	name: "Grecia"
}, {
	id: "GL",
	name: "Groenlandia"
}, {
	id: "GD",
	name: "Granada"
}, {
	id: "GP",
	name: "Guadalupe"
}, {
	id: "GU",
	name: "Guam"
}, {
	id: "GT",
	name: "Guatemala"
}, {
	id: "GG",
	name: "Guernsey"
}, {
	id: "GN",
	name: "Guinea"
}, {
	id: "GW",
	name: "Guinea-Bisau"
}, {
	id: "GY",
	name: "Guyana"
}, {
	id: "HT",
	name: "Haití"
}, {
	id: "VA",
	name: "Ciudad del Vaticano"
}, {
	id: "HN",
	name: "Honduras"
}, {
	id: "HK",
	name: "Hong Kong"
}, {
	id: "HU",
	name: "Hungría"
}, {
	id: "IS",
	name: "Islandia"
}, {
	id: "IN",
	name: "India"
}, {
	id: "ID",
	name: "Indonesia"
}, {
	id: "IR",
	name: "Irán"
}, {
	id: "IQ",
	name: "Iraq"
}, {
	id: "IE",
	name: "Irlanda"
}, {
	id: "IM",
	name: "Isla de Man"
}, {
	id: "IL",
	name: "Israel"
}, {
	id: "IT",
	name: "Italia"
}, {
	id: "JM",
	name: "Jamaica"
}, {
	id: "JP",
	name: "Japón"
}, {
	id: "JE",
	name: "Jersey"
}, {
	id: "JO",
	name: "Jordania"
}, {
	id: "KZ",
	name: "Kazajistán"
}, {
	id: "KE",
	name: "Kenia"
}, {
	id: "KI",
	name: "Kiribati"
}, {
	id: "KP",
	name: "Corea del Norte"
}, {
	id: "KR",
	name: "Corea del Sur"
}, {
	id: "XK",
	name: "Kosovo"
}, {
	id: "KW",
	name: "Kuwait"
}, {
	id: "KG",
	name: "Kirguistán"
}, {
	id: "LA",
	name: "Laos"
}, {
	id: "LV",
	name: "Letonia"
}, {
	id: "LB",
	name: "Líbano"
}, {
	id: "LS",
	name: "Lesoto"
}, {
	id: "LR",
	name: "Liberia"
}, {
	id: "LY",
	name: "Libia"
}, {
	id: "LI",
	name: "Liechtenstein"
}, {
	id: "LT",
	name: "Lituania"
}, {
	id: "LU",
	name: "Luxemburgo"
}, {
	id: "MO",
	name: "Macao"
}, {
	id: "MK",
	name: "República de Macedonia"
}, {
	id: "MG",
	name: "Madagascar"
}, {
	id: "MW",
	name: "Malaui"
}, {
	id: "MY",
	name: "Malasia"
}, {
	id: "MV",
	name: "Maldivas"
}, {
	id: "ML",
	name: "Malí"
}, {
	id: "MT",
	name: "Malta"
}, {
	id: "MH",
	name: "Islas Marshall"
}, {
	id: "MQ",
	name: "Martinica"
}, {
	id: "MR",
	name: "Mauritania"
}, {
	id: "MU",
	name: "Mauricio"
}, {
	id: "YT",
	name: "Mayotte"
}, {
	id: "MX",
	name: "México"
}, {
	id: "FM",
	name: "Estados Federados de Micronesia"
}, {
	id: "MD",
	name: "Moldavia"
}, {
	id: "MC",
	name: "Monaco"
}, {
	id: "MN",
	name: "Mongolia"
}, {
	id: "ME",
	name: "Montenegro"
}, {
	id: "MS",
	name: "Montserrat"
}, {
	id: "MA",
	name: "Marruecos"
}, {
	id: "MZ",
	name: "Mozambique"
}, {
	id: "MM",
	name: "Birmania"
}, {
	id: "NA",
	name: "Namibia"
}, {
	id: "NR",
	name: "Nauru"
}, {
	id: "NP",
	name: "Nepal"
}, {
	id: "NL",
	name: "Holanda"
}, {
	id: "AN",
	name: "Antillas Holandesas"
}, {
	id: "NC",
	name: "Nueva Caledonia"
}, {
	id: "NZ",
	name: "Nueva Zelanda"
}, {
	id: "NI",
	name: "Nicaragua"
}, {
	id: "NE",
	name: "Niger"
}, {
	id: "NG",
	name: "Nigeria"
}, {
	id: "NU",
	name: "Niue"
}, {
	id: "NF",
	name: "IslaNorfolk"
}, {
	id: "MP",
	name: "IslasMarianasdelNorte"
}, {
	id: "NO",
	name: "Noruega"
}, {
	id: "OM",
	name: "Omán"
}, {
	id: "PK",
	name: "Pakistán"
}, {
	id: "PW",
	name: "Palaos"
}, {
	id: "PA",
	name: "Panamá"
}, {
	id: "PG",
	name: "Papúa Nueva Guinea"
}, {
	id: "PY",
	name: "Paraguay"
}, {
	id: "PE",
	name: "Perú"
}, {
	id: "PH",
	name: "Filipinas"
}, {
	id: "PN",
	name: "Islas Pitcairn"
}, {
	id: "PL",
	name: "Polonia"
}, {
	id: "PT",
	name: "Portugal"
}, {
	id: "PR",
	name: "Puerto Rico"
}, {
	id: "QA",
	name: "Qatar"
}, {
	id: "RO",
	name: "Rumania"
}, {
	id: "RU",
	name: "Rusia"
}, {
	id: "RW",
	name: "Ruanda"
}, {
	id: "RE",
	name: "Reunion"
}, {
	id: "BL",
	name: "San Bartolome"
}, {
	id: "SH",
	name: "Santa Elena, Ascensión y Tristán de Acuña"
}, {
	id: "KN",
	name: "San Cristóbal y Nieves"
}, {
	id: "LC",
	name: "Santa Lucía"
}, {
	id: "MF",
	name: "Isla de San Martín"
}, {
	id: "PM",
	name: "San Pedro y Miquelon"
}, {
	id: "VC",
	name: "San Vicente y las Granadinas"
}, {
	id: "WS",
	name: "Samoa"
}, {
	id: "SM",
	name: "San Marino"
}, {
	id: "ST",
	name: " Santo Tomé y Príncipe"
}, {
	id: "SA",
	name: "Arabia Saudita"
}, {
	id: "SN",
	name: "Senegal"
}, {
	id: "RS",
	name: "Serbia"
}, {
	id: "SC",
	name: "Seychelles"
}, {
	id: "SL",
	name: "Sierra Leona"
}, {
	id: "SG",
	name: "Singapur"
}, {
	id: "SK",
	name: "Eslovaquia"
}, {
	id: "SI",
	name: "Eslovenia"
}, {
	id: "SB",
	name: "Islas Salomón"
}, {
	id: "SO",
	name: "Somalia"
}, {
	id: "ZA",
	name: "Sudáfrica"
}, {
	id: "SS",
	name: "Sudán del Sur"
}, {
	id: "ES",
	name: "España"
}, {
	id: "LK",
	name: "Sri Lanka"
}, {
	id: "PS",
	name: "Estado de Palestina"
}, {
	id: "SD",
	name: "Sudán"
}, {
	id: "SR",
	name: "Surinam"
}, {
	id: "SJ",
	name: "Svalbard y Jan Mayen"
}, {
	id: "SZ",
	name: "Suazilandia"
}, {
	id: "SE",
	name: "Suecia"
}, {
	id: "CH",
	name: "Suiza"
}, {
	id: "SY",
	name: "Siria"
}, {
	id: "TW",
	name: "Taiwán"
}, {
	id: "TJ",
	name: "Tayikistán"
}, {
	id: "TZ",
	name: "Tanzania"
}, {
	id: "TH",
	name: "Tailandia"
}, {
	id: "TL",
	name: "Timor Oriental"
}, {
	id: "TG",
	name: "Togo"
}, {
	id: "TK",
	name: "Tokelau"
}, {
	id: "TO",
	name: "Tonga"
}, {
	id: "TT",
	name: "Trinidad y Tobago"
}, {
	id: "TN",
	name: "Túnez"
}, {
	id: "TR",
	name: "Turquía"
}, {
	id: "TM",
	name: "Turkmenistán"
}, {
	id: "TC",
	name: "Islas Turcas y Caicos"
}, {
	id: "TV",
	name: "Tuvalu"
}, {
	id: "UG",
	name: "Uganda"
}, {
	id: "UA",
	name: "Ucrania"
}, {
	id: "AE",
	name: "Emiratos Árabes Unidos"
}, {
	id: "GB",
	name: "Reino Unido"
}, {
	id: "US",
	name: "Estados Unidos"
}, {
	id: "UY",
	name: "Uruguay"
}, {
	id: "UZ",
	name: "Uzbekistán"
}, {
	id: "VU",
	name: "Vanuatu"
}, {
	id: "VE",
	name: "Venezuela"
}, {
	id: "VN",
	name: "Vietnam"
}, {
	id: "VG",
	name: "Islas Vírgenes Británicas"
}, {
	id: "VI",
	name: "Islas Vírgenes de los Estados Unidos"
}, {
	id: "WF",
	name: "Wallis y Futuna"
}, {
	id: "YE",
	name: "Yemen"
}, {
	id: "ZM",
	name: "Zambia"
}, {
	id: "ZW",
	name: "Zimbabue"
}, {
	id: "AX",
	name: "Åland"
}]
const languages = [{
	id: "ab",
	name: "Abkhaz"
}, {
	id: "aa",
	name: "Afar"
}, {
	id: "af",
	name: "Afrikaans"
}, {
	id: "ak",
	name: "Akan"
}, {
	id: "sq",
	name: "Albanian"
}, {
	id: "am",
	name: "Amharic"
}, {
	id: "ar",
	name: "Arabic"
}, {
	id: "an",
	name: "Aragonese"
}, {
	id: "hy",
	name: "Armenian"
}, {
	id: "as",
	name: "Assamese"
}, {
	id: "av",
	name: "Avaric"
}, {
	id: "ae",
	name: "Avestan"
}, {
	id: "ay",
	name: "Aymara"
}, {
	id: "az",
	name: "Azerbaijani"
}, {
	id: "bm",
	name: "Bambara"
}, {
	id: "ba",
	name: "Bashkir"
}, {
	id: "eu",
	name: "Basque"
}, {
	id: "be",
	name: "Belarusian"
}, {
	id: "bn",
	name: "Bengali"
}, {
	id: "bh",
	name: "Bihari"
}, {
	id: "bi",
	name: "Bislama"
}, {
	id: "bs",
	name: "Bosnian"
}, {
	id: "br",
	name: "Breton"
}, {
	id: "bg",
	name: "Bulgarian"
}, {
	id: "my",
	name: "Burmese"
}, {
	id: "ca",
	name: "Catalan; Valencian"
}, {
	id: "ch",
	name: "Chamorro"
}, {
	id: "ce",
	name: "Chechen"
}, {
	id: "ny",
	name: "Chichewa; Chewa; Nyanja"
}, {
	id: "zh",
	name: "Chinese"
}, {
	id: "cv",
	name: "Chuvash"
}, {
	id: "kw",
	name: "Cornish"
}, {
	id: "co",
	name: "Corsican"
}, {
	id: "cr",
	name: "Cree"
}, {
	id: "hr",
	name: "Croatian"
}, {
	id: "cs",
	name: "Czech"
}, {
	id: "da",
	name: "Danish"
}, {
	id: "dv",
	name: "Divehi; Dhivehi; Maldivian;"
}, {
	id: "nl",
	name: "Dutch"
}, {
	id: "en",
	name: "English"
}, {
	id: "eo",
	name: "Esperanto"
}, {
	id: "et",
	name: "Estonian"
}, {
	id: "ee",
	name: "Ewe"
}, {
	id: "fo",
	name: "Faroese"
}, {
	id: "fj",
	name: "Fijian"
}, {
	id: "fi",
	name: "Finnish"
}, {
	id: "fr",
	name: "French"
}, {
	id: "ff",
	name: "Fula; Fulah; Pulaar; Pular"
}, {
	id: "gl",
	name: "Galician"
}, {
	id: "ka",
	name: "Georgian"
}, {
	id: "de",
	name: "German"
}, {
	id: "el",
	name: "Greek, Modern"
}, {
	id: "gn",
	name: "Guaraní"
}, {
	id: "gu",
	name: "Gujarati"
}, {
	id: "ht",
	name: "Haitian; Haitian Creole"
}, {
	id: "ha",
	name: "Hausa"
}, {
	id: "he",
	name: "Hebrew (modern)"
}, {
	id: "hz",
	name: "Herero"
}, {
	id: "hi",
	name: "Hindi"
}, {
	id: "ho",
	name: "Hiri Motu"
}, {
	id: "hu",
	name: "Hungarian"
}, {
	id: "ia",
	name: "Interlingua"
}, {
	id: "id",
	name: "Indonesian"
}, {
	id: "ie",
	name: "Interlingue"
}, {
	id: "ga",
	name: "Irish"
}, {
	id: "ig",
	name: "Igbo"
}, {
	id: "ik",
	name: "Inupiaq"
}, {
	id: "io",
	name: "Ido"
}, {
	id: "is",
	name: "Icelandic"
}, {
	id: "it",
	name: "Italian"
}, {
	id: "iu",
	name: "Inuktitut"
}, {
	id: "ja",
	name: "Japanese"
}, {
	id: "jv",
	name: "Javanese"
}, {
	id: "kl",
	name: "Kalaallisut, Greenlandic"
}, {
	id: "kn",
	name: "Kannada"
}, {
	id: "kr",
	name: "Kanuri"
}, {
	id: "ks",
	name: "Kashmiri"
}, {
	id: "kk",
	name: "Kazakh"
}, {
	id: "km",
	name: "Khmer"
}, {
	id: "ki",
	name: "Kikuyu, Gikuyu"
}, {
	id: "rw",
	name: "Kinyarwanda"
}, {
	id: "ky",
	name: "Kirghiz, Kyrgyz"
}, {
	id: "kv",
	name: "Komi"
}, {
	id: "kg",
	name: "Kongo"
}, {
	id: "ko",
	name: "Korean"
}, {
	id: "ku",
	name: "Kurdish"
}, {
	id: "kj",
	name: "Kwanyama, Kuanyama"
}, {
	id: "la",
	name: "Latin"
}, {
	id: "lb",
	name: "Luxembourgish, Letzeburgesch"
}, {
	id: "lg",
	name: "Luganda"
}, {
	id: "li",
	name: "Limburgish, Limburgan, Limburger"
}, {
	id: "ln",
	name: "Lingala"
}, {
	id: "lo",
	name: "Lao"
}, {
	id: "lt",
	name: "Lithuanian"
}, {
	id: "lu",
	name: "Luba-Katanga"
}, {
	id: "lv",
	name: "Latvian"
}, {
	id: "gv",
	name: "Manx"
}, {
	id: "mk",
	name: "Macedonian"
}, {
	id: "mg",
	name: "Malagasy"
}, {
	id: "ms",
	name: "Malay"
}, {
	id: "ml",
	name: "Malayalam"
}, {
	id: "mt",
	name: "Maltese"
}, {
	id: "mi",
	name: "Māori"
}, {
	id: "mr",
	name: "Marathi (Marāṭhī)"
}, {
	id: "mh",
	name: "Marshallese"
}, {
	id: "mn",
	name: "Mongolian"
}, {
	id: "na",
	name: "Nauru"
}, {
	id: "nv",
	name: "Navajo, Navaho"
}, {
	id: "nb",
	name: "Norwegian Bokmål"
}, {
	id: "nd",
	name: "North Ndebele"
}, {
	id: "ne",
	name: "Nepali"
}, {
	id: "ng",
	name: "Ndonga"
}, {
	id: "nn",
	name: "Norwegian Nynorsk"
}, {
	id: "no",
	name: "Norwegian"
}, {
	id: "ii",
	name: "Nuosu"
}, {
	id: "nr",
	name: "South Ndebele"
}, {
	id: "oc",
	name: "Occitan"
}, {
	id: "oj",
	name: "Ojibwe, Ojibwa"
}, {
	id: "cu",
	name: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"
}, {
	id: "om",
	name: "Oromo"
}, {
	id: "or",
	name: "Oriya"
}, {
	id: "os",
	name: "Ossetian, Ossetic"
}, {
	id: "pa",
	name: "Panjabi, Punjabi"
}, {
	id: "pi",
	name: "Pāli"
}, {
	id: "fa",
	name: "Persian"
}, {
	id: "pl",
	name: "Polish"
}, {
	id: "ps",
	name: "Pashto, Pushto"
}, {
	id: "pt",
	name: "Portuguese"
}, {
	id: "qu",
	name: "Quechua"
}, {
	id: "rm",
	name: "Romansh"
}, {
	id: "rn",
	name: "Kirundi"
}, {
	id: "ro",
	name: "Romanian, Moldavian, Moldovan"
}, {
	id: "ru",
	name: "Russian"
}, {
	id: "sa",
	name: "Sanskrit (Saṁskṛta)"
}, {
	id: "sc",
	name: "Sardinian"
}, {
	id: "sd",
	name: "Sindhi"
}, {
	id: "se",
	name: "Northern Sami"
}, {
	id: "sm",
	name: "Samoan"
}, {
	id: "sg",
	name: "Sango"
}, {
	id: "sr",
	name: "Serbian"
}, {
	id: "gd",
	name: "Scottish Gaelic; Gaelic"
}, {
	id: "sn",
	name: "Shona"
}, {
	id: "si",
	name: "Sinhala, Sinhalese"
}, {
	id: "sk",
	name: "Slovak"
}, {
	id: "sl",
	name: "Slovene"
}, {
	id: "so",
	name: "Somali"
}, {
	id: "st",
	name: "Southern Sotho"
}, {
	id: "es",
	name: "Español"
}, {
	id: "su",
	name: "Sundanese"
}, {
	id: "sw",
	name: "Swahili"
}, {
	id: "ss",
	name: "Swati"
}, {
	id: "sv",
	name: "Swedish"
}, {
	id: "ta",
	name: "Tamil"
}, {
	id: "te",
	name: "Telugu"
}, {
	id: "tg",
	name: "Tajik"
}, {
	id: "th",
	name: "Thai"
}, {
	id: "ti",
	name: "Tigrinya"
}, {
	id: "bo",
	name: "Tibetan Standard, Tibetan, Central"
}, {
	id: "tk",
	name: "Turkmen"
}, {
	id: "tl",
	name: "Tagalog"
}, {
	id: "tn",
	name: "Tswana"
}, {
	id: "to",
	name: "Tonga (Tonga Islands)"
}, {
	id: "tr",
	name: "Turkish"
}, {
	id: "ts",
	name: "Tsonga"
}, {
	id: "tt",
	name: "Tatar"
}, {
	id: "tw",
	name: "Twi"
}, {
	id: "ty",
	name: "Tahitian"
}, {
	id: "ug",
	name: "Uighur, Uyghur"
}, {
	id: "uk",
	name: "Ukrainian"
}, {
	id: "ur",
	name: "Urdu"
}, {
	id: "uz",
	name: "Uzbek"
}, {
	id: "ve",
	name: "Venda"
}, {
	id: "vi",
	name: "Vietnamese"
}, {
	id: "vo",
	name: "Volapük"
}, {
	id: "wa",
	name: "Walloon"
}, {
	id: "cy",
	name: "Welsh"
}, {
	id: "wo",
	name: "Wolof"
}, {
	id: "fy",
	name: "Western Frisian"
}, {
	id: "xh",
	name: "Xhosa"
}, {
	id: "yi",
	name: "Yiddish"
}, {
	id: "yo",
	name: "Yoruba"
}, {
	id: "za",
	name: "Zhuang, Chuang"
}]
