import { flatMap } from "lodash";

export const DATE_TIME_FORMAT = "YYYY-MM-DD HH";
export const DATE_TIME_INPUT_FORMAT = "YYYY-MM-DD HH:mm";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function cascaderOptionsToURI(arr: any[]) {
	return flatMap(arr)
		.map((x) => x.value)
		.join(",");
}

export function getRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function findFirstMultipleOf(startingNumber: number, target: number): number {
	let currentNumber = Math.max(0, Math.floor(startingNumber));

	while (currentNumber % target !== 0) {
		currentNumber++;
	}

	return currentNumber;
}

export function setSearchParam(key: string, value: string) {
	const currentUrl = new URL(window.location.href);
	currentUrl.searchParams.set(key, value);
	window.history.replaceState({}, "", currentUrl.href);
}
