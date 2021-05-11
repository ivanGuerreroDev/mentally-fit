import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/navBar/NavBar";
import Menu from "../components/menu/Menu";
import CompanyResults from "../components/companyReports";

const CampaignCompanyResults = (props) => {

	const menu = useSelector(
		(state) => state.desktopReducer.menu
	);

	return (
		<div>
			<NavBar menu={true}/>
			
			<div className={"desktopContainer"+ " "+(menu?"active":null)}>
                <Menu />
				<CompanyResults />				
			</div>
		</div>
	);
};

export default CampaignCompanyResults;
