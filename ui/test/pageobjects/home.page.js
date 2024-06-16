const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    get navBarMainMenuLogo () {
        return $('//*[@id="landing"]/header/div[1]/div[1]/span[1]');
    }

    get loginButton() {
        return $('//*[@id="landing"]/header/div[1]/div[2]/button[2]')
    }

    get signupButton () {
        return $('//*[@id="landing"]/header/div[1]/div[2]/button[1]/span');
    }

    get loginButton() {
        return $('//*[@id="landing"]/header/div[1]/div[2]/button[2]')
    }

    get searchEventsInput() {
        return $('//*[@id="event-slideshow"]/div[1]/div/span/input')
    }

    get searchButton() {
        return $('//*[@id="event-slideshow"]/div[1]/div/div[2]/button/span')
    }

    get categoryDropdown() {
        return $('//*[@id="event-slideshow"]/div[1]/div/div[1]/div[1]/div/div')
    }

    get eventCardName() {
        return $('//*[@id="events"]/div/div/div[2]/div[1]/div[1]/div/div[1]/span')
    }

    get eventCardCity() {
        return $('//*[@id="events"]/div/div/div[2]/div[1]/div[1]/div/div[2]/span[2]/div/div[2]/div[3]')
    }

    get electronicsCategory() {
        return $('/html/body/div[2]/div/div/div/ul/li[1]/div')
    }

    get allEventsButton() {
        return $('/html/body/div[1]/div/header/div[2]/div/div[1]/span[1]')
    }

    get mainMenuButton() {
        return $('#logged-in-user-menu > div > span')
    }

    get editProfileButton() {
        return $('/html/body/div[2]/div/div[3]/div/div/div[2]/ul/li[3]/ul/li[1]')
    }

    async findEventsByName (eventName) {
        await this.searchEventsInput.click()
        await this.searchEventsInput.setValue(eventName);
        await this.searchButton.click();
        await expect(this.eventCardName).toBeDisplayed()
        await expect(this.eventCardName).toHaveText(eventName)
    }

    async findEventsByCity (eventCity) {
        await this.searchEventsInput.click()
        await this.searchEventsInput.setValue(eventCity);
        await this.searchButton.click();
        await expect(this.eventCardCity).toBeDisplayed()
        await expect(this.eventCardCity).toHaveText(eventCity)
    }

    async findEventsByCategory (category) {
        await this.categoryDropdown.click()
        await browser.debug()
        await this.electronicsCategory.click();
        await browser.debug()
        await this.searchButton.click();
        await expect(this.eventCardCity).toBeDisplayed()
        await expect(this.eventCardCity).toHaveText(eventCity)
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
