import React from "react";
import FormularioParticipante from "../components/forms/FormularioParticipante.jsx";
import NavBar from "../components/navBar/NavBar.jsx";
import PerfilParticipantes from "../components/perfiles/PerfilParticipantes.jsx";

const ViewParticipantes = (props) => {
	const participante = props.location&&props.location.state&&props.location.state.id?props.location.state.id:false;
	return (
		<div className="view-empresas-container">
			<NavBar menu={false}/>
			<FormularioParticipante participante={participante} />
			{/* <PerfilParticipantes /> */}
		</div>
	);
};

export default ViewParticipantes;
