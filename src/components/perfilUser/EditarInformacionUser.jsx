import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment"
import {
	TOAST_ERROR,
	TOAST_SUCCESS,
} from "../../redux/constants";
import {
	actionGetProfile
} from "../../redux/reducersActions/authentication/authenticationAction"
import config from '../../config.js'
const URL = config[config.enviroment].host;

const EditarInformacionUser = () => {
	const history = useHistory()
	const dispatch = useDispatch();
	const user = useSelector(
		(state) => state.authenticationReducer.user.user
	);
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
		
	useEffect(()=>{
		setDataInput(user)
	},[])
	const [dataChangePass, setDataChangePass] = useState({
		password: null,
		repassword: null
	});

	const [dataInput, setDataInput] = useState({
		birthdate: user.birthdate,
	});

	const dataOnChange = (e) => {
		setDataInput({
			...dataInput,
			[e.target.name]: e.target.value,
		});
	};
	const dataPassOnChange = (e) => {
		setDataChangePass({
			...dataChangePass,
			[e.target.name]: e.target.value,
		});
	};

	const updateProfile = () => {
		if(
			dataInput.name && dataInput.name !== "" &&
			dataInput.gender && dataInput.gender !== "" &&
			dataInput.birthdate && dataInput.birthdate !== "" 
		){
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", `Bearer ${token}`);
			var raw = JSON.stringify(dataInput);
			var requestOptions = {
				method: "PUT",
				headers: myHeaders,
				body: raw,
			};
			return fetch(URL + "/participant/modify", requestOptions)
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
										: "Información actualizada.",
								});
								dispatch(actionGetProfile(token));
								history.goBack();
							}
						})
						.catch((error) => {
							console.log(error);
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
		}else{
			dispatch({
				type: TOAST_ERROR,
				payload: "Por favor, rellenar todos los campos.",
			});
		}
	}
	const changePass = () => {
		console.log(dataChangePass)
		if(
			dataChangePass.password !== dataChangePass.repassword
		){
			dispatch({
				type: TOAST_ERROR,
				payload: "Contraseñas no coinciden.",
			});
			return false
		}
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({password: dataChangePass.password});
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
		};
		return fetch(URL + "/participant/changepassword", requestOptions)
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
									: "Información actualizada.",
							});
							history.goBack();
						}
					})
					.catch((error) => {
						console.log(error);
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

	return (
		<div className="perfil-container">
			<div className="informacion-container">
				<div className="texto-boton">
					<div className="texto-container">
						<span className="titulo">
							Editar Perfil
                                    </span>
						<span className="informacion">
							Su informacion privada no es visible
							para otros.
                                    </span>
					</div>
				</div>
				<div className="edit-infor">
					<form action="">
						<div>
							<label>Correo</label>
							<input
								type="email"
								disabled="true"
								value={dataInput.email ? dataInput.email : ""}
								name="email"
							/>
						</div>
						<div>
							<label>Nombres</label>
							<input
								type="text"
								value={dataInput.name}
								name="name"
								onChange={(e) => {
									dataOnChange(e);
								}}
							/>
						</div>
						<div>
							<label>Apellidos</label>
							<input
								type="text"
								value={dataInput.lastName}
								name="lastName"
								onChange={(e) => {
									dataOnChange(e);
								}}
							/>
						</div>
						
						
						<div>
							<label>Sexo</label>
							<select
								value={dataInput.gender}
								name="gender"
								onChange={(e) => {
									dataOnChange(e);
								}}
							>
								<option selected={dataInput.gender==="Masculino"?true:false} value="Masculino">Masculino</option>
								<option selected={dataInput.gender==="Femenino"?true:false} value="Femenino">Femenino</option>
							</select>
						</div>
						<div>
							<label>Fecha de Nacimiento</label>
							<input
								type="date"
								defaultValue={user.birthdate}
								value={dataInput.birthdate}
								name="date"
								onChange={(e) => {
									dataOnChange(e);
								}}
							/>
						</div>
					</form>
					<div className="button-container">
						<button onClick={e => updateProfile()}>GUARDAR</button>
					</div>

					
				</div>
				<div className="texto-boton">
					<div className="texto-container">
						<span className="informacion">Cambiar Contraseña</span>
					</div>
				</div>
				<div className="edit-infor">
					<form action="">
						<div>
							<label>Nueva Contraseña</label>
							<input
								type="password"
								placeholder="***********"
								value={dataChangePass.password}
								name="password"
								onChange={(e) => {
									dataPassOnChange(e);
								}}
							/>
						</div>
						<div>
							<label>
								Repetir Nueva Contraseña
							</label>
							<input
								type="password"
								placeholder="***********"
								value={dataChangePass.repassword}
								name="repassword"
								onChange={(e) => {
									dataPassOnChange(e);
								}}
							/>
						</div>
						
					</form>
					<div className="button-container">
								<button onClick={e => changePass()}>CAMBIAR CONTRASEÑA</button>
						</div>
				</div>
			</div>
		</div>
	);
};

export default EditarInformacionUser;
