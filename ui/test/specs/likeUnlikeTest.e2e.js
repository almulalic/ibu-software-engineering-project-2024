const CreateEventPage = require("../pageobjects/createEvent.page");
const LoginPage = require("../pageobjects/login.page");
const MyEvents = require("../pageobjects/myEvents.page");

const testEventName = "Like/unlike test event";
const email = process.env.REACT_TESTER_EMAIL;
const password = process.env.REACT_TESTER_PASSWORD;
const { browser } = require("@wdio/globals");

describe("Test Like Unlike Feature", () => {
	it("Verify that test account works", async () => {
		await LoginPage.open();
		await LoginPage.login(email, password);
	});

	it("Open create modal", async () => {
		await CreateEventPage.open();
		await CreateEventPage.initiateCreate();
	});

	it("Input event details", async () => {
		await CreateEventPage.createEvent(
			testEventName,
			["Electronics"],
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png",
			testEventName,
			"2024-07-10 08:00",
			{ country: "Bosnia and Herzegovina", city: "Sarajevo" },
			100,
			"Town Hall",
			"https://maps.app.goo.gl/kP7fpBM8q2c4ZUD78",
			[
				{
					id: 0,
					name: "Test ticket",
					quantity: 100,
					price: 10,
					description: "Test ticket",
				},
			]
		);
	});

	it("Go to my organized events and find the test event", async () => {
		await MyEvents.open();
		await MyEvents.changeType("Organized Events");
		await MyEvents.findEventByName(testEventName);
	});

	it("Like the event", async () => {
		await MyEvents.findEventByName(testEventName);
		await MyEvents.like(testEventName);
		await browser.pause(2000);
	});

	it("Unlike the event", async () => {
		await MyEvents.findEventByName(testEventName);
		await MyEvents.unlike(testEventName);
		await browser.pause(2000);
	});

	it("Delete the test event", async () => {
		await MyEvents.open();
		await MyEvents.changeType("Organized Events");
		await MyEvents.changeMode("Delete Mode");
		await MyEvents.delete(testEventName);
	});
});
