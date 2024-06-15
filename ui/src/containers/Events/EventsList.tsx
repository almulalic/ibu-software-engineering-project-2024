import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Empty, Pagination, Spin } from "antd";

import "./EventsList.scss";

export interface EventsListProps {
	events: any[];
	totalResults: number;
	onPageChange: (page: any) => void;
	cardRenderer: (x: any, i: any) => any;
	loading: any;
}

export default function EventsList({ loading, onPageChange, events, totalResults, cardRenderer }: EventsListProps) {
	const { currentPage, pageSize } = useSelector((state: RootState) => state.eventFilter);

	return (
		<div className="events-list">
			{!loading && events.length === 0 ? (
				<div className="events-empty-state">
					<Empty />
				</div>
			) : (
				<div className="events-wrapper">
					{loading ? (
						<div className="events-spinner">
							<Spin size="large" />
						</div>
					) : (
						events.map((x, i) =>
							x !== "GHOST" ? cardRenderer(x, i) : <div key={i} className="event-card event-card-empty"></div>
						)
					)}
				</div>
			)}

			<div className="events-pagination">
				<Pagination
					current={currentPage + 1}
					total={totalResults}
					disabled={loading}
					showSizeChanger={false}
					onChange={onPageChange}
					pageSize={pageSize}
				/>
				<div className="events-pagination-total">Total {totalResults} items</div>
			</div>
		</div>
	);
}
