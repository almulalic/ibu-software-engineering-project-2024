import { createSlice } from "@reduxjs/toolkit";

export interface EventPageState {
	isEditModalOpen: boolean;
	event?: Event;
}

const initialState: EventPageState = {
	isEditModalOpen: false,
	event: undefined,
};

const myEventPageSlice = createSlice({
	name: "eventPage",
	initialState,
	reducers: {
		set_edit_modal_visible: (state, data) => {
			state.isEditModalOpen = data.payload;
		},
		set_edit_modal_event: (state, data) => {
			state.event = data.payload;
		},
	},
});

export const { set_edit_modal_visible } = myEventPageSlice.actions;
export default myEventPageSlice.reducer;
