import {} from "../../api/models/ticket/TicketType";
import { Event } from "../../api/models/event/Event";
import TextArea from "antd/es/input/TextArea";
import { Alert, Button, Cascader, Col, DatePicker, Empty, Form, Input, InputNumber, Modal, Row, message } from "antd";
import {
	validateCapacity,
	validateCategoriesCascader,
	validateFutureDate,
	validateHasTickets,
	validateURL,
} from "../../pages/ProcessPayment/validators";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { MetadatService } from "../../api/services";
import { DATE_TIME_INPUT_FORMAT } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { set_create_modal_visible } from "../../store/eventPageSlice";
import { PlusOutlined } from "@ant-design/icons";
import { renderTicketForm } from "./utils";

import { useSearchParams } from "react-router-dom";
import { EventRequestDTO } from "../../api/models/event/EventRequestDTO";
import { EventApiService } from "../../api/services/EventApiService";

import "./CreateEventModal.scss";

export interface EventModalProps {
	event?: Event;
}

export default function CreateEventModal({ event }: EventModalProps) {
	const [form] = Form.useForm();

	const [isLoading, setLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const [searchParams] = useSearchParams();
	const [messageApi, contextHolder] = message.useMessage();

	const { isCreateModalOpen } = useSelector((state: RootState) => state.eventPage);

	let eventName: string = searchParams.get("name") || event?.name || "";
	let eventDescription: string = searchParams.get("description") || event?.description || "";
	let eventImageURL: string = searchParams.get("imageURL") || event?.bannerImageURL || "";
	let eventDateTime: dayjs.Dayjs = searchParams.has("dateTime")
		? dayjs(searchParams.get("dateTime")!)
		: event?.dateTime
		? dayjs(event?.dateTime)
		: dayjs().add(1, "day").hour(8).minute(0);
	let eventCapacity: number | null = Number(searchParams.get("capacity")) || event?.capacity || null;
	let eventLocation: string =
		searchParams.get("location") || `${event?.geoLocation.iso2Code}/${event?.geoLocation.city}` || "";
	let eventVenue: string = searchParams.get("venue") || event?.venue || "";
	let eventGoogleMapsURL: string = searchParams.get("mapsLink") || event?.googleMapsURL || "";

	let eventTicketTypes: any[] = [];

	if (searchParams.get("ticketTypes")) {
		try {
			eventTicketTypes = (JSON.parse(decodeURIComponent(searchParams.get("ticketTypes")!)) as any) || [];
		} catch (err) {
			eventTicketTypes = [];
		}
	} else if (event?.ticketTypes) {
		eventTicketTypes = event.ticketTypes;
	}

	const [countriesCascader, setCountriesCascader] = useState({
		options: [],
	});

	const [categoriesCascader, setCategoriesCascader] = useState({
		options: [],
	});

	async function loadFilterMetadata() {
		setLoading(true);
		await getCountries();
		await getCategories();
		setLoading(false);
	}

	async function getCountries() {
		const countries = await MetadatService.getCountires();

		if (countries.status === 200) {
			const countriesOptions = {
				options: countries.data.map((country: any) => ({
					label: country.name,
					value: country.iso2Code,
					children: country.cities.map((city: any) => ({ label: city, value: city })),
				})),
			};

			setCountriesCascader(countriesOptions);

			if (searchParams.has("location")) {
				const [iso2Code, city] = searchParams.get("location")!.split("/");

				let country = countriesOptions.options.find((x: any) => x.value === iso2Code);
				if (country?.children.some((x: any) => x.value === city)) {
					form.setFieldValue("geoLocation", [iso2Code, city]);
				}
			} else if (event?.geoLocation) {
				form.setFieldValue("geoLocation", [event.geoLocation.iso2Code, event.geoLocation.city]);
			}
		}
	}

	async function getCategories() {
		const categories = await MetadatService.getCategories();

		if (categories.status === 200) {
			const categoriesOptions = {
				options: categories.data.map((category: any) => ({
					label: category.name,
					value: category.name,
				})),
			};

			setCategoriesCascader(categoriesOptions);

			if (searchParams.has("categories")) {
				const paramsCategories: string[] = searchParams.get("categories")!.split(",");

				form.setFieldValue(
					"categories",
					categoriesOptions.options.filter((x: any) => paramsCategories.includes(x.value)).map((x: any) => [x.value])
				);
			} else if (event?.categories) {
				form.setFieldValue(
					"categories",
					categoriesOptions.options.filter((x: any) => event.categories.includes(x.value)).map((x: any) => [x.value])
				);
			}
		}
	}

	useEffect(() => {
		loadFilterMetadata();
	}, []);

	const [errorMessage, setErrorMessage] = useState("");

	const onFinish = async (eventForm: any) => {
		let response = event?.id!
			? await EventApiService.edit(event?.id!, new EventRequestDTO().fromForm(eventForm))
			: await EventApiService.create(new EventRequestDTO().fromForm(eventForm));

		if (response.status === 200) {
			messageApi.success(`Event successfully ${event ? "edited." : "created."}`);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else if (response.status === 403) {
			setErrorMessage("You don't have the necessary roles to create event!");
		} else {
			setErrorMessage(response.data.detail || response.data.message);
		}
	};

	const [imageURL, setImageURL] = useState(eventImageURL);

	return (
		<Modal
			className="create-event-modal"
			wrapClassName="create-event-modal-wrapper"
			title={event ? "Edit Event" : "Create Event"}
			open={isCreateModalOpen}
			onCancel={() => dispatch(set_create_modal_visible(false))}
			centered
			closable
			footer={null}
		>
			<Form form={form} className="create-event-modal-form" layout="vertical" onFinish={onFinish}>
				<hr />
				<h2>What is your event?</h2>
				<div className="create-event-modal-info">
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Event Name"
								name="name"
								rules={[{ required: true, message: "Please enter a name!" }]}
								initialValue={eventName}
							>
								<Input placeholder="Event" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Categories"
								name="categories"
								required
								rules={[
									{
										validator: validateCategoriesCascader,
									},
								]}
							>
								<Cascader
									id="category-cascader"
									className="event-filter-cascader"
									options={categoriesCascader.options}
									multiple
									maxTagCount={3}
									placeholder="Select category..."
									loading={isLoading}
									disabled={isLoading}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								label="Image URL"
								name="bannerImageURL"
								rules={[{ required: true, message: "Please enter a valid URL!" }, { validator: validateURL }]}
								initialValue={eventImageURL}
							>
								<Input placeholder="Past or enter image URL" onChange={(e) => setImageURL(e.target.value)} />
							</Form.Item>
						</Col>
						<Col span={24}>
							{imageURL.length > 0 ? (
								<img className="create-event-modal-info-image" src={imageURL || event?.bannerImageURL} alt="" />
							) : (
								<Empty
									className="create-event-modal-info-image create-event-modal-info-image-empty"
									style={{ padding: "1rem" }}
									imageStyle={{ height: 60 }}
									description={imageURL.length === 0 && <span>No image supplied, please enter valid URL.</span>}
								/>
							)}
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item
								label="Description"
								name="description"
								rules={[
									{ required: true, message: "Please enter a description!" },
									{ max: 255, message: "Maximum of 255 charachters is allowed." },
								]}
								initialValue={eventDescription}
							>
								<TextArea placeholder="Get ready for an event so spectacular that even your pet rock wouldn't want to miss it..." />
							</Form.Item>
						</Col>
					</Row>
				</div>
				<hr />
				<h2>When and where is your event?</h2>
				<Row gutter={16}>
					<Col md={8} sm={24} xs={24}>
						<Form.Item
							label="Date and time"
							name="dateTime"
							required
							rules={[
								{ required: true, message: "Please select the date and time!" },
								{
									validator: validateFutureDate,
								},
							]}
							initialValue={eventDateTime}
						>
							<DatePicker
								className="create-event-modal-date-time"
								showTime={{ format: "HH:mm" }}
								format={DATE_TIME_INPUT_FORMAT}
							/>
						</Form.Item>
					</Col>

					<Col md={10} sm={24} xs={24}>
						<Form.Item
							label="Location"
							name="geoLocation"
							rules={[{ required: true, message: "Please select a location!" }]}
							initialValue={eventLocation}
						>
							<Cascader
								id="location-cascader"
								className="event-filter-cascader"
								options={countriesCascader.options}
								maxTagCount={1}
								placeholder="Select location..."
								loading={isLoading}
								disabled={isLoading}
							/>
						</Form.Item>
					</Col>
					<Col md={6} sm={24} xs={24}>
						<Form.Item
							label="Capacity"
							name="capacity"
							required
							rules={[{ required: true, message: "Please select the capacity!" }, { validator: validateCapacity }]}
							initialValue={eventCapacity}
						>
							<InputNumber name="capacity" placeholder="100" className="create-event-modal-capacity" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col md={10} sm={24} xs={24}>
						<Form.Item
							label="Venue"
							name="venue"
							rules={[{ required: true, message: "Please enter venue name!" }]}
							initialValue={eventVenue}
						>
							<Input placeholder="City Hall" />
						</Form.Item>
					</Col>
					<Col md={14} sm={24} xs={24}>
						<Form.Item
							label="Google Maps URL"
							name="googleMapsURL"
							rules={[{ required: true, message: "Please enter a valid Google Maps URL!" }, { validator: validateURL }]}
							initialValue={eventGoogleMapsURL}
						>
							<Input placeholder="https://maps.google.com/..." />
						</Form.Item>
					</Col>
				</Row>

				<hr />

				<h2>When kind of tickets do you offer?</h2>
				<Form.List
					name="ticketTypes"
					rules={[
						{
							validator: validateHasTickets,
						},
					]}
					initialValue={eventTicketTypes}
				>
					{(fields, { add, remove }, { errors }) => (
						<div className="create-event-modal-tickets">
							{fields.map((field, index) => renderTicketForm(form, field, add, remove, index))}
							<Form.Item>
								<Button type="dashed" onClick={add} style={{ width: "100%" }} icon={<PlusOutlined />}>
									Add field
								</Button>

								<Form.ErrorList errors={errors} />
							</Form.Item>
						</div>
					)}
				</Form.List>

				{errorMessage && errorMessage.length > 0 && (
					<Form.Item>
						<div className="">
							<Alert message={errorMessage} type="error" showIcon />
						</div>
					</Form.Item>
				)}

				<Button block size="large" htmlType="submit">
					Submit
				</Button>
			</Form>
			{contextHolder}
		</Modal>
	);
}
