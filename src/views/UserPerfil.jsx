import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionGetProfile} from "../redux/reducersActions/authentication/authenticationAction"
import { useHistory } from "react-router-dom";

import Menu from "../components/menu/Menu";
import UserMenu from "../components/menuUser/UserMenu";
import NavBar from "../components/navBar/NavBar";
import PerfilUser from "../components/perfilUser/PerfilUser";


const UserPerfil = () => {
	const dispatch = useDispatch();
	const history = useHistory()
	const user = useSelector(
		(state) => state.authenticationReducer.user.user
	);
	const menu = useSelector(
		(state) => state.desktopReducer.menu
	);
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	
	useEffect(()=>{
		//dispatch(actionGetProfile(token))
	},[history])
	return (
		<>
			<NavBar menu={true} />
			<div className={"desktopContainer"+ " "+(menu?"active":null)}>
				{user.level === "PARTICIPANTE" ? <UserMenu /> : <Menu />}
				<PerfilUser />
			</div>
		</>
	);
};

export default UserPerfil;
