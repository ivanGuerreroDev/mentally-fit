import React from 'react';

const ColorOrina = () => {
      return (
            <div className="componente-saber-mas orina">
                  <div className="opciones-orina row mt-3">
                        <button className="primero"/>
                        <button className="segundo"/>
                        <button className="tercero"/>
                        <button className="cuarto"/>
                        <button className="quinto"/>
                  </div>
                  <div className="colores orina row mt-3">
                        <span>Bien Hidratado/a</span>
                        <span>Hidratado/a</span>
                        <span>Leve Hidratación</span>
                        <span>Deshidratación</span>
                        <span>Severamente Deshidratado/a</span>
                  </div>
            </div>
      )
}

export default ColorOrina;