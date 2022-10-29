import React from "react";
import { groupsAdapter } from "../adapters/groupsAdapter";
import Match from "../components/match/Match";
import styles from "../styles/pages.module.scss";
import Table from "../components/table/Table";
import { tableAdapter } from "../adapters/tableAdapter";
import { getCurrentGroup } from "../utils/getCurrentGroup";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Group({ matches, positions }) {
	const { allMatches, allTables } = useSelector((state) => state.firstDataLoad);
	const router = useRouter();
	const query = router.query.group.toUpperCase();

	const fixture =
		matches.errorCode === 429
			? groupsAdapter(allMatches[query])
			: groupsAdapter(matches.matches);

	const table =
		positions.errorCode === 429
			? tableAdapter(allTables)
			: tableAdapter(positions);

	const currentTable = getCurrentGroup(table, query);

	return (
		<section>
			<Table {...currentTable} />
			<div className={styles.matchContainer}>
				{fixture.map((match) => (
					<Match {...match} key={match.id} />
				))}
			</div>
		</section>
	);
}

export default Group;

// export async function getStaticPaths() {
// 	return {
// 		paths: Object.keys(groups).map((keys) => {
// 			return {
// 				params: { group: keys },
// 			};
// 		}),

// 		fallback: false,
// 	};
// }

export async function getServerSideProps(props) {
	const group = props.params.group;

	const promisePositions = await fetch(
		`https://api.football-data.org/v4/competitions/2000/standings`,
		{
			headers: {
				"X-Auth-Token": process.env.NEXT_PUBLIC_TOKEN,
			},
		}
	);

	const positions = await promisePositions.json();

	const promiseMatchs = await fetch(
		`https://api.football-data.org/v4/competitions/2000/matches?group=${group.toUpperCase()}`,
		{
			headers: {
				"X-Auth-Token": process.env.NEXT_PUBLIC_TOKEN,
			},
		}
	);

	const matches = await promiseMatchs.json();

	return {
		props: {
			matches: matches,
			positions: positions,
		},
	};
}
