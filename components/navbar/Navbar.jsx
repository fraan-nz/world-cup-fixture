import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserAlt, FaBars } from "react-icons/fa";
import styles from "./navbar.module.scss";
import { groups } from "../../utils/groups";

function Navbar() {
	const [open, setOpen] = useState(false);
	const { asPath } = useRouter();

	const handleOpen = () => {
		setOpen((state) => !state);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<nav className={styles.navbar}>
			<ul
				className={open ? styles.navLinks + " " + styles.open : styles.navLinks}
			>
				{Object.values(groups).map((g) => {
					return (
						<li key={g}>
							<Link href={`/group_${g}`}>
								<a
									onClick={() => handleClose()}
									className={
										asPath === `/group_${g}`
											? styles.navLink + " " + styles.active
											: styles.navLink
									}
								>
									Grupo {g}
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
			<Link href="/login">
				<a className={styles.navLogin} title="Login">
					<FaUserAlt />
				</a>
			</Link>
			<button className={styles.navBars} onClick={() => handleOpen()}>
				<FaBars />
			</button>
		</nav>
	);
}

export default Navbar;
