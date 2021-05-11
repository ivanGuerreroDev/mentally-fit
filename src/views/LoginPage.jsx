import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login1 from "../assets/home/login1.png";
import Login2 from "../assets/home/login2.png";
import ImageReset from "../assets/home/reset.png";
import LoginForm from "../components/authentication/LoginForm";
import ForgotPassword from "../components/authentication/ForgotPassword";
import NewPassword from "../components/authentication/NewPassword";
import { actionSetPageLogin } from "../redux/reducersActions/authentication/authenticationAction";
import { useHistory } from "react-router-dom";

const LoginPage = (props) => {
      const dispatch = useDispatch();

      const history = useHistory();

      const page = useSelector(
            (state) => state.authenticationReducer.page_login
      );

      const user = useSelector((state) => state.authenticationReducer.user);

      const resetPass = useSelector(
            (state) => state.authenticationReducer.reset_password
      );
      const pageReset = useSelector(
            (state) => state.authenticationReducer.page_reset
      );

      if (props.match.params.token && !resetPass && !pageReset) {
            dispatch(actionSetPageLogin("NewPassword"));
      }

      if (user.token) {
		if (user.user.level === "PARTICIPANTE") {
			if(!user.user.terms){
				history.push("/terminos");
			}else{
				history.push("/user");
			}				
		} else {
			history.push("/navegacion/escritorio");
		}            
	  }
	  

      return (
            
                  <div className={"loginPageContainer container-fluid"+" "+( page === "ForgotPassword" || page === "NewPassword" ?"forgot":"")}
				  >
                        <div className="row justify-flex-end ">
                              <section className="sectionLoginForm col-12 col-xl-8">
                                    {page === "LoginForm" ? (
                                          <LoginForm {...props}/>
                                    ) : page === "ForgotPassword" ? (
                                          <ForgotPassword />
                                    ) : (
                                          <div></div>
                                    )}
                              </section>
                        </div>
                  </div>
      );
};

export default LoginPage;
