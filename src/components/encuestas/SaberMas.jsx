import React, { useState } from "react";

const SaberMas = () => {
      const [coloresBoton, setColoresBoton] = useState({
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
            10: false,
      });

      const onButtonClick = (e) => {
            
            setColoresBoton({
                  ...coloresBoton,
                  [e.target.name]: !coloresBoton[e.target.name],
            });
      };

      return (
            <div className="componente-saber-mas">
                  <div className="opciones row mt-3">
                        <button
                              name="0"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 first ` + coloresBoton[0]}
                        >
                              0
                        </button>
                        <button
                              name="1"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[1]}
                        >
                              1
                        </button>
                        <button
                              name="2"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[2]}
                        >
                              2
                        </button>
                        <button
                              name="3"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[3]}
                        >
                              3
                        </button>
                        <button
                              name="4"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[4]}
                        >
                              4
                        </button>
                        <button
                              name="5"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[5]}
                        >
                              5
                        </button>
                        <button
                              name="6"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[6]}
                        >
                              6
                        </button>
                        <button
                              name="7"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[7]}
                        >
                              7
                        </button>
                        <button
                              name="8"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[8]}
                        >
                              8
                        </button>
                        <button
                              name="9"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 ` + coloresBoton[9]}
                        >
                              9
                        </button>
                        <button
                              name="10"
                              onClick={(e) => onButtonClick(e)}
                              className={`col-1 last ` + coloresBoton[10]}
                        >
                              10
                        </button>
                  </div>
                  <div className="colores row mt-3">
                        <button className="col-1 red" />
                        <button className="col-1 red" />
                        <button className="col-1 red" />
                        <button className="col-1 red" />
                        <button className="col-1 orange" />
                        <button className="col-1 orange" />
                        <button className="col-1 orange" />
                        <button className="col-1 green" />
                        <button className="col-1 green" />
                        <button className="col-1 green" />
                        <button className="col-1 green" />
                  </div>
            </div>
      );
};

export default SaberMas;
