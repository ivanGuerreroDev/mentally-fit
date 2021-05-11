import React, { useState, useEffect } from "react";
import NumberInput from "../../NumberInput";


const Bmi = ({
	change,
	askNumber
}) => {
	const [height, setHeight] = useState("")
	const [weight, setWeight] = useState("")

	const rangos = (valor) => {
		if(valor < 16 || valor > 40){
			return 1
		}
		if( valor >= 30 && valor < 40 ){
			return 2
		}
		if( (valor >= 27.5 && valor < 30) || (valor>=16 && valor < 17) ){
			return 3
		}
		if( (valor >= 25 && valor < 27.5) || (valor>=17 && valor < 18.5) ){
			return 4
		}
		if( valor >= 18.5 && valor < 25 ){
			return 5
		}
		
	}
	const calcbmi = () =>{
		var altura = height,
			peso = weight;
		var alturaUnit = "cm",
			pesoUnit = "kg";
		if(altura.includes("pies"))  alturaUnit = "pies"
		if(altura.includes("cm"))  alturaUnit = "cm"
		if(peso.includes("kg"))  pesoUnit = "kg"
		if(peso.includes("libras"))  pesoUnit = "libras"
		if(altura!=="") altura = parseFloat(altura.split(alturaUnit)[0])
		if(peso!=="") peso = parseFloat(peso.split(pesoUnit)[0])
		
		if(alturaUnit === "pies") altura = altura * 30.48
		if(alturaUnit === "cm") altura = altura / 100
		if(pesoUnit === "libras") peso = peso / 2.205
		if(
			peso > 0 &&
			altura > 0 &&

			pesoUnit &&
			alturaUnit &&

			pesoUnit !== "" &&
			alturaUnit !== "" &&

			pesoUnit !== "elegir" &&
			alturaUnit !== "elegir"
		){
			const resultado = (peso / ( altura ** 2 )).toFixed(2)
			
			change( rangos(resultado), 1, 1, askNumber , altura + '_' + peso)
		}
		
	}

	const changeInput = (valor, type) => {
		/*var arrStr = Array.from(valor.toString());
		var result = ""
		var ceroend = false
		arrStr.forEach((e,i)=> {
			if(e !== "0" && !ceroend){
				
			}else{
				result += e
				ceroend = true
			}
		})*/
		if(type === "height"){
			setHeight(valor)
		}else if(type === "weight"){
			setWeight(valor)
		}
	}

	useEffect(()=>{
		calcbmi()
	},[height, weight])

	return (
		<>
			<span className="titulo-pregunta col-12 d-flex">
				<div className="cuadrado-pregunta" />
				BMI (Body Mass Index)/IMC Indice Masa Corporal
			</span>
			<div className="encuesta-pregunta row mb-4">
				<div className="size-input col-12 col-md-4">
					<span className="pregunta col-12 mt-2">
						<span className="texto-input">
							¿Cuánto mides? (en cm o pies)
						</span>
						<NumberInput
							name="IMCAltura"
							min="0"
							step=".01"
							value={height}
							units={["cm", "pies"]}
							onChange={(e)=>changeInput(e.value, "height")}
							
						/>
					</span>
				</div>
				<div className="size-input col-12 col-md-4">
					<span className="pregunta col-12 mt-2">
						<span className="texto-input">
							¿Cuánto pesas? (en kg o libras)
						</span>
						<NumberInput
							name="IMCPeso"
							min="0"
							step=".01"
							value={weight}
							onChange={(e)=>changeInput(e.value, "weight")}
							units={["kg", "libras"]}
						/>
					</span>
				</div>
			</div>
		</>
	)
}

export default Bmi