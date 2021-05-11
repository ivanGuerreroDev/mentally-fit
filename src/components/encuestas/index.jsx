import React, { useEffect, useState } from "react";

import Fisica from "./fisica"
import Mental from "./mental"
import Emocional from "./emocional"
import Espiritual from "./espiritual"

const Encuestas = ({ encuesta, pagina }) => {
	
	return (
		<>
			{
				encuesta === "fisica"
					?
					<Fisica pagina={pagina}/>
					: null
			}
			{
				encuesta==="mental"
					?
						<Mental pagina={pagina}/>
					:null
			}
			{
				encuesta==="emocional"
					?
						<Emocional pagina={pagina} />
					:null
			}
			{
				encuesta==="espiritual"
					?
						<Espiritual pagina={pagina}/>
					:null
			}
		</>
	)
}

export default Encuestas