export const allMatchesAdapter = (allMatches) => {
	return allMatches.reduce((cat, match) => {
		const { group } = match;
		cat[group] = cat[group] ?? [];
		cat[group].push(match);
		return cat;
	}, {});
};
