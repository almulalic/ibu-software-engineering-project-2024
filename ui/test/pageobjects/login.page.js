const { $ } = require('@wdio/globals')
const Page = require('./page');
const homePage = require('./home.page')

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('//*[@id="login-form_email"]');
    }

    get inputPassword () {
        return $('//*[@id="login-form_password"]');
    }

    get submitButton () {
        return $('//*[@id="login-form"]/div[4]/div/div/div/div/button');
    }

    get loginHeader() {
        return $('//*[@id="login-right"]/div/div[1]/h1')
    }

    get errorMessageInvalidEmailAddress() {
        return $('//*[@id="login-form_email_help"]/div')
    }

    get errorMessagePasswordTooShort() {
        return $('//*[@id="login-form_password_help"]/div')
    }

    async login (isSmoke, username, password) {
        if(isSmoke) {
            await homePage.loginButton.click()
        }
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.submitButton.click();
        await expect(homePage.navBarMainMenuLogo).toBeDisplayed()
    }

    async loginWithInvalidEmailAddress (username, errorMessage) {
        await homePage.loginButton.click()
        await this.inputUsername.setValue(username);
        await expect(this.errorMessageInvalidEmailAddress).toBeDisplayed()
        await expect(this.errorMessageInvalidEmailAddress).toHaveText(errorMessage)
    }

    async loginWithShortPassword (username, password, errorMessage) {
        await homePage.loginButton.click()
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await expect(this.errorMessagePasswordTooShort).toBeDisplayed()
        await expect(this.errorMessagePasswordTooShort).toHaveText(errorMessage)
    }

    open () {
        return super.open('');
    }
}

module.exports = new LoginPage();
