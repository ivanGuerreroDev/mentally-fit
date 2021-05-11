import {
	TOAST_ERROR,
	REPORT_FETCHING,
	REPORT_FETCH,
	REPORT_ERROR,
	SET_REPORTS,
	SET_REPORT,
	SET_SPINNER_ON,
	SET_SPINNER_OFF,
	CLEAN_INFO_PARTICIPANTES
} from "../../constants";
import config from '../../../config.js'
let qs = require("qs");
const URL = config[config.enviroment].host;

export const actionGetReports = (token) => {
	return (dispatch) => {
		const example = [
			{
				id: 1,
				name: "Ejemplo campaña",
				date: "12/01/2021 - 23/02/2021"
			},
			{
				id: 2,
				name: "Ejemplo campaña",
				date: "12/01/2021 - 23/02/2021"
			},
			{
				id: 3,
				name: "Ejemplo campaña",
				date: "12/01/2021 - 23/02/2021"
			},
			{
				id: 4,
				name: "Ejemplo campaña",
				date: "12/01/2021 - 23/02/2021"
			},
			{
				id: 5,
				name: "Ejemplo campaña",
				date: "12/01/2021 - 23/02/2021"
			},
		]
		return dispatch({
			type: SET_REPORTS,
			payload : example,
		});

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/reports/getReportesParticipante", requestOptions)
		.then((response) => response.json())
		.then((res) => {
			console.log(res)
			
			dispatch({
				type: SET_REPORTS,
				payload : res,
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
	}
};

export const actionCleanParticipantes = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAN_INFO_PARTICIPANTES
		})
	}
}

export const actionGetReportsParticipants = (token) => {
	return (dispatch) => {

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/participant/reportsByCampaigns", requestOptions)
		.then((response) => response.json())
		.then((res) => {
			dispatch({
				type: SET_REPORTS,
				payload : res,
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
						: "No hay reportes de su evaluación disponible en estos momentos.",
			});
		});
	}
};

export const actionGetReport = ({id, token}) => {
	console.log('idREQ', id)
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		dispatch({
			type: REPORT_FETCHING,
		});
		fetch(URL + "/reports/getReportesParticipante/"+id, requestOptions)
		.then((response) => response.json())
		.then((res) => {
			dispatch({
				type: SET_REPORT,
				payload : res,
			}); 
		})
		.catch((error) => {
			console.log(error)
			dispatch({
				type: REPORT_ERROR
			});
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
};

export const actionGetReportByParticipant = ({userId, campaignId, token}) => {
	return (dispatch) => {
		dispatch({
			type: SET_SPINNER_ON
		})
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);

		var raw = JSON.stringify({id: userId, campaign: campaignId});

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};
		dispatch({
			type: REPORT_FETCHING,
		});
		fetch(URL + "/reports/getReportByParticipant", requestOptions)
		.then((response) => response.json())
		.then((res) => {
			localStorage.setItem("currentParticipante", JSON.stringify(res));
			dispatch({
				type: SET_SPINNER_OFF
			})
			dispatch({
				type: SET_REPORT,
				payload : res,
			}); 
		})
		.catch((error) => {
			console.log(error)
			dispatch({
				type: REPORT_ERROR
			});
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
				type: SET_SPINNER_OFF
			})
		});
	}
};