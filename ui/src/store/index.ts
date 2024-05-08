import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import authSlice from "./authSlice";
import myEventPageSlice from "./myEventPage";
import eventPageSlice from "./eventPageSlice";
import eventFilterSlice from "./eventFilterSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		eventFilter: eventFilterSlice,
		eventPage: eventPageSlice,
		app: appSlice,
		myEventPage: myEventPageSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
