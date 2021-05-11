import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../components/navBar/NavBar";
import { ReactComponent as VolverIcon } from "../assets/dataTable/Volver.svg";
import AllLeft from "../assets/dataTable/AllLeft.png";
import AllRight from "../assets/dataTable/AllRight.png";
import Left from "../assets/dataTable/Left.png";
import Right from "../assets/dataTable/Right.png";
import { ReactComponent as Imprimir } from "../assets/dataTable/Imprimir.svg";
import { ReactComponent as Bajar } from "../assets/dataTable/Subir.svg";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Page1 from "../components/resultadosEncuestas/Empresas/Page1";
import Page2 from "../components/resultadosEncuestas/Empresas/Page2";
import Page3 from "../components/resultadosEncuestas/Empresas/Page3";
import Page4 from "../components/resultadosEncuestas/Empresas/Page4";
import Page5 from "../components/resultadosEncuestas/Empresas/Page5";
import Page6 from "../components/resultadosEncuestas/Empresas/Page6";

const CampaignEmpresasResult = (props) => {
	const history = useHistory();
	const [page, setPage] = useState(1);

	const statusSpinner = useSelector((state) => state.evaluations.spinner);

	const [classState, setClassState] = useState("initial");
	const [classStateLast, setClassStateLast] = useState("initial");
	if (page === 1 && classState !== "hidden") setClassState("hidden");
	if (page === 6 && classStateLast !== "hidden") setClassStateLast("hidden");

	const printPDF = () => {
		const domElement = document.getElementById("algo-para-imprimir");
		const domElementSize = document.getElementById("print");
		const graficoSvg = document.getElementsByTagName("svg")[2];

		if (graficoSvg) {
			graficoSvg.setAttribute("viewBox", "0 0 400 400");
		}

		window.scrollTo(0, 0);
		html2canvas(domElement, {
			height:
				page === 2
					? domElementSize.offsetHeight +
					  domElement.offsetHeight +
					  500
					: domElementSize.offsetHeight + domElement.offsetHeight,
			scrollY: -window.scrollY,
			scrollX: -window.scrollX,
			windowHeight:
				page === 2
					? domElementSize.offsetHeight +
					  domElement.offsetHeight +
					  500
					: domElementSize.offsetHeight + domElement.offsetHeight,
		}).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("", "pt", [canvas.width, canvas.height]);
			pdf.addImage(
				imgData,
				"png",
				0,
				0,
				canvas.width,
				canvas.height,
				"a",
				"FAST"
			);
			pdf.addImage(
				imgData,
				"png",
				0,
				0,
				canvas.width,
				canvas.height,
				"a",
				"FAST"
			);
			pdf.save(`CompanyCampaign_65.pdf`);
		});
		if (graficoSvg) {
			graficoSvg.setAttribute("viewBox", "0 0 100 100");
		}
	};

	return (
		<div id="algo-para-imprimir">
			<NavBar menu={false} />
			<div className="section-container campaign-results-container">
				<div className="header-container">
					<div className="titulo-resultado">
						{page === 1 ? (
							<span>
								Distribución de Participantes
								<p className="nombre-persona-reporte">
									{props.location.state.name}
								</p>
							</span>
						) : page === 2 ? (
							<span>
								Mi Índice de Energía Personal - Toda la empresa
								<p className="nombre-persona-reporte">
									{props.location.state.name}
								</p>
							</span>
						) : page === 3 ? (
							<span>
								Energía Fisica
								<p className="nombre-persona-reporte">
									{props.location.state.name}
								</p>
							</span>
						) : page === 4 ? (
							<span>
								Energía Mental
								<p className="nombre-persona-reporte">
									{props.location.state.name}
								</p>
							</span>
						) : page === 5 ? (
							<span>
								Energía Emocional
								<p className="nombre-persona-reporte">
									{props.location.state.name}
								</p>
							</span>
						) : page === 6 ? (
							<span>
								Energía Espiritual
								<p className="nombre-persona-reporte">
									{props.location.state.name}
								</p>
							</span>
						) : (
							<div></div>
						)}
					</div>
					<div className="botones-navegacion-header">
						<div
							className="boton-volver"
							onClick={(e) => {
								history.push("/reportes/empresas");
							}}
							data-html2canvas-ignore="true"
						>
							<VolverIcon alt="Volver" />
							<span>VOLVER</span>
						</div>
						<div
							className="boton-paginas"
							data-html2canvas-ignore="true"
						>
							<img
								src={AllLeft}
								alt="Primer"
								style={{
									visibility: `${classState}`,
								}}
								onClick={(e) => {
									setPage(1);
									setClassStateLast("initial");
								}}
							/>
							<img
								src={Left}
								alt="Atras"
								style={{
									visibility: `${classState}`,
								}}
								onClick={(e) => {
									setPage(page - 1);
									setClassStateLast("initial");
								}}
							/>
							{page === 6 ? (
								<span>{page} - de 6</span>
							) : (
								<span>
									{page} - {page + 1} de 6
								</span>
							)}
							<img
								src={Right}
								alt="Adelante"
								style={{
									visibility: `${classStateLast}`,
								}}
								onClick={(e) => {
									setPage(page + 1);
									setClassState("initial");
								}}
							/>
							<img
								src={AllRight}
								alt="Ultimo"
								style={{
									visibility: `${classStateLast}`,
								}}
								onClick={(e) => {
									setPage(6);
									setClassState("initial");
								}}
							/>
						</div>
						<div
							className="boton-extra"
							data-html2canvas-ignore="true"
						>
							{/*<a onClick={(e) => printPDF()}>
								<Bajar />
							</a>*/}
							<a href={'https://energyscan.mflatam.com/static/pdf/CompanyCampaign_65.pdf'} target={"_blank"}>
								<Bajar />
							</a>
							{/* <Imprimir alt="Imprimir" /> */}
						</div>
					</div>
				</div>
				<div
					className="justify-content-center mt-5"
					style={{
						display: `${statusSpinner ? "flex" : "none"}`,
						color: "orange",
					}}
				>
					<div
						class="spinner-border"
						style={{
							width: "150px",
							height: "150px",
						}}
						role="status"
					>
						<span class="sr-only"></span>
					</div>
				</div>
				{page === 1 ? (
					<Page1 setPage={setPage} />
				) : page === 2 ? (
					<Page2 setPage={setPage} />
				) : page === 3 ? (
					<Page3 setPage={setPage} />
				) : page === 4 ? (
					<Page4 setPage={setPage} />
				) : page === 5 ? (
					<Page5 setPage={setPage} />
				) : page === 6 ? (
					<Page6 setPage={setPage} />
				) : null}
			</div>
		</div>
	);
};

export default CampaignEmpresasResult;
