import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionSetNewPassword, actionSetPageLogin } from '../../redux/reducersActions/authentication/authenticationAction';
import {
	PAGE_RESET,
	RESET_PASSWORD_OK,
	TOAST_ERROR,
	TOAST_SUCCESS
} from "../../redux/constants";


const NewPassword = (props) => {

	const query = new URLSearchParams(props.location.search);
	const token = query.get('token')

      const dispatch = useDispatch();

      const history = useHistory()

      const [password, setPassword] = useState({
            password:"",
            password2:""
      })

      const handleChange = e => {
            setPassword({
                  ...password,
                  [e.target.name]: e.target.value
            })
	  }
	  
	  useEffect(()=>{
		if(!token){
			history.push("/login")
		}
	},[])

      return (
            <form
                  onSubmit={(e) => {
                        e.preventDefault();
                        if(password.password !== password.password2){
							dispatch({
								type: TOAST_ERROR,
								payload: "Contraseñas no coinciden.",
						});
                        }
                        else{
							 actionSetNewPassword(password.password, token)
							 .then((response) => response.json())
							 .then((res) => {
								if (!res.error) {
									dispatch({
										type: TOAST_SUCCESS,
										payload: res.message
											? res.message
											: "Error de conexión",
									});
									  dispatch({
											type: RESET_PASSWORD_OK,
									  });
									  dispatch({
											type: PAGE_RESET,
									  });
									  history.push("/login")
								} else {
									dispatch({
											type: TOAST_ERROR,
											payload: res.message
												? res.message
												: "Error de conexión",
									});
								}
						  })
						  .catch(error=>{
							dispatch({
								type: TOAST_ERROR,
								payload:
									error.response &&
									error.response.data &&
									error.response.data.message
											? error.response.data.message
											: "Error de conexión",
							});
						  })
                        } 
                  }}
                  className="login-form-home"
            >
                  <label className="login-form-title">Nueva Contraseña</label>
                  <label>Contraseña</label>
                  <input
                        type="password"
                        value={password.password}
                        name="password"
                        onChange={handleChange}
                  />
                  <label>Repetir Contraseña</label>
                  <input
                        type="password"
                        value={password.password2}
                        name="password2"
                        onChange={handleChange}
                  />
                  <input
                        type="submit"
                        value="GUARDAR"
                        className="button-to-login"
                  />
                  <a 
                  onClick={e => history.push("/login")}
                  href="">Iniciar Sesión</a>
            </form>
      )
}

export default NewPassword;