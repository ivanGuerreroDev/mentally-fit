import React from "react";
import { useSelector } from "react-redux";
import ListadoCampañasUser from "../components/listadoCampañasUser/ListadoCampañasUser";
import UserMenu from "../components/menuUser/UserMenu";
import NavBar from "../components/navBar/NavBar";
import PerfilUser from "../components/perfilUser/PerfilUser";

const UserDashboard = () => {

	const user = useSelector(
		(state) => state.authenticationReducer.user.user
	);
	const menu = useSelector(
		(state) => state.desktopReducer.menu
	);


	return (
		<>
			<NavBar menu={true} />
			<div className={"desktopContainer" + " " + (menu ? "active" : null)}>

				<UserMenu />
				<ListadoCampañasUser />
			</div>
		</>
	);
};

export default UserDashboard;
