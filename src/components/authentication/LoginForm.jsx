import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
      actionLogin,
      actionSetPageLogin,
} from "../../redux/reducersActions/authentication/authenticationAction";
import { useHistory } from "react-router-dom";
import {
	TOAST_ERROR,
	TOAST_SUCCESS
} from "../../redux/constants";

const LoginForm = (props) => {
      const dispatch = useDispatch();
      const history = useHistory();
      const [credenciales, setCredenciales] = useState({
            email: "",
            password: "",
      });
      const handleChange = (e) => {
            setCredenciales({
                  ...credenciales,
                  [e.target.name]: e.target.value,
            });
      };

      const stateError = useSelector(
            (state) => state.authenticationReducer.error_login
      )
            ? "error-login"
            : "error-login not-view";

      const sendEmail = useSelector(
            (state) => state.authenticationReducer.send_email
      )
            ? "send-email"
            : "send-email not-view";

		useEffect(()=>{
			const query = new URLSearchParams(props.location.search);
			const forgot = query.get('forgot')
			if(forgot && forgot==="invalid"){
				dispatch({
					type: TOAST_ERROR,
					payload: "Link de recuperación invalido"
				});
			}
		},[])
      return (
            <form
                  onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(actionLogin(credenciales));
                  }}
                  className="login-form-home"
            >
                  <label className="login-form-title">Acceso</label>
                  <label>Email</label>
                  <input
                        type="email"
                        value={credenciales.email}
                        name="email"
                        onChange={handleChange}
                  />
                  <label>Contraseña</label>
                  <input
                        type="password"
                        value={credenciales.password}
                        name="password"
                        onChange={handleChange}
                  />
                  <a
                        onClick={(e) => {
                              e.preventDefault();
                              dispatch(actionSetPageLogin("ForgotPassword"));
                        }}
                        href=""
                  >
                        ¿Olvidaste tu contraseña?
                  </a>
                  <input
                        type="submit"
                        value="INGRESAR"
                        className="button-to-login"
                  />
                  <label className={stateError}>
                        Uno o más campos tienen un error. Por favor revise e
                        inténtelo de nuevo.
                  </label>
                  <label className={sendEmail}>
                        Verifique su correo y realice el cambio de contraseña
                  </label>
            </form>
      );
};

export default LoginForm;
