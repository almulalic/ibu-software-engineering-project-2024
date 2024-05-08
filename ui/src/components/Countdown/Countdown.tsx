import { useState, useEffect } from "react";

export interface CountdownTimerProps {
	targetDate: string;
}

const CountdownTimer = (props: CountdownTimerProps) => {
	const targetDate = new Date(props.targetDate);

	const calculateTimeRemaining = () => {
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		if (difference <= 0) {
			return "Time is up!";
		}

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
	};

	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, [targetDate]);

	return <div>{timeRemaining}</div>;
};

export default CountdownTimer;
