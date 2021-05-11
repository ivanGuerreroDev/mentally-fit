import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
      const user = useSelector(
            (state) => state.authenticationReducer.user.user
      );
      return (
            <Route
                  {...rest}
                  render={(props) =>
                        user.level ==='SUPERADMIN' || user.level === 'ADMIN'? (
                              <Component {...props} />
                        ) : (
                              <Redirect to="/login" />
                        )
                  }
            />
      );
};

export default PrivateRoute;
