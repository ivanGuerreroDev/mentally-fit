import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/navBar/NavBar";
import Menu from "../components/menu/Menu";
import ParticipantReports from "../components/participantReports";

const CampaignParticipantResults = (props) => {

	const menu = useSelector(
		(state) => state.desktopReducer.menu
	);

	return (
		<div>
			<NavBar menu={true}/>
			
			<div className={"desktopContainer"+ " "+(menu?"active":null)}>
                <Menu />
				<ParticipantReports admin={"admin"}/>
			</div>
		</div>
	);
};

export default CampaignParticipantResults;
