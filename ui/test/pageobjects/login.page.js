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

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await homePage.loginButton.click()
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.submitButton.click();
        await expect(homePage.navBarMainMenuLogo).toBeDisplayed()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('');
    }
}

module.exports = new LoginPage();
