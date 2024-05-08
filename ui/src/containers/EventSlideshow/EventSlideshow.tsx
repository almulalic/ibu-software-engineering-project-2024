import { Carousel } from "antd";
import { LandingFilter } from "../../components/LandingFilter/LandingFilter";

import "./EventSlideshow.scss";

const eventPictureUrls = [
	"https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
	"https://teatrocolon.org.ar/sites//files/styles/d10/public/teatro-colon-argentina-image_1366_768.jpg?itok=0sbBdjrl",
	"https://cinema.cornell.edu/sites//files/styles/pano/public/2023-12/pxl20231207001156309night.jpg?h=aba3a455&itok=vfGZGo7G",
	"https://images.unsplash.com/photo-1578736641330-3155e606cd40?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D8",
];

export function EventSlideshow() {
	return (
		<div id="event-slideshow">
			<LandingFilter />

			<Carousel autoplay autoplaySpeed={7000} speed={1500} fade={true} id="event-slideshow-carousel">
				{eventPictureUrls.map((url, index) => (
					<div key={index}>
						<div id="overlay"></div>
						<img src={url} className="event-slideshow-picture" alt={`Event ${index + 1}`} />
					</div>
				))}
			</Carousel>
		</div>
	);
}
