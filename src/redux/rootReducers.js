import { combineReducers } from "redux";
import authenticationReducer from "./reducersActions/authentication/authenticationReducer.js";
import desktopReducer from "./reducersActions/desktop/desktopReducer.js";
import toastReducer from "./reducersActions/toast/toastReducer.js";
import evaluations from "./reducersActions/evaluacion/Reducer";
import userReport from "./reducersActions/userReport/Reducer";
import AdminReportReducer from './reducersActions/companyReport/AdminReportReducer';

const rootReducers = combineReducers({
      authenticationReducer,
      desktopReducer,
	  toastReducer,
	  evaluations,
	  userReport,
	  AdminReportReducer,
});

export default rootReducers;
