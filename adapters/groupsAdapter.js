export const groupsAdapter = (api) => {
	return api.matches.map((match) => {
		return {
			id: match.id,
			date: match.utcDate,
			homeTeam: {
				name: match.homeTeam.name,
				shortName: match.homeTeam.shortName,
				crest: match.homeTeam.crest,
			},
			awayTeam: {
				name: match.awayTeam.name,
				shortName: match.awayTeam.shortName,
				crest: match.awayTeam.crest,
			},
			score: {
				winner: match.score.winner,
				home: match.score.fullTime.home + match.score.halfTime.home,
				away: match.score.fullTime.away + match.score.halfTime.away,
			},
		};
	});
};
