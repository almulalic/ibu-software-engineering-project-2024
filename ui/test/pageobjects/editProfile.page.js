/** global pause */
const { $ } = require('@wdio/globals')
const Page = require('./page');
const homePage = require('./home.page')
const { browser } = require('@wdio/globals');

class EditProfilePage extends Page {

    get firstNameInputField() {
        return $('//*[@id="edit-profile-form_firstName"]')
    }

    get lastNameInputField() {
        return $('//*[@id="edit-profile-form_lastName"]')
    }

    get displayNameInputField() {
        return $('//*[@id="edit-profile-form_displayName"]')
    }

    get emailAddressInputField() {
        return $('//*[@id="edit-profile-form_email"]')
    }

    get saveButton() {
        return $('//*[@id="edit-profile-form"]/div[5]/div/div/div/div/button')
    }

    get credentialsAlreadyExistsErrorMessage() {
        return $('//*[@id="edit-profile-form"]/div[6]/div/div/div/div/div/div/div/div')
    }

    async editFirstName(firstNameUpdate) {
        await homePage.goToEditProfilePage()
        await browser.pause(2000)
        await this.firstNameInputField.clearValue()
        await browser.pause(2000)
        await browser.debug()
        await this.firstNameInputField.click()
        await this.firstNameInputField.setValue(firstNameUpdate);
    }

    async editLastName(lastNameUpdate) {
        await browser.pause(2000)
        await this.lastNameInputField.clearValue()
        await browser.pause(2000)
        await this.lastNameInputField.click()
        await this.lastNameInputField.setValue(lastNameUpdate);
    }

    async editDisplayName(displayNameUpdate) {
        await browser.pause(2000)
        await this.displayNameInputField.clearValue()
        await browser.pause(2000)
        await this.displayNameInputField.click()
        await this.displayNameInputField.setValue(displayNameUpdate);
    }

    async editEmailAddress(emailAddressUpdate) {
        await browser.pause(2000)
        await this.emailAddressInputField.clearValue()
        await browser.pause(2000)
        await this.emailAddressInputField.click()
        await this.emailAddressInputField.setValue(emailAddressUpdate);
    }

    async getErrorMessageCredentialsAlreadyExists(errorMessage) {
        await expect(this.credentialsAlreadyExistsErrorMessage).toBeDisplayed()
        await expect(this.credentialsAlreadyExistsErrorMessage).toHaveText(errorMessage)
    }

    async saveChanges() {
        this.saveButton.click()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }

}

module.exports = new EditProfilePage()