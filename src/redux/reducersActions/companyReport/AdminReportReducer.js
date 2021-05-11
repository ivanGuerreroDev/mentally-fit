import {
	CLEAN_INFO_EMPRESAS,
	GET_PAISES_EMPRESA,
	SET_CURRENT_EMPRESA,
	SET_EMPRESAS_REPORT,
	SET_PARTICIPANTES_REPORT,
} from "../../constants";

const initialState = {
	listEmpresas: null,
	listParticipantes: null,
	loading: false,
	currentEmpresas: null,
	currentAllCriterios: [],
	currentAllAreas: null,
	currentParticipantes: null,
	currentPaises: [],
};

const AdminReportReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_EMPRESAS_REPORT:
			return {
				...state,
				listEmpresas: [action.payload],
			};
		case SET_PARTICIPANTES_REPORT:
			return {
				...state,
				listParticipantes: action.payload,
			};
		case SET_CURRENT_EMPRESA:
			return {
				...state,
				currentEmpresas: action.payload,
				currentAllAreas: _setAllAreas(action.payload),
				currentAllCriterios: _setAllCriterios(action.payload),
			};
		case GET_PAISES_EMPRESA: 
			return {
				...state,
				currentPaises: action.payload
			}
		case CLEAN_INFO_EMPRESAS:
			return {
				...state,
				currentAllAreas: null,
				currentEmpresas: null,
			}
		default:
			return {
				...state,
			};
	}
};

const _setAllAreas = (report) => {
	const letras = ["E", "F", "M", "S"];

	let allAreas = [];

	letras.map((letra) => {
		allAreas = [
			...allAreas,
			...Object.values(report.company_report[letra].areas),
		];
	});

	localStorage.removeItem('allAreasEmpresa')
	localStorage.setItem('allAreasEmpresa', JSON.stringify(allAreas))

	return allAreas;
};

const _setAllCriterios = (report) => {
	const letras = ["E", "F", "M", "S"];

	let allAreas = [];

	letras.map((letra) => {
		allAreas = [
			...allAreas,
			...Object.values(report.company_report[letra].areas),
		];
	});

	let allCriterios = [];

	allAreas.map((area, index) => {
		allCriterios = [...allCriterios, ...Object.values(area.criterias)];
	});

	return allCriterios;
};


export default AdminReportReducer;
