import { useRouter } from "next/router";
import React from "react";
import { groups } from "../../utils/groups";
import styles from "./table.module.scss";

function Table(positions) {
	const router = useRouter();
	const query = router.query.group;

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th colSpan="9" className={styles.title}>
						Grupo {groups[query]}
					</th>
				</tr>
				<tr className={styles.dataTitle}>
					<th>Seleccion</th>
					<th>J</th>
					<th>G</th>
					<th>E</th>
					<th>P</th>
					<th>GF</th>
					<th>GC</th>
					<th>DIF</th>
					<th>PTS</th>
				</tr>
			</thead>
			<tbody>
				{positions.table.map((pos) => {
					return (
						<tr className={styles.dataRow} key={pos.id}>
							<td>{pos.name}</td>
							<td>{pos.playedGames}</td>
							<td>{pos.won}</td>
							<td>{pos.draw}</td>
							<td>{pos.lost}</td>
							<td>{pos.goalsFor}</td>
							<td>{pos.goalsAgainst}</td>
							<td>{pos.goalDifference}</td>
							<td>{pos.points}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Table;
