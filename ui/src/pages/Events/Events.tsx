import { RootState } from "../../store";
import Search from "antd/es/input/Search";
import { useEffect, useMemo, useState } from "react";
import Page from "../../containers/Page/Page";
import { findFirstMultipleOf, setSearchParam, useEffectDebugger } from "../../utils";
import { widthThresholds } from "../../constants";
import { useSearchParams } from "react-router-dom";
import { EventApiService } from "../../api/services";
import { useDispatch, useSelector } from "react-redux";
import EventsList from "../../containers/Events/EventsList";
import EventCard from "../../components/EventCard/EventCard";
import EventFilter from "../../components/EventFilter/EventFilter";
import { change_current_page } from "../../store/eventFilterSlice";
import { set_create_modal_visible } from "../../store/eventPageSlice";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal";

import "./Events.scss";

export function Events() {
	const [events, setEvents] = useState([] as any[]);
	const [searchParams] = useSearchParams();

	const [searchText, setSearchText] = useState(searchParams.get("searchText") || "");
	const [eventsLoading, setEventsLoading] = useState(true);
	const [totalResults, setTotalResults] = useState(100);

	const dispatch = useDispatch();

	const {
		filtersLoading,
		pageSize,
		currentPage,
		geolocationCountriesURI,
		geolocationCitiesURI,
		categoriesURI,
		startDate,
		endDate,
		sort,
	} = useSelector((state: RootState) => state.eventFilter);

	const createParam = useMemo(() => searchParams.get("create"), [searchParams]);
	const categoriesParam = useMemo(() => searchParams.get("categories"), [searchParams]);

	useEffect(() => {
		async function getEvents() {
			setEventsLoading(true);

			const eventsResponse = await EventApiService.getAll(
				searchText,
				geolocationCountriesURI,
				geolocationCitiesURI,
				categoriesURI,
				startDate,
				endDate,
				currentPage,
				pageSize,
				sort
			);

			const events: any[] = eventsResponse.data.content;
			const treshold = widthThresholds.filter((x) => window.innerWidth <= x.width);
			const cardLimit = findFirstMultipleOf(events.length, treshold[treshold.length - 1].maxCards)!;
			for (let i = events.length; i < cardLimit; ++i) {
				events.push("GHOST");
			}

			setEvents(events);
			setTotalResults(eventsResponse.data.totalElements);
			setEventsLoading(false);
		}

		if (createParam) {
			dispatch(set_create_modal_visible(true));
		}

		getEvents();
	}, [
		searchText,
		pageSize,
		currentPage,
		geolocationCountriesURI,
		geolocationCitiesURI,
		categoriesURI,
		startDate,
		endDate,
		sort,
		categoriesParam,
		createParam,
		dispatch,
		searchParams,
	]);

	const onSearchChange = (e: any) => {
		setSearchText(e.target.value);
		setSearchParam("searchText", e.target.value);
	};

	return (
		<Page id="events">
			<div className="events-section">
				<div className="events-section-filter">
					<Search
						className="events-section-filter-search"
						placeholder="Find events by name, venue, city..."
						loading={eventsLoading || filtersLoading}
						size="large"
						onChange={onSearchChange}
						value={searchText}
					/>
					<EventFilter eventsLoading={eventsLoading} />
				</div>

				<EventsList
					loading={eventsLoading}
					events={events}
					totalResults={totalResults}
					cardRenderer={(x: any, i: any) => <EventCard key={i} event={x} />}
					onPageChange={(page: any) => {
						dispatch(change_current_page(page - 1));
					}}
				/>
			</div>

			<CreateEventModal />
		</Page>
	);
}
