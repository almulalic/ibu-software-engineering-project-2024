import { ReactNode } from "react";
import "./HowItWorksCard.scss";

export interface HowItWorksCardProps {
	imgUrl: string;
	title: string;
	description: string;
}

export function HowItWorksCard(props: HowItWorksCardProps) {
	return (
		<div className="how-it-works-card">
			<img className="how-it-works-img" src={props.imgUrl} />

			<div className="how-it-works-card-container">
				<h1 className="how-it-works-card-heading">{props.title}</h1>
				<div className="how-it-works-card-description">{props.description}</div>
			</div>
		</div>
	);
}
