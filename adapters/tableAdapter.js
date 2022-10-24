export const tableAdapter = (api) => {
	return api.standings.map((table) => {
		return {
			group: table.group,
			table: table.table.map((data) => {
				return {
					id: data.team.id,
					position: data.position,
					name: data.team.name,
					playedGames: data.playedGames,
					won: data.won,
					draw: data.draw,
					lost: data.lost,
					points: data.points,
					goalsFor: data.goalsFor,
					goalsAgainst: data.goalsAgainst,
					goalDifference: data.goalDifference,
				};
			}),
		};
	});
};
