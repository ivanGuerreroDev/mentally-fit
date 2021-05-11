import axios from "axios";
import {
	ACCEPT_TERMS,
	CHANGE_STATE_PARTICIPANTE,
	ERROR_EMAIL,
	ERROR_LOGIN,
	HOME_LOGIN,
	LOG_OUT,
	PAGE_RESET,
	RESET_PASSWORD_OK,
	SEND_EMAIL_OK,
	SET_PAGE_LOGIN,
	SET_USER_COOKIE,
	TOAST_ERROR,
	TOAST_SUCCESS,
} from "../../constants";
import { actionGetDataParticipantes } from "../desktop/desktopAction";

let qs = require("qs");
axios.defaults.withCredentials = true;

const URL = "https://api.mflatam.com/";
//const URL = "http://localhost:5000/";

export const actionLogin = (inputs) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify(inputs);
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};
		fetch(URL + "/authentication/login", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log(res);
				if (res.token && res.user) {
					dispatch({
						type: HOME_LOGIN,
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

export const actionSetUserCookie = (user) => {
	console.log("USDANIASD", user);
	return (dispatch) => {
		dispatch({
			type: SET_USER_COOKIE,
			payload: user,
		});
	};
};

export const actionLogOut = () => {
	return (dispatch) => {
		let config = {
			withCredentials: true,
			method: "GET",
			url: URL + "/authentication/logout",
		};
		axios(config).then(() => {
			dispatch({
				type: LOG_OUT,
			});
		});
	};
};

export const actionForgotPassword = (email) => {
	return (dispatch) => {
		let data = qs.stringify({ email });
		let config = {
			withCredentials: true,
			method: "POST",
			url: URL + "/authentication/forgot",
			data: data,
		};
		axios(config).then((res) => {
			if (res.data.err) {
				dispatch({
					type: ERROR_EMAIL,
				});
			} else {
				dispatch({
					type: SEND_EMAIL_OK,
				});
				setTimeout(() => {
					dispatch({
						type: SEND_EMAIL_OK,
					});
				}, 5000);
			}
		});
	};
};

export const actionSetPageLogin = (page) => {
	return (dispatch) => {
		dispatch({
			type: SET_PAGE_LOGIN,
			payload: page,
		});
	};
};

export const actionPageReset = () => {
	return (dispatch) => {
		dispatch({
			type: PAGE_RESET,
		});
	};
};

export const actionSetNewPassword = (psw, token) => {
	return (dispatch) => {
		let data = qs.stringify({ psw, token });
		let config = {
			withCredentials: true,
			method: "POST",
			url: URL + "/authentication/reset",
			data: data,
		};
		axios(config).then((res) => {
			if (res.status === 200) {
				dispatch({
					type: RESET_PASSWORD_OK,
				});
				dispatch({
					type: PAGE_RESET,
				});
			} else {
				// ARMAR PAGINA DE ERROR
			}
		});
	};
};

export const actionAceptTerms = (userId, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var urlencoded = new URLSearchParams();
		urlencoded.append("id", userId)
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: urlencoded,
		};
		fetch(URL + "/participant/acceptTerm", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				console.log("RES", res);
				if (res.ok) {
					dispatch({
						type: ACCEPT_TERMS,
						payload: res.data,
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

export const actionUpdateStateParticipant = (id, index, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
		myHeaders.append("Authorization", `Bearer ${token}`);
		var urlencoded = new URLSearchParams();
		urlencoded.append("id", id)
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: urlencoded,
		};
		fetch(URL + "/participant/modifyStatus", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res.ok) {
					dispatch({
						type: TOAST_SUCCESS,
						payload: res.message
							? res.message
							: "Se cambió el estado",
					});
					dispatch({
						type: CHANGE_STATE_PARTICIPANTE,
						payload: index
					})
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
}

export const actionGetProfile = (id, index, token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/get", requestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res.user) {
					dispatch({
						type: GET_PROFILE,
						payload: res.user
					})
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
}
