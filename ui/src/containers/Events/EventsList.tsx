import { Empty, Pagination, Spin } from "antd";

import "./EventsList.scss";

export interface EventsListProps {
	loading: boolean;
	currentPage: number;
	events: any[];
	totalResults: number;
	onPageChange: (page: any) => void;
	cardRenderer: (x: any, i: any) => any;
}

export default function EventsList({
	loading,
	currentPage,
	onPageChange,
	events,
	totalResults,
	cardRenderer,
}: EventsListProps) {
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
						events.map((x, i) => (x !== "GHOST" ? cardRenderer(x, i) : <div key={i} className="event-card"></div>))
					)}
				</div>
			)}

			<div className="events-pagination">
				<Pagination
					defaultCurrent={currentPage}
					total={totalResults}
					disabled={loading}
					showSizeChanger={false}
					onChange={onPageChange}
				/>
				<div className="events-pagination-total">Total {totalResults} items</div>
			</div>
		</div>
	);
}
