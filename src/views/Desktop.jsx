import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import Administradores from "../components/desktop/Administradores";
import Campañas from "../components/desktop/Campañas";
import ClientesEmpresas from "../components/desktop/ClientesEmpresas";
import ClientesParticipantes from "../components/desktop/ClientesParticipantes";
import Escritorio from "../components/desktop/Escritorio";
import FormularioEmpresa from "../components/forms/FormularioEmpresa";
import Menu from "../components/menu/Menu";
import UserMenu from "../components/menuUser/UserMenu";
import NavBar from "../components/navBar/NavBar";

const Desktop = (props) => {

	const user = useSelector(
		(state) => state.authenticationReducer.user.user
	);

	const menu = useSelector(
		(state) => state.desktopReducer.menu
	);

	return (
		<>
			<NavBar menu={true}/>
			<div className={"desktopContainer"+ " "+(menu?"active":null)}>
				{user.level === "PARTICIPANTE" ? (
					<UserMenu/>
				) :  (
					<Menu rol={user.level} />
				)}

				{props.match.params.pagina === "escritorio" ? (
					<Escritorio />
				) : props.match.params.pagina === "empresas" ? (
					props.location.pathname === "/navegacion/empresas/agregar" ||
					props.location.pathname === "/navegacion/empresas/editar" 
						? (
							<FormularioEmpresa {...props}/>
						) : (
							<ClientesEmpresas />
						)
				) : props.match.params.pagina === "participantes" ? (
					<ClientesParticipantes />
				) : props.match.params.pagina === "campañas" ? (
					<Campañas />
				) : props.match.params.pagina === "administradores" ? (
					<Administradores />
				) : (
					<div></div>
				)}

				
			</div>
		</>
	);
};

export default Desktop;
