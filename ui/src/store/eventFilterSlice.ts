import dayjs from "dayjs";
import { createSlice } from "@reduxjs/toolkit";
import { cascaderOptionsToURI } from "../utils/utils";

interface OrderDropdownItem<T> {
	value: T;
	label: string;
}

export const SORT_OPTIONS: OrderDropdownItem<string>[] = [
	{
		value: "price,desc",
		label: "Price (DESC)",
	},
	{
		value: "price,asc",
		label: "Price (ASC)",
	},
	{
		value: "likedBy.count,desc",
		label: "Likes (DESC)",
	},
	{
		value: "likedBy.count,asc",
		label: "Likes (ASC)",
	},
];

export const PAGE_SIZE_OPTIONS: OrderDropdownItem<number>[] = [
	{
		value: 10,
		label: "10",
	},
	{
		value: 25,
		label: "25",
	},
	{
		value: 50,
		label: "50",
	},
	{
		value: 100,
		label: "100",
	},
];

export interface EventFilterState {
	filtersLoading: boolean;
	geolocationCities: any[];
	geolocationCountries: any[];
	geolocationCitiesURI: string;
	geolocationCountriesURI: string;
	categories: any[];
	categoriesURI: string;
	startDate: string;
	endDate: string;
	currentPage: number;
	pageSize: number;
	sort: string;
}

const initialState: EventFilterState = {
	filtersLoading: true,
	geolocationCities: [],
	geolocationCountries: [],
	geolocationCitiesURI: "",
	geolocationCountriesURI: "",
	categories: [],
	categoriesURI: "",
	startDate: dayjs().hour(8).minute(0).toISOString(),
	endDate: dayjs().add(1, "year").toISOString(),
	currentPage: 0,
	sort: SORT_OPTIONS[0].value,
	pageSize: PAGE_SIZE_OPTIONS[0].value,
};

const eventFilterSlice = createSlice({
	name: "eventFilter",
	initialState,
	reducers: {
		set_filters_loading: (state) => {
			state.filtersLoading = true;
		},
		set_filters_loaded: (state) => {
			state.filtersLoading = false;
		},
		change_current_page: (state, data) => {
			state.currentPage = data.payload;
		},
		page_size_change: (state, data) => {
			state.pageSize = data.payload;
		},
		geolocation_change: (state, data) => {
			state.geolocationCountries = data.payload.filter((x: any[]) => x.length == 1);
			state.geolocationCountriesURI = cascaderOptionsToURI(state.geolocationCountries);

			state.geolocationCities = data.payload.filter((x: any[]) => x.length > 1);
			state.geolocationCitiesURI = cascaderOptionsToURI(state.geolocationCities);
		},
		category_change: (state, data) => {
			state.categories = data.payload;
			state.categoriesURI = cascaderOptionsToURI(data.payload as any[]);
		},
		category_change_param: (state, data) => {
			state.categoriesURI = data.payload;
		},
		date_range_change: (state, data) => {
			state.startDate = data.payload.startDate;
			state.endDate = data.payload.endDate;
		},
		order_change: (state, data) => {
			state.sort = data.payload.sort;
		},
	},
});

export const {
	set_filters_loading,
	set_filters_loaded,
	change_current_page,
	page_size_change,
	geolocation_change,
	category_change,
	category_change_param,
	date_range_change,
	order_change,
} = eventFilterSlice.actions;
export default eventFilterSlice.reducer;
