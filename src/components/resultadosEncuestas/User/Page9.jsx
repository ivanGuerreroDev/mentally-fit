import imagenPlan from "../../../assets/26-layers.png";
import React, { useRef } from "react";

const Page9 = () => {

	return (
		<div className="page-container container-fluid">
			<div className="texto-container">
				<p>
					Teniendo en cuenta los resultados de tu Escaneo de Energía Personal y las recomendaciones de mejora te invitamos ahora a definir tu plan de acción SMART. Simplemente siga las instrucciones y concéntrese en un objetivo específico para aumentar tu posibilidades de mantener alto el compromiso hacia el desarrollo de tus propios niveles de energía.
				</p>
			</div>
			<p className="texto-plan-personal">Plan de energía personal</p>

			<img src={imagenPlan} alt="Imagen-plan" />

			<a
				className="boton-formulario-plan" href="https://energyscan.mflatam.com/static/pdf/SMART_ACTION_PLAN_TEMPLATE.pdf" download
			>
				DESCARGAR FORMULARIO
			</a>
		</div>
	);
};

export default Page9;
