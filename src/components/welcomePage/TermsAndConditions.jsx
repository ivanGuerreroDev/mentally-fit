import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionAceptTerms } from "../../redux/reducersActions/authentication/authenticationAction";

const TermsAndConditions = () => {
      const history = useHistory();

      const dispatch = useDispatch();

      const user = useSelector(
            (state) => state.authenticationReducer.user
      );

      return (
            <form
                  onSubmit={(e) => {
                        dispatch(actionAceptTerms(user.user.id, user.token));
                        history.push("/user");
                  }}
                  className="termsAndConditionsContainer container"
            >
					<h3>Términos y Condiciones</h3>
                  <div className="content-terms">
                        
						<b>Aviso de privacidad</b>
                        <p>No utilizaremos en manera alguna la información recogida en las evaluaciones que realice. Además, cualquier dato o material que usted introduzca en la aplicación (imágenes, correos electrónicos, etc.) será tratado bajo la más estricta confidencialidad. Las siguientes normas de confidencialidad y política de privacidad han sido creadas para garantizar su seguridad y se exponen a continuación para informarle sobre la información que recopilamos, por qué lo hacemos y cómo la utilizamos. La política de privacidad de Mentally Fit está sujeta a las siguientes condiciones de uso. El aceptar expresa la adhesión plena y sin reservas del usuario a dichas condiciones de uso.</p>
						<b>Normas de confidencialidad para los usuarios.</b>
						<b>Datos Individuales</b>
						<p>La información de carácter personal consiste en cualquier dato que se pueda utilizar para identificar a un individuo, como por ejemplo el nombre, teléfono o la dirección de correo electrónico.</p>
						<b>Deber de secreto</b>
						<p>Mentally Fit no utilizará en manera alguna la información recogida en las encuestas que usted realice, usted tiene el control total sobre sus propios datos, estos se almacenan de forma segura en su cuenta personal, esta cuenta está protegida por su información personal de inicio de sesión. Sus datos individuales no son accesibles para nadie más, a menos que elija compartirlos con ellos.</p>
						<b>Confidencialidad de los encuestados</b>
						<p>En ningún caso su empresa tiene acceso a sus datos individuales. Los datos anonimizados se pueden utilizar para informes grupales si hay suficientes encuestados para garantizar que los resultados no se puedan rastrear hasta un individuo. La información que usted proporciona pasa a través de nuestro servicio y se aloja en nuestros servidores, pero no será utilizada de manera alguna de forma individualizada por su empresa.</p>
						<b>Resultados</b>
						<p>Dentro de su cuenta de Mentally Fit, puede completar encuestas para conocer mejor su situación actual. Estos resultados se almacenan en su perfil personal.</p>
						<b>Descarga de responsabilidad médica</b>
						<p>El contenido de la plataforma y los reportes que desprenden de ella no son un sustituto de una recomendación médica profesional directa, ni de un diagnóstico. La información contenida aquí no busca brindar un consejo médico físico, emocional o mental específico, ni otro tipo de consejo y asesoría. No somos profesionales médicos y nada en la plataforma y los reportes que desprenden de ella deberían interpretarse en el sentido contrario a ello.
							Se estima que los hechos y la información son precisos al momento en el que fueron publicados en la plataforma y los reportes que desprenden de ella. Toda la información provista en esta plataforma y los reportes que desprenden de ella persigue sólo propósitos informativos.  Usted accede a liberar de cualquier responsabilidad a Mentally Fit, sus dueños, agentes y empleados, liberándolos de reclamaciones por daños o injurias, incluyendo demandas legales y sus costos, incurridas por usted o causadas por terceros por usted, que se desprendan de los resultados discutidos en la plataforma y los reportes que desprenden de ella.
						</p>
						<b>Aceptación de participación en el proyecto</b>
						<p>
							Aquí puede aceptar participar en el Personal Energy Scan que le ofrece su empresa en colaboración con Mentally Fit.</p>
						<p>
						Estoy de acuerdo con la política de privacidad de Mentally Fit. Puede solicitar una copia de esta política de privacidad en <a href="mailo:support@mflatam.com">support@mflatam.com</a>
						</p>
						<div style={{textAlign: "right"}}>
							<input
								type="submit"
								value="ACEPTAR"
								className="button-to-login"
							/>
						</div>
                  </div>
                  
            </form>
      );
};

export default TermsAndConditions;
