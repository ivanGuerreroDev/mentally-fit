import React, { usseEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as EscritorioIcon } from "../../assets/desktop/escritorio.svg";
import { ReactComponent as ClientesIcon } from "../../assets/desktop/clientes.svg";
import { ReactComponent as CampañasIcon } from "../../assets/desktop/campañas.svg";
import { ReactComponent as ReportesIcon } from "../../assets/desktop/reportes.svg";
import { ReactComponent as AdministradoresIcon } from "../../assets/desktop/administradores.svg";
import { ReactComponent as SalirIcon } from "../../assets/desktop/salir.svg";
import { actionLogOut } from "../../redux/reducersActions/authentication/authenticationAction";
import Cookies from "js-cookie";
import {
	actionGetCompanyReports,
	actionGetParticipantReports,
} from "../../redux/reducersActions/companyReport/AdminReportActions";
import { actionGetReports } from "../../redux/reducersActions/userReport/Actions";

const Menu = ({ active, rol }) => {
	const dispatch = useDispatch();

	const reports = useSelector(
		(state) => state.AdminReportReducer.listEmpresas
	);

	const reportsParticipantes = useSelector(
		(state) => state.AdminReportReducer.listParticipantes
	);

	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	
	const reportsUser = useSelector(state => state.userReport.list)
	
	if(!reportsUser.length) dispatch(actionGetReports(token))
	if (!reports) dispatch(actionGetCompanyReports(token));
	if (!reportsParticipantes) dispatch(actionGetParticipantReports(token));

	return (
		<div className={"menuContainer"}>
			<ul>
				<li>
					<NavLink
						exact
						activeClassName="active"
						to="/navegacion/escritorio"
					>
						<EscritorioIcon alt="escritorio" />
						<label>Escritorio</label>
					</NavLink>
				</li>
				<li>
					<Link exact to="/navegacion/empresas">
						<ClientesIcon alt="clientes" />
						<label>Clientes</label>
					</Link>
				</li>
				<li>
					<NavLink activeClassName="active" to="/navegacion/empresas">
						<label className="sub-menu">Empresas</label>
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						activeClassName="active"
						to="/navegacion/participantes"
					>
						<label className="sub-menu">Participantes</label>
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						activeClassName="active"
						to="/navegacion/campañas"
					>
						<CampañasIcon alt="campañas" />
						<label>Campañas</label>
					</NavLink>
				</li>
				<li>
					<Link exact to="/reportes/empresas">
						<ReportesIcon alt="reportes" />
						<label>Reportes</label>
					</Link>
				</li>
				<li>
					<NavLink activeClassName="active" to="/reportes/empresas">
						<label className="sub-menu">Empresas</label>
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						activeClassName="active"
						to="/reportes/participantes"
					>
						<label className="sub-menu">Participantes</label>
					</NavLink>
				</li>
				{rol === "SUPERADMIN" ? (
					<li>
						<NavLink
							exact
							activeClassName="active"
							to="/navegacion/administradores"
						>
							<AdministradoresIcon alt="reportes" />
							<label>Administradores</label>
						</NavLink>
					</li>
				) : null}
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

export default Menu;
