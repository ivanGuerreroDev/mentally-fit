import React, { useEffect } from "react";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import bgRoseChart from "../../assets/rose-chart-bg.png";

const RoseComparacion = ({ data, dimensiones, dataUser, dimensionesUser }) => {
	const chartValuesRender = (data) => {
		var backgroundColor;
		if (data && Array.isArray(data)) {
			backgroundColor = data.map(() => {
				return "rgb(170, 255, 128,.3)";
			});
		}
		return {
			data,
			backgroundColor,
		};
	};
	const chartValuesRenderTest = (data) => {
		var backgroundColor;
		if (data && Array.isArray(data)) {
			backgroundColor = data.map((value) => {
				if (value >= 0 && value <= 20) {
					return "rgba(255,0,0,.8)";
				}
				if (value >= 21 && value <= 40) {
					return "rgba(30,145,56,.8)";
				}
				if (value >= 41 && value <= 60) {
					return "rgba(249,203,156,.8)";
				}
				if (value >= 61 && value <= 80) {
					return "rgba(217,234,211,.8)";
				}
				if (value >= 81 && value <= 100) {
					return "rgba(147,196,125,.8)";
				}
			});
		}
		return {
			data,
			backgroundColor,
		};
	};
	const _renderChart = () => {
		var ctx = document.getElementById("roseChart");
		new Chart(ctx, {
			data: {
				datasets: [
					chartValuesRender(data),
					chartValuesRenderTest(dataUser),
				],
			},
			type: "polarArea",
			options: {
				layout: {
					padding: {
						left: 10,
						right: 10,
						top: 10,
						bottom: 10,
					},
				},
				tooltips: {
					enabled: false,
				},
				legend: {
					display: false,
				},
				plugins: {
					// Change options for ALL labels of THIS CHART
					datalabels: {
						color: "#44546A",
						align: "start",
						anchor: "end",
						clamp: true,
						offset: 1,
						font: {
							size: 20,
							weight: "bold",
						},
					},
				},
				scale: {
					ticks: {
						stepSize: 20,
					},
				},
				elements: {
					arc: {
						borderWidth: 0,
					},
				},
			},
			plugins: [ChartDataLabels],
		});
	};

	useEffect(() => {
		_renderChart();
	}, []);

	return (
		<div className="chartRose">
			<div className="background">
				<img src={bgRoseChart} alt='background-chart'/>
			</div>
			<div className="dimensiones">
				{dimensiones && Array.isArray(dimensiones)
					? dimensiones.map((dimension, index) => (
							<div className="dimension rose-comparacion" key={index}>
								{/* {dimension.percent ? (
									<p className="percent">
										{dimension.percent}
									</p>
								) : null} */}
								<div className="procentaje-container">
									<p className="porcentaje">{dimension.points}%</p>
									<span className="texto">Empresa</span>
								</div>
								<div
									className="bar-progress-company"
									style={{ backgroundColor: dimension.color }}
								>
									<div
										className="progress"
										style={{
											height: 100 % -dimension.points,
											// backgroundColor: dimension.color,
										}}
									></div>
								</div>
								<div
									className="bar-progress-company"
									style={{ backgroundColor: dimensionesUser[index].color }}
								>
									<div
										className="progress"
										style={{
											height: 100 % -dimensionesUser[index].points,
											// backgroundColor: dimension.color,
										}}
									></div>
								</div>
								<div className="procentaje-container">
									<p className="porcentaje">{dimensionesUser[index].points}%</p>
									<span className="texto">Yo</span>
								</div>
								<p className="name">{dimension.name}</p>
							</div>
					  ))
					: null}
			</div>
			<div id="canvasContainer" style={{ position: "relative" }}>
				<canvas
					id="roseChart"
					style={{ position: "relative" }}
				></canvas>
			</div>
		</div>
	);
};

export default RoseComparacion;
