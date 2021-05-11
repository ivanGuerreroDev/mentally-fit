import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hombre from "../../../assets/resultados/hombre.png";
import mujer from "../../../assets/resultados/mujer.png";
import muchos from "../../../assets/resultados/muchos.png";
import { PieChart } from "react-minimal-pie-chart";
var randomColor = require("randomcolor");

const Page1 = () => {
	
	const dataReport = useSelector(
		(state) => state.AdminReportReducer.currentEmpresas
	);

	const report = dataReport == null && JSON.parse(localStorage.getItem('currentEmpresa'))  ? JSON.parse(localStorage.getItem('currentEmpresa')) : dataReport

	const data = [];

	const colores = ["#47d7ac", "#ff6d00", "#d5fe05", "#d50032"];

	const setChart = () => {
		report.distributions.countrys.map((pais) => {
			return data.push({
				pais: Object.keys(pais)[0],
				value: parseInt(Object.values(pais)[0]),
				color: randomColor(),
			});
		});
	};

	return report != null ? (
		<div className="container-fluid" id="print" style={{ padding: "25px 0 25px 0" }}>
			{setChart()}
			<div className="datos-participantes row justify-content-between">
				<div className="col-12 col-lg-6 col-xl-3 mb-3">
					<div className="dato">
						<div className="text">
							<p>Participantes</p>
							<div className="numero">
								{report.distributions.gender.total}
							</div>
						</div>
						<img
							src={muchos}
							alt="icono-hombre"
							className="icono"
						/>
					</div>
				</div>
				<div className="col-12 col-lg-6 col-xl-3 mb-3">
					<div className="dato">
						<div className="text">
							<p>Mujeres</p>
							<div className="numero">
								{report.distributions.gender.women}
							</div>
						</div>
						<img src={mujer} alt="icono-hombre" className="icono" />
					</div>
				</div>
				<div className="col-12 col-lg-6 col-xl-3 mb-3">
					<div className="dato">
						<div className="text">
							<p>Hombres</p>
							<div className="numero">
								{report.distributions.gender.man}
							</div>
						</div>
						<img
							src={hombre}
							alt="icono-hombre"
							className="icono"
						/>
					</div>
				</div>
				<div className="col-12 col-lg-6 col-xl-3 mb-3">
					<div className="dato">
						<div className="text">
							<p>No definido</p>
							<div className="numero">
								{report.distributions.gender.other}
							</div>
						</div>
						<div className="dos-imagenes">
							<img
								src={mujer}
								alt="icono-hombre"
								className="icono"
							/>
							<img
								src={hombre}
								alt="icono-hombre"
								className="icono"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="datos-departamentos row justify-content-between">
				<div className="col-lg-12 col-xl-6 mb-5">
					<div className="dato">
						<p className="title-dato">Departamentos</p>
						<div className="dimensiones">
							{report.distributions.departments.map((e, i) => {
								return (
									<div className="dimension mb-3" key={i}>
										<div className="texto">
											<p className="name">
												{Object.keys(
													e
												)[0].toUpperCase()}
											</p>
											{/* {dimension.percent ? ( */}
											<p className="percent">
												{Object.values(
													e
												)[0].toUpperCase()}
												/
												{
													report.distributions.gender
														.total
												}
											</p>
										</div>
										{/* ) : null} */}
										<div className="bar-progress">
											<div
												className="progress"
												style={{
													width: `${
														(Object.values(e)[0] /
															report.distributions
																.gender.total) *
														100
													}%`,
													backgroundColor: colores[i],
												}}
											></div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="col-lg-12 col-xl-6 grafico-paises">
					<div
						className="dato"
						style={{
							height: "625px",
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-start",
						}}
					>
						<p className="titulo-grafico-paises">
							Distribución por países
						</p>
						<PieChart
							id="pie-chart-empresa"
							data={data}
							radius={-20}
							lineWidth={-110}
							paddingAngle={1}
							label={({ dataEntry }) =>
								`${(
									(dataEntry.value /
										report.distributions.gender.total) *
									100
								).toFixed(2)}%`
							}
							labelStyle={(index) => ({
								fill: "#44546a",
								fontSize: "2.5px",
								fontFamily: "sans-serif",
							})}
							labelPosition={225}
							viewBoxSize={[100,100]}
							center={[60, 50]}
							// style={{
							// 	height:'50%'
							// }}
						/>
						<div className="label-paises-container d-flex justify-content-center">
							<div className="row" style={{ width: "90%" }}>
								{data.map((pais, index) => {
									return (
										<div className="col-6 " key={index}>
											<div
												className="d-flex align-items-center"
												style={{}}
											>
												<div
													className=""
													style={{
														marginRight: "15px",
														width: "10px",
														height: "10px",
														borderRadius: "50%",
														backgroundColor:
															pais.color,
													}}
												></div>
												<div className="name-pais-grafico">
													{pais.pais}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default Page1;
