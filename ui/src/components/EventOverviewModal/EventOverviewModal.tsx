import { DateTime } from "luxon";
import { Modal, QRCode } from "antd";
import { Event } from "../../api/models/event/Event";
import { TicketType } from "../../api/models/ticket/TicketType";
import { ClockCircleFilled, EnvironmentFilled, LikeFilled, UserOutlined } from "@ant-design/icons";

import "./EventOverviewModal.scss";

export interface EventOverviewModalProps {
	event: Event;
	ticketType: TicketType;
	isModalOpen: boolean;
	handleCancel: () => any;
}

export const EventOverviewModal = ({ event, ticketType, isModalOpen, handleCancel }: EventOverviewModalProps) => {
	return (
		<Modal
			className="event-overview-modal"
			wrapClassName="event-overview-modal-wrapper"
			title={event.name}
			open={isModalOpen}
			onCancel={handleCancel}
			centered
			closable
			footer={null}
		>
			<div className="event-overview-modal-content">
				<div className="event-overview-modal-image">
					<img src={event.bannerImageURL} />
				</div>
				<hr />
				<div className="event-overview-modal-description">{event.description}</div>
				<hr />
				<div className="event-overview-modal-location-wrapper">
					<div className="event-overview-modal-location">
						<div className="event-overview-modal-label">
							<span className="event-overview-modal-label-icon">
								<EnvironmentFilled />
							</span>
							<span className="event-overview-modal-label-name event-overview-modal-label-link">
								<a target="_blank" href={event.googleMapsURL}>
									{event.geoLocation.country},{event.geoLocation.city} @ {event.venue}
								</a>
							</span>
						</div>

						<div className="event-overview-modal-label">
							<span className="event-overview-modal-label-icon">
								<ClockCircleFilled />
							</span>
							<span className="event-overview-modal-label-name">
								{DateTime.fromJSDate(new Date(event.dateTime)).toFormat("dd-MM-yyyy HH:mm")}
							</span>
						</div>

						<div className="event-overview-modal-label">
							<span className="event-overview-modal-label-icon">
								<UserOutlined />
							</span>
							<span className="event-overview-modal-label-name">
								{event.participants.length} / {event.capacity}
							</span>
						</div>

						<div className="event-overview-modal-label">
							<span className="event-overview-modal-label-icon">
								<LikeFilled />
							</span>
							<span className="event-overview-modal-label-name">{event.likedBy.length}</span>
						</div>
					</div>
				</div>
				<hr />
				<div className="event-overview-modal-tickets">
					<h2>Your Ticket</h2>
					<div className="event-overview-modal-ticket">
						<div className="event-overview-modal-ticket-title-container">
							<h3>{ticketType.name}</h3>
						</div>
						<div className="event-overview-modal-ticket-description">{ticketType.description}</div>
						<span className="event-overview-modal-qr-code">
							<QRCode
								type="canvas"
								size={225}
								value={JSON.stringify({ event: event.id, ticketType: ticketType.name })}
							/>
						</span>
					</div>
				</div>
				<hr />
			</div>
		</Modal>
	);
};
