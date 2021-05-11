import React from "react";
import Logo from "../../assets/navBar/logo.png";
import userIcon from "../../assets/navBar/userIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/menu/menu.svg";
import { actionToggleMenu } from "../../redux/reducersActions/desktop/desktopAction";
import config from "../../config";
const APP_VERSION = config.version;

const NavBar = ({ menu }) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.authenticationReducer.user.user);

	const history = useHistory();

	return (
		<div className="navBarContainer row container-fluid">
			<div className="logoContainer col">
				{menu ? (
					<Link onClick={() => dispatch(actionToggleMenu())}>
						<MenuIcon style={{ width: 20 }} />
					</Link>
				) : null}

				<Link
					onClick={(e) =>
						user.level === "PARTICIPANTE"
							? history.push("/user")
							: history.push("/navegacion/escritorio")
					}
				>
					<img src={Logo} alt="logo" className="logoMentallyFit" />
				</Link>
			</div>
			<div className="navbarItems col">
				<p className="version-app"  data-html2canvas-ignore="true">versión {APP_VERSION}</p>
				<Link
					className="userNavBar"
					onClick={(e) => history.push("/user/perfil")}
					data-html2canvas-ignore="true"
				>
					<img src={userIcon} alt="userIcon" className="userIcon" />
					<span className="userName">
						{user.name + " " + user.lastName}
					</span>
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
