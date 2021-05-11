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
	  GET_PROFILE
} from "../../constants";
import config from '../../../config.js'


const URL = config[config.enviroment].host;

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
      return (dispatch) => {
            dispatch({
                  type: SET_USER_COOKIE,
                  payload: user,
            });
      };
};

export const actionLogOut = () => {
      return (dispatch) => {
			var requestOptions = {
				method: "get",
			};
			fetch(URL + "/authentication/logout", requestOptions)
			.then((response) => response.json())
			.then(()=>{
				dispatch({
					type: LOG_OUT,
			  });
			});
      };
};

export const actionForgotPassword = (email) => {
    
		  
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			var raw = JSON.stringify({email});
			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
			};
			return fetch(URL + "/authentication/forgot", requestOptions)
	
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
  
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify({ password: psw, token });
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
		};
		return fetch(URL + "/authentication/changepass", requestOptions)
      
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
						dispatch({
							type: ACCEPT_TERMS,
							payload: res.data,
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

export const actionGetProfile = (token) => {
	return (dispatch) => {
		var myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		var requestOptions = {
			method: "GET",
			headers: myHeaders,
		};
		fetch(URL + "/desktop/user", requestOptions)
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