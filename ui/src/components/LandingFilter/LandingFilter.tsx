import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { cascaderOptionsToURI } from "../../utils/utils";
import { Button, Cascader, DatePicker, Flex, Input } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";

import "./LandingFilter.scss";
import { MetadatService } from "../../api/services";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { landing_filter_submit } from "../../store/eventFilterSlice";

const { RangePicker } = DatePicker;
const DATE_TIME_FORMAT = "YYYY-MM-DD HH";

export const LandingFilter = () => {
	const navigate = useNavigate();

	const [isLoading, _] = useState(false);
	const [searchText, setSearchText] = useState("");

	const [availableCategories, setAvailableCategories] = useState({
		options: [],
	});

	const [selectedCategories, setSelectedCategories] = useState([]);
	const dispatch = useDispatch<AppDispatch>();

	const [datePickerState, setDatePickerState] = useState({
		startDate: dayjs().hour(8).minute(0),
		endDate: dayjs().add(6, "month"),
	});

	async function loadFilterMetadata() {
		await getCategories();
	}

	useEffect(() => {
		loadFilterMetadata();
	}, []);

	async function getCategories() {
		const categories = await MetadatService.getCategories();

		if (categories.status == 200) {
			setAvailableCategories({
				options: categories.data.map((category: any) => ({
					label: category.name,
					value: category.name,
				})),
			});
		}
	}

	const onSearchChange = (e: any) => {
		setSearchText(e.target.value);
	};

	const onCategoryChange = (_: any, newValue: any) => {
		setSelectedCategories(newValue);
	};

	const onDateRangeChange = (value: any) => {
		if (value) {
			const [startDate, endDate] = value;

			setDatePickerState({
				startDate: startDate,
				endDate: endDate,
			});
		}
	};

	const onFilterSubmit = () => {
		dispatch(
			landing_filter_submit({
				searchText: searchText,
				categories: selectedCategories,
				startDate: datePickerState.startDate.toISOString(),
				endDate: datePickerState.endDate.toISOString(),
			})
		);

		navigate({
			pathname: "/events",
			search: `?${createSearchParams({
				searchText: searchText,
				categories: cascaderOptionsToURI(selectedCategories),
				startDate: datePickerState.startDate.toISOString(),
				endDate: datePickerState.endDate.toISOString(),
			})}`,
		});
	};

	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			onFilterSubmit();
		}
	};
	return (
		<div className="landing-filter" onKeyDown={handleKeyPress}>
			<div className="landing-filter-card">
				<Input
					className="landing-filter-search"
					placeholder="Find events by name, venue, city..."
					size="large"
					value={searchText}
					allowClear
					onChange={onSearchChange}
					prefix={<SearchOutlined />}
					disabled={isLoading}
				/>

				<div className="landing-filter-options">
					<Cascader
						className="landing-filter-category-cascader"
						options={availableCategories.options}
						onChange={onCategoryChange}
						multiple
						maxTagCount={5}
						placeholder="Select categories..."
						loading={isLoading}
						size="large"
					/>
					<RangePicker
						className="landing-filter-date-picker"
						showTime={{ format: "HH" }}
						format={DATE_TIME_FORMAT}
						defaultValue={[datePickerState.startDate, datePickerState.endDate]}
						allowEmpty={[true, true]}
						separator="to"
						onChange={onDateRangeChange}
						size="large"
					/>
				</div>

				<Flex className="search-button-container" gap="middle" justify="center" align="start">
					<Button className="search-button" type="primary" size="large" shape="default" onClick={onFilterSubmit}>
						Search
					</Button>
				</Flex>
			</div>
		</div>
	);
};
