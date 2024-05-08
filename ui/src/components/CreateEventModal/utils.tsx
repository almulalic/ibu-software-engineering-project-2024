import { MinusCircleOutlined } from "@ant-design/icons";
import { Col, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import {
	validateTicketNames,
	validateTicketPrice,
	validateTicketQuantities,
} from "../../pages/ProcessPayment/validators";
import "./CreateEventModal.scss";

const { Option } = Select;

export const selectAfter = (
	<Select defaultValue="USD">
		<Option value="USD">USD</Option>
		<Option value="EUR">EUR</Option>
		<Option value="BAM">BAM</Option>
		<Option value="RSD">RSD</Option>
	</Select>
);

export const renderTicketForm = (form: any, field: any, add: any, remove: any, index: any) => {
	return (
		<div key={index}>
			<Form.Item
				label={
					<span className="create-event-modal-tickets-ticket-label">
						Ticket Type
						<span className="create-event-modal-tickets-ticket-delete">
							<MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
						</span>
					</span>
				}
				required={true}
				key={field.key}
				validateTrigger={["onChange", "onBlur"]}
			>
				<Flex gap="middle" vertical>
					<Col span={24}>
						<Row gutter={24} className="create-event-modal-tickets-details">
							<Col md={8} sm={24} xs={24}>
								<Form.Item
									{...field}
									label="Name"
									validateTrigger={["onChange", "onBlur"]}
									rules={[
										{
											required: true,
											whitespace: true,
											message: "Please input ticket name.",
										},
										{
											validator: (value) => validateTicketNames(form, value),
										},
									]}
									name={[field.name, "name"]}
									noStyle
								>
									<Input placeholder="Name" name="name" />
								</Form.Item>
							</Col>

							<Col md={8} sm={12} xs={12}>
								<Form.Item
									{...field}
									label="Quantity"
									validateTrigger={["onChange", "onBlur"]}
									rules={[
										{
											required: true,
											message: "Please input ticket quantity!",
										},
										{ validator: (value) => validateTicketQuantities(form, value) },
									]}
									noStyle
									name={[field.name, "quantity"]}
								>
									<InputNumber
										name="quantity"
										placeholder="50"
										className="create-event-modal-tickets-ticket-quantity"
									/>
								</Form.Item>
							</Col>

							<Col md={8} sm={12} xs={12}>
								<Form.Item
									{...field}
									label="Price"
									validateTrigger={["onChange", "onBlur"]}
									rules={[
										{
											required: true,
											message: "Please input ticket price!",
										},
										{ validator: validateTicketPrice },
									]}
									noStyle
									name={[field.name, "price"]}
								>
									<InputNumber addonAfter={selectAfter} name="price" placeholder="15" />
								</Form.Item>
							</Col>
						</Row>
					</Col>

					<Col span={24}>
						<Form.Item
							{...field}
							validateTrigger={["onChange", "onBlur"]}
							label="Description"
							rules={[
								{
									required: true,
									whitespace: true,
									message: "Please input ticket description.",
								},
							]}
							noStyle
							name={[field.name, "description"]}
						>
							<Input placeholder="Description" name="description" />
						</Form.Item>
					</Col>
				</Flex>
			</Form.Item>
			<hr />
		</div>
	);
};
