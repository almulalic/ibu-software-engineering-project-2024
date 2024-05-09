import { RefObject, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import "./EventsInFocus.scss";
import { EventApiService } from "../../api/services";
import EventCard from "../../components/EventCard/EventCard";

export function EventsInFocus() {
	const eventsInFocusRef: RefObject<HTMLDivElement> = useRef(null);
	const [eventsLoading, setEventsLoading] = useState(false);
	const [events, setEvents] = useState([]);

	function getStep(direction: number) {
		const fallback = 400 * direction;

		if (eventsInFocusRef.current) {
			let element: Element = eventsInFocusRef.current.getElementsByClassName("event-card")[0];

			return element ? element.clientWidth * direction : fallback;
		} else {
			return fallback;
		}
	}

	function onNext() {
		if (eventsInFocusRef.current) {
			console.log(getStep(1));
			eventsInFocusRef.current.scrollTo({
				left: eventsInFocusRef.current.scrollLeft + getStep(1),
				behavior: "smooth",
			});
		}
	}

	function onPrevious() {
		if (eventsInFocusRef.current) {
			eventsInFocusRef.current.scrollTo({
				left: eventsInFocusRef.current.scrollLeft + getStep(-1),
				behavior: "smooth",
			});
		}
	}

	async function getEventsInFocus() {
		setEventsLoading(true);

		const eventsResponse = await EventApiService.getInFocus();

		setEvents(eventsResponse.data);
		setEventsLoading(false);
	}

	useEffect(() => {
		getEventsInFocus();
	}, []);

	return (
		<div id="events-in-focus" className="section">
			<div className="header">
				<h1>Events In Focus</h1>
				<div className="navigation">
					<ArrowLeftOutlined className="navigation-button" onClick={onPrevious} />
					<ArrowRightOutlined className="navigation-button" onClick={onNext} />
				</div>
			</div>
			<div className="events" ref={eventsInFocusRef}>
				{events.map((x, i) => (
					<EventCard key={i} event={x} />
				))}
			</div>
		</div>
	);
}
