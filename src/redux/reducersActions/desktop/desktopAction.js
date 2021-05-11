import {
	CHANGE_STATE_CAMPAÑA,
	DELETE_ADMINISTRADOR,
	GET_DATA_ADMINISTRADORES,
	GET_DATA_CAMPAÑAS,
	GET_DATA_EMPRESAS,
	GET_DATA_EMPRESAS_CAMPAÑAS,
	GET_DATA_ESCRITORIO,
	GET_DATA_FORMULARIO_CAMPAÑAS,
	GET_DATA_FORMULARIO_PARTICIPANTE,
	GET_DATA_PARTICIPANTES,
	SET_DATA_PARTICIPANTE,
	CLEAN_DATA_PARTICIPANTE,
	SEARCH_DATA_EMPRESAS,
	SELECT_LOGO_EMPRESA,
	TOAST_ERROR,
	TOAST_SUCCESS,
	TOAST_WARNING,
	TOGGLE_MENU
} from "../../constants";
import config from '../../../config.js'
let qs = require("qs");

const URL = config[config.enviroment].host;

/*
	Dashboard
*/
export const actionGetData = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/getAllEscritorio", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res.length > 1) {
					dispatch({
						type: GET_DATA_ESCRITORIO,
						payload: res,
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
	};
};

/*
	Empresas
*/
export const actionGetDataEmpresas = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/getAllEmpresas", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log('EMPRESAS', res)
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
						type: GET_DATA_EMPRESAS,
						payload: res,
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
	};
};

export const actionGetDataEmpresa = (id, token) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		return fetch(URL + "/company/get/"+id, requestOptions)
};

export const actionCrearEmpresa = (inputs, logo, token) => {
	return (dispatch) => {
		var data = new FormData();
		data.append("file", logo);
		data.append("inputsData", JSON.stringify(inputs));

		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: data,
		};
		fetch(URL + "/company/create", requestOptions)
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
							: "Empresa Creada",
					});
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
	};
};

export const actionEditarEmpresa = ({inputs, logo, token, id}) => {
	var data = new FormData();
	if(logo) data.append("file", logo);
	data.append("inputsData", JSON.stringify(inputs));
	data.append("empresa", id)
	var myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: data,
	};
	return fetch(URL + "/company/modify/", requestOptions)
};

export const actionEliminarEmpresa = (id, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
		};
		fetch(URL + "/company/delete/" + id, requestOptions)
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
							: "Empresa eliminada",
					});
					dispatch(actionGetDataEmpresas(token))
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
	};
};

/*
	Participantes
*/
export const actionGetDataParticipantes = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "get",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/getAllParticipantes", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if(res.error && !res.user){
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
						type: GET_DATA_PARTICIPANTES,
						payload: res,
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
	};
};

export const actionGetDataParticipante = (id, token) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "get",
			headers: myHeaders,
		};
		return fetch(URL + "/participant/get/"+id, requestOptions)
};

export const actionActualizaParticipante = (inputs, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify(inputs);
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
							: "Participante Creado",
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
	};
};

export const actionCrearParticipante = (inputs, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify(inputs);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};
		return fetch(URL + "/participant/create", requestOptions)
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
							: "Participante Creado",
					});
				}
			})
			.catch((error) => {
				console.log(error.response)
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
};

export const actionEliminarParticipante = (id, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
		};
		fetch(URL + "/participant/delete/" + id, requestOptions)
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
							: "Participante eliminado",
					});
					dispatch(actionGetDataParticipantes(token));
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
	};
};


export const actionGetDataFormularioParticipante = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "get",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/getInfoFormularioParticipante", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res.company && !res.error) {
					dispatch({
						type: GET_DATA_FORMULARIO_PARTICIPANTE,
						payload: res,
					});
				}else{
					dispatch({
						type: TOAST_ERROR,
						payload:
							res &&
							res.message
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
	};
};


export const sendInvitation = ({email, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({email});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/participant/setInvitation", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log(res)
				if(res.message.includes('Error')){
					dispatch({
						type: TOAST_WARNING,
						payload : res.message,
					});
				}else{
					dispatch({
						type: TOAST_SUCCESS,
						payload : res.message,
					});
				}				
			})
			.catch((error) => {
				console.log(error)
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
}
export const sendRemember = ({email, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({email});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/participant/setRemember", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log(res)
				if(res.message.includes('Error')){
					dispatch({
						type: TOAST_WARNING,
						payload : res.message,
					});
				}else{
					dispatch({
						type: TOAST_SUCCESS,
						payload : res.message,
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
	};
}
export const sendReport = ({email, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({email});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/participant/setReporte", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log(res)
				if(res.message.includes('Error')){
					dispatch({
						type: TOAST_WARNING,
						payload : res.message,
					});
				}else{
					dispatch({
						type: TOAST_SUCCESS,
						payload : res.message,
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
	};
}
export const forgotPass = ({email, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({email});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/participant/setForgotPassword", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				dispatch({
					type: TOAST_SUCCESS,
					payload : res.message,
				});
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
	};
}


/*
	Campañas
*/
export const actionGetDataCampañas = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/getDataCampanas", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res.campañas && !res.error) {
					dispatch({
						type: GET_DATA_CAMPAÑAS,
						payload: res,
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
	};
};

export const actionGetDataCampaña = (id, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	var requestOptions = {
		method: "GET",
		headers: myHeaders,
	};
	return fetch(URL + "/campaign/get/"+id, requestOptions)
};

export const actionGetDataFormularioCampañas = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "get",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/getInfoFormularioCampanas", requestOptions)
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
					if (res.empresas) {
						dispatch({
							type: GET_DATA_FORMULARIO_CAMPAÑAS,
							payload: res.empresas,
						});
					}
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
	};
};

export const actionCrearCampaña = (inputs, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	var raw = JSON.stringify(inputs);
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
	};
	return fetch(URL + "/campaign/create", requestOptions)
};

export const actionActualizarCampaña = (inputs, token) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	var raw = JSON.stringify(inputs);
	var requestOptions = {
		method: "put",
		headers: myHeaders,
		body: raw,
	};
	return fetch(URL + "/campaign/modify", requestOptions)
};


export const actionEliminarCampana = (id, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "DELETE",
			headers: myHeaders,
		};
		fetch(URL + "/campaign/delete/" + id, requestOptions)
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
							: "Campaña eliminada",
					});
					dispatch(actionGetDataCampañas(token))
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
	};
};

export const sendInvitationCampaign = ({campaign, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({campaign});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/campaign/setInvitation", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if(res.message.includes('Error')){
					dispatch({
						type: TOAST_WARNING,
						payload : res.message,
					});
				}else{
					dispatch({
						type: TOAST_SUCCESS,
						payload : res.message,
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
	};
}
export const sendRememberCampaign = ({campaign, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({campaign});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/campaign/setRemember", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if(res.message.includes('Error')){
					dispatch({
						type: TOAST_WARNING,
						payload : res.message,
					});
				}else{
					dispatch({
						type: TOAST_SUCCESS,
						payload : res.message,
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
	};
}
export const sendReportCampaign = ({campaign, token}) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({campaign});
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		fetch(URL + "/campaign/setReports", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if(res.message.includes('Error')){
					dispatch({
						type: TOAST_WARNING,
						payload : res.message,
					});
				}else{
					dispatch({
						type: TOAST_SUCCESS,
						payload : res.message,
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
	};
}
/*
	Administradores
*/
export const actionGetDataAdministradores = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/administrator/getAll", requestOptions)
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
						type: GET_DATA_ADMINISTRADORES,
						payload: res,
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
	};
};

export const actionCrearAdministrador = (inputs, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify(inputs);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};
		fetch(URL + "/administrator/create", requestOptions)
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
							: "Administrador Creado",
					});
					dispatch(actionGetDataAdministradores(token))
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
	};
};

export const actionUpdateStateCampaña = (id, index, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);
		myHeaders.append("Authorization", `Bearer ${token}`);
		var urlencoded = new URLSearchParams();
		urlencoded.append("id", id);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: urlencoded,
		};
		fetch(URL + "/campaign/modifyStatus", requestOptions)
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
							: "Se cambió el estado",
					});
					dispatch({
						type: CHANGE_STATE_CAMPAÑA,
						payload: index,
					});
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
	};
};

export const actionGetDataEmpresasCampañas = (id, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var raw = JSON.stringify({ id });
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};
		fetch(URL + "/company/getDataCampanas", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log('EMPRESA SELECCIONADA', res)
				if(res.error){
					dispatch({
						type: TOAST_ERROR,
						payload:
							res &&
							res.message
								? res.message
								: "Error de conexión",
					});
				}
				if (res) {
					dispatch({
						type: GET_DATA_EMPRESAS_CAMPAÑAS,
						payload: res,
					});
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
	};
};

export const actionDeleteAdministrador = (id, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer "+token);
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
			body: JSON.stringify({
				id: id
			})
		};
		fetch(URL + "/administrator/delete", requestOptions)
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
						type: DELETE_ADMINISTRADOR,
						payload: res,
					});
					dispatch(actionGetDataAdministradores(token))
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
	};
};

export const actionGetDataAdmin = (id,token) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", `Bearer ${token}`);
	var requestOptions = {
		method: "GET",
		headers: myHeaders,
	};
	return fetch(URL + "/administrator/get/"+id, requestOptions)
}

export const actionActualizarAdministrador = (id, datos, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: JSON.stringify({
				id: id,
				...datos
			})
		};
		fetch(URL + "/administrator/modify/", requestOptions)
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
								: "Administrador Creado",
						});
						dispatch(actionGetDataAdministradores(token))
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
}

/*
	Menu
*/
export const actionToggleMenu = () => {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_MENU
		});
	};
};
