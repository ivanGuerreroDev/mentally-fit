import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./App.scss";
import LoginPage from "./views/LoginPage";
import WelcomePage from "./views/WelcomePage";
import Desktop from "./views/Desktop";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { actionSetUserCookie } from "./redux/reducersActions/authentication/authenticationAction";
import { actionSetTestCookie } from "./redux/reducersActions/evaluacion/Actions";
import Toast from "./components/toast/Toast";
import { ToastProvider } from "react-toast-notifications";
import ViewEmpresas from "./views/ViewEmpresas";
import ViewParticipantes from "./views/ViewParticipantes";
import ViewCampañas from "./views/ViewCampañas";
import ViewAdmin from "./views/ViewAdmin";
import PrivateRoute from "./views/PrivateRoute";
import PrivateUserRoute from "./views/PrivateUserRoute";
import UserDashboard from "./views/UserDashboard";
import UserPerfil from "./views/UserPerfil";
import CampaignResults from "./views/CampaignResults";
import CampaignResult from "./views/CampaignResult";
import ViewEncuesta from "./views/ViewEncuesta";
import NewPass from "./views/NewPass";
import CampaignCompanyResults from "./views/CampaignCompanyResults";
import CampaignParticipantResults from "./views/CampaignParticipantsResults";
import CampaignEmpresasResult from "./views/CampaignEmpresasResult";
import ParticipanteReporteTotal from "./components/resultadosEncuestas/User/ParticipanteReporteTotal";

const App = () => {
	const dispatch = useDispatch();

	const [cookies] = useCookies(["cookie-name"]);

	const user = useSelector((state) => state.authenticationReducer.user.user);

	if (cookies.user) dispatch(actionSetUserCookie(cookies.user));
	if (cookies.test) dispatch(actionSetTestCookie(cookies.test));

	return (
		<>
			<ToastProvider PlacementType="bottom-center">
				<Router>
					<Toast>
						<Switch>
							<Route exact path="/">
								<Redirect to="/login" />
							</Route>
							<Route path="/login" component={LoginPage} />
							<Route path="/NewPassword" component={NewPass} />
							<PrivateRoute
								path="/navegacion/:pagina"
								component={
									user.level === "PARTICIPANTE"
										? UserDashboard
										: Desktop
								}
							/>
							<PrivateRoute
								path="/empresas/:pagina"
								component={ViewEmpresas}
							/>
							<PrivateRoute
								path="/participantes/:pagina"
								component={ViewParticipantes}
							/>
							<PrivateRoute
								path="/campañas/:pagina"
								component={ViewCampañas}
							/>
							<PrivateRoute
								path="/admin/:pagina"
								component={ViewAdmin}
							/>
							<PrivateRoute
							exact
								path="/reportes/empresas"
								component={CampaignCompanyResults}
							/>
							<PrivateRoute
							exact
								path="/reportes/participantes"
								component={CampaignParticipantResults}
							/>
							<PrivateRoute
								exact
								path="/reportes/participantes/resultados"
								component={CampaignResult}
							/>
							<PrivateRoute
								exact
								path="/reportes/participantes/reporte-completo/:nombre"
								component={ParticipanteReporteTotal}
							/>
							<PrivateRoute
								exact
								path="/reportes/empresas/resultados"
								component={CampaignEmpresasResult}
							/>
							<PrivateUserRoute
								path="/terminos"
								component={WelcomePage}
							/>
							<PrivateUserRoute
								path="/user"
								exact
								component={UserDashboard}
							/>
							<PrivateUserRoute
								exact
								path="/user/perfil"
								component={UserPerfil}
							/>
							<PrivateUserRoute
								exact
								path="/user/perfil/edit"
								component={UserPerfil}
							/>
							<PrivateUserRoute
								exact
								path="/user/results"
								component={CampaignResults}
							/>
							<PrivateUserRoute
								exact
								path="/user/result"
								component={CampaignResult}
							/>
							<PrivateUserRoute
								path="/user/encuesta/:encuesta/:pagina"
								component={ViewEncuesta}
							/>
						</Switch>
					</Toast>
				</Router>
			</ToastProvider>
		</>
	);
};

export default App;
