import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import { ReactComponent as VolverIcon } from "../assets/dataTable/Volver.svg";
import AllLeft from "../assets/dataTable/AllLeft.png";
import AllRight from "../assets/dataTable/AllRight.png";
import Left from "../assets/dataTable/Left.png";
import Right from "../assets/dataTable/Right.png";
import { ReactComponent as Bajar } from "../assets/dataTable/Subir.svg";
import { ReactComponent as Imprimir } from "../assets/dataTable/Imprimir.svg";

import Page1 from "../components/resultadosEncuestas/User/Page1";
import Page2 from "../components/resultadosEncuestas/User/Page2";
import Page3 from "../components/resultadosEncuestas/User/Page3";
import Page4 from "../components/resultadosEncuestas/User/Page4";
import Page5 from "../components/resultadosEncuestas/User/Page5";
import Page6 from "../components/resultadosEncuestas/User/Page6";
import Page7 from "../components/resultadosEncuestas/User/Page7";
import Page8 from "../components/resultadosEncuestas/User/Page8";
import Page9 from "../components/resultadosEncuestas/User/Page9";
import { useSelector } from "react-redux";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CampaignResult = (props) => {
	const history = useHistory();
	const [page, setPage] = useState(1);
	const [printingState, setPrintingState] = useState(false);
	const user = useSelector((state) => state.authenticationReducer.user);

	const nameuserreport = 'personalreport_'+props.location.state.id+'.pdf';

	const [classState, setClassState] = useState("initial");
	const [classStateLast, setClassStateLast] = useState("initial");
	if (page === 1 && classState !== "hidden") setClassState("hidden");
	if (page === 9 && classStateLast !== "hidden") setClassStateLast("hidden");

	const statusSpinner = useSelector((state) => state.evaluations.spinner);
	const [diisplayUserName, setDisplayUserName] = useState("none");

	if (
		(user.user.level === "ADMIN" || user.user.level === "SUPERADMIN") &&
		diisplayUserName === "none"
	) {
		setDisplayUserName("flex");
	}

	const delay = ms => new Promise(res => setTimeout(res, ms));	

	const printPDF = async (e) => {
		let pdf;
		setPrintingState(true);

		for (let i = 1; i < 9; i++) {
			setPage(i)
			await delay(3500);
			
			if(i === 1 || i === 3) {
				await delay(1500);
				const pieChartDom = document.getElementsByTagName('canvas')[0];
				var newCanvas = document.createElement("canvas");
				newCanvas.width = pieChartDom.offsetWidth;
				newCanvas.height = pieChartDom.offsetHeight;
				var newContext = newCanvas.getContext("2d");
				newContext.fillStyle = "#FFFFFF";
				newContext.fillRect(0, 0, pieChartDom.offsetWidth, pieChartDom.offsetHeight);
				newContext.drawImage(pieChartDom, 0, 0, pieChartDom.offsetWidth, pieChartDom.offsetHeight);
				var canvasImg = newCanvas.toDataURL("image/jpeg");
				document.getElementById('pie-chart').innerHTML = `<img src=${canvasImg}>`;
				await delay(1000);
			}

			const domElement = document.getElementById("algo-para-imprimir");
			const domElementSize = document.getElementById("print");
	
			window.scrollTo(0, 0);
	
			let height = domElementSize.offsetHeight < 1997
					? domElementSize.offsetHeight + domElement.offsetHeight
					: domElementSize.offsetHeight * 1.2 + domElement.offsetHeight;
	
			await html2canvas(domElement, {
				height,
				scrollY: -window.scrollY,
				scrollX: -window.scrollX,
				windowHeight:
					domElementSize.offsetHeight + domElement.offsetHeight + 500,
			}).then(async (canvas) => {
				const imgData = canvas.toDataURL("image/png");
				if(i === 1) {
					pdf = new jsPDF("", "pt", [canvas.width, canvas.height]);
					pdf.addImage(
						imgData,
						"png",
						0,
						0,
						canvas.width,
						canvas.height,
						("a" + i),
						"FAST"
					);
				} 
				else if(i === 2) {
					const tablecount = document.getElementsByClassName('report-table').length;
					for(var k = 1; k <= tablecount; k++) {
						setPage(1);
						await delay(1000);
						setPage(2);
						await delay(1000);

						var id = "table_" + k;
						for(var j = 1; j <= tablecount; j++) {
							var removedID = "table_" + j;
							if(id !== removedID) {
								const removedDomElement = document.getElementById(removedID);
								removedDomElement.remove();
							}
						}
						const domElement = document.getElementById('algo-para-imprimir');
						const domElementSize = document.getElementById(id);
						window.scrollTo(0, 0);
				
						let height1 = domElementSize.offsetHeight + domElement.offsetHeight;
				
						await html2canvas(domElement, {
							height: height1,
							scrollY: -window.scrollY,
							scrollX: -window.scrollX,
							windowHeight:
								domElementSize.offsetHeight + domElement.offsetHeight + 500,
						}).then((canvas) => {
							console.log("canvas.width, canvas.height", canvas.width, canvas.height);
							const imgData = canvas.toDataURL("image/png");
	 						pdf.addPage([canvas.width, canvas.height])
							pdf.addImage(
								imgData,
								"png",
								0,
								0,
								canvas.width,
								canvas.height,
								("a" + k + i),
								"FAST"
							);
						});
					}
				} 
				else {
					pdf.addPage([canvas.width, canvas.height])
					pdf.addImage(
						imgData,
						"png",
						0,
						0,
						canvas.width,
						canvas.height,
						("a" + i),
						"FAST"
					);
				}
			});
		}
		pdf.save("MyReport.pdf");
		
		setPrintingState(false);
	};
	
	let disponible = false;
	const listaDisponibles = [];
	listaDisponibles[0] =171;
	listaDisponibles[1] =174;
	listaDisponibles[2] =175;
	listaDisponibles[3] =178;

	listaDisponibles[4] =183;
	listaDisponibles[5] =185;
	listaDisponibles[6] =193;
	listaDisponibles[7] =206;

	listaDisponibles[8] =211;
	listaDisponibles[9] =217;
	listaDisponibles[10] =218;
	listaDisponibles[11] =219;


	listaDisponibles[12] =221;
	listaDisponibles[13] =222;
	listaDisponibles[14] =227;
	listaDisponibles[15] =230;

	listaDisponibles[16] =234;
	listaDisponibles[17] =235;
	listaDisponibles[18] =237;
	listaDisponibles[19] =243;
	listaDisponibles[20] =244;
	listaDisponibles[21] =249;
	listaDisponibles[22] =294;

	listaDisponibles[23] =245;
	listaDisponibles[24] =233;
	listaDisponibles[25] =248;
	listaDisponibles[26] =254;
	listaDisponibles[27] =251;

	listaDisponibles[28] =236;
	listaDisponibles[29] =241;
	listaDisponibles[30] =292;
	listaDisponibles[31] =267;
	listaDisponibles[32] =229;


	
	listaDisponibles[33] =232;
	listaDisponibles[34] =269;
	listaDisponibles[35] =285;
	listaDisponibles[36] =266;
	listaDisponibles[37] =284;	
	listaDisponibles[38] =281;
	listaDisponibles[39] =293;
	listaDisponibles[40] =253;


	listaDisponibles[41] =260;
	listaDisponibles[42] =238;
	listaDisponibles[43] =268;
	listaDisponibles[44] =272;
	listaDisponibles[45] =271;	
	listaDisponibles[46] =259;
	listaDisponibles[47] =282;
	listaDisponibles[48] =283;

	listaDisponibles[49] =189;
	listaDisponibles[50] =209;

	listaDisponibles[51] =172;
	listaDisponibles[52] =187;
	listaDisponibles[53] =225;
	listaDisponibles[54] =179;
	listaDisponibles[55] =188;
	listaDisponibles[56] =226;
	listaDisponibles[57] =258;
	listaDisponibles[58] =204;
	listaDisponibles[59] =297;
	listaDisponibles[60] =224;
	listaDisponibles[61] =214;
	listaDisponibles[62] =210;
	listaDisponibles[63] =215;

	listaDisponibles[64] =182;
	listaDisponibles[65] =265;
	listaDisponibles[66] =213;
	listaDisponibles[67] =175;


	function check(id){
		var existe = false;

		for (let index = 0; index < listaDisponibles.length; index++) {
			const element = listaDisponibles[index];
			if(id === element){
				existe = true;
				break;
			}
		}


		return existe
	}
	

	return (
		<div>
			<div className={'justify-content-center ' + 'mt-5 ' + (printingState ? 'display-spineer' : 'd-none')} data-html2canvas-ignore="true">
				<div
					class="spinner-border"
					style={{
						width: "150px",
						height: "150px",
					}}
					role="status"
					data-html2canvas-ignore="true"
				>
					<span class="sr-only"></span>
				</div>
			</div>
			<div id="algo-para-imprimir">
				<NavBar menu={false} />
				<div id="campaign-results" className="section-container campaign-results-container">

					<div className="header-container">
						<div className="titulo-resultado">
							{page === 1 ? (
								<span>
									Mi Índice de Energía Personal
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 2 ? (
								<span>
									Mi Índice de Energía Personal
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 3 ? (
								<span>
									Índice de Energía Personal - Comparación Yo vs
									Mi Empresa
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 4 ? (
								<span>
									Reporte Personal Mental
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 5 ? (
								<span>
									Reporte Personal Mental
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 6 ? (
								<span>
									Reporte Personal Mental
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 7 ? (
								<span>
									Reporte Personal Mental
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 8 ? (
								<span>
									Reporte Personal
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
										{props.location.state.name}
									</p>
								</span>
							) : page === 9 ? (
								<span>
									Plan Personal de energía
									<p
										className="nombre-persona-reporte"
										style={{
											display: `${diisplayUserName}`,
										}}
									>
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
									history.push("/reportes/participantes");
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
								{page === 9 ? (
									<span>{page} - de 9</span>
								) : (
									<span>
										{page} - {page + 1} de 9
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
										setPage(9);
										setClassState("initial");
									}}
								/>
							</div>
							<div
								className="boton-extra"
								data-html2canvas-ignore="true"
							>
								<a
															id="download-pdf"
															onClick={(e) => printPDF()}
															style={{
																display: `${page === 9 ? "none" : "flex"}`,
															}}
														>
															<Bajar />
														</a>
								{/*{check(props.location.state.id) === false ? 
															<a
															id="download-pdf"
															onClick={(e) => printPDF()}
															style={{
																display: `${page === 9 ? "none" : "flex"}`,
															}}
														>
															<Bajar />
														</a>
								: 	
									<a 
										id="download-pdf"
										href={`https://energyscan.mflatam.com/static/pdf/personalreport_${props.location.state.id}.pdf`} target={"_blank"}
										style={{
											display: `${page === 9 ? "none" : "flex"}`,
										}}
									>
										<Bajar />
									</a>
								}*/}

								
								{/* <Link
									to={{
										pathname: `/reportes/participantes/reporte-completo/${props.location.state.name}`
									}}
									target='_blank'
								>
									<Imprimir alt="Imprimir" />
								</Link> */}
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
						<Page1 setPage={setPage} id="to-print" />
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
					) : page === 7 ? (
						<Page7 setPage={setPage} />
					) : page === 8 ? (
						<Page8 setPage={setPage} />
					) : page === 9 ? (
						<Page9 setPage={setPage} />
					) : null}
				</div>
			</div>
		</div>
	);
};

export default CampaignResult;
