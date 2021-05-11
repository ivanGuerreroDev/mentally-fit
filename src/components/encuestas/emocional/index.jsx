import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import {
	TOAST_ERROR
} from "../../../redux/constants";
import {
	Multiple,
	ModeloUno
} from "../preguntas"
import { useHistory } from "react-router-dom";
import {saveEvaluations} from "../../../redux/reducersActions/evaluacion/Actions"
import { useDispatch, useSelector } from "react-redux";

const posiciones = {
	1 : 7,
	2 : 48,
	3 : 88,
	4 : 132
}

const Emocional = ({pagina, location}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const campaña = useSelector(
		(state) => state.evaluations.campaign
	);

	const respuestas = useSelector(
		(state) => state.evaluations.evaluaciones[2].respuestas
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
					id: 3,
					position: data
				}]
			}
			document.querySelector(".section-container").scrollTo({top: 0, behavior: 'smooth'});
			dispatch( saveEvaluations(respuestas, token) )
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
				pathname: "/user/encuesta/emocional/1",
				state: { top: true }
			})
		}else if(posiciones[1] >= respuestas.length && posiciones[2] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/emocional/2",
				state: { top: true }
			})	
		}else if(posiciones[2] >= respuestas.length && posiciones[3] > respuestas.length ){
			history.push({
				pathname: "/user/encuesta/emocional/3",
				state: { top: true }
			})	
		}else if(posiciones[3] >= respuestas.length && posiciones[4] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/emocional/4",
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
							<div className="titulo-encuesta">Conectando con mis emociones</div>
							<p>La capacidad de reconocer lo que estás sintiendo, comprender tus respuestas emocionales habituales a los eventos y reconocer cómo tus emociones afectan tu comportamiento y desempeño. Cuando eres consciente de ti mismo, te ves a ti mismo como los demás te ven y tienes un buen sentido de tus propias habilidades y limitaciones actuales.</p>
							<p>Evalúa cada afirmación como es en realidad, en lugar de como crees que debería ser. </p>
							<p>Califica, en una escala de 1 = totalmente en desacuerdo a 5 = totalmente de acuerdo las siguientes afirmaciones:</p>
							<Multiple
								change={answerChange}
								title={"Entendiendo mis emociones"}
								subasks={[
									{
										askNumber:1,
										text: "Puedo reconocer mis emociones mientras las experimento",
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
										text: "Soy bueno/a describiendo mis sentimientos",
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
										text: "Puedo reconocer cuando mi comportamiento está afectando a los demás.",
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
								title={"Auto Reflexión"}
								subasks={[
									{
										askNumber:4,
										text: "Me tomo el tiempo para reflexionar sobre mis experiencias para comprender mis fortalezas, intereses y desafíos y luego usar ese conocimiento sobre mí mismo/a.",
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
										askNumber:5,
										text: "Siempre tengo una clara comprensión de por qué siento lo que siento.",
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
								title={"Compartiendo mis emociones"}
								subasks={[
									{
										askNumber:6,
										text: "Me resulta fácil abrirme y expresar mis sentimientos a mis compañeros/colegas.",
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
										text: "Mis compañeros/colegas no necesitan saber cómo me siento, independientemente de si siento emociones positivas o negativas.",
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
							<div className="titulo-encuesta">MANEJANDO LA PRESIÓN</div>

							<Multiple
								change={answerChange}
								title={"Estrés"}
								subasks={[
									{
										askNumber:8,
										text: "En el trabajo usualmente me siento estresado/a",
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
										text: "En la empresa me las arreglo fácilmente para eliminar el estrés que generan las situaciones complicadas.",
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
										text: "Siempre utilizo técnicas para manejar mejor el estrés y las situaciones estresantes en mi ambiente laboral.",
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
										text: "Si la situación es complicada en la empresa me pongo demasiado ansioso/a.",
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
								title={"Preocupaciones"}
								subasks={[
									{
										askNumber:12,
										text: "No puedo sino pensar nada más que en el trabajo, incluso durante las vacaciones o tiempo libre, lo que puede llevarme a un rápido agotamiento profesional.",
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
										askNumber:13,
										text: "Con frecuencia me preocupo por los errores que pudiese cometer en el trabajo.",
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
										text: "Cuando algo me molesta en mi trabajo, no puedo dejar de pensar en ello.",
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
										askNumber:15,
										text: "En la empresa tiendo a preocuparme por las cosas mucho antes de que realmente sucedan.",
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
										text: "Usualmente experimento dificultad para dormir porque mi mente está siempre acelerada.",
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
										askNumber:17,
										text: "Tiendo a obsesionarme con los problemas que tengo en mi vida profesional.",
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
								title={"Percepción de control"}
								subasks={[
									{
										askNumber:18,
										text: "No tengo el control del éxito o el fracaso en el trabajo.",
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
										askNumber:19,
										text: "En mi trabajo manejo cualquier situación con la cabeza fría y profesionalmente.",
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
										text: "Tiendo a rendirme y huir de la presión.",
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
										askNumber:21,
										text: "Cuando me enfrento a un nuevo desafío laboral, me rindo porque creo que fallaré",
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
										text: "En mi trabajo tengo conciencia de qué situaciones puedo manejar y cuáles me sacarán de mi zona de confort emocional.",
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
								title={"Calma"}
								subasks={[
									{
										askNumber:23,
										text: "En mi trabajo sé cómo manejar cualquier desafío y hacer que las cosas más difíciles parezcan manejables.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										askNumber:24,
										text: "Generalmente puedo pensar con claridad aunque esté bajo presión.",
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
										text: "Cuando me enfrento a un problema me pongo demasiado nervioso/a y eso no me permite desarrollar todo mi potencial.",
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
								title={"Relajación"}
								subasks={[
									{
										askNumber:26,
										text: "Me tomo el tiempo suficiente para relajarme durante el día. Me permito desconectarme de la fuente de estrés.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										text: "No sé cómo utilizar técnicas de relajación cuando me enfrento a una situación complicada.",
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
								title={"Humor"}
								subasks={[
									{
										askNumber:28,
										text: "Aun estando bajo mucho estrés en mi trabajo, soy capaz de ver el lado divertido de las cosas.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										askNumber:29,
										text: "Utilizo el buen humor para ayudarme a seguir intentándolo frente a cualquier obstáculo que se me presente en mis labores.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										text: "Me definiría como una persona que logra reirse bastante durante el dia de trabajo.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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

							<ModeloUno
								askNumber={31}
								change={answerChange}
								title={"Plazos de entrega"}
								ask={"Puedo mantenerme enfocado/a y racional aunque tenga plazos ajustados de entrega en algún proyecto."}
								description={""}
								options={[
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
								]}
							/>

							<Multiple
								change={answerChange}
								title={"Diálogo interno positivo"}
								subasks={[
									{
										askNumber:32,
										text: "<br>No lo hice tan bien como sé que puedo, pero está bien. Ahora sé lo que puedo hacer la próxima vez para ser mejor, y eso ayudará a mi crecimiento personal y profesional.",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Raramente"
											}, 
											{
												value: 3,
												text: "A veces"
											}, 
											{
												value: 4,
												text: "A menudo"
											},
											{
												value: 5,
												text: "Siempre"
											}
										]
									},
									{
										askNumber:33,
										text: "No soy lo suficientemente bueno/a en lo que me dedico.",
										options: [
											{
												value: 1,
												text: "Siempre"
											}, 
											{
												value: 2,
												text: "A menudo"
											}, 
											{
												value: 3,
												text: "A veces"
											}, 
											{
												value: 4,
												text: "Raramente"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:34,
										text: "Esto es imposible: ¡nunca podré llevar a cabo este proyecto!",
										options: [
											{
												value: 1,
												text: "Siempre"
											}, 
											{
												value: 2,
												text: "A menudo"
											}, 
											{
												value: 3,
												text: "A veces"
											}, 
											{
												value: 4,
												text: "Raramente"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:35,
										text: "¡Esto no es mi culpa! Es culpa de ... (otro colega, el equipo, mi líder, el cliente, etc.)",
										options: [
											{
												value: 1,
												text: "Siempre"
											}, 
											{
												value: 2,
												text: "A menudo"
											}, 
											{
												value: 3,
												text: "A veces"
											}, 
											{
												value: 4,
												text: "Raramente"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
																
									
								]}
								ask={"¿Con qué frecuencia tienes el siguiente diálogo interno?"}
							/>

							
							<Multiple
								change={answerChange}
								title={"Regulacíon emocional"}
								subasks={[
									{
										askNumber:36,
										text: "<br>Durante la jornada laboral siento que siempre tengo control sobre mis emociones y mis reacciones.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										text: "Cuando experimento una emoción positiva en mi trabajo, sé cómo hacer que dure",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										text: "Me resulta difícil seguir adelante con mis proyectos cuando me siento frustrado/a o infeliz",
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
										askNumber:39,
										text: "En general, en la empresa estoy de buen humor durante todo el día.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										askNumber:40,
										text: "Cuando me siento molesto/a por algún problema en mi trabajo, también puedo sentirlo en mi cuerpo.",
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
										text: "Cuando tengo un problema en mi rutina laboral, me ayuda saber cómo me siento al respecto.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
										askNumber:42,
										text: "Cuando enfrento problemas en la empresa intento cambiar el punto de vista y ver las cosas desde otra perspectiva.",
										options: [
											{
												value: 1,
												text: "Totalmente en desacuerdo	"
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
								ask={"Ser capaz de manejar tu estado emocional es esencial para asumir la responsabilidad de tus acciones y puede salvarte de tomar decisiones apresuradas de las que luego te arrepientas.<br><br>	Califica en una escala de 1 = totalmente en desacuerdo a 5 = totalmente de acuerdo las siguientes afirmaciones:"}
							/>


							<Multiple
								change={answerChange}
								title={"Tiempo de calidad"}
								subasks={[
									{
										askNumber:43,
										text: "<br>Buscar actividades que me hagan feliz",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez al mes"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Dos o tres veces a la semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:44,
										text: "Pasar un buen rato conmigo mismo/a (por ejemplo, escuchando música, leyendo un libro, pasatiempos, etc.)",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez al mes"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Dos o tres veces a la semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:45,
										text: "Pasar  un buen rato con mi familia (por ejemplo, reuniones familiares, juegos con niños, eventos familiares, etc.)",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez al mes"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Dos o tres veces a la semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:46,
										text: "Pasar un buen rato con mis amigos (por ejemplo, cenando o bebiendo juntos, tener una agradable charla, eventos deportivos o espectáculos, etc.)",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez al mes"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Dos o tres veces a la semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:47,
										text: "Pasar un buen rato con mis compañeros de trabajo (hacer bromas en el trabajo, tiempo informal juntos, etc.)",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez al mes"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Dos o tres veces a la semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:48,
										text: "Disfrutar de mis tareas laborales",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez al mes"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Dos o tres veces a la semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
																
									
								]}
								ask={"Mejora tu estado de ánimo positivamente cuando sea necesario, verifica la frecuencia con la que participaste en las siguientes actividades durante el último mes. Marca solo una respuesta para cada posible actividad de ocio."}
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

						<div className="titulo-encuesta">RELACION CON LOS COLEGAS</div>
							<p>La capacidad de sentir, comprender y responder a lo que sienten otras personas. La autoconciencia es esencial para tener empatía con los demás. Si no eres consciente de tus propias emociones, no podrás entender las emociones de los demás. Lee cada declaración con atención y marca la columna que mejor describa tus sentimientos y comportamientos.</p>
							<Multiple
								change={answerChange}
								title={"Cuidado"}
								subasks={[
									{
										askNumber:49,
										text: "Disfruto haciendo que otros colegas se sientan mejor.",
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
										text: "Cuando veo a un compañero o colega en problemas siento que debo ayudarlo/a.",
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
										text: "Tiendo a posponer o evitar discutir temas delicados con mis compañeros de trabajo.",
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
								title={"Empatía"}
								subasks={[
									{
										askNumber:52,
										text: "Me resulta difícil leer las emociones de mis compañeros de trabajo.",
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
												text: "En desacuerdo	"
											},
											{
												value: 5,
												text: "Totalmente en desacuerdo"
											}
										]
									},
									{
										askNumber:53,
										text: "Me parece que estoy 'en sintonía' con los estados de ánimo de otros compañeros.",
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
										text: "Antes de criticar a un compañero o colega, trato de imaginarme cómo me sentiría si estuviera en su lugar.",
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
										askNumber:55,
										text: "Cuando otra persona me habla de un evento importante en su vida, me emociona casi como si lo hubiera experimentado yo mismo.",
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
								title={"Escucha"}
								subasks={[
									{
										askNumber:56,
										text: "Suelo interrupir lo que dicen mis compañeros de trabajo si no estoy de acuerdo con lo sus ideas.",
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
										askNumber:57,
										text: "En mi trabajo los compañeros/colegas me dicen que soy un buen oyente.",
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
										text: "Hago contacto visual mientras escucho lo que dicen mis compañeros de trabajo.",
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
								title={"Asertividad"}
								subasks={[
									{
										askNumber:59,
										text: "Puedo expresar con claridad lo que quiero, mis necesidades y pensamientos respetando a mis compañeros.",
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
										text: "Cuando hay una discusión en la empresa no digo lo que realmente pasa por mi mente.",
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
										text: "En el trabajo a veces evito hacer preguntas por miedo a parecer estúpido/a.",
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
										text: "Me cuesta controlar mis emociones cuando no estoy de acuerdo con un compañero o colega.",
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
								title={"Manejo de conflictos"}
								subasks={[
									{
										askNumber:63,
										text: "Me siento bien acerca de cómo manejo la mayoría de los conflictos o desacuerdos en mi trabajo.",
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
										text: "Cuando estoy enojado con un colega, evito hablar con él o ella.",
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
										askNumber:65,
										text: "Cuando no estoy de acuerdo con alguien, hablo de cómo me siento y lo/la escucho hablar sobre cómo se siente.",
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
										askNumber:66,
										text: "En la empresa manejo los desacuerdos o conflictos con respeto, trabajando hacia una solución mutuamente aceptable.",
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
								title={"Redes"}
								subasks={[
									{
										askNumber:67,
										text: "Me esfuerzo por mantenerme en contacto con compañeros y colegas que no veo a menudo",
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
										text: "Cuando conozco a un/a nuevo/a colega, le hago preguntas para conocerlo/a mejor",
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
										askNumber:69,
										text: "En lugar de simplemente tener una pequeña charla, generalmente le hablo a mis colegas sobre mí o sobre intereses comunes.",
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
										text: "Por lo general, me llevo bien con los colegas  y compañeros que acabo de conocer.",
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
								title={"Dar apoyo"}
								subasks={[
									{
										askNumber:71,
										text: "Hago mi mejor esfuerzo para ayudar a colegas que estén teniendo dificultades en algún proyecto.",
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
										text: "Cuando un compañero de trabajo me habla, demuestro que estoy interesado/a al prestarle toda mi atención.",
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
										text: "En el trabajo intento evitar oír a los compañeros hablar de sus problemas.",
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
										text: "En la empresa rara vez ayudo a los compañeros.",
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
								title={"Solicitar ayuda"}
								subasks={[
									{
										askNumber:75,
										text: "En mi trabajo sé a donde acudir para pedir ayuda",
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
										askNumber:76,
										text: "En la empresa tiendo a ocultar el hecho de que a veces no entiendo una tarea en lugar de pedir ayuda.",
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
										text: "Cuando tengo un problema en mi trabajo prefiero solucionarlo por mi cuenta que pedirle a alguien que me ayude.",
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
										askNumber:78,
										text: "Si necesito apoyo en la empresa, me comunico con otros compañeros para pedirles consejo o ayuda.",
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
								title={"Comunicación Verbal"}
								subasks={[
									{
										askNumber:79,
										text: "Me gusta usar palabras poco comunes cuando hablo con mis compañeros para mostrar lo inteligente que soy.",
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
										askNumber:80,
										text: "Tengo que repetirme a menudo porque la gente no entiende mi mensaje la primera vez.",
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
										askNumber:81,
										text: "Tengo dificultad para expresar mis pensamientos con palabras.",
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
								title={"Comunicación No Verbal"}
								subasks={[
									{
										askNumber:82,
										text: "Cuando me comunico con mis compañeros, presto atención a las señales no verbales: lenguaje corporal, expresiones faciales y gestos.",
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
										askNumber:83,
										text: "Puedo sentir cómo se sienten los demás en función de su comunicación no verbal.",
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
								title={"Relación con el supervisor"}
								subasks={[
									{
										askNumber:84,
										text: "Mi supervisor y yo tenemos una relación de trabajo buena y respetuosa.",
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
										text: "Me siento seguro/a cuando hablo de mis preocupaciones y mis sentimientos con mi supervisor.",
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
										text: "Mi supervisor afecta positivamente mi estado de ánimo",
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
										askNumber:87,
										text: "Mi supervisor reconoce mi buen desempeño.",
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
										text: "Mi supervisor inspira al equipo a lograr metas colectivas.",
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

						<div className="titulo-encuesta">TRABAJO EN EQUIPO</div>
						<Multiple
							change={answerChange}
							title={"Compromiso"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:89,
									text: "Estoy orgulloso/a de ser parte de mi actual equipo de trabajo.",
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
									askNumber:90,
									text: "Creo que el trabajo en equipo es la mejor manera de lograr mejores objetivos personales y organizacionales.",
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
									askNumber:91,
									text: "Trabajar con mi equipo actual me inspira a dar lo mejor de mí.",
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
									text: "Prefiero trabajar solo/a que con mi equipo actual",
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
							title={"El Equipo Primero"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:93,
									text: "Estoy dispuesto/a a subordinar mis metas personales a las metas de mi equipo de trabajo.",
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
									askNumber:94,
									text: "Siempre actúo pensando en el mejor interés de mi equipo de trabajo.",
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
									askNumber:95,
									text: "Cuanto más interactúo con mis compañeros de equipo, más disfruto de mi trabajo.",
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
									text: "Mis compañeros de trabajo afectan positivamente mi experiencia laboral.",
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
							title={"Contribución"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:97,
									text: "Siempre cumplo con las expectativas de mi equipo manteniendo altos niveles de productividad.",
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
									text: "Estoy atento/a a que mis contribuciones en el trabajo sean para garantizar el éxito del equipo.",
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
									text: "A veces siento que no hago lo suficiente para ayudar a mi equipo a lograr el objetivo común",
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
									askNumber:100,
									text: "En mi trabajo siempre entrego productos de alta calidad.",
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
									askNumber:101,
									text: "Reconozco las necesidades de mi equipo actual y, a menudo, me ofrezco como voluntario/a para realizar tareas que sean necesarias.",
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
							title={"Compartir el éxito"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:102,
									text: "Felicito a mis compañeros cuando han hecho algo bien.",
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
									text: "Comparto el crédito de cualquier éxito con mis compañeros de equipo porque se necesita un esfuerzo colectivo para lograr una gran meta.",
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
									text: "Puedo sentir celos o envidia si un compañero de equipo obtiene mejores resultados que yo.",
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
									askNumber:105,
									text: "Puedo ser feliz si alcanzo mis metas personales aunque en mi equipo no se consigan las metas colectivas.",
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
							title={"Digno de confianza"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:106,
									text: "Los miembros de mi equipo de trabajo confían en mí y están felices de colaborar conmigo.",
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
									text: "Mis colegas buscan mi consejo tanto para cuestiones laborales como personales.",
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
							title={"Flexibilidad"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:108,
									text: "Estoy diespuesto/a cambiar de puesto en el trabajo si eso beneficia al equipo.",
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
									askNumber:109,
									text: "Me adapto fácilmente a las necesidades del equipo.",
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
							title={"Asumir responsabilidades"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:110,
									text: "Admito fácilmente mis errores y asumo la responsabilidad por ellos.",
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
									text: "Si no puedo cumplir con el plazo, se lo comunico a los demás con anticipación y ofrezco soluciones para satisfacer las necesidades del equipo.",
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
									text: "Me cuesta aceptar trabajo que siento que está fuera de mis responsabilidades en el equipo.",
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

							<ModeloUno
								askNumber={113}
								change={answerChange}
								title={"Puntualidad"}
								ask={"Suelo llegar tarde a las reuniones de trabajo."}
								description={""}
								options={[
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
								]}
							/>


						<Multiple
							change={answerChange}
							title={"Compañerismo"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:114,
									text: "Me molesta ver que un/a compañero/a de equipo es tratado/a irrespetuosamente.",
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
									askNumber:115,
									text: "Si un/a compañer/a viene a mí con problemas, me pongo a disposición para ayudarlo/a.",
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
									askNumber:116,
									text: "Tengo problemas para mantener una relación amistosa con mis compañeros de trabajo.",
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
							title={"Trabajo colaborativo"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:117,
									text: "Ofrezco soluciones viables a los diversos problemas e ideas que enfrenta el equipo.",
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
									askNumber:118,
									text: "Me aseguro de que todos los miembros del equipo estén en sintonía y no tengan preguntas o inquietudes antes de tomar una decisión.",
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
									text: "Generalmente acepto con gentileza los cambios sugeridos por los miembros del equipo y los tomo en consideración al tomar decisiones.",
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
									askNumber:120,
									text: "Comparto información de manera clara y oportuna, especialmente cuando afecta el trabajo de mis compañeros de equipo.",
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
							title={"Actitud positiva"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:121,
									text: "Muestro una actitud positiva incluso cuando estoy cansado/a, frustrado/a, etc.",
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
									text: "A menudo me frustro cuando otros miembros de mi equipo no pueden seguir el paso de la mayoría.",
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
									askNumber:123,
									text: "Soy respetuoso/a incluso cuando mi trabajo es criticado.",
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
							title={"Compartir las mejores prácticas"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:124,
									text: "Si descubro una herramienta útil la comparto con mis compañeros de trabajo.",
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
									text: "En la empresa, me tomo el tiempo para compartir mi conocimiento y experiencia con mis compañeros de equipo.",
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
							title={"Inclusión"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:126,
									text: "Respeto las ideas y opiniones de los demás miembros del equipo.",
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
									askNumber:127,
									text: "Trato a cada persona con calidez y respeto, honrando al individuo único que es.",
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
									text: "A menudo tomo la iniciativa para asegurarme de que cada miembro del equipo se sienta cómodo y bienvenido.",
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
							title={"Mejorar el desempeño del equipo"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:129,
									text: "Animo a otros miembros del equipo a seguir mejorando y a hacerlo bien en todo momento.",
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
									text: "Ofrezco comentarios positivos y constructivos a mis compañeros y supervisor",
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
									text: "Apoyo al líder del proyecto y a otros miembros a lograr sus metas individuales.",
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
									text: "Una vez cumplida mi tarea, no me importa si mis compañeros de equipo necesitan ayuda para terminar su trabajo.",
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
export default Emocional