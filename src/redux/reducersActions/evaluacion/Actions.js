import {
	EVALUACION_FETCH,
	SET_TEST_COOKIE,
	TOAST_ERROR,
	TOAST_WARNING,
	TOAST_SUCCESS,
	FINISHED,
	LOADING,
	SET_SPINNER_ON,
	SET_SPINNER_OFF,
} from "../../constants";
import config from "../../../config.js";
let qs = require("qs");
const URL = config[config.enviroment].host;

/*
	Evaluaciones
*/
export const getEvaluations = (token) => {
	return (dispatch) => {
		dispatch({
			type: SET_SPINNER_ON,
		});
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/evaluations/get", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res && res.evaluaciones && res.evaluaciones.length > 0) {
					dispatch({
						type: EVALUACION_FETCH,
						payload: res,
					});
					dispatch({
						type: SET_SPINNER_OFF,
					});
				} else {
					dispatch({
						type: TOAST_SUCCESS,
						payload: res.message
							? res.message
							: "Error de conexión",
					});
					dispatch({
						type: SET_SPINNER_OFF,
					});
				}
				dispatch({
					type: FINISHED,
				});
				dispatch({
					type: SET_SPINNER_OFF,
				});
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
				dispatch({
					type: FINISHED,
				});
				dispatch({
					type: SET_SPINNER_OFF,
				});
			});
	};
};

export const saveEvaluations = (answers, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		const body = JSON.stringify(answers);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body,
		};
		dispatch({
			type: LOADING,
		});
		fetch(URL + "/evaluations/setResponses", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				dispatch(getEvaluations(token));
			})
			.catch((error) => {
				if (
					error.response &&
					error.response.data &&
					error.response.data.message
				) {
					dispatch({
						type: TOAST_ERROR,
						payload:
							"Error desconocido, salga de la evaluación y vuelva a entrar. Si el problema persiste contacte con el administrador.",
					});
				} else {
					dispatch({
						type: TOAST_WARNING,
						payload:
							"Error de conexión, verifique su conexión o intente nuevamente en unos minutos.",
					});
				}

				dispatch({
					type: FINISHED,
				});
			});
	};
};
export const actionSetTestCookie = (test) => {
	return (dispatch) => {
		dispatch({
			type: SET_TEST_COOKIE,
			payload: test,
		});
	};
};
