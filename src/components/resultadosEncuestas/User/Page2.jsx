import React from "react";
import { useSelector } from "react-redux";

const Page2 = () => {
	const dataReport = useSelector(
		(state) => state.userReport.current
	);
	const dataReport2 =
		dataReport == null &&
		JSON.parse(localStorage.getItem("currentParticipante"))
			? JSON.parse(localStorage.getItem("currentParticipante"))
			: dataReport;

 	const report = dataReport2.personal_report

	return (
		<div className="page-container container-fuild"  id="print">
			<div className="TablaPage2-container">
				{Object.keys(report).map((dimension, index) => {
					return <div id={"table_"+(index+1)} key={index} className="report-table">
						<div className="title-table" key={index}>
							{report[dimension].sufix.toUpperCase()} -{" "}
							{report[dimension].name.toUpperCase()}
						</div>
						{
							Object.keys(report[dimension].areas).map((area, ind) => [
								<div
									className="numero-formulario"
									key={ind}
									style={{
										paddingBottom: "30px",
										paddingTop: "20px",
										backgroundColor: "#eff3f8",
									}}
								>
									{report[dimension].areas[area].sufix.toUpperCase()}.
									{report[dimension].areas[area].name.toUpperCase()}
								</div>,
								Object.keys(
									report[dimension].areas[area].criterias
								).map((criteria, i) => (
									<div className="container-fluid" key={i}>
										<div className="row">
											<div className="col-2 back-gray row-title">
												{
													report[dimension].areas[area]
														.criterias[criteria].sufix
												}
											</div>
											<div className="col-8 row-title-title">
												{
													report[dimension].areas[area]
														.criterias[criteria].name
												}
											</div>
											<div className="col-2 porcentaje-tabla">
												{
													report[dimension].areas[area]
														.criterias[criteria].value
												}
												%
											</div>
										</div>
									</div>
								)),
							])
						}
						
						<div className="mb-5"></div>
					</div>
				})}
			</div>
		</div>
	);
};

export default Page2;
