import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
	TOAST_ERROR
} from "../../../redux/constants";
import {
	Multiple
} from "../preguntas"
import { useHistory } from "react-router-dom";
import {saveEvaluations} from "../../../redux/reducersActions/evaluacion/Actions"
import { useDispatch, useSelector } from "react-redux";

const posiciones = {
	1 : 39,
	2 : 83,
	3 : 126,
	4 : 151
}

const Mental = ({pagina, location}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const campaña = useSelector(
		(state) => state.evaluations.campaign
	);

	const respuestas = useSelector(
		(state) => {
			return state.evaluations.evaluaciones[1].respuestas
		}
	);
	const loading = useSelector(
		(state) => state.evaluations.loading
	);
	
	const [data, setData] = useState([])
	
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
					id: 2,
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
				pathname: "/user/encuesta/mental/1",
				state: { top: true }
			})
		}else if(posiciones[1] >= respuestas.length && posiciones[2] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/mental/2",
				state: { top: true }
			})	
		}else if(posiciones[2] >= respuestas.length && posiciones[3] > respuestas.length ){
			history.push({
				pathname: "/user/encuesta/mental/3",
				state: { top: true }
			})	
		}else if(posiciones[3] >= respuestas.length && posiciones[4] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/mental/4",
				state: { top: true }
			})	
		}else if(posiciones[4] === respuestas.length){
			history.push("/user")	
		}
	}

	useEffect(()=>{
		checkPosition()
		if(!data.length){
			setData(respuestas)
		}
	}, [respuestas])
	return (
		<div style={{position:"relative", width:"100%"}}>
			{loading?
				<div className="loadingDrop">
					<div className="sk-chase">
						<div className="sk-chase-dot"></div>
						<div className="sk-chase-dot"></div>
						<div className="sk-chase-dot"></div>
						<div className="sk-chase-dot"></div>
						<div className="sk-chase-dot"></div>
						<div className="sk-chase-dot"></div>
					</div>
				</div>
			:null}
			{
				pagina === 1
					?
					(
						<div className="encuesta-pagina-1">
							
							<div className="titulo-encuesta">MENTALIDAD INNOVADORA</div>

							<Multiple
								change={answerChange}
								title={"Creatividad"}
								subasks={[
									{
										askNumber:1,
										text: "Me propongo objetivos específicos para innovar en la empresa",
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
										text: "Una vez que tengo una idea, soy particularmente bueno/a para realizarla",
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
										text: "Tengo una imaginación bastante buena que me permite ver posibilidades, oportunidades y tendencias antes que mis colegas y/o compañeros.",
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
										text: "En mi trabajo siempre estoy en búsqueda de avances/actualizaciones en productos, procesos, servicios, tecnologías o ideas.",
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
								ask={"¿En qué medida te identificas con las siguientes afirmaciones?"}
							/>
							<Multiple
								change={answerChange}
								title={"Curiosidad"}
								subasks={[
									{
										askNumber:5,
										text: "Busco información (investigaciones, consejos de expertos, etc.) para llenar los vacíos de conocimiento y dar la bienvenida a nuevas experiencias.",
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
										text: "Me gusta entender cómo funcionan las cosas en la empresa.",
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
								ask={""}
							/>
							<Multiple
								change={answerChange}
								title={"Apertura al cambio"}
								subasks={[
									{
										askNumber:7,
										text: "Cuando se producen cambios en la empresa, reacciono tratando de gestionar este cambio en lugar de quejarme.",
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
										text: "En mi trabajo soy una persona más convencional que experimental.",
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
										askNumber:9,
										text: "Creo que me enfrento mejor a los cambios que la mayoría de mis colegas/compañeros.",
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
										text: "Con frecuencia me aburro de hacer las cosas de la misma manera en mi trabajo.",
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
										text: "Los cambios que se han estado produciendo en la empresa a veces están más allá de mis capacidades.",
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
										askNumber:12,
										text: "Veo que los cambios que se producen en la empresa me abren nuevas oportunidades profesionales.",
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
										text: "Tiendo a confiar en mis experiencias y suposiciones pasadas en lugar de probar nuevos enfoques.",
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
										askNumber:14,
										text: "He sido un gran partidario de los esfuerzos de transformación y cambio dentro de la empresa.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Adaptabilidad"}
								subasks={[
									{
										askNumber:15,
										text: "Cambio mis pensamientos o comportamientos para responder a nueva información o circunstancias cambiantes en mi entorno laboral.",
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
										askNumber:16,
										text: "Manejo los cambios que me suceden con facilidad y, a menudo, hago mejoras para facilitar la transición.",
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
										askNumber:17,
										text: "Tomo decisiones para ayudarme a tener éxito, incluso cuando no son las más divertidas en este momento.",
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
										text: "Sigo probando tantas posibilidades diferentes como sea necesario para tener éxito en mi vida profesional.",
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
										askNumber:19,
										text: "Modifico mi forma preferida de hacer las cosas cuando beneficia a todos, centrándome en la visión a largo plazo en lugar de en las ganancias a corto plazo.",
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
										askNumber:20,
										text: "Me desanimo de actuar o realizar una acción cuando no tengo recursos para llevar a cabo la tarea.",
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
								ask={""}
							/>


							<Multiple
								change={answerChange}
								title={"Adopción Digital"}
								subasks={[
									{
										askNumber:21,
										text: "Aunque pueda mejorar mi productividad, me cuesta empezar a utilizar un nuevo software o tecnología.",
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
										askNumber:22,
										text: "Demuestro muy buenas habilidades de aprendizaje al dominar las nuevas tecnologías que se introducen en el trabajo.",
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
										askNumber:23,
										text: "Me defino como una persona apasionada por las nuevas tecnologías y me gusta mantenerme al día con las nuevas tendencias.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Desafiando el status quo"}
								subasks={[
									{
										askNumber:24,
										text: "Me considero una persona que suele seguir las normativas y regulaciones de la empresa sin cuestionarlas.",
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
										askNumber:25,
										text: "Prefiero trabajar como de costumbre en lugar de aceptar un desafío",
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
										text: "En mi trabajo intento abordar los problemas desde ángulos lo más alejados posible de las formas en que los he abordado en el pasado.",
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
										askNumber:27,
										text: "Estoy libre de prejuicios y creencias limitantes al abordar una nueva situación en el trabajo.",
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
								ask={""}
							/>


							<Multiple
								change={answerChange}
								title={"Lidiando con la incertidumbre"}
								subasks={[
									{
										askNumber:28,
										text: "En mi trabajo me cuesta adaptarme a situaciones inciertas o ambiguas.",
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
										askNumber:29,
										text: "Por lo general, puedo reaccionar rápidamente cuando sucede algo inesperado en la empresa.",
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
										text: "En mi vida laborar me entusiasma lo desconocido.",
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
										text: "Le temo a las nuevas situaciones en la empresa ya que tienen consecuencias impredecibles.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Resolución de problemas"}
								subasks={[
									{
										askNumber:32,
										text: "Siempre que algo sale mal en mis labores, busco activamente una solución.",
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
										askNumber:33,
										text: "En la empresa me gusta resolver problemas de forma creativa.",
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
										askNumber:34,
										text: "Cuando me enfrento a un problema laboral, tengo complicaciones para entenderlo y evaluarlo.",
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
										askNumber:35,
										text: "Cuando analizo un problema en el trabajo, lo investigo y pido evidencia a quienes están más familiarizados con el tema.",
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
										text: "Ante un problema en la empresa, en lugar de reaccionar de forma exagerada, me concentro en encontrar la mejor solución.",
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
										askNumber:37,
										text: "La habilidad de resolver problemas es una de mis características más fuertes.",
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
										askNumber:38,
										text: "Para resolver problemas complejos en mi vida laboral los divido en partes más pequeñas y manejables.",
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
										text: "En la empresa tiendo a sobreanalizar situaciones, encontrando problemas que realmente no existen.",
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
								ask={""}
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
							<div className="titulo-encuesta">MENTALIDAD GANADORA</div>

							<Multiple
								change={answerChange}
								title={"Fijación de metas"}
								subasks={[
									{
										askNumber:40,
										text: "En mi vida profesional me establezco metas que son desafiantes pero alcanzables.",
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
										askNumber:41,
										text: "No hago planes para el futuro en mi vida laboral; Prefiero ir con la corriente",
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
										text: "Antes de establecer una meta, pienso en lo que podría interponerse en mi camino y en cómo puedo superar estos obstáculos.",
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
										askNumber:43,
										text: "Hago una lista detallada de todos los objetivos que quiero alcanzar en mi trabajo y para cuándo quiero hacerlo.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Toma de decisiones"}
								subasks={[
									{
										askNumber:44,
										text: "Puedo tomar decisiones efectivas e informadas que son beneficiosas para mí, mi equipo y toda la empresa.",
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
										askNumber:45,
										text: "En la empresa prefiero que otros tomen la responsabilidad sobre las decisiones importantes.",
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
										askNumber:46,
										text: "Tomo mis decisiones laborales basado/a en datos y hechos concretos.",
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
										askNumber:47,
										text: "Suelo arrepentirme de las decisiones que tomo en mi vida profesional.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Orientación al Logro"}
								subasks={[
									{
										askNumber:48,
										text: "Me las arreglo continuamente para cumplir con los plazos y terminar mis responsabilidades de manera oportuna.",
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
										text: "Me despierto sabiendo lo que quiero lograr en el día en mi trabajo.",
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
										askNumber:50,
										text: "Me cuesta encontrar la motivación para esforzarme más allá de mis límites en el trabajo.",
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
										askNumber:51,
										text: "Nunca escapo de tareas difíciles y hago el trabajo en cualquier circunstancia.",
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
								ask={""}
							/>

							
							<Multiple
								change={answerChange}
								title={"Planificación"}
								subasks={[
									{
										askNumber:52,
										text: "Si se acerca un proyecto importante, elaboro un plan de ejecución para el mismo.",
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
										askNumber:53,
										text: "Tengo problemas para hacer planes que me ayuden a alcanzar mis metas laborales.",
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
										askNumber:54,
										text: "En el trabajo puedo ajustarme fácilmente a mi planificación.",
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
								ask={""}
							/>

							
							<Multiple
								change={answerChange}
								title={"Monitoreo"}
								subasks={[
									{
										askNumber:55,
										text: "Mantengo un seguimiento de mi progreso para alcanzar mis metas de trabajo.",
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
										text: "Me cuesta recordar todas las cosas que necesito lograr en mi vida profesional.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Foco"}
								subasks={[
									{
										askNumber:57,
										text: "Durante las horas de trabajo gestiono de manera eficiente el uso de mi smartphone para poderme mantenerme enfocado.",
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
										text: "Me aseguro de controlar las distracciones para poder concentrarme en mis tareas laborales.",
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
										askNumber:59,
										text: "Tengo dificultad para mantener mi enfoque en proyectos que tardan mucho en completarse.",
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
										askNumber:60,
										text: "En el trabajo tiendo a distraerme fácilmente.",
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
										text: "Las condiciones en mi lugar de trabajo afectan negativamente mis niveles de concentración.",
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
										askNumber:62,
										text: "En la empresa no tengo problemas para concentrarme en lo que es importante y bloquear todo lo demás.",
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
										text: "Pienso demasiado en lo que podría salir mal antes y durante un nuevo proyecto.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Competitividad"}
								subasks={[
									{
										askNumber:64,
										text: "Me esfuerzo por batir los récords de la empresa en mi departamento.",
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
										askNumber:65,
										text: "Intento ser el/la primero/a o el/la mejor en lo que hago sin perjudicar el espíritu del equipo.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Definiendo prioridades"}
								subasks={[
									{
										askNumber:66,
										text: "Sé crear una distinción clara entre lo que es una prioridad y lo que no lo es en la empresa.",
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
										askNumber:67,
										text: "Priorizo de manera eficaz las tareas y decisiones más urgentes.",
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
										askNumber:68,
										text: "'No sé por dónde empezar' es un sentimiento que suelo tener cuando en el trabajo se me presentan varias cosas que hacer a la vez.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Oportunismo positivo"}
								subasks={[
									{
										askNumber:69,
										text: "Veo rápidamente oportunidades para lograr mis objetivos laborales.",
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
										askNumber:70,
										text: "En la empresa tengo la capacidad de crear mis propias oportunidades.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Manejo del tiempo"}
								subasks={[
									{
										askNumber:71,
										text: "Tengo el control sobre cómo invierto de manera eficiente mi tiempo en el trabajo",
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
										askNumber:72,
										text: "Siempre cumplo con mis plazos y gestiono eficazmente mi carga de trabajo.",
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
										askNumber:73,
										text: "Con frecuencia me cuesta decir 'no' en mi trabajo.",
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
										askNumber:74,
										text: "Tengo problemas con la gestión del tiempo. A menudo dejo tareas que encuentro demasiado desafiantes o aburridas para el último minuto y luego no tengo tiempo suficiente para terminarlas con la calidad requerida.",
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
										askNumber:75,
										text: "Tiendo a aceptar mucho trabajo y luego puedo abrumarme fácilmente.",
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
										askNumber:76,
										text: "Tengo horas de trabajo muy largas.",
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
										askNumber:77,
										text: "Tengo problemas para balancear mi vida profesional con mi vida personal.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Eficiencia"}
								subasks={[
									{
										askNumber:78,
										text: "A veces siento que me concentro demasiado en una tarea y tardo mucho más de lo apropiado debido a mi perfeccionismo.",
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
										askNumber:79,
										text: "Mi enfoque laboral no es en solo hacer las cosas, sino hacerlas de manera correcta.",
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
										askNumber:80,
										text: "Dedico recursos de manera efectiva no solo para hacer bien el trabajo, sino también para que sea eficiente.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Carga de trabajo"}
								subasks={[
									{
										askNumber:81,
										text: "Estoy tan ocupado que me resulta cada vez más difícil concentrarme en el trabajo que tengo por hacer.",
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
										askNumber:82,
										text: "Paso tanto tiempo en el trabajo que mis relaciones externas están sufriendo.",
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
										askNumber:83,
										text: "La carga de trabajo excesiva me está causando problemas físicos y psicológicos.",
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
								ask={""}
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

						<div className="titulo-encuesta">RESILIENCIA MENTAL</div>

						<Multiple
								change={answerChange}
								title={"Confianza"}
								subasks={[
									{
										askNumber:84,
										text: "Estoy seguro/a de que lograré los objetivos que me propuse en la empresa.",
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
										askNumber:85,
										text: "Cuando estoy trabajando por lograr algo difícil, me concentro en mi progreso en lugar de desanimarme.",
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
										askNumber:86,
										text: "Me desaniman fácilmente las críticas hostiles de mis colegas/compañeros.",
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
										askNumber:87,
										text: "Tengo confianza en mis habilidades profesionales.",
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
										askNumber:88,
										text: "En el trabajo expreso mi opinión incluso si hay una buena posibilidad de que otras personas no estén de acuerdo conmigo.",
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
										askNumber:89,
										text: "Me avergüenzo de como me veo o me comporto en la empresa.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Manejo del fracaso"}
								subasks={[
									{
										askNumber:90,
										text: "En mi trabajo me frustro cuando las cosas no salen según el plan.",
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
										askNumber:91,
										text: "Sigo trabajando tan duro como puedo aun después de experimentar fracasos decepcionantes.",
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
										askNumber:92,
										text: "Nunca he intentado traspasar la responsabilidad de mis errores a otras personas. Acepto los fracasos.",
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
										askNumber:93,
										text: "Me toma mucho tiempo recuperarme de las fallas que cometo en el trabajo.",
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
										askNumber:94,
										text: "Si empiezo mal un proyecto, me cuesta revertir mi situación.",
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
										askNumber:95,
										text: "Uno o dos contratiempos en la empresa no sacuden mi confianza.",
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
										askNumber:96,
										text: "En mi trabajo puedo admitir abiertamente que cometí un error.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Manejo del éxito"}
								subasks={[
									{
										askNumber:97,
										text: "Puedo reconocer mi buen trabajo cuando logro una meta con éxito.",
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
										askNumber:98,
										text: "Cuando alcanzo un logro laboral, tengo mi ritual especial para celebrarlo.",
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
										askNumber:99,
										text: "Una vez celebrado, vuelvo a trabajar y espero con entusiasmo la próxima meta o hito.",
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
										askNumber:100,
										text: "Me tomo el tiempo para celebrar los logros con el resto del equipo.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Positivismo"}
								subasks={[
									{
										askNumber:101,
										text: "No soy pesimista, ni siquiera en las situaciones más difíciles de mi trabajo.",
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
										askNumber:102,
										text: "En mi trabajo generalmente veo el lado positivo de las cosas.",
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
										askNumber:103,
										text: "Encuentro alegría en mi trabajo sin importar cuán desafiante sea.",
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
										askNumber:104,
										text: "No dejo que los problemas personales arruinen mi mentalidad positiva en el lugar de trabajo.",
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
								ask={""}
							/>


							<Multiple
								change={answerChange}
								title={"Pensamiento crítico"}
								subasks={[
									{
										askNumber:105,
										text: "Aprecio las conversaciones críticas y la confrontación positiva con mis colegas por encima de ignorar problemas y desafíos.",
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
										askNumber:106,
										text: "En mis labores soy bueno/a pensando 'fuera de la caja'.",
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
										askNumber:107,
										text: "Sé criticar de forma constructiva, sin poner en riesgo los sentimientos de los demás miembros del equipo.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Retar a otros"}
								subasks={[
									{
										askNumber:108,
										text: "En la empresa a veces tengo miedo de que me consideren demasiado insistente.",
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
										askNumber:109,
										text: "Me pregunto qué está haciendo el equipo para tratar de que todos se beneficien.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Seguridad"}
								subasks={[
									{
										askNumber:110,
										text: "Creo en mis habilidades para realizar tareas desafiantes y que mis habilidades pueden crecer con esfuerzo.",
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
										askNumber:111,
										text: "Podré lograr la mayoría de las metas que me he propuesto profesionalmente.",
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
										askNumber:112,
										text: "Al enfrentar tareas difíciles en el trabajo, estoy seguro/a de que las cumpliré.",
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
										askNumber:113,
										text: "En comparación con otros compañeros/colegas, puedo hacer muy bien la mayoría de las tareas.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Perseverancia"}
								subasks={[
									{
										askNumber:114,
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
										askNumber:115,
										text: "En la empresa a menudo me siento atrapado/a en una situación difícil.",
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
										askNumber:116,
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
										askNumber:117,
										text: "El éxito laboral es principalmente suerte.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Toma de riesgos"}
								subasks={[
									{
										askNumber:118,
										text: "La gestión de riesgos es definitivamente una de mis fortalezas.",
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
										askNumber:119,
										text: "Prefiero involucrarme en un proyecto difícil y perder en lugar de en uno simple y ganar fácilmente.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Liderazgo"}
								subasks={[
									{
										askNumber:120,
										text: "Demuestro buenas capacidades de liderazgo y tengo grandes habilidades para influir en los demás.",
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
										askNumber:121,
										text: "Puedo orientar a mis colaboradores y compañeros de equipo.",
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
										askNumber:122,
										text: "Considero que lidero con el ejemplo de manera efectiva, tomo acciones y adopto los comportamientos que espero de mi equipo.",
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
										askNumber:123,
										text: "Dedico tiempo a mis compañeros de equipo para ayudarlos a resolver sus desafíos y problemas, fomentar su desarrollo personal y profesional.",
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
								ask={""}
							/>

							<Multiple
								change={answerChange}
								title={"Iniciativa"}
								subasks={[
									{
										askNumber:124,
										text: "En mi equipo me ocupo activamente de los problemas sin que me lo digan.",
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
										askNumber:125,
										text: "A menudo soy el/la primero/a en tomar la iniciativa dentro de mi equipo.",
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
										askNumber:126,
										text: "Siempre que tengo la oportunidad de liderar un proyecto desafiante, lo tomo.",
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
								ask={""}
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

						<div className="titulo-encuesta">MENTALIDAD DE CRECIMIENTO</div>
						<Multiple
							change={answerChange}
							title={"Mentalidad de aprendizaje"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:127,
									text: "Creo que no importa quién seas, puedes cambiar significativamente tu nivel de talento.",
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
									askNumber:128,
									text: "Dedico parte de mi tiempo libre a estudiar temas que me interesan.",
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
									askNumber:129,
									text: "Creo que trabajar duro vale la pena.",
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
									askNumber:130,
									text: "Creo que aprendiendo ayuda al cerebro a desarrollarse como un músculo.",
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
									askNumber:131,
									text: "Me gusta aprender cosas nuevas en mi trabajo.",
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
									askNumber:132,
									text: "Siempre pienso en cómo puedo seguir desempeñando mi trabajo de la manera más eficaz posible en el futuro.",
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
									askNumber:133,
									text: "En mi trabajo busco personas de las que pueda aprender.",
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
									askNumber:134,
									text: "No importa cuánto sepa, siempre hay algo nuevo que aprender.",
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
									askNumber:135,
									text: `Incluso si no "nací con talento", puedo desarrollar mis capacidades para hacer algo.`,
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
									askNumber:136,
									text: "En la empresa aprovecho al máximo mi red de apoyo: personas que pueden informarme, asesorarme y ayudarme a aprender nuevas habilidades.",
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
									askNumber:137,
									text: "Cuando me enfrento a obstáculos en la empresa, recuerdo momentos en los que tuve problemas similares y los superé.",
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
									askNumber:138,
									text: "Estoy satisfecho/a con mis habilidades actuales.",
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
									askNumber:139,
									text: "Le tengo miedo a cometer errores en mi trabajo.",
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
									askNumber:140,
									text: "Dedico tiempo a la autorreflexión cuando las cosas van mal para eliminar los malos hábitos y evitar que el problema vuelva a suceder.",
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
									askNumber:141,
									text: "Trato las dificultades en los proyectos como un proceso de aprendizaje. Utilizo los desafíos como oportunidades para mejorar.",
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
							title={"Retroalimentación"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:142,
									text: "Me tomo el tiempo para brindar retroalimentación constructiva a mis colegas y compañeros.",
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
									askNumber:143,
									text: "Invito a otros colegas/compañeros a cuestionar mi pensamiento.",
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
									askNumber:144,
									text: "Evito ser negativo al recibir comentarios o feedback.",
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
									askNumber:145,
									text: "Respondo a los comentarios negativos con madurez y voluntad de mejorar.",
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
									askNumber:146,
									text: "Pido a mis colegas/compañeros comentarios sobre lo que hago bien y cómo puedo mejorar.",
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
							title={"Emprendimiento"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:147,
									text: "Soy bastante bueno/a para anticipar eventos o tendencias de la industria.",
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
									askNumber:148,
									text: "Quiero construir algo que sea reconocido públicamente por mi organización.",
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
									askNumber:149,
									text: "No tengo miedo de cometer errores, más bien tengo miedo de no esforzarme lo suficiente.",
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
									askNumber:150,
									text: "Me siento muy cómodo/a tomando los problemas en mis propias manos.",
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
									askNumber:151,
									text: "Me definiría como alguien capaz de pensar fuera de la caja e improvisar cuando sea necesario.",
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

		</div>

	)
}
export default Mental