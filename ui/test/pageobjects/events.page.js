const { $ } = require('@wdio/globals')
const Page = require('./page');
const homePage = require('./home.page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class EventsPage extends Page {
    /**
     * define selectors using getter methods
     */
    get locationsDropdown () {
        return $('//*[@id="event-filter"]/div[2]/div/div[2]/div/div/div/div');
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

    async findEventsByLocations () {
        await homePage.allEventsButton.click()
        await browser.debug()
        await this.locationsDropdown.click();
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

module.exports = new EventsPage();
