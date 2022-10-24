import React from "react";
import moment from "moment";
import "moment/locale/es";
import styles from "./match.module.scss";

function Match(props) {
	return (
		<article className={styles.match}>
			<h3 className={styles.date}>
				{moment(props.date).locale("es").format("DD MMMM - h:mm a")}
			</h3>

			<img
				className={styles.homeImg}
				src={props.homeTeam.crest}
				alt={props.homeTeam.name}
			/>
			<span className={styles.home}>{props.homeTeam.name}</span>
			<span className={styles.homeScore}>{props.score.home}</span>

			<span className={styles.vs}>vs</span>

			<span className={styles.awayScore}>{props.score.away}</span>
			<span className={styles.away}>{props.awayTeam.name}</span>
			<img
				className={styles.awayImg}
				src={props.awayTeam.crest}
				alt={props.awayTeam.name}
			/>
		</article>
	);
}

export default Match;
