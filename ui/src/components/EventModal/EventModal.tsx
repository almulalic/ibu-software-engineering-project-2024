import { DateTime } from "luxon";
import { Button, Modal, message } from "antd";
import { Event } from "../../api/models/event/Event";
import { TicketType } from "../../api/models/ticket/TicketType";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ClockCircleFilled, EnvironmentFilled, LikeFilled, UserOutlined } from "@ant-design/icons";

import "./EventModal.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface EventModalProps {
	event: Event;
	isModalOpen: boolean;
	handleCancel: () => any;
}

export default function EventModal({ event, isModalOpen, handleCancel }: EventModalProps) {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const { isLoggedIn, userInfo } = useSelector((state: RootState) => state.auth);
	const isAttendingEvent: boolean = event.participants.filter((x) => x.userId == userInfo?.id).length > 0;

	const renderTicketType = (ticketType: TicketType, i: number) => {
		const soldTickets: number = event.participants.filter((x) => x.ticketType === ticketType.name).length;
		const isSoldOut: boolean = soldTickets === ticketType.quantity;

		return (
			<div className="event-modal-ticket" key={i}>
				<div className="event-modal-ticket-title-container">
					<h3>{ticketType.name}</h3>
					<div className="event-modal-ticket-price">
						{ticketType.price} {ticketType.currency}
					</div>
				</div>
				<div className="event-modal-ticket-description-container">
					<div className="event-modal-ticket-description">{ticketType.description}</div>
					<div className="event-modal-ticket-description">
						{soldTickets}/{ticketType.quantity}
					</div>
				</div>
				<Button
					size="large"
					disabled={isSoldOut}
					onClick={() => {
						isLoggedIn
							? isAttendingEvent
								? messageApi.warning("You are alraedy attending this event!")
								: navigate({
										pathname: "/payment/process",
										search: `?${createSearchParams({
											eventId: event.id,
											ticketName: ticketType.name,
										})}`,
								  })
							: messageApi.error("You have to be logged in order to buy tickets!");
					}}
				>
					{isSoldOut ? "Sold Out" : "Buy"}
				</Button>
			</div>
		);
	};

	return (
		<Modal
			className="event-modal"
			wrapClassName="event-modal-wrapper"
			title={event.name}
			open={isModalOpen}
			onCancel={handleCancel}
			centered
			closable
			footer={null}
		>
			<div className="event-modal-content">
				<div className="event-modal-image">
					<img src={event.bannerImageURL} />
				</div>
				<hr />
				<div className="event-modal-description">{event.description}</div>
				<hr />
				<div className="event-modal-location-wrapper">
					<div className="event-modal-location">
						<div className="event-modal-label">
							<span className="event-modal-label-icon">
								<EnvironmentFilled />
							</span>
							<span className="event-modal-label-name event-modal-label-link">
								<a target="_blank" href={event.googleMapsURL}>
									{event.geoLocation.country},{event.geoLocation.city} @ {event.venue}
								</a>
							</span>
						</div>

						<div className="event-modal-label">
							<span className="event-modal-label-icon">
								<ClockCircleFilled />
							</span>
							<span className="event-modal-label-name">
								{DateTime.fromJSDate(new Date(event.dateTime)).toFormat("dd-MM-yyyy HH:mm")}
							</span>
						</div>

						<div className="event-modal-label">
							<span className="event-modal-label-icon">
								<UserOutlined />
							</span>
							<span className="event-modal-label-name">
								{event.participants.length} / {event.capacity}
							</span>
						</div>

						<div className="event-modal-label">
							<span className="event-modal-label-icon">
								<LikeFilled />
							</span>
							<span className="event-modal-label-name">{event.likedBy.length}</span>
						</div>
					</div>
				</div>
				<hr />
				<div className="event-modal-tickets">
					<h2>Tickets</h2>
					<div className="event-modal-tickets-wrapper">{event.ticketTypes.map(renderTicketType)}</div>
				</div>
				<hr />
			</div>
			{contextHolder}
		</Modal>
	);
}
