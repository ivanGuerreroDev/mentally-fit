import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment"
import { actionGetProfile } from "../../redux/reducersActions/authentication/authenticationAction"
import { useDispatch, useSelector } from "react-redux";
import 'moment/locale/es'  // without this line it didn't work
import config from '../../config'
import logoEmpresa from "../../assets/forms/Logo.png"
moment.locale('es')
const URL= config[config.enviroment].host



const InformacionUser = () => {
	const history = useHistory()
	const profile = useSelector(
		(state) => state.authenticationReducer.user.user
	);


	return (
		<div className="perfil-container">
			<div className="imagen-container">
				<div className="imagen-perfil">
					<img
						src={
							profile.photo ?
								URL + "/" +profile.photo
								: logoEmpresa
						}
						alt="ImagenPerfil"
					/>
				</div>
				<div className="perfil-login-name">
					<span className="perfil">Perfil Público</span>
					<div className="login-name">
						<span>
							{
								profile.name && profile.lastName ? profile.name + " " + profile.lastName : null
							}
						</span>
					</div>
				</div>
			</div>
			<div className="informacion-container">
				<div className="texto-boton">
					<div className="texto-container">
						<span className="titulo">
							Información Privada
                                    </span>
						<span className="informacion">
							Su informacion privada no es visible
							para otros.
                                    </span>
					</div>
					<div className="button-container">
						<button
							onClick={e => history.push("/user/perfil/edit")}
						>EDITAR</button>
					</div>
				</div>
				<div className="infor">
					<div className="correo">
						<span>Correo</span>
						<div>{profile.email ? profile.email : null}</div>
					</div>
					<div className="contraseña">
						<span>Contraseña</span>
						<div>********</div>
					</div>
					<div className="sexo">
						<span>Sexo</span>
						<div>{profile.gender ? profile.gender : null}</div>
					</div>
					<div className="pais">
						<span>País / Región</span>
						<div>{profile.country ? profile.country : null}</div>
					</div>
					<div className="fecha">
						<span>Fecha de Nacimiento</span>
						<div>{profile.birthdate ? moment(profile.birthdate, 'YYYY-MM-DD').format("MMMM DD, YYYY") : null}</div>
					</div>
					<div className="edad">
						<span>Edad</span>
						<div>{profile.birthdate ? moment().diff(moment(profile.birthdate, 'YYYY-MM-DD'), 'y') : null} años</div>
					</div>
					<div className="departamento">
						<span>Departamento</span>
						<div>{profile.department ? profile.department : null}</div>
					</div>
					<div className="funcion">
						<span>Funcion</span>
						<div>{profile.function ? profile.function : null}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InformacionUser;
