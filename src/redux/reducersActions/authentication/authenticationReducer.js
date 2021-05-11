import {
      ACCEPT_TERMS,
      ERROR_EMAIL,
      ERROR_LOGIN,
      HOME_LOGIN,
      LOG_OUT,
      PAGE_RESET,
      RESET_PASSWORD_OK,
      SEND_EMAIL_OK,
      SET_PAGE_LOGIN,
	  SET_USER_COOKIE,
	  GET_PROFILE,
	  UPDATE_PROFILE
} from "../../constants";
import Cookies from "js-cookie";
const initialState = {
      user: {
            token:"",
            user:{}
      },
      token: false,
      error_login: false,
      error_email: false,
      reset_password: false,
      page_reset: false,
      send_email: false,
      page_login: "LoginForm",
};

const authenticationReducer = (state = initialState, action) => {
      switch (action.type) {
            case HOME_LOGIN:
                  Cookies.set("user", action.payload);
                  return {
                        ...state,
                        error_login: false,
                        user: {
                              user: action.payload.user,
                              token: action.payload.token,   
                        }
                  };
            case SET_USER_COOKIE:
                  return {
                        ...state,
                        user:{
                              user: action.payload.user,
                              token: action.payload.token,  
                        }
                  };
            case LOG_OUT:
                  return {
                        ...state,
                        user: {},
                  };
            case ERROR_LOGIN:
                  return {
                        ...state,
                        error_login: true,
                  };
            case ERROR_EMAIL:
                  return {
                        ...state,
                        error_email: !state.error_email,
                  };
            case SEND_EMAIL_OK:
                  return {
                        ...state,
                        send_email: !state.send_email,
                  };
            case RESET_PASSWORD_OK:
                  return {
                        ...state,
                        reset_password: !state.reset_password,
                  };
            case SET_PAGE_LOGIN:
                  return {
                        ...state,
                        page_login: action.payload,
                  };
            case PAGE_RESET:
                  return {
                        ...state,
                        page_reset: true,
                  };
            case ACCEPT_TERMS:
                  return {
                        ...state,
                        user: {
                              ...state.user,
                              terms: true
                        }
				  };
			case GET_PROFILE:
					var oldUser = Cookies.getJSON("user");
					Cookies.set("user", {token: oldUser.token, user: {...oldUser.user, ...action.payload}});
					return {
						  ...state,
						  user: { ...state.user, user:{ ...state.user, ...action.payload } }
					};
			case UPDATE_PROFILE:
				var oldUser = Cookies.getJSON("user");
				Cookies.set("user", { token: oldUser.token, user: {...oldUser.user, ...action.payload} } );
				return {
						...state,
						user: {...state.user, ...action.payload}
				};
				
			default:
                  return {
                        ...state,
                  };
      }
};

export default authenticationReducer;
