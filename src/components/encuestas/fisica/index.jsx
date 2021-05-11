import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
	Bmi,
	Multiple,
	ModeloUno
} from "../preguntas"
import { useHistory } from "react-router-dom";
import {saveEvaluations} from "../../../redux/reducersActions/evaluacion/Actions"
import { useDispatch, useSelector } from "react-redux";
import {
	TOAST_ERROR
} from "../../../redux/constants";
import hidratadoImg from "../../../assets/encuestas/hidratado.png"
import bienHidratadoImg from "../../../assets/encuestas/bien-hidratado.png"
import deshidratacionImg from "../../../assets/encuestas/deshidratacion.png"
import severamenteDeshidratadoImg from "../../../assets/encuestas/severamente-deshidratado.png"
import leveDeshidratacionImg from "../../../assets/encuestas/leve-deshidratacion.png"

const posiciones = {
	1 : 10,
	2 : 40,
	3 : 58,
	4 : 79
}
const Fisica = ({pagina, location}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const token = useSelector(
		(state) => state.authenticationReducer.user.token
	);
	const campaña = useSelector(
		(state) => state.evaluations.campaign
	);

	const loading = useSelector(
		(state) => state.evaluations.loading
	);

	const respuestas = useSelector(
		(state) => {
			return(
			state.evaluations.evaluaciones && 
			state.evaluations.evaluaciones[0] && 
			state.evaluations.evaluaciones[0].respuestas 
			? 
				state.evaluations.evaluaciones[0].respuestas 
			: [])
		}
	);
	const [data, setData] = useState([])
	
	const answerChange = (dato, total, posicion, pregunta) => {
		if(data && dato && total && posicion && (pregunta > 0 || pregunta != '')){
			var insert = data

			if(!Number.isInteger(pregunta)){
				insert[pregunta.split('|')[0] - 1] = pregunta.split('|')[0]+'|'+posicion+'|'+total+'|'+dato + '|'+pregunta.split('|')[1];
				Array.prototype.insert = function(index, item) {
					this.splice(index, 0, item);
				};
				setData(insert)
			}else{
				insert[pregunta - 1] = pregunta+'|'+posicion+'|'+total+'|'+dato;
				Array.prototype.insert = function(index, item) {
					this.splice(index, 0, item);
				};
				setData(insert)
			}		
		}		
	}

	const answerChange2 = (dato, total, posicion, pregunta , valores) => {
		if(data && dato && total && posicion && pregunta && valores != ''){
			var insert = data

			insert[pregunta - 1] = pregunta +'|'+posicion+'|'+total+'|'+dato + '|'+pregunta  + '_' +valores;
			Array.prototype.insert = function(index, item) {
				this.splice(index, 0, item);
			};
			setData(insert)				
		}		
	}

	const saveAnswers = (page) => {
			
		if(
			data && 
			!data.includes(undefined) &&
			!data.includes(null) &&
			!data.includes("") &&
			data.length >= posiciones[page]){
			
			const respuestas = {
				campaign: campaña,
				respuestas: [{
					id: 1,
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
				pathname: "/user/encuesta/fisica/1",
				state: { top: true }
			})
		}else if(posiciones[1] >= respuestas.length && posiciones[2] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/fisica/2",
				state: { top: true }
			})	
		}else if(posiciones[2] >= respuestas.length && posiciones[3] > respuestas.length ){
			history.push({
				pathname: "/user/encuesta/fisica/3",
				state: { top: true }
			})	
		}else if(posiciones[3] >= respuestas.length && posiciones[4] > respuestas.length){
			history.push({
				pathname: "/user/encuesta/fisica/4",
				state: { top: true }
			})	
		}else if(posiciones[4] === respuestas.length){
			history.push("/user")	
		}
	}

	useEffect(()=>{
		checkPosition()
		if( !data.length){
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
							<div className="titulo-encuesta">Salud Física</div>
							<Bmi
								change={answerChange2}
								askNumber={1}
							/>
							<Multiple
								change={answerChange}
								title={"Dolores físicos"}
								subasks={[
									{
										askNumber:2,
										text: "Tus Hombros/Brazos/Codos",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "Dos o tres veces a la semana"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Una vez al mes"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:3,
										text: "Tu muñeca / manos",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "Dos o tres veces a la semana"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Una vez al mes"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:4,
										text: "Tu columna (Cuello/Espalda/Zona lumbar)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "Dos o tres veces a la semana"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Una vez al mes"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:5,
										text: "Tus caderas / piernas / rodillas / pies",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "Dos o tres veces a la semana"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Una vez al mes"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
								]}
								ask={"En los últimos 30 días ¿Con qué frecuencia sufriste dolor o malestar en las siguientes áreas?"}
								
							/>
							<ModeloUno
								askNumber={6}
								change={answerChange}
								title={"Fumar"}
								ask={"<b class='resaltado'>¿Cuánto fumas actualmente en productos derivados del tabaco?</b>"}
								description={"«Fumar tabaco» incluye el consumo de cigarrillos, bidis, cigarros, puros, pipas, shishas (pipas de agua), picadura fina de tabaco para fumar (para liar), krekets y cualquier otra forma de tabaco fumado. (no incluye cigarrillos electrónicos)"}
								options={[
									{
										value: 1,
										text: "Fumo más de 5 cigarrillos al día"
									}, 
									{
										value: 2,
										text: "Fumo de 1 a 5 cigarrillos al día"
									}, 
									{
										value: 3,
										text: "Fumo 1 o 2 cigarrillos a la semana"
									}, 
									{
										value: 4,
										text: "Fumo 1 o 2 cigarrillos al mes"
									},
									{
										value: 5,
										text: "No fumo/No he fumado en los últimos 30 días"
									}
								]}
							/>
							<Multiple
								change={answerChange}
								title={"Consumo de alcohol"}
								description={`
									Las siguientes preguntas son sobre tu consumo de alcohol en los últimos 30 días.<br /><br />
									<b>1 trago estándar equivale a: <br /></b>
									355 ml/ 12 Oz de cerveza de concentración media (3,5% de alcohol por volumen)<br />
									100 ml/ 3,38 Oz de vino tinto (13% de alcohol por volumen)<br />
									30 ml/ 1 Oz de aguardiente de alta graduación (40% de alcohol por volumen)<br />
									<br><b>En los últimos 30 días</b>, <b class='resaltado'> ¿En cuántos días consumiste por lo menos una bebida alcoholica?</b>
								`}
								ask={""}
								subasks={[
									{
										askNumber:7,
										text: "",
										options: [
											{
												value: 1,
												text: "Más de 15 dias"
											}, 
											{
												value: 2,
												text: "10 a 15 días"
											}, 
											{
												value: 3,
												text: "5 - 9 días"
											}, 
											{
												value: 4,
												text: "1 - 5 días"
											},
											{
												value: 5,
												text: "Ningún día"
											}
										]
									},
									{
										askNumber:8,
										text: "En los últimos 30 días, <b class='resaltado'>¿Cuántas bebidas alcohólicas consumiste en promedio por día?</b><br>Por favor cuenta solo los días en los que consumiste alcohol.",
										options: [
											{
												value: 1,
												text: "Más de 5"
											}, 
											{
												value: 2,
												text: "3-5"
											}, 
											{
												value: 3,
												text: "2-3"
											}, 
											{
												value: 4,
												text: "1"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:9,
										text: "En los últimos 30 días, <b class='resaltado'>¿En cuántos consumiste más de 2-3 bebidas alcohólicas durante el mismo día?</b><br> (mujeres: más de 2, hombres: más de 3)",
										options: [
											{
												value: 1,
												text: "Más de 8 días"
											}, 
											{
												value: 2,
												text: "6 a 8 días"
											}, 
											{
												value: 3,
												text: "4 a 5 días"
											}, 
											{
												value: 4,
												text: "Entre 1 y 3 días"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
								]}
							/>

							<ModeloUno
								askNumber={10}
								change={answerChange}
								title={"Tiempo de Pantalla"}
								ask={`
									En promedio, en los últimos 30 días,
									<b class="resaltado"> ¿cuántas horas al día estuviste mirando una pantalla diariamente? </b><br>
									(Puedes tomar el tiempo que pasas diariamente mirando a la pantalla de tu computadora, teléfono, tablet o televisión).
								`
								}
								options={[
									{
										value: 1,
										text: "Más de 5 horas"
									}, 
									{
										value: 2,
										text: "De 3 a 5 horas"
									}, 
									{
										value: 3,
										text: "De 2 a 3 horas"
									}, 
									{
										value: 4,
										text: "De 1 a 2 horas"
									},
									{
										value: 5,
										text: "Menos de 1 hora"
									}
								]}
							/>
							<div style={{display:"flex",justifyContent:"flex-end"}}>
								<button 
									className={"button-primary"+" "+(loading?"button-disabled":"")}
									onClick={()=>{
										
										if(!loading){
											saveAnswers(1)									
										}
									}}
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
							<div className="titulo-encuesta">Sueño</div>
							<ModeloUno
								askNumber={11}
								change={answerChange}
								title={"Horas de sueño"}
								ask={"En promedio en una noche típica <b class='resaltado'>¿Cuántas horas duermes?</b>"}
								description={""}
								options={[
									{
										value: 1,
										text: "Menos de 4,5 horas"
									}, 
									{
										value: 2,
										text: "Entre 4,5 y 5,5 horas"
									}, 
									{
										value: 3,
										text: "Entre 5,5 y 6,5 horas"
									}, 
									{
										value: 4,
										text: "Entre 6,5 y 7,5 horas"
									},
									{
										value: 5,
										text: "Entre 7,5 y 8,5 horas"
									},
									{
										value: 3,
										text: "Más de 8,5 horas"
									},
								]}
							/>
							
							<Multiple
								change={answerChange}
								title={"Calidad del sueño"}
								description={``}
								ask={""}
								subasks={[
									{
										askNumber:12,
										variation:'',
										text: "<b class='resaltado'>¿Qué tan energizado/a te sientes cuando te levantas por la mañana?</b>",
										options: [
											{
												value: 1,
												text: "Todavía Cansado/a"
											}, 
											{
												value: 2,
												text: "Un poco energizado/a"
											}, 
											{
												value: 3,
												text: "Medianamente Energizado/a"
											}, 
											{
												value: 4,
												text: "Bien Energizado/a Me levanto sintiéndome renovado/a"
											},
											{
												value: 5,
												text: "Totalmente Energizado/a"
											}
										]
									},
									{
										askNumber:13,
										variation:'large',
										text: "<b class='resaltado'>En tu experiencia, una noche típica consiste en:</b>",
										options: [
											{
												value: 1,
												text: "Luchando desesperadamente por conciliar el sueño."
											}, 
											{
												value: 2,
												text: "Dormir ligeramente con muchas interrupciones (levantarse para ir al baño, dejar entrar a la mascota, etc.)."
											}, 
											{
												value: 3,
												text: "Dormir profundamente toda la noche con una o dos interrupciones (levantarse para ir al baño, dejar entrar a la mascota, etc.)."
											}, 
											{
												value: 4,
												text: "Dormir profundamente hasta que me despierto temprano en la mañana (levantarse para ir al baño, dejar entrar a la mascota, etc.) y luego dormitar o dormir ligeramente hasta que tengo que levantarme."
											},
											{
												value: 5,
												text: "Dormir profundamente desde el momento en que me quedo dormido hasta el segundo en que me despierto por la mañana"
											}
										]
									},
									{
										askNumber:14,
										variation:'',
										text: "Pensando en una noche típica del último mes,<b class='resaltado'>¿Cómo calificarías la calidad de tu sueño?</b>",
											options: [	
											{
												value: 1,
												text: "Muy Malo"
											}, 
											{
												value: 2,
												text: "Malo"
											}, 
											{
												value: 3,
												text: "Regular"
											}, 
											{
												value: 4,
												text: "Bueno"
											},
											{
												value: 5,
												text: "Excelente"
											}
										]
									},
								]}
							/>

							<Multiple
								change={answerChange}
								title={"Regularidad del sueño"}
								description={``}
								ask={""}
								subasks={[
									{
										askNumber:15,
										variation:'large',
										text: "<b class='resaltado'>¿Te acuestas aproximadamente a la misma hora todas las noches?</b><br> (Considera el domingo por la noche una noche entre semana y el viernes por la noche una noche de fin de semana).",
										options: [
											{
												value: 1,
												text: "No, siempre me acuesto a dormir todos los días en un horario distinto"
											}, 
											{
												value: 2,
												text: "No, solamente hay uno o dos días a la semana en los que me acuesto a la misma hora."
											}, 
											{
												value: 3,
												text: "No, solamente hay tres o cuatro días a la semana en los que me acuesto a la misma hora."
											}, 
											{
												value: 4,
												text: "Sí, aunque hay una o dos noches a la semana en las cuales no me acuesto en mi horario habitual"
											},
											{
												value: 5,
												text: "Sí, me acuesto aproximadamente a la misma hora todas las noches."
											}
										]
									},
									{
										askNumber:16,
										variation:'large',
										text: "<b class='resaltado'>¿Te despiertas aproximadamente a la misma hora todas los días?</b>",
										options: [
											{
												value: 1,
												text: "No, me despierto todos los días en un horario distinto"
											}, 
											{
												value: 2,
												text: "No, solamente hay uno o dos días a la semana en los que me despierto a la misma hora."
											}, 
											{
												value: 3,
												text: "No, solamente hay tres o cuatro días a la semana en los que me despierto a la misma hora."
											}, 
											{
												value: 4,
												text: "Sí, aunque hay uno o dos días a la semana en las cuales no me levanto en mi horario habitual"
											},
											{
												value: 5,
												text: "Sí, me despierto aproximadamente a la misma hora todas los días."
											}
										]
									},
								]}
							/>

							<Multiple
								change={answerChange}
								title={"Problemas de sueño"}
								description={``}
								ask={""}
								subasks={[
									{
										askNumber:17,
										variation:'',
										text: "En los últimos 30 días <b class='resaltado'>¿Cada cuánto tiempo sufriste de algún problema que interrumpa la calidad de tu sueño?</b><br> (Insomnio, Bruxismo, Pesadilla, Ronquidos, etc.)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "Dos o tres veces a la semana"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Una vez al mes"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:18,
										variation:'',
										text: "Pensando en una noche típica del último mes <b class='resaltado'>¿cuántos minutos tardas en conciliar el sueño?</b>",
										options: [
											{
												value: 1,
												text: "Más de 45 minutos"
											}, 
											{
												value: 2,
												text: "Entre 36 y 45 minutos"
											}, 
											{
												value: 3,
												text: "Entre 26 y 35 minutos"
											}, 
											{
												value: 4,
												text: "Entre 16 y 25 minutos"
											},
											{
												value: 5,
												text: "Maxímo 15 minutos"
											}
										]
									},
									{
										askNumber:19,
										variation:'',
										text: "Pensando en una noche típica del último mes, si te despiertas en medio de la noche, <b class='resaltado'>¿cuántos minutos estás despierto/a en total?</b>",
										options: [
											{
												value: 1,
												text: "Más de 45 minutos"
											}, 
											{
												value: 2,
												text: "Entre 31 y 45 minutos"
											}, 
											{
												value: 3,
												text: "Entre 16 y 30 minutos"
											}, 
											{
												value: 4,
												text: "Entre 6 y 15 minutos"
											},
											{
												value: 5,
												text: "No me despierto o me despierto por menos de 5 minutos"
											}
										]
									},
									{
										askNumber:20,
										variation:'',
										text: "Pensando en el último mes, <b class='resaltado'>¿En cuántas noches en total tuviste problemas para dormir?</b>",
										options: [
											{
												value: 1,
												text: "8 noches o más"
											}, 
											{
												value: 2,
												text: "6-7"
											}, 
											{
												value: 3,
												text: "4-5"
											}, 
											{
												value: 4,
												text: "1-3"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
								]}
							/>

							<Multiple
								change={answerChange}
								title={"Rutinas antes de dormir"}
								description={``}
								ask={"<b class='resaltado'>¿Con qué frecuencia realizas las siguientes actividades 2-3 horas antes de irte a dormir?</b>"}
								subasks={[
									{
										askNumber:21,
										variation:'',
										text: "Comer una comida pesada",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:22,
										variation:'',
										text: "Tomar bebidas estimulantes (Té, Café, etc.)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "Dos o tres veces a la semana"
											}, 
											{
												value: 3,
												text: "Una vez cada quince días"
											}, 
											{
												value: 4,
												text: "Una vez al mes"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:23,
										variation:'',
										text: "Tomar una infusión",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:24,
										variation:'',
										text: "Tomar alcohol",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:25,
										variation:'',
										text: "Hacer ejercicio fisico intenso",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:26,
										variation:'',
										text: "Hacer ejercicio fisico de baja intensidad (yoga de baja intensidad , estiramiento etc..)",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},									
									{
										askNumber:27,
										variation:'',
										text: "Usar equipos con pantallas luminosas (TV, Smartphone, tablet, laptop, etc.)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:28,
										variation:'',
										text: "Hacer actividad sexual",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:29,
										variation:'',
										text: "Leer un libro en papel",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:30,
										variation:'',
										text: "Hacer o pensar en tareas de trabajo",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:31,
										variation:'',
										text: "Meditar, practicar Mindfulness o hacer ejercicios de respiración",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:32,
										variation:'',
										text: "Escuchar musica relajada",
										options: [
											{
												value: 1,
												text: "Nunca"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:33,
										variation:'',
										text: "Jugar con consolas de juego (Playstation, Xbox etc..)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},

								]}
							/>

							
							<Multiple
								change={answerChange}
								title={"Ambiente para dormir"}
								description={``}
								ask={""}
								subasks={[
									{
										askNumber:34,
										variation:'large',
										text: "<b class='resaltado'>¿A qué temperatura mantienes el cuarto mientras duermes?</b>",
										options: [
											{
												value: 1,
												text: "Por encima de 78°F 26°C ó no presto atención a la temperatura en mi habitación"
											}, 
											{
												value: 2,
												text: "Entre 75°F - 78°F / 24°C - 26°C "
											}, 
											{
												value: 3,
												text: "Menos de 54°F / 12°C"
											}, 
											{
												value: 3,
												text: "Entre 54°F - 61°F / 12°C - 16°C"
											},
											{
												value: 4,
												text: "Entre 68°F - 75°F / 20°C - 24°C"
											}
											,
											{
												value: 5,
												text: "Entre 57°F - 68°F / 16°C - 20°C"
											}
										]
									},
									{
										askNumber:35,
										variation:'large',
										text: "<b class='resaltado'>¿Qué tan iluminada está tu habitación mientras duermes?</b>",
										options: [
											{
												value: 1,
												text: "Prefiero dormir con la luz principal de la habitación encendida o mi pareja mantiene la luz encendida"
											}, 
											{
												value: 2,
												text: "Me duermo con la tv encendida o mantengo las persianas abiertas para que entre la luz de la luna."
											}, 
											{
												value: 3,
												text: "Dejo las persianas medio abiertas o mantengo un temporizador para apagar la tv"
											}, 
											{
												value: 4,
												text: "Durante la noche dejo que mi teléfono y/o tableta se puedan iluminar o Mantengo solo un camino iluminado hacia el baño."
											},
											{
												value: 5,
												text: "En mi cuarto logro de crear un ambiente de oscuridad total"
											}
										]
									},
									{
										askNumber:36,
										variation:'',
										text: "Es la hora de dormir y estás acostado/a en tu acogedora cama listo/a para ir a la tierra de los sueños. <br><b class='resaltado'>¿Con qué frecuencia escuchas los siguientes sonidos?</b><br><br>Ruido (Personas hablando, pareja roncando, mascotas moviéndose, TV o radio, bebé llorando, ruido de trenes o aviones, grifo goteando, etc.)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:37,
										variation:'',
										text: "Vibración o notificaciones de smartphone",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
									{
										askNumber:38,
										variation:'',
										text: "Ruidos de electrodomésticos (Lavadora, licuadora, lavaplatos, etc.)",
										options: [
											{
												value: 1,
												text: "Diariamente"
											}, 
											{
												value: 2,
												text: "4 o 5 veces por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "Una vez por semana"
											},
											{
												value: 5,
												text: "Nunca"
											}
										]
									},
								]}
							/>

							<Multiple
								change={answerChange}
								title={"Siestas"}
								description={``}
								ask={""}
								subasks={[
									{
										askNumber:39,
										variation:'',
										text: "En una semana típica, <b class='resaltado'>¿con qué frecuencia tomas una siesta?</b>",
										options: [
											{
												value: 1,
												text: "No tomo siestas"
											}, 
											{
												value: 2,
												text: "Una vez por semana"
											}, 
											{
												value: 3,
												text: "2 o 3 veces por semana"
											}, 
											{
												value: 4,
												text: "4 o 5 veces por semana"
											},
											{
												value: 5,
												text: "Diariamente"
											}
										]
									},
									{
										askNumber:40,
										variation:'',
										text: "Si tomas siestas, <b class='resaltado'>¿cuánto tiempo duran cada una de ellas?</b>",
										options: [
											{
												value: 1,
												text: "No tomo siestas"
											}, 
											{
												value: 1,
												text: "Tomo por más de 45 minutos"
											}, 
											{
												value: 2,
												text: "De 36 a 45 minutos"
											}, 
											{
												value: 3,
												text: "De 25 a 35 minutos"
											}, 
											{
												value: 4,
												text: "De 10 a 19 minutos"
											},
											{
												value: 5,
												text: "Entre 20 y 26 minutos"
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

						<div className="titulo-encuesta">CUERPO EN MOVIMIENTO</div>

						<p className="texto-extra">Estamos interesados en conocer los tipos de actividades físicas que las personas realizan como parte de su vida diaria. Las siguientes preguntas se referirán al tiempo que destinaste a estar físicamente activo/a en los últimos 30 días.</p>
						<p className="texto-extra">Responde cada pregunta incluso si no te consideras una persona activa.</p>
						<p className="texto-extra">Por favor, piensa acerca de las actividades que realizas en tu trabajo, como parte de sus tareas en el hogar o en el jardín, moviéndote de un lugar a otro, o en tu tiempo libre para la recreación, el ejercicio o el deporte.</p>
						<p className="texto-extra">Para describir la intensidad de la actividad física, se utilizan dos términos (Moderada y Vigorosa):</p>
						<p className="texto-extra">Las actividades moderadas se refieren a actividades que requieren un esfuerzo físico moderado que acelera de forma perceptible el ritmo cardiaco.</p>
						<p className="texto-extra">Las actividades físicas vigorosas se refieren a actividades que requieren una gran cantidad de esfuerzo y provoca una respiración rápida y un aumento sustancial de la frecuencia cardíaca.</p>
						
						<Multiple
							change={answerChange}
							title={"Movimiento Diario Ligero"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:41,
									variation:'',
									text: "Fuera de tu trabajo habitual, <b class='resaltado'>¿cuántas horas dedicas a la semana a actividades livianas como reparaciones del hogar, jardinería liviana, limpieza de la casa, paseo con animales domesticos, desplazar pequenas cargas (max.20kg), etc.?</b>",
									options: [
										{
											value: 1,
											text: "Menos de 5 horas"
										}, 
										{
											value: 2,
											text: "5-6 horas"
										}, 
										{
											value: 3,
											text: "6-7 horas"
										}, 
										{
											value: 4,
											text: "7-8 horas"
										},
										{
											value: 5,
											text: "Más de 8 horas"
										}
									]
								},
								{
									askNumber:42,
									variation:'',
									text: "En los ultimos 30 dias <br><b class='resaltado'>¿Cuántos minutos caminaste por dia en promedio?</b><br> Solo considera el tiempo que pasaste caminando fuera de tu hogar, por ejemplo, para trasladarte de un lugar a otro o cualquier otra caminata que podrías hacer solamente por recreación, el deporte, el ejercicio o el ocio.",
									options: [
										{
											value: 1,
											text: "Menos de 10 minutos"
										}, 
										{
											value: 2,
											text: "de 11 a 30 minutos"
										}, 
										{
											value: 3,
											text: "de 31 a 40 minutos"
										}, 
										{
											value: 4,
											text: "de 41 a 50 minutos"
										},
										{
											value: 5,
											text: "Más de 50 minutos"
										}
									]
								},
								{
									askNumber:43,
									variation:'',
									text: "Estirar y relajarse <br> En los últimos 30 días: <b class='resaltado'> ¿Con qué frecuencia durante tu día habitual te tomas el tiempo para estirar y relajar el cuerpo?</b>",
									options: [
										{
											value: 1,
											text: "No me estiro/relajo el cuerpo"
										}, 
										{
											value: 2,
											text: "1 vez al día"
										}, 
										{
											value: 3,
											text: "2 veces al día"
										}, 
										{
											value: 4,
											text: "3 veces al día"
										},
										{
											value: 5,
											text: "Más de 3 veces al día"
										}
									]
								},

							]}
						/>
						<ModeloUno
								askNumber={44}
								change={answerChange}
								title={"Actividad Física Moderada"}
								ask={"Durante los últimos 30 días: <br> <b class='resaltado'>¿cuántas veces a la semana hiciste 30 minutos o más de actividad física de intensidad moderada en promedio?</b><br> Tres sesiones de 10 minutos (o dos sesiones de 15 minutos) cuentan como una sesión de 30 minutos.<br> Las actividades moderadas se refieren a actividades que requieren un esfuerzo físico moderado que acelera de forma perceptible el ritmo cardiaco.<br> El ejercicio debe ser al menos moderadamente intenso, por ejemplo caminar rapido, bailar, participar activamente en deportes y juegos con niños, nadar lento, paseo en bicicleta, hacer yoga meditativo o pilates. Las actividades deportivas no están incluidas."}
								description={""}
								options={[
									{
										value: 1,
										text: "Menos de 2 veces a la semana"
									}, 
									{
										value: 2,
										text: "2 a 3 veces a la semana"
									}, 
									{
										value: 3,
										text: "4 a 5 veces a la semana"
									}, 
									{
										value: 4,
										text: "6 a 8 veces a la semana"
									},
									{
										value: 5,
										text: "Más de 8 veces a la semana"
									}
								]}
						/>
						<ModeloUno
								askNumber={45}
								change={answerChange}
								title={"Actividad Física Vigorosa"}
								ask={"Durante los últimos 30 días: <br><b class='resaltado'>¿cuántas veces a la semana hiciste 30 minutos o más de actividad física de intensidad vigorosa en promedio?</b><br> Tres sesiones de 10 minutos (o dos sesiones de 15 minutos) cuentan como una sesión de 30 minutos.<br>Las actividades físicas vigorosas se refieren a actividades que requieren una gran cantidad de esfuerzo y provoca una respiración rápida y un aumento sustancial de la frecuencia cardíaca.<br>El ejercicio debe ser intenso y vigoroso, por ejemplo: aeróbicos, correr, deportes y juegos competitivos como basquetbol, voleibol, fútbol, nadar con intensidad, practicar ciclismo, levantar pesas, trabajos intensos de pala y de excavacion, etc.<br>Se incluyen todas las actividades deportivas de esfuerzo vigoroso."}
								description={""}
								options={[
									{
										value: 1,
										text: "Menos de 2 veces a la semana"
									}, 
									{
										value: 2,
										text: "2 a 3 veces a la semana"
									}, 
									{
										value: 3,
										text: "4 a 5 veces a la semana"
									}, 
									{
										value: 4,
										text: "6 a 8 veces a la semana"
									},
									{
										value: 5,
										text: "Más de 8 veces a la semana"
									}
								]}
						/> 
						
						<Multiple
							change={answerChange}
							title={"Tiempo Sentado/a"}
							description={`<br>Esta pregunta es acerca del tiempo que pasaste sentado/a durante los últimos 30 días. 
							Esto incluye el tiempo dedicado al trabajo, en el hogar, en una clase y durante el tiempo libre. 
							Puede incluir por ejemplo el tiempo que pasaste sentado/a: ante un escritorio, en compania de amigos, leyendo, viajando en carro bus o tren, jugando a las cartas o juegos de mesa, sentado o recostado mirando la televisión, etc..
							No incluyas el tiempo dedicado a dormir o tomar una siesta.<br><br><b class='resaltado'>En los últimos 30 días en promedio: ¿cuánto tiempo pasaste sentado/a o acostado/a en las siguientes actividades por día?</b>`}
							ask={""}
							subasks={[
								{
									askNumber:46,
									variation:'',
									text: "<br>Seccion 1 - Comidas <br>Esta sección se refiere al tiempo total que pasaste sentado/a comiendo (desayuno, almuerzo, cena) durante el día. <br><br>",
									options: [
										{
											value: 1,
											text: "Menos de 30 min /más de 3 horas"
										}, 
										{
											value: 2,
											text: "Entre 30 minutos y 1 hora"
										}, 
										{
											value: 3,
											text: "Entre 1 y 2 horas"
										}, 
										{
											value: 4,
											text: "Entre 2 y 2:30 horas"
										},
										{
											value: 5,
											text: "Entre 2:30 horas y 3 horas"
										}
									]
								},
								{
									askNumber:47,
									variation:'',
									text: "<b class='resaltado'>En los últimos 30 días en promedio: ¿cuánto tiempo pasaste sentado/a o acostado/a en las siguientes actividades por día?</b><br><br>Seccion 2 - Transporte <br>Esta sección se refiere al tiempo que pasaste sentado/a durante el transporte (viajando en automóvil, autobús, tren, en motocicleta, etc.). <br><br> Desplazamiento hacia y desde el trabajo",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:48,
									variation:'',
									text: "Transporte como parte del trabajo",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:49,
									variation:'',
									text: "Transporte personal y privado",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:50,
									variation:'',
									text: "<b class='resaltado'>En los últimos 30 días en promedio: ¿cuánto tiempo pasaste sentado/a o acostado/a en las siguientes actividades por día?</b><br><br>Seccion 3 - Trabajo <br>Esta sección trata sobre el tiempo que pasaste sentado durante tu ocupación o trabajo.<br><br>NO INCLUYE:<br> El tiempo que pasas sentado/a para el transporte (en un automóvil, autobús, tren, en una motocicleta, etc.) ya sea para viajar hacia y desde esta ocupación, o como parte de esta ocupación. Desayuno, almuerzo o cena. Esto fue parte de las secciónes 1 y 2 <br><br>Horario de trabajo matutino (hasta las 12pm)",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "1 hora - 2h"
										},
										{
											value: 5,
											text: "Menos de 1 hora"
										}
									]
								},
								{
									askNumber:51,
									variation:'',
									text: "Horario de tarde (después de las 12:00 pm)",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "1 hora - 2h"
										},
										{
											value: 5,
											text: "Menos de 1 hora"
										}
									]
								},
								{
									askNumber:52,
									variation:'',
									text: "En un día tipico mientras trabajas <br><b class='resaltado'>¿Cada cuánto tiempo interrumpes estar sentado/a, por ejemplo parándote, caminando en algún lugar, haciendo estiramientos, moviéndote para buscar agua, etc.?</b>",
									options: [
										{
											value: 1,
											text: "Más de 2 horas"
										}, 
										{
											value: 2,
											text: "Cada dos horas"
										}, 
										{
											value: 3,
											text: "Cada hora y media"
										}, 
										{
											value: 4,
											text: "Cada hora"
										},
										{
											value: 5,
											text: "Cada 25 o 30 minutos"
										}
									]
								},
								{
									askNumber:53,
									variation:'',
									text: "<b class='resaltado'>En los últimos 30 días en promedio: ¿cuánto tiempo pasaste sentado/a o acostado/a en las siguientes actividades por día?</b><br><br>Seccion 4 - Otras actividades. <br>Esta última sección se refiere al tiempo que pasaste sentado/a o acostado/a durante otras actividades. Recuerda, cada período de estar sentado/a solo debe ingresarse una vez. <br><br> Por ejemplo, si pasaste una hora sentado/a en el sofá leyendo un libro mientras escuchabas música, cuenta este tiempo como una hora leyendo si este era tu enfoque principal y no lo cuentes como una hora escuchando música. <br><br>Viendo la televisión/jugando videojuegos",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:54,
									variation:'',
									text: "Usando de la computadora para tareas no relacionadas con el trabajo",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:55,
									variation:'',
									text: "Leyendo",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:56,
									variation:'',
									text: "Escuchando música",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:57,
									variation:'',
									text: "Socializar / Hablar con la gente",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
										}
									]
								},
								{
									askNumber:58,
									variation:'',
									text: "Otras actividades no mencionadas",
									options: [
										{
											value: 1,
											text: "Más de 5 horas"
										}, 
										{
											value: 2,
											text: "3 - 5 horas"
										}, 
										{
											value: 3,
											text: "1 - 3 horas"
										}, 
										{
											value: 4,
											text: "15 minutos - 1 hora"
										},
										{
											value: 5,
											text: "Menos de 15 minutos"
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

						<div className="titulo-encuesta">NUTRICION E HIDRATACION</div>
						<Multiple
							change={answerChange}
							title={"Hidratación"}
							description={`Con este sencillo cuestionario que te proponemos a continuación podrás evaluar tu consumo de líquidos diario.`}
							ask={""}
							subasks={[
								{
									askNumber:59,
									variation:'',
									text: "En los últimos 30 días: <br>En promedio, <b class='resaltado'> ¿cuántos vasos de líquido (agua, refresco, jugo, leche, café, té) consumiste por dia?</b>",
									options: [
										{
											value: 1,
											text: "Menos de 5"
										},
										{
											value: 2,
											text: "5 - 8"
										}, 										 
										{
											value: 3,
											text: "8-11"
										}, 
										{
											value: 4,
											text: "11-14"
										},
										{
											value: 5,
											text: "15"
										},
										{
											value: 2,
											text: "más de 15"
										}
									]
								},
								{
									askNumber:60,
									variation:'',
									text: "En los últimos 30 días: <br>En promedio, durante tu día laboral normal, <b class='resaltado'>¿cuántos vasos de solo agua potable, de manantial o de grifo consumiste?</b><br>un vaso estándar de agua equivale aproximadamente a 8 onzas o 200 mililitros",
									options: [
										{
											value: 1,
											text: "Menos de 5"
										}, 
										{
											value: 2,
											text: "5 - 8"
										}, 
										{
											value: 3,
											text: "8-11"
										}, 
										{
											value: 4,
											text: "11-14"
										},
										{
											value: 5,
											text: "15"
										},
										{
											value: 2,
											text: "más de 15"
										}
									]
								},
								{
									////imagenes
									askNumber:61,
									variation:'images',
									text: "¡Hagamos una prueba para comprobar tus niveles actuales de hidratación! Te invitamos a ir al baño ahora mismo. Antes de enjuagar, verifica: <br><b class='resaltado'>¿cómo es el color de tu orina? </b><br>Selecciona aquí el color de tu orina.",
									options: [
										{
											value: 5,
											img: bienHidratadoImg,
											text: "Bien Hidratado/a"
										}, 
										{
											value: 4,
											img: hidratadoImg,
											text: "Hidratado/a"
										}, 
										{
											value: 3,
											img: leveDeshidratacionImg,
											text: "Leve deshidratación"
										}, 
										{
											value: 2,
											img: deshidratacionImg,
											text: "Deshidratación"
										},
										{
											value: 1,
											img: severamenteDeshidratadoImg,
											text: "Severamente deshidratado/a"
										}
									]
								},
								{
									askNumber:62,
									variation:'',
									text: "En los últimos 30 días: en promedio,<b class='resaltado'> ¿cuántas tazas de café bebiste a diario?</b>",
									options: [
										{
											value: 1,
											text: "Más de 5 tazas",
										}, 
										{
											value: 2,
											text: "4 o 5 tazas"
										}, 
										{
											value: 3,
											text: "2 o 3 tazas"
										}, 
										{
											value: 4,
											text: "1 taza"
										},
										{
											value: 5,
											text: "0"
										},
										{
											value: 5,
											text: "No tomo cafe"
										}
									]
								},
							]}
						/>
						
						<Multiple
							change={answerChange}
							title={"Habitos nutricionales"}
							description={`El propósito de esta sección es identificar tus patrones alimenticios en los últimos 30 días.<br> Las propiedades de los alimentos que ingerimos influyen decisivamente en el estado de nuestra salud. Si respondes este sencillo cuestionario aprenderás a sacarle mayor partido a lo que comes y mejorarás tu nutrición.<br><br>`}
							ask={""}
							subasks={[
								{
									askNumber:63,
									variation:'',
									text: `Califica en una escala del 1 al 5, siendo 1 "muy poca atención" y 5 "muchas atención", cuánta atención prestaste a tu dieta saludable en los últimos 30 días.`,
									options: [
										{
											value: 1,
											text: "1"
										}, 
										{
											value: 2,
											text: "2"
										}, 
										{
											value: 3,
											text: "3"
										}, 
										{
											value: 4,
											text: "4"
										},
										{
											value: 5,
											text: "5"
										}
									]
								},
								{
									askNumber:64,
									variation:'',
									text: "Saltarse las comidas	<br>En los últimos 30 días, cuántas veces por semana: Saltaste una comida (desayuno, almuerzo y/o cena)",
									options: [
										{
											value: 1,
											text: "6-7 días"
										}, 
										{
											value: 2,
											text: "4-5 días"
										}, 
										{
											value: 3,
											text: "2-3 días"
										}, 
										{
											value: 4,
											text: "1 día"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:65,
									variation:'',
									text: "Comer trabajando: <br>En los últimos 30 días, cuántas veces por semana: Comiste mientras trabajabas",
									options: [
										{
											value: 1,
											text: "6-7 días"
										}, 
										{
											value: 2,
											text: "4-5 días"
										}, 
										{
											value: 3,
											text: "2-3 días"
										}, 
										{
											value: 4,
											text: "1 día"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:66,
									variation:'',
									text: "Fruta <br> En los últimos 30 días: en promedio, <br><b class='resaltado'>¿cuántas raciones de fruta (incluidas frutas frescas, congeladas y enlatadas) comiste habitualmente cada día?</b><br>1 porción de fruta = manzana / naranja / plátano de tamaño mediano o 2 albaricoques / kiwi o ½ taza de fruta enlatada",
									options: [
										{
											value: 1,
											text: "1"
										}, 
										{
											value: 2,
											text: "2"
										}, 
										{
											value: 3,
											text: "3"
										}, 
										{
											value: 4,
											text: "4"
										},
										{
											value: 5,
											text: "5"
										}
									]
								},
								{
									askNumber:67,
									variation:'',
									text: "Vegetales <br> En los últimos 30 días: en promedio, <br><b class='resaltado'>¿cuántas porciones de verduras (incluidas las verduras frescas, congeladas y enlatadas) comiste habitualmente cada día?</b><br>1 porción de verduras = ½ taza de verduras cocidas o 1 taza de verduras para ensalada",
									options: [
										{
											value: 1,
											text: "1"
										}, 
										{
											value: 2,
											text: "2"
										}, 
										{
											value: 3,
											text: "3"
										}, 
										{
											value: 4,
											text: "4"
										},
										{
											value: 5,
											text: "5"
										}
									]
								},
								{
									askNumber:68,
									variation:'',
									text: "Legumbres <br> En los últimos 30 días: en promedio, <br><b class='resaltado'>¿cuántas porciones de legumbres comiste en promedio por semana?</b><br>1 porción de legumbres = 1 taza de 150gr",
									options: [
										{
											value: 1,
											text: "1"
										}, 
										{
											value: 2,
											text: "2"
										}, 
										{
											value: 3,
											text: "3"
										}, 
										{
											value: 4,
											text: "4"
										},
										{
											value: 5,
											text: "5"
										}
									]
								},
								{
									askNumber:69,
									variation:'',
									text: "Carne Oscura y Embutidos <br> En los ultimos 30 dias <br><b class='resaltado'>¿Con que frecuencia comiste carnes grasas o embutidos por semana?</b>",
									options: [
										{
											value: 1,
											text: "6-7 días"
										}, 
										{
											value: 2,
											text: "4-5 días"
										}, 
										{
											value: 3,
											text: "2-3 días"
										}, 
										{
											value: 4,
											text: "1 día"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:70,
									variation:'',
									text: "Comida chatarra/grasa: <br> En los últimos 30 días: en promedio, <br><span class='resaltado'>¿cuántas dias de la semana comiste habitualmente comida chatarra con alto contenido de grasa?</span>",
									options: [
										{
											value: 1,
											text: "6-7 días"
										}, 
										{
											value: 2,
											text: "4-5 días"
										}, 
										{
											value: 3,
											text: "2-3 días"
										}, 
										{
											value: 4,
											text: "1 día"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:71,
									variation:'',
									text: "Frito <br> <b class='resaltar'>¿Cuántas veces a la semana comiste comida frita o snacks empacados con alto contenido de grasa/sal o azúcar?</b>",
									options: [
										{
											value: 1,
											text: "Más de 6 veces"
										}, 
										{
											value: 2,
											text: "5 o 6 veces"
										}, 
										{
											value: 3,
											text: "3 o 4 veces"
										}, 
										{
											value: 4,
											text: "1 o 2 veces"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:72,
									variation:'',
									text: "Sodas <br> En promedio en los últimos 30 días <br><span class='resaltado'>¿Cuántas veces a la semana ingeriste sodas -refrescos- regulares, te endulzado, jugo, bebidas energéticas/deportivas o cualquier otra bebida endulzada con azúcar?</span>",
									options: [
										{
											value: 1,
											text: "Más de 6 veces"
										}, 
										{
											value: 2,
											text: "5 o 6 veces"
										}, 
										{
											value: 3,
											text: "3 o 4 veces"
										}, 
										{
											value: 4,
											text: "1 o 2 veces"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:73,
									variation:'',
									text: "Azucares <br> En promedio en los últimos 30 días <br><span class='resaltado'>¿cuántas veces a la semana comiste dulces o postres como chocolate/ helado o cualquier otro dulce?</span><br>(el azúcar en el café también cuenta)",
									options: [
										{
											value: 1,
											text: "Más de 6 veces"
										}, 
										{
											value: 2,
											text: "5 o 6 veces"
										}, 
										{
											value: 3,
											text: "3 o 4 veces"
										}, 
										{
											value: 4,
											text: "1 o 2 veces"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:74,
									variation:'',
									text: "Alimentos Procesados <br> Productos comestibles procesados: se refieren a aquellos productos alterados por la adición o introducción de sustancias (sal, azúcar, aceite, preservantes y/o aditivos) que cambian la naturaleza de los alimentos originales, con el fin de prolongar su duración, hacerlos más agradables o atractivos. <br> En los ultimos 30 dias  <br><span class='resaltado'>¿Cuantas veces comiste alimentos procesados por semana?</span><br>",
									options: [
										{
											value: 1,
											text: "Más de 6 veces"
										}, 
										{
											value: 2,
											text: "5 o 6 veces"
										}, 
										{
											value: 3,
											text: "3 o 4 veces"
										}, 
										{
											value: 4,
											text: "1 o 2 veces"
										},
										{
											value: 5,
											text: "Nunca"
										}
									]
								},
								{
									askNumber:75,
									variation:'',
									text: "Pescado <br> En los ultimos 30 dias <br><span class='resaltado'>¿Con que frecuencia comiste pescados altos en omega 3 por semana?</span><br> (Salmón, Sardina,  Caballa del Atlántico,  Bacalao, Arenque, Trucha de lago, etc.)",
									options: [
										{
											value: 1,
											text: "Nunca"
										}, 
										{
											value: 2,
											text: "1 día"
										}, 
										{
											value: 3,
											text: "2 días"
										}, 
										{
											value: 4,
											text: "3 días"
										},
										{
											value: 5,
											text: "4 días"
										}
									]
								},
								{
									askNumber:76,
									variation:'',
									text: "Huevos <br> En los ultimos 30 dias <br><span class='resaltado'>¿cuántos huevos comiste por semana?</span>",
									options: [
										{
											value: 1,
											text: "Más de 4"
										}, 
										{
											value: 2,
											text: "3"
										}, 
										{
											value: 3,
											text: "2"
										}, 
										{
											value: 4,
											text: "1"
										},
										{
											value: 5,
											text: "0"
										}
									]
								},

							]}
						/>

						<Multiple
							change={answerChange}
							title={"Tiempo para comer"}
							description={``}
							ask={""}
							subasks={[
								{
									askNumber:77,
									variation:'large',
									text: "En los últimos 30 días: en promedio, <br> durante los días hábiles de trabajo <br> <span class='resaltado'>¿Qué tan rápido comiste tus desayuno?</span>",
									options: [
										{
											value: 1,
											text: "En menos de 10 minutos ó no desayuné	"
										}, 
										{
											value: 2,
											text: "Entre 10 y 20 minutos"
										}, 
										{
											value: 3,
											text: "Entre 20 y 30 minutos"
										}, 
										{
											value: 4,
											text: "Entre 30 y 40 minutos"
										},
										{
											value: 5,
											text: "Entre 40 minutos y 1 hora"
										}
									]
								},
								{
									askNumber:78,
									variation:'large',
									text: "<span class='resaltado'>¿Qué tan rápido comiste tus almuerzos?</span>",
									options: [
										{
											value: 1,
											text: "En menos de 10 minutos ó no almorcé"
										}, 
										{
											value: 2,
											text: "Entre 10 y 20 minutos"
										}, 
										{
											value: 3,
											text: "Entre 20 y 30 minutos"
										}, 
										{
											value: 4,
											text: "Entre 30 y 40 minutos"
										},
										{
											value: 5,
											text: "Entre 40 minutos y 1 hora"
										}
									]
								},
								{
									askNumber:79,
									variation:'large',
									text: "<span class='resaltado'>¿Qué tan rápido comiste tus cenas?</span>",
									options: [
										{
											value: 1,
											text: "En menos de 10 minutos ó no almorcé"
										}, 
										{
											value: 2,
											text: "Entre 10 y 20 minutos"
										}, 
										{
											value: 3,
											text: "Entre 20 y 30 minutos"
										}, 
										{
											value: 4,
											text: "Entre 30 y 40 minutos"
										},
										{
											value: 5,
											text: "Entre 40 minutos y 1 hora"
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
export default Fisica