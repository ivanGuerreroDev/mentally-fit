import React from "react";
import InformacionUser from "./InformacionUser";
import EditarInformacionUser from "./EditarInformacionUser";
import { useHistory } from "react-router-dom";

const PerfilUser = () => {
	const history = useHistory();

	const aux = history.location.pathname;


	return (
		<div className="section-container perfil-usuario-container container-fluid">
			<span>Perfil de Usuario</span>
			{aux === "/user/perfil" ? (
				<InformacionUser />
			) : aux === "/user/perfil/edit" ? (
				<EditarInformacionUser />
			) : null}
		</div>
	);
};

export default PerfilUser;
