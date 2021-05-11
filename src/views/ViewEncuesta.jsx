import React, { useState } from "react";
import NavBar from "../components/navBar/NavBar";
import { ReactComponent as Volver } from "../assets/dataTable/Volver.svg";
import AllLeft from "../assets/dataTable/AllLeft.png";
import AllRight from "../assets/dataTable/AllRight.png";
import Left from "../assets/dataTable/Left.png";
import Right from "../assets/dataTable/Right.png";
import { ReactComponent as FisicaIcon } from "../assets/encuestas/1.svg";
import { ReactComponent as MentalIcon } from "../assets/encuestas/3.svg";
import { ReactComponent as EspiritualIcon } from "../assets/encuestas/2.svg";
import { ReactComponent as EmocionalIcon } from "../assets/encuestas/4.svg";
import { useHistory } from "react-router-dom";
import Encuestas from "../components/encuestas/"


const ViewEncuesta = (props) => {
	const history = useHistory();

	const encuesta = props.match.params.encuesta;
	const page = parseInt(props.match.params.pagina);
	const [classState, setClassState] = useState("initial");
	const [classStateLast, setClassStateLast] = useState("initial");

	if (page === 1 && classState !== "hidden") setClassState("hidden");
	if (page === 4 && classStateLast !== "hidden")
		setClassStateLast("hidden");

 
	return (
		<div className="desktopContainer">
			<NavBar menu={false} />
			<div className="campaign-results-container section-container">
				
				<div className="header-container">
					
						{
							encuesta === 'fisica' ? (
								<div className="titulo-resultado">
									<FisicaIcon />
									<span>Energía Física</span>
								</div>
							) : null
						}
						{
							encuesta === 'mental' ? (
								<div className="titulo-resultado">
									<MentalIcon />
									<span>Energía Mental</span>
								</div>
							) : null
						}
						{
							encuesta === 'espiritual' ? (
								<div className="titulo-resultado">
									<EspiritualIcon />
									<span>Energía Espiritual</span>
								</div>
							) : null
						}
						{
							encuesta === 'emocional' ? (
								<div className="titulo-resultado">
									<EmocionalIcon />
									<span>Energía Emocional</span>
								</div>
							) : null
						}
					
					<div className="botones-navegacion-header">
						<div
							className="boton-volver"
							onClick={(e) => {
								history.push("/user");
							}}
						>
							<Volver src={Volver} alt="Volver" />
							<span>VOLVER</span>
						</div>
						
					</div>
				</div>
				<Encuestas
					encuesta={encuesta}
					pagina={page}
				/>
			</div>
		</div>
	);
};

export default ViewEncuesta;
