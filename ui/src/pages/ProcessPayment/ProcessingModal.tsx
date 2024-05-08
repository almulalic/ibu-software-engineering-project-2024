import { Modal, Spin } from "antd";
import { sleep } from "../../utils/utils";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { EventApiService } from "../../api/services/EventApiService";

export interface ProcessingModalProps {
	eventId: string;
	ticketName: string;
	isModalOpen: boolean;
	onCancle: (isPaid: boolean) => any;
}

export default function ProcessingModal({ eventId, ticketName, isModalOpen, onCancle }: ProcessingModalProps) {
	const [isProcessing, setProcessing] = useState(true);
	const [error, setError] = useState(null);

	async function processPayment() {
		const response = await EventApiService.buyTicket(eventId, ticketName);

		if (response.status === 200) {
			setError(null);
			setProcessing(false);

			await sleep(2000);
			onCancle(true);
		} else {
			setError(response.data.message);
			setProcessing(false);

			await sleep(2000);
			onCancle(false);
		}
	}

	useEffect(() => {
		if (isModalOpen) {
			processPayment();
		}
	}, [isModalOpen]);

	return (
		<Modal
			className="payment-process-modal"
			wrapClassName="payment-process-modal-wrapper"
			open={isModalOpen}
			centered
			closable={false}
			footer={null}
			onCancel={() => onCancle(error === null)}
		>
			<div className="payment-process-modal-content">
				{isProcessing ? (
					<>
						<h1>Processing payment...</h1>
						<Spin className="payment-process-modal-spinner" indicator={<LoadingOutlined spin />} />
					</>
				) : error ? (
					<>
						<h1>{error}</h1>
						<div className="payment-process-modal-error">
							<svg className="cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
								<circle className="cross_circle" cx="26" cy="26" r="25" fill="none" />
								<path className="cross_check" fill="none" d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8" />
							</svg>
						</div>
					</>
				) : (
					<>
						<h1>Payment Successful!</h1>
						<div className="payment-process-modal-checkmark">
							<svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
								<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />{" "}
								<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
							</svg>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
}
