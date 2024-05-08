import {
	set_filters_loaded,
	set_filters_loading,
	SORT_OPTIONS,
	category_change,
	geolocation_change,
	date_range_change,
	PAGE_SIZE_OPTIONS,
	page_size_change,
} from "../../store/eventFilterSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Form, Cascader, DatePicker, Select } from "antd";
import { useSearchParams } from "react-router-dom";
import { MetadatService } from "../../api/services";
import { DATE_TIME_FORMAT } from "../../utils/utils";

import "./EventFilter.scss";

const { RangePicker } = DatePicker;

export interface EventFilterState {
	eventsLoading: boolean;
}

export default function EventFilter({ eventsLoading }: EventFilterState) {
	const dispatch = useDispatch<AppDispatch>();
	const [form] = Form.useForm();

	const [viewportWidth, _] = useState(window.innerWidth);

	const { filtersLoading, pageSize, startDate, endDate, sort } = useSelector((state: RootState) => state.eventFilter);
	const [searchParams] = useSearchParams();

	const [countryCascader, setCountryCascader] = useState({
		options: [],
	});

	const [selectedCategories, setSelectedCategories] = useState([]);
	const [categoriesCascader, setCategoriesCascader] = useState({
		options: [],
	});

	async function loadFilterMetadata() {
		dispatch(set_filters_loading());

		await getCountries();
		await getCategories();

		dispatch(set_filters_loaded());
	}

	useEffect(() => {
		loadFilterMetadata();
	}, []);

	async function getCountries() {
		const countries = await MetadatService.getCountires();

		if (countries.status == 200) {
			setCountryCascader({
				options: countries.data.map((country: any) => ({
					label: country.name,
					value: country.iso2Code,
					children: country.cities.map((city: any) => ({ label: city, value: city })),
				})),
			});
		}
	}

	async function getCategories() {
		const categories = await MetadatService.getCategories();

		if (categories.status == 200) {
			const categoriesOptions = {
				options: categories.data.map((category: any) => ({
					label: category.name,
					value: category.name,
				})),
			};

			setCategoriesCascader(categoriesOptions);

			if (searchParams.has("categories")) {
				const paramsCategories: string[] = searchParams.get("categories")!.split(",");

				form.setFieldValue(
					"categories",
					categoriesOptions.options.filter((x: any) => paramsCategories.includes(x.value)).map((x: any) => [x.value])
				);
			}
		}
	}

	const handlePageSizeChange = (value: any) => {
		dispatch(page_size_change(value));
	};

	const onLocationChange = (_: any, all: any) => {
		dispatch(geolocation_change(all));
	};

	const onCategoryChange = (value: any, all: any) => {
		setSelectedCategories(value);
		dispatch(category_change(all));
	};

	const handleOrderChange = () => {};

	const onDateRangeChange = (value: any) => {
		if (value) {
			const [startDate, endDate] = value;

			dispatch(
				date_range_change({
					startDate: startDate ? startDate.toISOString() : "",
					endDate: endDate ? endDate.toISOString() : "",
				})
			);
		}
	};

	return (
		<div id="event-filter">
			<Form
				form={form}
				className="event-filter"
				name="event-filter"
				layout={viewportWidth >= 576 ? "inline" : "horizontal"}
				initialValues={{ remember: true }}
				autoComplete="off"
				requiredMark={false}
			>
				<Form.Item label="Showing" name="pageSize" colon={false} initialValue={pageSize.toString()}>
					<Select
						className="event-filter-page-size-select"
						loading={filtersLoading || eventsLoading}
						disabled={filtersLoading || eventsLoading}
						options={PAGE_SIZE_OPTIONS}
						onChange={handlePageSizeChange}
					/>
				</Form.Item>

				<Form.Item label="events in" name="geoLocation" colon={false}>
					<Cascader
						id="location-cascader"
						className="event-filter-cascader"
						options={countryCascader.options}
						onChange={onLocationChange}
						multiple
						maxTagCount={5}
						placeholder="Select location..."
						loading={filtersLoading || eventsLoading}
						disabled={filtersLoading || eventsLoading}
					/>
				</Form.Item>

				<Form.Item label="with category" name="categories" colon={false} initialValue={searchParams.get("categories")}>
					<Cascader
						id="category-cascader"
						className="event-filter-cascader"
						options={categoriesCascader.options}
						onChange={onCategoryChange}
						value={selectedCategories}
						multiple
						maxTagCount={5}
						placeholder="Select category..."
						loading={filtersLoading || eventsLoading}
						disabled={filtersLoading || eventsLoading}
					/>
				</Form.Item>

				<Form.Item
					label="from"
					name="dateRange"
					colon={false}
					initialValue={[
						dayjs(searchParams.get("startDate") || startDate),
						dayjs(searchParams.get("endDate") || endDate),
					]}
				>
					<RangePicker
						showTime={{ format: "HH" }}
						format={DATE_TIME_FORMAT}
						allowEmpty={[true, true]}
						separator="to"
						onChange={onDateRangeChange}
						disabled={filtersLoading || eventsLoading}
					/>
				</Form.Item>

				<Form.Item label="sorted by" name="sort" colon={false} initialValue={sort}>
					<Select
						className="event-filter-order-select"
						disabled={filtersLoading || eventsLoading}
						loading={filtersLoading || eventsLoading}
						options={SORT_OPTIONS}
						onChange={handleOrderChange}
					/>
				</Form.Item>
			</Form>
		</div>
	);
}
