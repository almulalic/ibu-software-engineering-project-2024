import "./MyEvents.scss";
import { RootState } from "../../store";
import { Role } from "../../api/models";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Page from "../../containers/Page/Page";
import { Radio, Segmented, message } from "antd";
import { useSearchParams } from "react-router-dom";
import { EventApiService } from "../../api/services";
import EventCard from "../../components/EventCard/EventCard";
import EventsList from "../../containers/Events/EventsList";
import CreateEventModal from "../../components/CreateEventModal/CreateEventModal";
import { set_create_modal_visible } from "../../store/eventPageSlice";

export function MyEvents() {
	const { userInfo } = useSelector((state: RootState) => state.auth);
	const isOrganizer = userInfo?.assignedRoles.includes(Role.ORGANIZER);
	const dispatch = useDispatch();

	const [eventsLoading, setEventsLoading] = useState(false);
	const [params] = useSearchParams();
	const [events, setEvents] = useState([]);
	const [eventViewType, setEventViewType] = useState(params.get("selectedViewType") || "Attending Events");
	const [mode, setMode] = useState(isOrganizer ? params.get("mode") || "edit" : "");
	const [currentPage, setCurrentPage] = useState(0);
	const [totalResults, setTotalResults] = useState(0);

	const [selectedEvent, setSelectedEvent] = useState(null);

	const [messageApi, contextHolder] = message.useMessage();
	const options: string[] = ["Attending Events", ...(isOrganizer ? ["Organized Events"] : [])];

	async function getMyEvents() {
		setEventsLoading(true);
		let response;

		switch (eventViewType) {
			case "Attending Events":
				response = await EventApiService.attendingEvents(currentPage, 10);
				break;
			case "Organized Events":
				response = await EventApiService.createdEvents(currentPage, 10);
				break;
		}

		if (!response) {
			return;
		}

		if (response!.status === 200) {
			setEvents(response!.data);
			setTotalResults(response!.data.totalElements);
			setEventsLoading(false);
		} else {
			messageApi.error("Failed to load your events...");
			setEventsLoading(true);
		}
	}

	const handleTypeChange = async (type: any) => {
		setEventsLoading(true);
		setEventViewType(type as string);

		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set("mode", "");
		currentUrl.searchParams.set("selectedViewType", type);
		window.history.replaceState({}, "", currentUrl.href);
	};

	const handleModeChange = (e: any) => {
		setMode(e.target.value);

		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set("mode", e.target.value);
		window.history.replaceState({}, "", currentUrl.href);
	};

	const handleEditEvent = (event: any) => {
		setSelectedEvent(event);
		dispatch(set_create_modal_visible(true));
	};

	useEffect(() => {
		getMyEvents();
	}, [eventViewType]);

	return (
		<Page id="my-events">
			<div className="my-events-content">
				<div className="my-events-event-type-picker">
					<Segmented options={options} block onChange={handleTypeChange} value={eventViewType} />
				</div>

				{eventViewType === "Organized Events" && (
					<div className="my-events-event-mode-picker">
						<Radio.Group size="large" onChange={handleModeChange} disabled={events.length === 0} value={mode}>
							<Radio.Button value="edit">Edit Mode</Radio.Button>
							<Radio.Button value="delete">Delete Mode</Radio.Button>
						</Radio.Group>
					</div>
				)}

				<div className="my-events-wrapper">
					<EventsList
						currentPage={currentPage}
						loading={eventsLoading}
						events={events}
						totalResults={totalResults}
						cardRenderer={(x: any, i: any) => {
							if (eventViewType === "Attending Events") {
								return <EventCard key={i} event={x.event} ticketType={x.ticketType} overview />;
							} else {
								return (
									<EventCard
										key={i}
										event={x}
										isEditing={mode === "edit" && eventViewType === "Organized Events"}
										onEditClick={handleEditEvent}
										isDeleting={mode === "delete" && eventViewType === "Organized Events"}
									/>
								);
							}
						}}
						onPageChange={(page: any) => {
							setCurrentPage(page - 1);
						}}
					/>
				</div>
			</div>

			{selectedEvent && <CreateEventModal event={selectedEvent!} />}

			{contextHolder}
		</Page>
	);
}
