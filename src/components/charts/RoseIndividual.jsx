import React, {useEffect, useState} from "react";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import bgRoseChart from "../../assets/rose-chart-bg.png";


const labelsData = [
	"Salud fisíca",
	"Sueño",
	"Cuerpo en movimiento",
	"Nutrición e hidratación",
	"Mentalidad Innovadora",
	"Mentalidad ganadora",
	"Resiliencia mental",
	"Mentalidad de crecimiento",
	"Conectando con mis emociones",
	"Trabajo en equipo",
	"Relación con colegas",
	"Manejando la presión",
	"Identidad",
	"Valores",
	"Satisfacción en el trabajo",
	"Búsqueda",
];
const RoseIndividual = ({ data, dimensiones }) => {
	const chartValuesRender = (data) => {
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
				datasets: [chartValuesRender(data)],
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
	const _renderChartCategorias = () => {
		var ctx = document.getElementById("categorias"),
			width = ctx.offsetWidth,
			height = ctx.offsetHeight,
			lienzo = ctx.getContext("2d");
		ctx.width = width;
		ctx.height = height;
		lienzo.beginPath();
		lienzo.strokeStyle = "#cbcbcb";
		lienzo.lineWidth = 1;
		lienzo.arc(width / 2, height / 2, height / 2, 0, 2 * Math.PI);
		lienzo.stroke();

		for (var i = 1; i <= 16; i++) {
			drawAngledLine(
				lienzo,
				width / 2,
				height / 2,
				height / 2,
				i * (360 / 16)
			);
		}
	};

	const drawAngledLine = (ctx, x, y, length, angle) => {
		var radians = (angle / 180) * Math.PI;
		var endX = x + length * Math.cos(radians);
		var endY = y - length * Math.sin(radians);
		ctx.beginPath();
		ctx.strokeStyle = "#cbcbcb";
		ctx.lineWidth = 1;
		ctx.moveTo(x, y);
		ctx.lineTo(endX, endY);
		ctx.closePath();
		ctx.stroke();
	};

	useEffect(() => {
		_renderChart();
	}, []);

	return (
		<div className="chartRose">
			<div className="background">
				<img src={bgRoseChart} />
			</div>
			<div className="dimensiones">
				{dimensiones && Array.isArray(dimensiones)
					? dimensiones.map((dimension, index) => (
							<div className="dimension" key={index}>
								<p className="name">{dimension.name}</p>
								{dimension.percent ? (
									<p className="percent">
										{dimension.percent}
									</p>
								) : null}
								<div className="bar-progress">
									<div
										className="progress"
										style={{
											width: dimension.points,
											backgroundColor: dimension.color,
										}}
									></div>
								</div>
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

export default RoseIndividual;
