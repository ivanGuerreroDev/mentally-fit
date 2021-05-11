import React from "react";
import FormularioCampaña from "../components/forms/FormularioCampaña.jsx";
import NavBar from "../components/navBar/NavBar.jsx";

const ViewCampañas = (props) => {
	const campaña = props.location && props.location.state && props.location.state.id ? props.location.state.id : false;
	return (
		<div className="view-empresas-container">
			<NavBar menu={false}/>
			<FormularioCampaña campaña={campaña} />
		</div>
	);
};

export default ViewCampañas;
