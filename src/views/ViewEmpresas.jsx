import React from "react";
import EmpresasDetalles from "../components/empresas/EmpresasDetalles.jsx";
import NavBar from "../components/navBar/NavBar.jsx";
import { useHistory } from "react-router-dom";

const ViewEmpresas = (props) => {
	const empresaId = props.location.state.id;
	
	return (
		<div className="view-empresas-container">
			<NavBar menu={false}/>
			<EmpresasDetalles empresaId={empresaId} />
		</div>
	);
};

export default ViewEmpresas;
