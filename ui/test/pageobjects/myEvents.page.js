const { $ } = require("@wdio/globals");
const Page = require("./page");
const { browser } = require("@wdio/globals");

class MyEvents extends Page {
	UNLIKE_COLOR = "rgba(255,255,255,1)";
	LIKE_COLOR = "rgba(242,151,39,1)";

	get typeSwitcher() {
		return $('//*[@id="my-events"]/div/div/div[1]/div');
	}

	get modeSwitcher() {
		return $('//*[@id="my-events"]/div/div/div[2]');
	}

	get eventsList() {
		return $('//*[@id="my-events"]/div/div/div[3]/div/div[1]');
	}

	get deletePopconfirmYes() {
		return $('//*[@id="popconfirm-delete-event"]/div/div/div[2]/button[2]');
	}

	get wrapper() {
		return $('//*[@id="my-events"]');
	}

	typeSwitcherButton(type) {
		return `div[title="${type}"]`;
	}

	modeSwitcherButton(mode) {
		return `span[title="${mode}"]`;
	}

	eventCard(name) {
		return `div[title="${name}"]`;
	}

	get likeCount() {
		return 'span[title="like-count"]';
	}

	get likeButton() {
		return 'span[title="event-like-button"]';
	}

	async changeType(type) {
		await expect(await this.typeSwitcher).toBeDisplayed();
		await this.typeSwitcher.$(this.typeSwitcherButton(type)).click();
	}

	async changeMode(mode) {
		await expect(await this.modeSwitcher).toBeDisplayed();
		(await (await this.modeSwitcher.$(this.modeSwitcherButton(mode))).parentElement()).click();
	}

	async findEventByName(name) {
		await expect(await this.eventsList).toBeDisplayed();

		const event = (await this.eventsList).$(this.eventCard(name));
		await expect(event).toBeDisplayed();

		return event;
	}

	async like(name) {
		await expect(await this.eventsList).toBeDisplayed();
		const event = await this.findEventByName(name);

		const likeCount = await event.$(this.likeCount);
		const likeButton = await event.$(this.likeButton);

		await expect(likeCount).toBeDisplayed();
		await expect(likeButton).toBeDisplayed();

		const countBeforeLike = Number(await likeCount.getText());
		const colorBeforeLike = await likeButton.getCSSProperty("color");
		await expect(colorBeforeLike.value).toEqual(this.UNLIKE_COLOR);

		await likeButton.click();
		await this.wrapper.click();
		await browser.pause(1000);

		const countAfrerLike = await likeCount.getText();
		const colorAfterLike = await likeButton.getCSSProperty("color");
		await expect(countBeforeLike + 1).toEqual(Number(countAfrerLike));
		await expect(colorAfterLike.value).toEqual(this.LIKE_COLOR);
	}

	async unlike(name) {
		await expect(await this.eventsList).toBeDisplayed();
		const event = await this.findEventByName(name);

		const likeCount = await event.$(this.likeCount);
		const likeButton = await event.$(this.likeButton);

		await expect(likeCount).toBeDisplayed();
		await expect(likeButton).toBeDisplayed();

		const countBeforeUnlike = Number(await likeCount.getText());
		const colorBeforeUnlike = await likeButton.getCSSProperty("color");
		await expect(colorBeforeUnlike.value).toEqual(this.LIKE_COLOR);

		await likeButton.click();
		await this.wrapper.click();
		await browser.pause(1000);

		const countAfrerUnlike = await likeCount.getText();
		const colorAfterUnlike = await likeButton.getCSSProperty("color");
		await expect(countBeforeUnlike - 1).toEqual(Number(countAfrerUnlike));
		await expect(colorAfterUnlike.value).toEqual(this.UNLIKE_COLOR);
	}

	async delete(name) {
		await expect(this.eventsList).toBeDisplayed();
		await this.findEventByName(name);

		const deleteButton = await this.eventsList.$(`div[title="${name}"]`).$('span[title="delete-event-button"]');
		await deleteButton.click();

		await expect(this.deletePopconfirmYes).toBeDisplayed();
		await this.deletePopconfirmYes.click();
	}

	open() {
		return super.open("/me/events");
	}
}

module.exports = new MyEvents();
