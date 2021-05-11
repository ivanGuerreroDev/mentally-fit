import React from "react";
import NavBar from "../../../components/navBar/NavBar";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import { ReactComponent as Bajar } from "../../../assets/dataTable/Subir.svg";
import { ReactComponent as Imprimir } from "../../../assets/dataTable/Imprimir.svg";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const ParticipanteReporteTotal = (props) => {

	const printPDF = () => {
		const domElement = document.getElementById("print");
		window.scrollTo(0, 0);
		html2canvas(domElement, {
			height: 50000,
			scrollY: -window.scrollY,
			scrollX: -window.scrollX,
			windowHeight: 50000,
		}).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("", "pt", [canvas.width, 50000]);
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
			pdf.save(`ReporteFinal-${props.match.params.nombre}.pdf`);
		});
	};

	function getNamePDF(name){
		var vnewName = name.replace(' ','_').toLowerCase();
		vnewName = `${vnewName}.pdf`;
		return vnewName;
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
            id="print"
		>
			<div
				className="section-container campaign-results-container"
				style={{
					minHeight: "auto",
					height: "250px",
					overflow: "hidden",
					padding: "0 !important",
				}}
			>
				<div className="header-container">
					<div className="titulo-resultado">
						<span>
							Reporte Final
							<p className="nombre-persona-reporte">
								{props.match.params.nombre}
							</p>
						</span>
					</div>
					<div className="botones-navegacion-header">
						<div
							className="boton-extra"
							data-html2canvas-ignore="true"
						>
							{<a
								onClick={(e) => printPDF()}
								style={{
									width: "100%",
									height: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Imprimir alt="Imprimir" />
							</a>}
							{/*<a
								href={getNamePDF(props.match.params.nombre)}
								style={{
									width: "100%",
									height: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Imprimir alt="Imprimir" />
							</a>*/}
						</div>
					</div>
				</div>
			</div>

			<NavBar />
			<Page1 />
			<Page2 />
			<Page3 />
			<Page4 />
			<Page5 />
			<Page6 />
			<Page7 />
			<Page8 />
		</div>
	);
};

export default ParticipanteReporteTotal;
