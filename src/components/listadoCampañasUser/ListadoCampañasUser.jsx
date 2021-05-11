import React, { useState, useEffect } from "react";
import { ReactComponent as Imagen1 } from "../../assets/encuestas/1.svg";
import { ReactComponent as Imagen2 } from "../../assets/encuestas/2.svg";
import { ReactComponent as Imagen3 } from "../../assets/encuestas/3.svg";
import { ReactComponent as Imagen4 } from "../../assets/encuestas/4.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../redux/constants";
import { getEvaluations } from "../../redux/reducersActions/evaluacion/Actions";
import config from "../../config.js";
import completadoIcon from "../../assets/desktop/completado.png";
const URL = config[config.enviroment].host;
const DataExample = [
	{
		image: <Imagen1 />,
		nombre: "Energía Física",
		descripcion:
			"Estas preguntas se refieren a tu energía física. La energía física es esencial para el rendimiento diario, tener poca tiene un impacto negativo en tu vitalidad lo que conlleva al aumento de la presión arterial, irritabilidad y disminuye la resistencia, volviéndonos más vulnerables a enfermedades y lesiones. Por el contrario, disponer de suficiente energía física tiene un impacto positivo sobre la salud y las capacidades para lidiar con las actividades diarias permitiendo ser más productivo(a) de forma más sostenible.",
		progress: "PENDIENTE",
		path: "fisica",
		tiempo: 15,
	},
	{
		image: <Imagen3 />,
		nombre: "Energía Mental",
		descripcion:
			"Estas preguntas se refieren a tus niveles de energía mental. La mente es uno de los mayores contribuyentes a los niveles de energía. Los beneficios de tener altos niveles de energía mental incluyen actitud ganadora, confianza, concentración y mayor fuerza de voluntad, motivación y productividad. La forma en que pensamos tiene un efecto asombroso en la forma en que los demás nos perciben y en cómo actuamos. Cuando te sientes confiado, se ve confiado y también se desempeñará de manera más efectiva, aumentando la probabilidad de éxito en cualquier cosa que esté haciendo.",
		progress: "PROGRESO",
		path: "mental",
		tiempo: 10,
	},
	{
		image: <Imagen4 />,
		nombre: "Energía Emocional",
		descripcion:
			"La emocionalidad a menudo es vista como un signo de debilidad en el lugar de trabajo y no como un elemento importante del rendimiento en campo profesional. Sin embargo, es muy importante prestar atención al manejo de tus emociones. Consciente e inconscientemente las utilizas con el fin de actuar y de tomar decisiones. Por esto, las emociones forman la base de la motivación y el comportamiento social. Si experimentas poca energía emocional, te resultará más difícil ser productivo, disfrutar del trabajo y de tu vida privada debido a dificultades para manejar el estrés, socializar, tomar buenas decisiones y actuar.",
		progress: "COMPLETADO",
		path: "emocional",
		tiempo: 15,
	},

	{
		image: <Imagen2 />,
		nombre: "Energía Espiritual",
		descripcion:
			"La espiritualidad en el lugar de trabajo tiene una relevancia con la prosperidad de los empleados, las organizaciones y las sociedades. Conectando la esencia de los trabajadores con sus actividades y tareas, lo que resulta en un mayor compromiso con la organización y satisfacción laboral que proporciona firmeza a la organización y aumenta el desempeño.",
		progress: "PENDIENTE",
		path: "espiritual",
		tiempo: 5,
	},
];

const ListadoCampañasUser = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const evaluaciones = useSelector((state) => state.evaluations.evaluaciones);

	useEffect(() => {
		dispatch(getEvaluations(token));
	}, []);

	const checkStatus = (progress) => {
		const progressArr = progress.split("/");
		const current = parseInt(progressArr[0]),
			total = parseInt(progressArr[1]);
		if (current === 0) return "EMPEZAR";
		if (current > 0 && current < total) return "PENDIENTE";
		if (current === total) return "COMPLETADO";
		return "EMPEZAR";
	};

	const statusSpinner = useSelector((state) => state.evaluations.spinner);


	return (
		<div className="section-container ListadoCampañasContainer container-fluid">
			<h2 className="title">Listado de Encuestas</h2>
			{DataExample.filter(
				(data, index) =>
					evaluaciones &&
					evaluaciones[index] &&
					checkStatus(evaluaciones[index].progreso) === "COMPLETADO"
			).length === DataExample.length ? (
				<div
					className="evaluacion-completa-message"
					style={{ display: `${statusSpinner ? "none" : "block"}` }}
				>
					<h4>¡Felicidades, ya has completado la evaluación!</h4>
					<p>
						Estamos analizando los resultados y te enviaremos un
						correo electrónico cuando tu reporte esté disponible.
					</p>
				</div>
			) : (
				<div>
					{/* <div
						className="evaluacion-completa-message sin-evaluaciones"
						style={{
							display: `${statusSpinner ? "none" : "block"}`,
						}}
					>
						<h4>¡No posees evaluaciones pendientes!</h4>
						<p>
							Puedes ver los resultados de tus evaluaciones en la
							sección de resultados
						</p>
					</div> */}
				</div>
			)}
			<div className="justify-content-center mt-5"
				style={{
					display: `${statusSpinner ? "flex" : "none"}`,
					color: 'orange'
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
			{evaluaciones && DataExample && Array.isArray(DataExample)
				? DataExample.map((elem, index) => {
						return (
							<div className="campaña-user-container">
								<div className="imagen-container col-md-12">
									{elem.image}
								</div>
								<div className="titulo-texto-container col-12 col-lg-7">
									<p className="titulo">{elem.nombre}</p>
									<div className="row">
										<p className="duracion">
											Tiempo estimado para completar{" "}
											<span>{elem.tiempo} minutos</span>
										</p>
									</div>
									<p className="descripcion">
										{elem.descripcion}
									</p>
								</div>
								<div className="progreso-boton-container col-12 col-lg-3">
									{checkStatus(
										evaluaciones[index].progreso
									) === "COMPLETADO" ? (
										<img
											src={completadoIcon}
											style={{ width: 40 }}
										/>
									) : null}
									{checkStatus(
										evaluaciones[index].progreso
									) === "PENDIENTE"
										? evaluaciones[index].progreso
										: null}
									{index === 0 ? (
										checkStatus(
											evaluaciones[index].progreso
										) !== "COMPLETADO" ? (
											<button
												className="button-primary"
												onClick={(e) =>
													history.push(
														"/user/encuesta/" +
															elem.path +
															"/1"
													)
												}
											>
												{checkStatus(
													evaluaciones[index].progreso
												) === "PENDIENTE"
													? "CONTINUAR"
													: checkStatus(
															evaluaciones[index]
																.progreso
													  )}
											</button>
										) : null
									) : checkStatus(
											evaluaciones[index].progreso
									  ) !== "COMPLETADO" &&
									  checkStatus(
											evaluaciones[index - 1].progreso
									  ) === "COMPLETADO" ? (
										<button
											className="button-primary"
											onClick={(e) =>
												history.push(
													"/user/encuesta/" +
														elem.path +
														"/1"
												)
											}
										>
											{checkStatus(
												evaluaciones[index].progreso
											) === "PENDIENTE"
												? "CONTINUAR"
												: checkStatus(
														evaluaciones[index]
															.progreso
												  )}
										</button>
									) : null}
								</div>
							</div>
						);
				  })
				: null}
		</div>
	);
};

export default ListadoCampañasUser;
