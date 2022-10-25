import React, { useEffect } from "react";
import { groupsAdapter } from "../adapters/groupsAdapter";
import Match from "../components/match/Match";
import { groups } from "../utils/groups";
import styles from "../styles/pages.module.scss";
import Table from "../components/table/Table";
import { tableAdapter } from "../adapters/tableAdapter";
import { getCurrentGroup } from "../utils/getCurrentGroup";

function Group({ matches, positions }) {
	return (
		<section>
			<Table {...positions} />
			<div className={styles.matchContainer}>
				{matches.map((match) => (
					<Match {...match} key={match.id} />
				))}
			</div>
		</section>
	);
}

export default Group;

export async function getStaticPaths() {
	return {
		paths: Object.keys(groups).map((keys) => {
			return {
				params: { group: keys },
			};
		}),

		fallback: false,
	};
}

export async function getStaticProps(props) {
	const group = props.params.group;

	const promiseMatchs = await fetch(
		`https://api.football-data.org/v4/competitions/2000/matches?group=${group.toUpperCase()}`,
		{
			headers: {
				"X-Auth-Token": process.env.NEXT_PUBLIC_TOKEN,
			},
		}
	);

	const promisePositions = await fetch(
		`https://api.football-data.org/v4/competitions/2000/standings`,
		{
			headers: {
				"X-Auth-Token": process.env.NEXT_PUBLIC_TOKEN,
			},
		}
	);

	if (promisePositions.status !== 200 || promiseMatchs.status !== 200) {
		return {
			notFound: true,
		};
	}

	const matches = await promiseMatchs.json();
	const positions = await promisePositions.json();

	return {
		props: {
			matches: groupsAdapter(matches),
			positions: getCurrentGroup(tableAdapter(positions), group.toUpperCase()),
		},
		revalidate: 60,
	};
}
