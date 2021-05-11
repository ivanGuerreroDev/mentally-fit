import React, { useState, useEffect } from "react";

const Bmi = ({
	title,
	change,
	ask,
	askNumber,
	subasks,
	description
}) => {
	const [selected, setSelected] = useState({})

	const changeRadio =  (e, posicion, total, value) => {
		setSelected({...selected, [e]:{
			valor: value,
			posicion: posicion
		}})
		change(parseInt(value), posicion, total, e)
	}
	/*const setAskValue = (state) => {
		var validations = []
		subasks.forEach(subask=> validations.push(state[subask.text]))
		let checker = arr => arr.every(v => v === true);
		if(checker(validations)){
			change(validations.reduce((a, b) => a + b, 0), askNumber)
		}
	}*/

	useEffect(()=>{
		/*var radios = {}
		subasks.forEach((subask) => radios[subask.askNumber] = false)
		setSelected(radios)*/
	},[])
	return (
		<>
			<span className="titulo-pregunta col-12 d-flex mt-5">
				<div className="cuadrado-pregunta" />
				{title}
			</span>
			<div className="encuesta-pregunta mb-4">
				<span className="pregunta col-12 mt-2 ">
					<span className="resaltado"  dangerouslySetInnerHTML={{__html: ask}}>
					</span>
					{
						description?
							<span dangerouslySetInnerHTML={{__html: description}}></span>
						:null
					}
				</span>
				{
					subasks && Array.isArray(subasks) ? subasks.map(
						(subask, indice)=>
						<>
							<p dangerouslySetInnerHTML={{__html: subask.text}}></p>
							{
								subask.variation=="images"
							}
							<div 
								className={
									"opciones-preguntas mt-3 "+
									(
										!subask.variation||
										subask.variation===""||
										subask.variation==="regular"||
										subask.variation=="images"
											?"d-flex flex-wrap":""
									)
								}
							>
								{
									subasks && Array.isArray(subasks) ? subask.options.map(
										(option, index)=>
										<div 
											className={
												"form-check "+
												(
													!subask.variation||
													subask.variation===""||
													subask.variation==="regular"
														?"form-check-inline"
														:""
												)
											}
											key={index}
											style={
												subask.variation==="images"
												?
												{
													display: "flex",
													flexDirection: "column",
													margin:0, padding:0,
												}
												:null
											}
										>
											<input
												className={"form-check-input "+(subask.variation=="images"?"hidden":"")}
												type="radio"
												id={"radio-"+subask.askNumber+"-"+(index+1)+"-"+subask.text+"-"+option.value}
												value={option.value}
												onChange={(e)=>changeRadio(subask.askNumber, (index+1), subask.options.length, option.value)}
												checked={
													selected[subask.askNumber]  && 
													selected[subask.askNumber].posicion === index+1 &&
													selected[subask.askNumber].valor === option.value
												}
											/>
											{
												subask.variation=="images"?
												<img 
													src={option.img} 
													className={
														"img-option " +
														(
															selected[subask.askNumber]  && 
															selected[subask.askNumber].posicion === index+1 &&
															selected[subask.askNumber].valor === option.value
															?"activo":"")
													}
													onClick={(e)=>changeRadio(subask.askNumber, (index+1), subask.options.length, option.value)}
													for={"radio-"+subask.askNumber+"-"+(index+1)+"-"+subask.text+"-"+option.value}
												/>
												:null
											}
											<label
												class="form-check-label"
												for={"radio-"+subask.askNumber+"-"+(index+1)+"-"+subask.text+"-"+option.value}
											>
												{option.text}
											</label>
										</div>
										
									):null
								}
							</div>
						</>
					)
					:null
				}	
			</div>		
		</>
	)
}

export default Bmi