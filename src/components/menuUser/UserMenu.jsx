import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lapiz from "../../assets/menu/Lapiz.png";
import { ReactComponent as SalirIcon } from "../../assets/desktop/salir.svg";
import { actionLogOut } from "../../redux/reducersActions/authentication/authenticationAction";
import Cookies from "js-cookie";
import logoEmpresa from "../../assets/forms/Logo.png"
import config from '../../config'
import { actionGetReports } from "../../redux/reducersActions/userReport/Actions";
const URL= config[config.enviroment].host

const UserMenu = () => {
	const dispatch = useDispatch();
	const profile = useSelector(
		(state) => state.authenticationReducer.user.user
	);
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const reports = useSelector(state => state.userReport.list)

	if(!reports) dispatch(actionGetReports(token))

	return (
		<div className="menuContainer">
			<ul>
				<li style={{listStyle: "none"}}>
					<img
						src={
							profile.photo?
								URL+'/'+profile.photo
							:logoEmpresa
						}
						alt="Logo Organizacion"
					/>
				</li>
				<li
					className="firstLi"
				>
					<NavLink
						exact
						activeClassName="active"
						to="/user"
					>
						<img
							src={Lapiz}
							alt="Encuestas"
							className="userMenu"
						/>
						<label>Encuestas</label>
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						activeClassName="active"
						to="/user/results"
					>
						<img
							src={Lapiz}
							alt="Resultados"
							className="userMenu"
						/>
						<label>Resultados</label>
					</NavLink>
				</li>
				<li>
					<a
						exact
						className="log-out"
						onClick={(e) => {
							dispatch(actionLogOut());
							Cookies.remove("user");
							window.location.href = "/login";
						}}
					>
						<SalirIcon />
						<label>Salir</label>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default UserMenu;
