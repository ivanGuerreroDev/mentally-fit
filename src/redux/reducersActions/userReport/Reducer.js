import {
	REPORT_FETCHING,
	REPORT_FETCH,
	REPORT_ERROR,
	SET_REPORTS,
	SET_REPORT,
	CLEAN_INFO_PARTICIPANTES,
} from "../../constants";

const initialState = {
	list: [],
	loading: false,
	current: null,
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case REPORT_FETCHING:
			return {
				...state,
				current: null,
				loading: true,
			};
		case REPORT_FETCH:
			return {
				list: action.payload,
				loading: false,
			};
		case REPORT_ERROR:
			return {
				...state,
				current: null,
				loading: false,
			};

		case SET_REPORTS:
			return {
				...state,
				//list: [...state.list, ...action.payload],
				list: action.payload,
			};
		case SET_REPORT:
			return {
				...state,
				current: {
					...action.payload,
					page1: {
						chartData: _chartSortData(
							JSON.parse(JSON.stringify(action.payload))
						),
						tableData: _tableSortData(
							JSON.parse(JSON.stringify(action.payload))
						),
					},
					page3: {
						chartData: _chartSortCompanyData(
							/*JSON.parse(JSON.stringify(action.payload))*/
							action.payload
						),
					},
					chartPage1: _setChartPage1(
						JSON.parse(JSON.stringify(action.payload))
					),
				},
			};
		case CLEAN_INFO_PARTICIPANTES:
			return {
				...state,
				current: null
			}
		default:
			return {
				...state,
			};
	}
};

const _setChartPage1 = (report) => {
	const aux = {
		score: {
			...report.score,
		},
		personal_report: {
			...report.personal_report,
		},
	};

	const auxSend = JSON.stringify(aux)

	localStorage.setItem('chartPage1', auxSend)

	return auxSend;
};

const _chartSortCompanyData = (report) => {
	return {
		data: [
			parseInt(report.company_report.F.areas.F1.value),
			parseInt(report.company_report.F.areas.F2.value),
			parseInt(report.company_report.F.areas.F3.value),
			parseInt(report.company_report.F.areas.F4.value),
			parseInt(report.company_report.M.areas.M1.value),
			parseInt(report.company_report.M.areas.M2.value),
			parseInt(report.company_report.M.areas.M3.value),
			parseInt(report.company_report.M.areas.M4.value),
			parseInt(report.company_report.E.areas.E1.value),
			parseInt(report.company_report.E.areas.E2.value),
			parseInt(report.company_report.E.areas.E3.value),
			parseInt(report.company_report.E.areas.E4.value),
			parseInt(report.company_report.S.areas.S1.value),
			parseInt(report.company_report.S.areas.S2.value),
			parseInt(report.company_report.S.areas.S3.value),
			parseInt(report.company_report.S.areas.S4.value),
		],
		dimensiones: [
			{
				name: "Energía Espiritual",
				percent: "S - " + report.company_report.S.value + "%",
				points: parseInt(report.company_report.S.value),
				color: rangeColor(parseInt(report.company_report.S.value)),
			},
			{
				name: "Energía Física",
				percent: "F - " + report.company_report.F.value + "%",
				points: parseInt(report.company_report.F.value),
				color: rangeColor(parseInt(report.company_report.F.value)),
			},
			{
				name: "Energía Mental",
				percent: "M - " + report.company_report.M.value + "%",
				points: parseInt(report.company_report.M.value),
				color: rangeColor(parseInt(report.company_report.M.value)),
			},
			{
				name: "Energía Emocional",
				percent: "E - " + report.company_report.E.value + "%",
				points: parseInt(report.company_report.E.value),
				color: rangeColor(parseInt(report.company_report.E.value)),
			},
		],
	};
};

const _chartSortData = (report) => {
	return {
		data: [
			parseInt(report.personal_report.F.areas.F1.value),
			parseInt(report.personal_report.F.areas.F2.value),
			parseInt(report.personal_report.F.areas.F3.value),
			parseInt(report.personal_report.F.areas.F4.value),
			parseInt(report.personal_report.M.areas.M1.value),
			parseInt(report.personal_report.M.areas.M2.value),
			parseInt(report.personal_report.M.areas.M3.value),
			parseInt(report.personal_report.M.areas.M4.value),
			parseInt(report.personal_report.E.areas.E1.value),
			parseInt(report.personal_report.E.areas.E2.value),
			parseInt(report.personal_report.E.areas.E3.value),
			parseInt(report.personal_report.E.areas.E4.value),
			parseInt(report.personal_report.S.areas.S1.value),
			parseInt(report.personal_report.S.areas.S2.value),
			parseInt(report.personal_report.S.areas.S3.value),
			parseInt(report.personal_report.S.areas.S4.value),
		],
		dimensiones: [
			{
				name: "Energía Espiritual",
				percent: "S - " + report.personal_report.S.value + "%",
				points: parseInt(report.personal_report.S.value),
				color: rangeColor(parseInt(report.personal_report.S.value)),
			},
			{
				name: "Energía Física",
				percent: "F - " + report.personal_report.F.value + "%",
				points: parseInt(report.personal_report.F.value),
				color: rangeColor(parseInt(report.personal_report.F.value)),
			},
			{
				name: "Energía Mental",
				percent: "M - " + report.personal_report.M.value + "%",
				points: parseInt(report.personal_report.M.value),
				color: rangeColor(parseInt(report.personal_report.M.value)),
			},
			{
				name: "Energía Emocional",
				percent: "E - " + report.personal_report.E.value + "%",
				points: parseInt(report.personal_report.E.value),
				color: rangeColor(parseInt(report.personal_report.E.value)),
			},
		],
	};
};

const _tableSortCompanyData = (report) => {};

const _tableSortData = (report) => {
	var conEnergia, necesitaRecarga;
	var listadoAreas = [];
	var listadoDeAreas;
	//Busqueda de Dimension menor y mayor
	Object.keys(report.personal_report).forEach((dimension, i) => {
		let vareas = report.personal_report[dimension].areas;
		Object.keys(vareas).forEach((vare, i) => {
			listadoAreas.push(vareas[vare]);
		})
		if (i === 0) {
			conEnergia = report.personal_report[dimension];
			necesitaRecarga = report.personal_report[dimension];
		} else {
			if (conEnergia.value < report.personal_report[dimension].value) {
				conEnergia = report.personal_report[dimension];
			}
			if (
				necesitaRecarga.value > report.personal_report[dimension].value
			) {
				necesitaRecarga = report.personal_report[dimension];
			}
		}
	});
	//console.log('Antes',listadoAreas );
	conEnergia.areas = Object.keys(conEnergia.areas).map(
		(e, i) => conEnergia.areas[e]
	);
	conEnergia.areas.sort((a, b) => {
		if (parseInt(a.value) > parseInt(b.value)) return 1;
		if (parseInt(a.value) < parseInt(b.value)) return -1;
		return 0;
	});
	necesitaRecarga.areas = Object.keys(necesitaRecarga.areas).map(
		(e, i) => necesitaRecarga.areas[e]
	);
	necesitaRecarga.areas.sort((a, b) => {
		if (parseInt(a.value) > parseInt(b.value)) return 1;
		if (parseInt(a.value) < parseInt(b.value)) return -1;
		return 0;
	});
	listadoDeAreas = listadoAreas.sort((a, b) => {
		if (parseInt(a.value) > parseInt(b.value)) return 1;
		if (parseInt(a.value) < parseInt(b.value)) return -1;
		return 0;
	});
	//console.log('listadoDeAreas ',listadoDeAreas)

	localStorage.setItem('tableDataParticipante', JSON.stringify({conEnergia, necesitaRecarga,listadoDeAreas}))
	return { conEnergia, necesitaRecarga,listadoDeAreas };
};

const rangeColor = (value) => {
	if (value >= 0 && value <= 20) {
		return "rgb(255,0,0)";
	}
	if (value >= 21 && value <= 40) {
		return "rgb(30,145,56)";
	}
	if (value >= 41 && value <= 60) {
		return "rgb(249,203,156)";
	}
	if (value >= 61 && value <= 80) {
		return "rgb(217,234,211)";
	}
	if (value >= 81 && value <= 100) {
		return "rgb(147,196,125)";
	}
};

export default Reducer;
