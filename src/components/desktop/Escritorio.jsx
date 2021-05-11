import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { actionGetData } from "../../redux/reducersActions/desktop/desktopAction";

const Escritorio = () => {
      const dispatch = useDispatch();

      const informacion = useSelector(
            (state) => state.desktopReducer.escritorio
      );

      const user = useSelector(state => state.authenticationReducer.user)

      if (!informacion) dispatch(actionGetData(user.token));

      if (!informacion) {
            return <div></div>;
      } else {
            return (
                  <div className="escritorioContainer">
                        <span className="title">Escritorio</span>
                        <div className="buttonsContainer">
                              <a href="">
                                    <div className="botones-escritorio">
                                          <label className="button-title">
                                                EMPRESAS
                                          </label>
                                          <label className="number">
                                                {informacion[0].total}
                                          </label>
                                          <label className="open">
                                                Abiertos:{" "}
                                                {informacion[0].abiertos}
                                          </label>
                                          <label className="complete">
                                                Completados:{" "}
                                                {informacion[0].cerrados}
                                          </label>
                                    </div>
                              </a>
                              <a href="">
                                    <div className="botones-escritorio">
                                          <label className="button-title">
                                                PARTICIPANTES
                                          </label>
                                          <label className="number">
                                                {informacion[1].total}
                                          </label>
                                          <label className="open">
                                                Abiertos:{" "}
                                                {informacion[1].abiertos}
                                          </label>
                                          <label className="complete">
                                                Completados:{" "}
                                                {informacion[1].cerrados}
                                          </label>
                                    </div>
                              </a>
                              <a href="">
                                    <div className="botones-escritorio">
                                          <label className="button-title">
                                                CAMPAÑAS
                                          </label>
                                          <label className="number">
                                                {informacion[2].total}
                                          </label>
                                          <label className="open">
                                                Abiertos:{" "}
                                                {informacion[2].abiertos}
                                          </label>
                                          <label className="complete">
                                                Completados:{" "}
                                                {informacion[2].cerrados}
                                          </label>
                                    </div>
                              </a>
                        </div>
                  </div>
            );
      }
};

export default Escritorio;
