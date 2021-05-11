import React from "react";
import FormularioAdmin from "../components/forms/FormularioAdmin.jsx";
import NavBar from "../components/navBar/NavBar.jsx";

const ViewAdmin = (props) => {
	const admin_id = props.location && props.location.state && props.location.state.id ? props.location.state.id : false;
      return (
            <div className="view-empresas-container">
                  <NavBar menu={false}/>
                  <FormularioAdmin admin_id={admin_id} />
            </div>
      );
};

export default ViewAdmin;
