import { DateTime } from "luxon";
import { useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Popconfirm, message } from "antd";
import EventModal from "../EventModal/EventModal";
import { Event } from "../../api/models/event/Event";
import { TicketType } from "../../api/models/ticket/TicketType";
import { EventApiService } from "../../api/services/EventApiService";
import { EventOverviewModal } from "../EventOverviewModal/EventOverviewModal";
import {
	ClockCircleFilled,
	DeleteFilled,
	EditFilled,
	EnvironmentFilled,
	HeartFilled,
	QuestionCircleOutlined,
} from "@ant-design/icons";

import "./EventCard.scss";
import CountdownTimer from "../Countdown/Countdown";
import Marquee from "react-fast-marquee";

export interface EventCardProps {
	event: Event;
	ticketType?: TicketType;
	overview?: boolean;
	isEditing?: boolean;
	onEditClick?: (e: any) => any;
	isDeleting?: boolean;
}

export default function EventCard({ overview, event, ticketType, isEditing, onEditClick, isDeleting }: EventCardProps) {
	const [messageApi, contextHolder] = message.useMessage();
	const [isModalOpen, setModalOpen] = useState(false);

	const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);

	const [isLikedByUser, setLikedByUser] = useState(
		userInfo ? (event.likedBy.find((x) => x == userInfo.id) ? true : false) : false
	);

	async function like(e: any) {
		e.stopPropagation();

		if (!isLoggedIn) {
			messageApi.error("You must be logged in to like!");
			return;
		}

		const response = await EventApiService.like(event.id);

		if (response.status === 200) {
			event.likedBy.push(userInfo!.id);
			setLikedByUser(true);
			messageApi.success("You like this event, nice!");
		} else {
			messageApi.error(response.data.message);
		}
	}

	async function unlike(e: any) {
		e.stopPropagation();

		if (!isLoggedIn) {
			messageApi.error("You must be logged in to unlike!");
			return;
		}

		const response = await EventApiService.unlike(event.id);

		if (response.status === 200) {
			setLikedByUser(false);
			event.likedBy = event.likedBy.filter((x) => x != userInfo!.id);

			messageApi.success("You unliked this event :(");
		} else {
			messageApi.error(response.data.message);
		}
	}

	async function handleDelete(e: any) {
		e.stopPropagation();

		if (!isLoggedIn) {
			messageApi.error("You must be logged in to delete events!");
			return;
		}

		const response = await EventApiService.delete(event.id);

		if (response.status === 204) {
			messageApi.success("You succesfully deleted this event!");
			window.location.reload();
		} else {
			messageApi.error(response.data.message);
		}
	}

	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<>
			<div className="event-card" title={event.name} onClick={() => setModalOpen(true)}>
				<img className="event-card-img" src={event.bannerImageURL} alt="" />
				<span
					className={`event-card-edit event-card-editing-${isEditing}`}
					onClick={(e) => {
						e.stopPropagation();
						onEditClick && onEditClick(event);
					}}
				>
					<EditFilled />
				</span>
				<Popconfirm
					title="Delete Event"
					id="popconfirm-delete-event"
					description="Are you sure to delete this event?"
					onConfirm={handleDelete}
					onCancel={(e) => e?.stopPropagation()}
					okText="Yes"
					cancelText="No"
					icon={<QuestionCircleOutlined style={{ color: "red" }} />}
				>
					<span
						title="delete-event-button"
						className={`event-card-delete event-card-deleting-${isDeleting}`}
						onClick={(e) => e.stopPropagation()}
					>
						<DeleteFilled />
					</span>
				</Popconfirm>
				<div className="event-card-content">
					<div className="event-card-info">
						<span className="event-card-title" title={event.name}>
							{event.name}
						</span>
						{!overview && (
							<div className="event-card-likes">
								<span title="like-count" className="event-card-likes-count">
									{event.likedBy.length}
								</span>
								<span className={`event-card-likes-icon event-card-liked-${isLikedByUser}`}>
									<HeartFilled title="event-like-button" onClick={isLikedByUser ? unlike : like} />
								</span>
							</div>
						)}
					</div>

					{overview && (
						<span className="event-card-countdown-timer">
							<CountdownTimer targetDate={event.dateTime} />
						</span>
					)}

					<div className="event-card-label">
						<span className="event-card-label-icon">
							<EnvironmentFilled />
						</span>
						<span className="event-card-label-name">
							<Marquee speed={25} pauseOnHover={true} direction="right">
								{event.geoLocation.country}, {event.geoLocation.city} @ {event.venue} {"   "}
							</Marquee>
						</span>
					</div>

					<div className="event-card-label">
						<span className="event-card-label-icon">
							<ClockCircleFilled />
						</span>
						<span className="event-card-label-name">
							{DateTime.fromJSDate(new Date(event.dateTime)).toFormat("dd-MM-yyyy HH:mm")}
						</span>
					</div>
				</div>
				{contextHolder}
			</div>
			{overview ? (
				<EventOverviewModal
					event={event}
					ticketType={ticketType!}
					isModalOpen={isModalOpen}
					handleCancel={handleModalClose}
				/>
			) : (
				<EventModal event={event} isModalOpen={isModalOpen} handleCancel={handleModalClose} />
			)}
		</>
	);
}
