import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import ResultadosCampa├▒as from "../components/userReports";
import UserMenu from "../components/menuUser/UserMenu";
import NavBar from "../components/navBar/NavBar";

const CampaignResults = (props) => {

	const user = useSelector(
		(state) => state.authenticationReducer.user.user
	);

	const menu = useSelector(
		(state) => state.desktopReducer.menu
	);

	return (
		<div>
			<NavBar menu={true}/>
			
			<div className={"desktopContainer"+ " "+(menu?"active":null)}>
				<UserMenu/>
				<ResultadosCampa├▒as />				
			</div>
		</div>
	);
};

export default CampaignResults;
