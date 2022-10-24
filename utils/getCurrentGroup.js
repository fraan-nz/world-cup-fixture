export const getCurrentGroup = (data, group) => {
	return data.find((data) => data.group === group);
};
