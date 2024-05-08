import { Card, DatePicker, Flex } from "antd";

import "./EventSection.scss";
import { ReactNode, useState } from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

export interface SectionContent {
	heading: string;
	description: string;
	icon: ReactNode;
}

const timeBasedSections = [
	{
		heading: "This week",
		description: "Events this week",
		icon: <FieldTimeOutlined style={{ fontSize: "72px" }} />,
	},
	{
		heading: "This month",
		description: "Events this week",
		icon: <FieldTimeOutlined style={{ fontSize: "72px" }} />,
	},
	{
		heading: "Today",
		description: "Events this week",
		icon: <FieldTimeOutlined style={{ fontSize: "72px" }} />,
	},
];

const categorySections = [
	{
		heading: "Events",
		description: "Parties, Exibitions,...",
		icon: <FieldTimeOutlined style={{ fontSize: "72px" }} />,
	},
	{
		heading: "Theater",
		description: "Comedy, Opera, Drama,...",
		icon: <FieldTimeOutlined style={{ fontSize: "72px" }} />,
	},
	{
		heading: "Cinema",
		description: "Action, Comedy, Family,...",
		icon: <FieldTimeOutlined style={{ fontSize: "72px" }} />,
	},
];

export const EventSection = () => {
	const renderCard = (data: SectionContent, id: string) => {
		return (
			<Card id={id} className="EventSection-Card">
				<Flex gap="middle" justify="flex-start" align="center">
					<FieldTimeOutlined style={{ fontSize: "72px" }} />
					<Flex vertical align="start">
						<span className="EventSection-Card-Heading">{data.heading}</span>
						<span className="EventSection-Card-Description">{data.description}</span>
					</Flex>
				</Flex>
			</Card>
		);
	};

	return (
		<div className="EventSection">
			<Flex gap="middle" justify="center" align="start" className="EventSection-Flex">
				<Flex vertical gap="middle" justify="center" align="start">
					{timeBasedSections.map((x, i) => renderCard(x, i.toFixed()))}
				</Flex>
				<Flex vertical gap="middle" justify="center" align="start">
					{categorySections.map((x, i) => renderCard(x, i.toFixed()))}
				</Flex>
			</Flex>
		</div>
	);
};
