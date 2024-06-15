import { Carousel } from "antd";
import { LandingFilter } from "../../components/LandingFilter/LandingFilter";

import slideshow1 from "./img/slideshow1.jpeg";
import slideshow2 from "./img/slideshow2.avif";
import slideshow3 from "./img/slideshow3.jpeg";
import slideshow4 from "./img/slideshow4.jpeg";

import "./EventSlideshow.scss";

const eventPictureNames = [slideshow1, slideshow2, slideshow3, slideshow4];

export function EventSlideshow() {
	return (
		<div id="event-slideshow">
			<LandingFilter />

			<Carousel autoplay autoplaySpeed={7000} speed={1500} fade={true} id="event-slideshow-carousel">
				{eventPictureNames.map((img, index) => (
					<div key={index}>
						<div id="overlay"></div>
						<img className="event-slideshow-picture" src={img} alt="" />
					</div>
				))}
			</Carousel>
		</div>
	);
}
