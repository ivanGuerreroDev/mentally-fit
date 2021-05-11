import React, { useState, useEffect } from "react";

const Bmi = ({
	title,
	options,
	change,
	askNumber,
	ask,
	description
}) => {
	const [selected, setSelected] = useState(false)
	const changeRadio =  (value, posicion, total, askNumber) => {
		setSelected({valor: parseInt(value), posicion: posicion})
		change(parseInt(value), posicion, total, askNumber)
	}
	return (
		<>
			<span className="titulo-pregunta col-12 d-flex mt-5">
				<div className="cuadrado-pregunta" />
				{title}
			</span>
			<div className="encuesta-pregunta row mb-4">
				<span className="pregunta col-12 mt-2 ">
					<div dangerouslySetInnerHTML={{__html: ask}}></div>
					{
						description?
							<p dangerouslySetInnerHTML={{__html: description}}></p>
						:null
					}
					<div className="opciones-preguntas mt-3 d-flex justify-content-between">
						{
							options && Array.isArray(options) ? options.map(
								(option, index)=>
								<div class="form-check form-check-inline col-12 col-md-2" data-key={index+1}>
									<input
										class="form-check-input"
										type="radio"
										id={"radio-"+askNumber+"-"+(index+1)+"-"+option.value}
										value={option.value}
										onChange={()=>changeRadio(option.value, (index+1), options.length, askNumber)}
										checked={selected.valor === option.value && selected.posicion === (index+1)}
									/>
									<label
										class="form-check-label"
										for={"radio-"+askNumber+"-"+(index+1)+"-"+option.value}
									>
										{option.text}
									</label>
								</div>
							) :null
						}
					</div>
				</span>
			</div>
		</>
	)
}

export default Bmi