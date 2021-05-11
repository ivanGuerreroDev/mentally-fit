import {
	TOAST_ERROR,
	SET_EMPRESAS_REPORT,
	SET_PARTICIPANTES_REPORT,
	SET_CURRENT_EMPRESA,
	GET_PAISES_EMPRESA,
	SET_SPINNER_OFF,
	SET_SPINNER_ON,
	CLEAN_INFO_EMPRESAS,
} from "../../constants";
import config from "../../../config.js";
let qs = require("qs");
const URL = config[config.enviroment].host;

export const actionCleanCurrentEmpresa = () => {
	return (dispatch) => {
		dispatch({
			type: CLEAN_INFO_EMPRESAS,
		})
	}
};

export const actionGetCompanyReports = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/reports/geRepostByCompany", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				dispatch({
					type: SET_EMPRESAS_REPORT,
					payload: res,
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
};
export const actionGetParticipantReports = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/reports/geRepostByParticipants", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				dispatch({
					type: SET_PARTICIPANTES_REPORT,
					payload: res,
				});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
};
export const actionGetCurrentEmpresa = (data) => {
	return (dispatch) => {
		dispatch({
			type: SET_SPINNER_ON,
		});
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${data.token}`);
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("campaign", data.campaign.toString());
		urlencoded.append("company", data.company.toString());

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		};

		fetch(URL + "/reports/getReportesEmpresa", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				localStorage.setItem("currentEmpresa", JSON.stringify(result));
				dispatch({
					type: SET_SPINNER_OFF,
				});
				dispatch({
					type: SET_CURRENT_EMPRESA,
					payload: result,
				});
			})
			.catch((error) => {
				dispatch({
					type: SET_SPINNER_OFF,
				});
				console.log("error", error);
			});
	};
};

export const actionGetPaisesEmpresa = (id, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		var urlencoded = new URLSearchParams();
		urlencoded.append("id", id);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: urlencoded,
			redirect: "follow",
		};

		fetch(URL + "/company/getCountries", requestOptions)
			.then((response) => response.json())
			.then((result) =>
				dispatch({
					type: GET_PAISES_EMPRESA,
					payload: result,
				})
			)
			.catch((error) => console.log("error", error));
	};
};
