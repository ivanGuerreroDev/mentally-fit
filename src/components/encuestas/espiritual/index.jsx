import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
	TOAST_ERROR
} from "../../../redux/constants";
import {
	Multiple,
} from "../preguntas"
import { useHistory } from "react-router-dom";
import {saveEvaluations} from "../../../redux/reducersActions/evaluacion/Actions"
import { useDispatch, useSelector } from "react-redux";

const posiciones = {
	1 : 18,
	2 : 34,
	3 : 54,
	4 : 64
}

const Espiritual = ({pagina, location}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const campaña = useSelector(
		(state) => state.evaluations.campaign
	);

	const respuestas = useSelector(
		(state) => state.evaluations.evaluaciones[3].respuestas
	);
	const loading = useSelector(
		(state) => state.evaluations.loading
	);
	
	const [data, setData] = useState([])
	const [importOpen, setImportOpen] = useState(false)
	const answerChange = (dato, total, posicion, pregunta) => {
		var insert = data
		insert[pregunta - 1] = pregunta+'|'+posicion+'|'+total+'|'+dato;
		setData(insert)
	}

	const saveAnswers = (page) => {
		if(
			data && 
			!data.includes(undefined) &&
			!data.includes(null) &&
			!data.includes("") &&
			data.length >= posiciones[page]
		){
			const respuestas = {
				campaign: campaña,
				respuestas: [{
					id: 4,
					position: data
				}]
			}
			dispatch( saveEvaluations(respuestas, token) )
			document.querySelector(".section-container").scrollTo({top: 0, behavior: 'smooth'});
		}else{
			dispatch({
				type: TOAST_ERROR,
				payload: "Debe responder todas las preguntas."
			})
		}
		
	}

	const checkPosition = () =>{
		if(!respuestas.length){
			history.push({
				pathname: "/user/encuesta/espiritual/1",
				state: { top: true }
			})
		}else if(posiciones[1] >= respuestas.length && posiciones[2] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/espiritual/2",
				state: { top: true }
			})	
		}else if(posiciones[2] >= respuestas.length && posiciones[3] > respuestas.length ){
			history.push({
				pathname: "/user/encuesta/espiritual/3",
				state: { top: true }
			})	
		}else if(posiciones[3] >= respuestas.length && posiciones[4] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/espiritual/4",
				state: { top: true }
			})	
		}else if(posiciones[4] === respuestas.length){
			setImportOpen(true)	
		}
	}

	useEffect(()=>{
		checkPosition()
		if(!data.length){
			setData(respuestas)
		}
	}, [respuestas])



	return (
		<div style={{position:"relative", width:"100%"}} >
			{loading?
				<div className="loadingDrop">
					<div class="sk-chase">
						<div class="sk-chase-dot"></div>
						<div class="sk-chase-dot"></div>
						<div class="sk-chase-dot"></div>
						<div class="sk-chase-dot"></div>
						<div class="sk-chase-dot"></div>
						<div class="sk-chase-dot"></div>
					</div>
				</div>
			:null}
			{
				pagina === 1
					?
					(
						<div className="encuesta-pagina-1">
							<div className="titulo-encuesta">Identidad</div>
							
						<Multiple
							change={answerChange}
							title={"TALENTO"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:1,
									text: "Conozco mis virtudes y limitaciones en el trabajo",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:2,
									text: "Conozco mis talentos naturales y busco perfeccionarlos",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:3,
									text: "Mi trabajo me da la oportunidad de poner en práctica mis talentos naturales.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:4,
									text: "Tengo dificultades para identificar mis fortalezas en el trabajo",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
							
								
							]}
						/>

									
						<Multiple
							change={answerChange}
							title={"VALOR AGREGADO"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:5,
									text: "Siento que mi trabajo aporta valor al equipo",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:6,
									text: "Encuentro valor y sentido en mi trabajo",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:7,
									text: "Siento que mi trabajo tiene influencia positiva en la sociedad.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:8,
									text: "Siento que soy una persona valiosa para la empresa.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
							
								
							]}
						/>

						<Multiple
							change={answerChange}
							title={"VOCACIÓN"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:9,
									text: "Trabajo en un área que me apasiona.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:10,
									text: "Mi trabajo me da la oportunidad de expresarme al máximo como persona.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:11,
									text: "Los valores de mi trabajo están alineados con los míos.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:12,
									text: "Prefiero un trabajo que me guste por un sueldo más bajo a un trabajo que no me guste por un salario más alto",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:13,
									text: "No me imagino trabajando en otra cosa en mi vida",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
							
								
							]}
						/>

						<Multiple
							change={answerChange}
							title={"FELICIDAD"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:14,
									text: "Tengo clara mi definición de felicidad.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:15,
									text: "Cuando la felicidad llega no soy capaz de vivirla a plenitud.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:16,
									text: "Me siento feliz en mi trabajo.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},

							
								
							]}
						/>


						
						<Multiple
							change={answerChange}
							title={"NECESIDADES"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:17,
									text: "Tengo claro lo que necesito para tener un buen rendimiento en mi trabajo.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:18,
									text: "Mi trabajo actual me ayuda a satisfacer mis necesidades personales.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								
							
								
							]}
						/>


							<div style={{display:"flex",justifyContent:"flex-end"}}>
								<button 
									className={"button-primary"+" "+(loading?"button-disabled":"")}
									onClick={()=>{
										
										if(!loading){
											saveAnswers(1)									
										}											
										}
									}
								>
									Continuar
								</button>
							</div>							
						</div>
					)
					: null
			}
			{
				
				pagina === 2
					?
					(
						<div className="encuesta-pagina-1">
							<div className="titulo-encuesta">VALORES</div>

								
						<Multiple
							change={answerChange}
							title={"DISCIPLINA"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:19,
									text: "Me cuesta ser constante con mi trabajo lo que me ha llevado a entregar tarde algunos proyectos.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:20,
									text: "La responsabilidad y la disciplina son algunos de mis valores fundamentales como persona.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:21,
									text: "Logro definir y respetar mi rutina de trabajo.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},							
							
								
							]}
						/>

								
						<Multiple
							change={answerChange}
							title={"RESPETO A LA DIVERSIDAD"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:22,
									text: "A veces me cuesta aceptar las ideas de un colega cuando difieren de las mías.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:23,
									text: "Tengo la capacidad de relacionarme con otros compañeros, independientemente de su género, raza, cultura o nacionalidad.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								
								
							]}
						/>

						<Multiple
							change={answerChange}
							title={"HUMILDAD"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:24,
									text: "Agradezco con humildad los reconocimientos que me hacen mis compañeros y/o supervisores.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:25,
									text: "Cuando a algún compañero de trabajo se le ocurre una buena idea a veces me gusta quedarme con el crédito.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:26,
									text: "Para hacer bien las tareas del trabajo, es mejor hacerlas yo mismo/a",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:27,
									text: "En la empresa analizo mis errores y busco aprender de ellos.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:28,
									text: "Me disgusta que me den feedback sobre los errores que he cometido en un proyecto.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								
								
							]}
						/>

						
						<Multiple
							change={answerChange}
							title={"INTEGRIDAD"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:29,
									text: "Me comporto de acuerdo con los principios en los que creo (por ejemplo: confianza, honestidad, respeto, justicia, etc.) ",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:30,
									text: "Antes de actuar tomo en cuenta las consecuencias éticas de mis decisiones.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:31,
									text: "Haré lo necesario para conseguir mis objetivos sin importar qué o quién se interponga.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								
								
							]}
						/>

							
						<Multiple
							change={answerChange}
							title={"PERSEVERANCIA"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:32,
									text: "Me rindo fácilmente cuando me encuentro con dificultades laborales.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:33,
									text: "No siempre estoy dispuesto/a a hacer sacrificios en mi trabajo para tener éxito.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:34,
									text: "No vale la pena trabajar duro porque quienes tienen éxito laboral lo logran gracias a la suerte",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								
								
							]}
						/>



							<div style={{display:"flex",justifyContent:"flex-end"}}>
								<button 
									className={"button-primary"+" "+(loading?"button-disabled":"")}
									onClick={()=>{
										
										if(!loading){
											saveAnswers(2)									
										}											
										}
									}
								>
									Continuar
								</button>
							</div>
					</div>
					):
					null  
			}  
			{
				pagina === 3
				?
				(
					<div className="encuesta-pagina-1">

						<div className="titulo-encuesta">SATISFACCIÓN EN EL TRABAJO</div>

							<Multiple
								change={answerChange}
								title={"COMPROMISO"}
								subasks={[
									{
										askNumber:35,
										text: "Me siento muy comprometido/a con mis labores en la empresa.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:36,
										text: "Siento responsabilidad por la entrega oportuna de mi trabajo",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									
								]}
								ask={''}
							/>

							<Multiple
								change={answerChange}
								title={"CONTENIDO DEL TRABAJO"}
								subasks={[
									{
										askNumber:37,
										text: "Mi trabajo es monótono y tedioso.",
										options: [
											{
												value: 1,
												text: "Totalmente de acuerdo"
											}, 
											{
												value: 2,
												text: "De Acuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "En desacuerdo"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
									{
										askNumber:38,
										text: "La empresa me da acceso a conocimiento técnico de alta calidad.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:39,
										text: "Lo que hago en el trabajo me inspira.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									
								]}
								ask={''}
							/>

							<Multiple
								change={answerChange}
								title={"DEMANDAS DEL TRABAJO"}
								subasks={[
									{
										askNumber:40,
										text: "Mi trabajo requiere más de mi de lo que yo puedo dar.",
										options: [
											{
												value: 1,
												text: "Totalmente de acuerdo"
											}, 
											{
												value: 2,
												text: "De Acuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "En desacuerdo"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
									{
										askNumber:41,
										text: "Siento que mi empresa está más orientada al resultado del negocio que del impacto sobre mi bienestar.",
										options: [
											{
												value: 1,
												text: "Totalmente de acuerdo"
											}, 
											{
												value: 2,
												text: "De Acuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "En desacuerdo"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
									{
										askNumber:42,
										text: "Me siento cómodo/a con los requerimientos de mi trabajo.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									
								]}
								ask={''}
							/>

							<Multiple
								change={answerChange}
								title={"OPORTUNIDADES DE DESARROLLO"}
								subasks={[
									{
										askNumber:43,
										text: "Tengo oportunidad de crecer y hacer carrera dentro de la empresa.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:44,
										text: "Siento que he llegado a mi techo de crecimiento dentro de mi empresa actual.",
										options: [
											{
												value: 1,
												text: "Totalmente de acuerdo"
											}, 
											{
												value: 2,
												text: "De Acuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "En desacuerdo"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
									{
										askNumber:45,
										text: "La empresa me da la oportunidad de especilizarme en mi trabajo.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:46,
										text: "Siento que no recibo suficientes oportunidades de desarrollo en la empresa.",
										options: [
											{
												value: 1,
												text: "Totalmente de acuerdo"
											}, 
											{
												value: 2,
												text: "De Acuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "En desacuerdo"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
									
								]}
								ask={''}
							/>

							<Multiple
								change={answerChange}
								title={"CONDICIONES DE TRABAJO"}
								subasks={[
									{
										askNumber:47,
										text: "Sea en la casa o en la oficina, la empresa se preocupa porque yo tenga un lugar de trabajo adecuado.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:48,
										text: "La empresa me da todas las herramientas/recursos necesarios para realizar mi trabajo de forma adecuada.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:49,
										text: "Me siento reconocido por el trabajo que realizo en la empresa.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									}
									
								]}
								ask={''}
							/>

							<Multiple
								change={answerChange}
								title={"CULTURA CORPORATIVA"}
								subasks={[
									{
										askNumber:50,
										text: "Para mi la empresa en la que estoy actualmente más que un trabajo es una familia.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:51,
										text: "Me identifico con la visión, misión y valores de la empresa.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:52,
										text: "Trabajo en una empresa que demuestra interés por mi salud y bienestar.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},

									
								]}
								ask={''}
							/>

							<Multiple
								change={answerChange}
								title={"PASIÓN"}
								subasks={[
									{
										askNumber:53,
										text: "Soy un/a profesional altamente motivado/a por mi trabajo.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo"
											}, 
											{
												value: 2,
												text: "En desacuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "De Acuerdo"
											},
											{
												value: 5,
												text: "Totalmente de acuerdo"
											}
										]
									},
									{
										askNumber:54,
										text: "Algunos días me resulta difícil encontrar la pasión y el propósito de mi trabajo.",
										options: [
											{
												value: 1,
												text: "Totalmente de acuerdo"
											}, 
											{
												value: 2,
												text: "De Acuerdo"
											}, 
											{
												value: 3,
												text: "Ni de acuerdo ni en desacuerdo"
											}, 
											{
												value: 4,
												text: "En desacuerdo"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
							
									
								]}
								ask={''}
							/>

						

							<div style={{display:"flex",justifyContent:"flex-end"}}>
								<button 
									className={"button-primary"+" "+(loading?"button-disabled":"")}
									onClick={()=>{
										
											if(!loading){
												
												saveAnswers(3)									
											}										
										}
									}
								>
									Continuar
								</button>
							</div>
					</div>
				): null
			}
			{
				pagina === 4
				?
				(
					<div className="encuesta-pagina-1">

						<div className="titulo-encuesta">BÚSQUEDA</div>
						<Multiple
							change={answerChange}
							title={"AMBICIÓN"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:55,
									text: "Quiero lograr algo memorable en mi empresa que sea reconocido por mis colegas y supervisores.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:56,
									text: "Abordo el trabajo como una oportunidad de poder trascender como persona.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:57,
									text: "Mi trayectoria profesional actual está alineada con mi ambición de carrera.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:58,
									text: "Tengo claras mis metas y el camino que debo recorrer para lograrlas.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								
								
							]}
						/>

						<Multiple
							change={answerChange}
							title={"FUTURO"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:59,
									text: "Estoy trabajando incansablemente para garantizarme tranquilidad en el futuro.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:60,
									text: "Tengo problemas para establercerme metas mediano y largo plazo.",
									options: [
										{
											value: 1,
											text: "Totalmente de acuerdo"
										}, 
										{
											value: 2,
											text: "De Acuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "En desacuerdo"
										},
										{
											value: 5,
											text: "Totalmente en desacuerdo"
										}
									]
								},
								{
									askNumber:61,
									text: "Sé exactamente a dónde quiero estar en 3 años.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								
								
							]}
						/>

							<Multiple
							change={answerChange}
							title={"PROPÓSITO"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:62,
									text: "Tengo claro cuál es mi propósito en la vida.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:63,
									text: "Lo que hago laboralmente contribuye a cumplir mi propósito en mi carrera profesional.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								{
									askNumber:64,
									text: "Me identifico con el propósito de la empresa.",
									options: [
										{
											value: 1,
											text: "Totalmente en desacuerdo"
										}, 
										{
											value: 2,
											text: "En desacuerdo"
										}, 
										{
											value: 3,
											text: "Ni de acuerdo ni en desacuerdo"
										}, 
										{
											value: 4,
											text: "De Acuerdo"
										},
										{
											value: 5,
											text: "Totalmente de acuerdo"
										}
									]
								},
								
								
							]}
						/>


							<div style={{display:"flex",justifyContent:"flex-end"}}>
								<button 
									className={"button-primary"+" "+(loading?"button-disabled":"")}
									onClick={()=>{
										
											if(!loading){
												
												saveAnswers(4)									
											}								
										}
									}
								>
									Finalizar
								</button>
							</div>
					</div>
				):null
			}
			<div className={"modal modal-import" + " " + (importOpen ? "active" : "")} >
				<div className="backdrop"></div>
				<div className="modal-body">
					<h3 className="title">¡Felicidades, ya has completado la evaluación!</h3>
					<p>Estamos analizando los resultados y te enviaremos un correo electrónico cuando tu reporte esté disponible.</p>
					<button className="button-primary" onClick={()=>history.push("/user")}>ACEPTAR</button>
				</div>
			</div>
		</div>

	)
}
export default Espiritual