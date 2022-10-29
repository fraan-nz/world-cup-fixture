import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("Nombre requerido"),
	email: Yup.string().email("E-mail no válido").required("E-mail requerido"),
	password: Yup.string()
		.min(4, "Mínimo 4 caracteres")
		.max(50, "Contraseña demasiado larga")
		.required("Password requerido"),
});
