import { createSlice } from "@reduxjs/toolkit";

export interface EventPageState {
	isCreateModalOpen: boolean;
}

const initialState: EventPageState = {
	isCreateModalOpen: false,
};

const eventPageSlice = createSlice({
	name: "eventPage",
	initialState,
	reducers: {
		set_create_modal_visible: (state, data) => {
			state.isCreateModalOpen = data.payload;
		},
	},
});

export const { set_create_modal_visible } = eventPageSlice.actions;
export default eventPageSlice.reducer;
