import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/pages.module.scss";
import { useDispatch } from "react-redux";
import { loadMatches, loadPositions } from "../redux/slices/firstDataLoadSlice";
import { allMatchesAdapter } from "../adapters/allMatchesAdapter";

function Home({ allMatches, allPositions }) {
	const { push } = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadMatches(allMatchesAdapter(allMatches.matches)));
		dispatch(loadPositions(allPositions));
		setTimeout(() => push("/group_a"), 2000);
	}, []);

	return (
		<div className={styles.home}>
			<img src="./world-cup.png" alt="logo Qatar World Cup" />
		</div>
	);
}

export default Home;

export async function getStaticProps() {
	const promiseAllMatches = await fetch(
		`https://api.football-data.org/v4/competitions/2000/matches`,
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

	const allPositions = await promisePositions.json();

	const allMatches = await promiseAllMatches.json();

	return {
		props: {
			allMatches: allMatches,
			allPositions: allPositions,
		},
		revalidate: 60,
	};
}
