const { $ } = require('@wdio/globals')
const Page = require('./page');
const homePage = require('./home.page')

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

    async editFirstName(firstNameUpdate) {
        await homePage.mainMenuButton.click()
        await homePage.editProfileButton.click()
        await this.firstNameInputField.click()
        await this.firstNameInputField.setValue(firstNameUpdate);
        await expect(this.firstNameInputField).toHaveText(firstNameUpdate)
    }

    async editLastName(lastNameUpdate) {
        await homePage.mainMenuButton.click()
        await homePage.editProfileButton.click()
        await this.lastNameInputField.click()
        await this.lastNameInputField.setValue(lastNameUpdate);
        await expect(this.lastNameInputField).toHaveText(lastNameUpdate)
    }

    async editDisplayName(displayNameUpdate) {
        await homePage.mainMenuButton.click()
        await homePage.editProfileButton.click()
        await this.displayNameInputField.click()
        await this.displayNameInputField.setValue(displayNameUpdate);
        await expect(this.displayNameInputField).toHaveText(displayNameUpdate)
    }

    async editEmailAddress(emailAddressUpdate) {
        await homePage.mainMenuButton.click()
        await homePage.editProfileButton.click()
        await this.emailAddressInputField.click()
        await this.emailAddressInputField.clear()
        await this.emailAddressInputField.setValue(emailAddressUpdate);
        await expect(this.emailAddressInputField).toHaveText(emailAddressUpdate)
    }

    async saveChanges() {
        this.saveButton.click()
    }

}

module.exports = new EditProfilePage()