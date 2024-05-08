import { HowItWorksCard } from "./sections";
import UndrawSignUp from "../../assets/svg/undraw_sign_up.svg";
import FindEventsSvg from "../../assets/svg/undraw_search.svg";
import CreditCardSvg from "../../assets/svg/undraw_credit_card.svg";
import CollapsibleSection from "../../components/CollapsibleSection/CollapsibleSection";

import "./About.scss";

export function About() {
	return (
		<div id="about" className="section">
			<CollapsibleSection id={0} title="How it works for buyers" initialExpanded={true}>
				<div className="how-it-works-section">
					<HowItWorksCard
						imgUrl={FindEventsSvg}
						title="Search for Events"
						description="Find exciting concerts, festivals, and parties near you."
					/>
					<HowItWorksCard
						imgUrl={UndrawSignUp}
						title="View Event Details"
						description="Explore event information, including venue, date, and ticket prices."
					/>
					<HowItWorksCard
						imgUrl={CreditCardSvg}
						title="Get your tickets"
						description="Secure your spot at the event by purchasing tickets online."
					/>
				</div>
			</CollapsibleSection>
			<CollapsibleSection id={1} title="How it works for sellers" initialExpanded={false}>
				<div className="how-it-works-section">
					<HowItWorksCard
						imgUrl={FindEventsSvg}
						title="Create Event"
						description="Find exciting concerts, festivals, and parties near you."
					/>
					<HowItWorksCard
						imgUrl={UndrawSignUp}
						title="Manage Event"
						description="Explore event information, including venue, date, and ticket prices."
					/>
					<HowItWorksCard
						imgUrl={CreditCardSvg}
						title="Get your tickets"
						description="Secure your spot at the event by purchasing tickets online."
					/>
				</div>
			</CollapsibleSection>
		</div>
	);
}
