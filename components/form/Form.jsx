import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { schema } from "../../models/validation.schema";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import styles from "./form.module.scss";

function Form() {
	const dispatch = useDispatch();
	const { pathname, replace } = useRouter();

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			onSubmit={(values) => {
				if (pathname === "/register") {
					createUserWithEmailAndPassword(auth, values.email, values.password)
						.then((userAuth) => {
							updateProfile(userAuth.user, {
								displayName: "panda",
							}).catch((error) => {
								console.log(error);
							});
							replace("/");
						})
						.catch((err) => {
							console.log(err);
						});
				}
				if (pathname === "/login") {
					signInWithEmailAndPassword(auth, values.email, values.password)
						.then((userAuth) => {
							dispatch(
								login({
									id: userAuth.uid,
									name: userAuth.displayName,
									email: userAuth.email,
								})
							);
							replace("/");
						})
						.catch((err) => {
							console.log(err);
						});
				}
			}}
			validationSchema={schema}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<form onSubmit={handleSubmit} className={styles.form}>
					{pathname === "/login" && <h1 className={styles.title}>Ingresa</h1>}
					{pathname === "/register" && (
						<h1 className={styles.title}>Registrate</h1>
					)}
					<label>
						<span>E-mail</span>
						<input
							type="email"
							name="email"
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.email && touched.email ? (
							<span className={styles.error}>{errors.email}</span>
						) : null}
					</label>
					<label>
						<span>Contraseña</span>
						<input
							type="password"
							name="password"
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						{errors.password && touched.password ? (
							<span className={styles.error}>{errors.password}</span>
						) : null}
					</label>
					<div className={styles.buttons}>
						{pathname === "/login" && (
							<>
								<button>Continuar</button>
								<Link href="/register">
									<a>
										<button type="submit">Crear cuenta</button>
									</a>
								</Link>
							</>
						)}
						{pathname === "/register" && (
							<>
								<button type="submit">Registrarse</button>
								<Link href="/login">
									<a>
										<button>Ingresa</button>
									</a>
								</Link>
							</>
						)}
					</div>
				</form>
			)}
		</Formik>
	);
}

export default Form;
