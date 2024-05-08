import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Page from "../../containers/Page/Page";
import ProcessingModal from "./ProcessingModal";
import { validateFutureDate } from "./validators";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, DatePicker, Form, Input, Segmented } from "antd";
import CreditCardInput from "../../components/CreditCardInput/CreditCardInput";

import "./ProcessPayment.scss";
import { useAuthCheck } from "../../utils";

export function ProcessPayment() {
	const [isLoading, setLoading] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	useAuthCheck([]);

	const { userInfo } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (userInfo == null || !searchParams.has("eventId") || !searchParams.has("ticketName")) {
			navigate({ pathname: "/", search: `?message=Unable to initialize payment for that event!&messageType=error` });
		}
	}, []);

	const [paymentType, setPaymentType] = useState("Visa");
	const [creditCardNumber, setCreditCardNumber] = useState(["", "", "", ""]);

	const onPaymentTypeChange = (value: any) => {
		setPaymentType(value);
	};

	const onFinish = (values: any) => {
		setModalOpen(true);
	};

	const onModalClose = (isPaid: boolean) => {
		setModalOpen(false);

		if (isPaid) {
			navigate("/me/events");
		} else {
			navigate("/events");
		}
	};

	return (
		<Page id="payment-process-section">
			<div className="payment-process-form">
				<Card title="Payment Information" className="payment-process-form-card">
					<Segmented
						options={["Visa", "Mastercard", "Paypal"]}
						block
						onChange={onPaymentTypeChange}
						value={paymentType}
						className="payment-process-select-type"
					/>

					{paymentType == "Paypal" ? (
						<div className="payment-process-paypal">
							<Button size="large" block onClick={() => setModalOpen(true)}>
								Continue with PayPal
							</Button>
						</div>
					) : (
						<Form
							name="paymentForm"
							onFinish={onFinish}
							labelCol={{ span: 8 }}
							wrapperCol={{ span: 16 }}
							labelAlign="left"
						>
							<Form.Item
								label="Full Name"
								name="fullName"
								rules={[{ required: true, message: "Please enter your full name" }]}
								initialValue={userInfo?.firstName + " " + userInfo?.lastName}
							>
								<Input defaultValue={userInfo?.firstName + " " + userInfo?.lastName} disabled={isLoading} />
							</Form.Item>

							<Form.Item
								label="Email"
								name="email"
								rules={[
									{ required: true, message: "Please enter your email!" },
									{ type: "email", message: "Please enter a valid email address!" },
								]}
								initialValue={userInfo?.email}
							>
								<Input type="email" defaultValue={userInfo?.email} disabled={isLoading} />
							</Form.Item>

							<Form.Item
								label="Address"
								name="address"
								rules={[{ required: true, message: "Please enter your address" }]}
							>
								<Input name="address" disabled={isLoading} />
							</Form.Item>

							<Form.Item
								label="Card Number"
								name="creditCardInput"
								initialValue={creditCardNumber}
								rules={[{ required: true, message: "Please enter your card number" }]}
							>
								<CreditCardInput
									creditCardNumber={creditCardNumber}
									setCreditCardNumber={setCreditCardNumber}
									disabled={isLoading}
								/>
							</Form.Item>

							<Form.Item
								label="Expiration Date"
								name="expirationDate"
								rules={[
									{ required: true, message: "Please enter the expiration date" },
									{ validator: validateFutureDate },
								]}
							>
								<DatePicker name="expirationDate" picker="month" format="MM/YYYY" disabled={isLoading} />
							</Form.Item>

							<Form.Item
								label="CVV"
								name="cvv"
								rules={[
									{ required: true, message: "Please enter the CVV" },
									{ min: 3, message: "CVV must be at least 3 numbers!" },
									{ max: 3, message: "CVV must be at most 3 numbers!" },
								]}
							>
								<Input name="cvv" type="number" disabled={isLoading} maxLength={3} minLength={3} />
							</Form.Item>

							<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
								<Button type="primary" htmlType="submit" block>
									Submit
								</Button>
							</Form.Item>
						</Form>
					)}
				</Card>
			</div>
			<ProcessingModal
				isModalOpen={isModalOpen}
				onCancle={onModalClose}
				eventId={searchParams.get("eventId") || ""}
				ticketName={searchParams.get("ticketName") || ""}
			/>
		</Page>
	);
}
