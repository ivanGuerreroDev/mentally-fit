import {
	CHANGE_STATE_CAMPAÑA,
	CHANGE_STATE_PARTICIPANTE,
	GET_DATA_ADMINISTRADORES,
	GET_DATA_CAMPAÑAS,
	GET_DATA_EMPRESAS,
	GET_DATA_EMPRESAS_CAMPAÑAS,
	GET_DATA_ESCRITORIO,
	GET_DATA_FORMULARIO_CAMPAÑAS,
	GET_DATA_FORMULARIO_PARTICIPANTE,
	GET_DATA_PARTICIPANTES,
	SET_DATA_PARTICIPANTE,
	CLEAN_DATA_PARTICIPANTE,
	TOGGLE_MENU
} from "../../constants";
import { useWindowSize } from "../../../utils/window"
const initialState = {
	escritorio: "",
	empresas: {},
	participantes: [],
	participante: {},
	campañas: [],
	dataEmpresas: [],
	menu: window.innerWidth < 1200 ? false :true
};

const desktopReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_DATA_ESCRITORIO:
			return {
				...state,
				escritorio: action.payload,
			};
		case GET_DATA_EMPRESAS:
			return {
				...state,
				empresas: action.payload,
			};
		case GET_DATA_PARTICIPANTES:
			return {
				...state,
				participantes: action.payload,
			};
		case GET_DATA_FORMULARIO_PARTICIPANTE:
			return {
				...state,
				participantes: {
					...state.participantes,
					empresas: action.payload.company,
					campañas: action.payload.campaign,
				},
			};
		case GET_DATA_CAMPAÑAS:
			return {
				...state,
				campañas: action.payload,
			};
		case GET_DATA_FORMULARIO_CAMPAÑAS:
			return {
				...state,
				campañas: {
					...state.campañas,
					empresas: action.payload,
				},
			};
		case GET_DATA_ADMINISTRADORES:
			return {
				...state,
				campañas: {
					...state.campañas,
					administradores: action.payload,
				},
			};
		case CHANGE_STATE_PARTICIPANTE:
			let aux = state.participantes.user;
			aux[action.payload] = {
				...aux[action.payload],
				status: !aux[action.payload].status,
			};
			return {
				...state,
				participantes: {
					...state.participantes,
					user: [...aux],
				},
			};
		case CHANGE_STATE_CAMPAÑA:
			let aux1 = state.campañas.campañas;
			aux1[action.payload] = {
				...aux1[action.payload],
				status: !aux1[action.payload].status,
			};
			return {
				...state,
				campañas: {
					...state.campañas,
					campañas: [...aux1],
				},
			};
		case GET_DATA_EMPRESAS_CAMPAÑAS:
			return {
				...state,
				dataEmpresas: action.payload

			};
		case SET_DATA_PARTICIPANTE:
			return{
				...state,
				participante: action.payload
			}
		case CLEAN_DATA_PARTICIPANTE:
			return{
				...state,
				participante: {}
			}
		case TOGGLE_MENU:
			return{
				...state,
				menu: !state.menu
			}
		default:
			return {
				...state,
			};
	}
};

export default desktopReducer;
