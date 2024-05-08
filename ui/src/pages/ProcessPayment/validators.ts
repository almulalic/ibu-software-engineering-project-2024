import { Form, FormInstance } from "antd";
import { DateTime } from "luxon";
import validator from "validator";

export const validateCreditCardNumber = (rule: any, value: any) => {
	const cleanedNumber = value.replace(/\D/g, "");

	const digits = Array.from(cleanedNumber, Number);

	const reversedDigits = digits.reverse();

	const doubledDigits = reversedDigits.map((digit, index) => (index % 2 === 1 ? digit * 2 : digit));

	const summedDigits = doubledDigits.map((digit) => (digit > 9 ? digit - 9 : digit));

	const sum = summedDigits.reduce((acc, digit) => acc + digit, 0);

	const isValid = sum % 10 === 0;

	if (!isValid) {
		return Promise.reject("Invalid credit card number");
	}

	return Promise.resolve();
};

export const validateFutureDate = (_: any, value: any) => {
	if (value && value.isBefore(DateTime.now(), "second")) {
		return Promise.reject("Expiration date must be in the future");
	}

	return Promise.resolve();
};

export const validateHasTickets = async (_: any, names: any) => {
	if (!names || names.length < 1) {
		return Promise.reject(new Error("At least 1 ticket type"));
	}
};

export const validateURL = (_: any, value: any) => {
	if (value && !validator.isURL(value)) {
		return Promise.reject("Invalid URL");
	}
	return Promise.resolve();
};

export const validateCategoriesCascader = (_: any, value: any) => {
	if (!value || value.length === 0) {
		return Promise.reject("Please select at least one category!");
	} else if (value.length > 3) {
		return Promise.reject("You can select at most 3 categories!");
	}

	return Promise.resolve();
};

export const validateCapacity = (_: any, value: any) => {
	if (value < 1) {
		return Promise.reject("Capacity must be at least 1!");
	}

	return Promise.resolve();
};

export const validateTicketPrice = (_: any, value: any) => {
	if (value < 1) {
		return Promise.reject("Ticket price must be at least 1!");
	}

	return Promise.resolve();
};

export const validateTicketQuantities = (form: FormInstance, value: any) => {
	const capacity: number = form.getFieldValue("capacity");
	const quantities: number[] = form.getFieldValue("ticketTypes").map((x: any) => x.quantity);
	const ticketQuantities: number = quantities.reduce((acc, curr) => acc + curr, 0);

	if (ticketQuantities == capacity) {
		return Promise.resolve();
	} else {
		return Promise.reject("Sum of available ticket type quantities must be equal to the capacity of the event!");
	}
};

export const validateTicketNames = (form: FormInstance, value: any) => {
	const names: string = form.getFieldValue("ticketTypes").map((x: any) => x.name);

	if (new Set(names).size === names.length) {
		return Promise.resolve();
	} else {
		return Promise.reject("Ticket type names must be unique!");
	}
};

export const validateRequiredCheckbox = (value: any) => {
	console.log(value);
};
