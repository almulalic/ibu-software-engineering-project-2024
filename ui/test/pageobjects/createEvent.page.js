const { $ } = require("@wdio/globals");
const Page = require("./page");
const { browser } = require("@wdio/globals");

class CreateEvent extends Page {
	get createEventButton() {
		return $('//*[@id="logged-in-user-menu"]/button');
	}

	get createEventModal() {
		return $("/html/body/div[3]/div/div[2]/div/div[2]");
	}

	get nameInput() {
		return $('//*[@id="name"]');
	}

	get categoriesCascader() {
		return $("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[1]/div[1]/div[2]/div/div/div[2]/div/div/div/div");
	}

	get categoriesCascaderOptions() {
		return $('//*[@id="event-modal-category-cascader"]/div/ul');
	}

	get imageUrlInput() {
		return $('//*[@id="bannerImageURL"]');
	}

	get descriptionInput() {
		return $('//*[@id="description"]');
	}

	get dateTimeInput() {
		return $('//*[@id="event-modal-date-time"]');
	}

	get locationCascader() {
		return $("/html/body/div[2]/div/div[2]/div/div[2]/div[2]/form/div[2]/div[2]/div/div/div[2]/div/div/div");
	}

	get locationCascaderCountryOptions() {
		return $('//*[@id="event-modal-location-cascader"]/div/ul');
	}

	get locationCascaderCityOptions() {
		return $('//*[@id="event-modal-location-cascader"]/div/ul[2]');
	}

	get capacityInput() {
		return $('//*[@id="capacity"]');
	}

	get venueInput() {
		return $('//*[@id="venue"]');
	}

	get googleMapsInput() {
		return $('//*[@id="googleMapsURL"]');
	}

	get createTicketTypeButton() {
		return $('//*[@id="addTicketTypeButton"]');
	}

	createTicketTypeNameInput(id) {
		return $(`//*[@id="ticketTypes_${id}_name"]`);
	}

	createTicketTypeQuantityInput(id) {
		return $(`//*[@id="ticketTypes_${id}_quantity"]`);
	}

	createTicketTypePriceInput(id) {
		return $(`//*[@id="ticketTypes_${id}_price"]`);
	}

	createTicketTypeDescriptionInput(id) {
		return $(`//*[@id="ticketTypes_${id}_description"]`);
	}

	get submitButton() {
		return $('//*[@id="submitEventForm"]');
	}

	async inputCategories(categories) {
		await expect(this.categoriesCascader).toBeDisplayed();
		await this.categoriesCascader.click();

		await expect(this.categoriesCascaderOptions).toBeDisplayed();
		await expect(this.categoriesCascaderOptions.$("li")).toBeDisplayed();

		for (const category of categories) {
			await this.categoriesCascaderOptions.$(`li[title="${category}"]`).click();
		}
	}

	async inputDateTime(dateTime) {
		await expect(this.dateTimeInput).toBeDisplayed();
		await this.dateTimeInput.click();
		await this.dateTimeInput.clearValue();
		await this.dateTimeInput.setValue(dateTime);
	}

	async inputLoacation(country, city) {
		await expect(this.locationCascader).toBeDisplayed();
		await this.locationCascader.click();

		await expect(this.locationCascaderCountryOptions).toBeDisplayed();
		await expect(this.locationCascaderCountryOptions.$("li")).toBeClickable();
		await this.locationCascaderCountryOptions.$(`li[title="${country}"]`).click();

		await expect(this.locationCascaderCityOptions).toBeDisplayed();
		await expect(this.locationCascaderCityOptions.$("li")).toBeClickable();
		await this.locationCascaderCityOptions.$(`li[title="${city}"]`).click();
	}

	async addTicketType(id, name, quantity, price, description) {
		await this.createTicketTypeButton.click();
		await expect(this.createTicketTypeNameInput(id)).toBeDisplayed();

		await this.createTicketTypeNameInput(id).setValue(name);
		await this.createTicketTypeQuantityInput(id).setValue(quantity);
		await this.createTicketTypePriceInput(id).setValue(price);
		await this.createTicketTypeDescriptionInput(id).setValue(description);
	}

	async initiateCreate() {
		await this.createEventButton.click();
		await expect(this.nameInput).toBeDisplayed();
	}

	async createEvent(
		name,
		categories,
		imageUrl,
		description,
		dateTime,
		location,
		capacity,
		venue,
		googleMapsUrl,
		ticketTypes
	) {
		await this.nameInput.setValue(name);
		await this.inputCategories(categories);
		await this.imageUrlInput.setValue(imageUrl);
		await this.descriptionInput.setValue(description);
		await this.inputDateTime(dateTime);
		await this.inputLoacation(location.country, location.city);
		await this.capacityInput.setValue(capacity);
		await this.venueInput.setValue(venue);
		await this.googleMapsInput.setValue(googleMapsUrl);

		for (const ticketType of ticketTypes) {
			await this.addTicketType(
				ticketType.id,
				ticketType.name,
				ticketType.quantity,
				ticketType.price,
				ticketType.description
			);
		}

		await this.submitButton.click();
	}

	/**
	 * overwrite specific options to adapt it to page object
	 */
	open() {
		return super.open("");
	}
}

module.exports = new CreateEvent();
