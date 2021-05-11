import {
	EVALUACION_FETCH,
	SET_TEST_COOKIE,
	LOADING,
	FINISHED,
	SET_SPINNER_ON,
	SET_SPINNER_OFF,
} from "../../constants";

const initialState = {
	campaign: null,
	company: null,
	evaluaciones: null,
	loading: false,
	spinner: false,
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case EVALUACION_FETCH:
			return {
				...action.payload,
				loading: false,
			};
		case SET_TEST_COOKIE:
			return {
				...action.payload,
			};
		case LOADING:
			return {
				...state,
				loading: true,
			};
		case FINISHED:
			return {
				...state,
				loading: false,
			};
		case SET_SPINNER_ON:
			return {
				...state,
				spinner: true,
			};
		case SET_SPINNER_OFF:
			return {
				...state,
				spinner: false,
			};
		default:
			return {
				...state,
			};
	}
};

export default Reducer;
