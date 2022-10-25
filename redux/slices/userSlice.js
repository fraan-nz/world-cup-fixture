import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		logged: false,
		id: "",
		name: "",
		email: "",
	},
	reducers: {
		login(state, action) {
			state.logged = true;
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		logout(state, action) {
			state.logged = false;
			state.id = "";
			state.name = "";
			state.email = "";
		},
	},
});

const userReducer = userSlice.reducer;
export default userReducer;

export const { login, logout, updateData } = userSlice.actions;
