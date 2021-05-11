import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
      actionForgotPassword,
      actionSetPageLogin,
} from "../../redux/reducersActions/authentication/authenticationAction";
import {
	TOAST_ERROR,
	TOAST_SUCCESS
} from "../../redux/constants";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
	const [loading, setLoading] = useState(false)
      const dispatch = useDispatch();

      const history = useHistory();

      const [email, setEmail] = useState("");

      const handleChange = (e) => {
            setEmail(e.target.value);
      };

      const stateError = useSelector(
            (state) => state.authenticationReducer.error_email
      )
            ? "error-login"
            : "error-login not-view";

      const checkChangePassword = useSelector(
            (state) => state.authenticationReducer.send_email
      );

      if (checkChangePassword) dispatch(actionSetPageLogin("LoginForm"))

      return (
            <form
                  onSubmit={(e) => {
						e.preventDefault();
						if(!loading){
							setLoading(true)
							actionForgotPassword(email)
							.then((response) => response.json())
							.then((res) => {
								setLoading(false)
								if (res.error) {
									dispatch({
										type: TOAST_ERROR,
										payload: res.message
											? res.message
											: "Error de conexión",
								});
								} else {
									dispatch({
										type: TOAST_SUCCESS,
										payload: res.message
											? res.message
											: "Correo de recuperación enviado.",
									});
									dispatch(actionSetPageLogin("LoginForm"));
								}
							})
							.catch(error=>{
								setLoading(false)
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
                  className="login-form-home"
            >
                  <label className="login-form-title">
                        Recuperar Contraseña
                  </label>
                  <label>Email</label>
                  <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                  />
                  <input
                        type="submit"
                        value="RECUPERAR"
                        className={loading?"button-disabled":"button-primary"}
                  />
                  <a
                        onClick={(e) => {
                              e.preventDefault();
                              dispatch(actionSetPageLogin("LoginForm"));
                        }}
                        href=""
                  >
                        Iniciar Sesión
                  </a>

                  <label className={stateError}>
                        EMAIL INCORRECTO, INTENTELO DE NUEVO
                  </label>
            </form>
      );
};

export default ForgotPassword;
