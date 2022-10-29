import { configureStore } from "@reduxjs/toolkit";
import firstDataLoadReducer from "./slices/firstDataLoadSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		firstDataLoad: firstDataLoadReducer,
	},
});

export default store;
