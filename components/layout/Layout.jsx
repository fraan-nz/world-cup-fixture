import React from "react";
import Navbar from "../navbar/navbar";
import styles from "./layout.module.scss";

function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main className={styles.main}>{children}</main>
		</>
	);
}

export default Layout;
