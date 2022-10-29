import { createSlice } from "@reduxjs/toolkit";

const firstDataLoadSlice = createSlice({
	name: "firstDataLoad",
	initialState: {
		allMatches: [],
		allTables: [],
	},
	reducers: {
		loadMatches(state, action) {
			state.allMatches = action.payload;
		},
		loadPositions(state, action) {
			state.allTables = action.payload;
		},
	},
});

const firstDataLoadReducer = firstDataLoadSlice.reducer;
export default firstDataLoadReducer;

export const { loadMatches, loadPositions } = firstDataLoadSlice.actions;
