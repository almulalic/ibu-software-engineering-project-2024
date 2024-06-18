const { $ } = require("@wdio/globals");
const Page = require("./page");
const loginPage = require("./login.page");
const homePage = require("./home.page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupPage extends Page {
	/**
	 * define selectors using getter methods
	 */
	get inputFirstName() {
		return $('//*[@id="signup-form_firstName"]');
	}

	get inputLastName() {
		return $('//*[@id="signup-form_lastName"]');
	}

	get inputDisplayName() {
		return $('//*[@id="signup-form_displayName"]');
	}

	get inputEmail() {
		return $('//*[@id="signup-form_email"]');
	}

	get inputPassword() {
		return $('//*[@id="signup-form_password"]');
	}

	get submitButton() {
		return $('//*[@id="login-form"]/div[4]/div/div/div/div/button');
	}

	get agreeWithTOCButton() {
		return $('//*[@id="signup-form_agreeWithTOC"]/label/span[1]/input');
	}

	get signupButton() {
		return $('//*[@id="signup-form"]/div[7]/div/div/div/div/button/span');
	}

	get errorMessageUserAlreadyExists() {
		return $('//*[@id="signup-form"]/div[8]/div/div/div/div/div/div/div/div');
	}

	get errorMessageInvalidEmailAddress() {
		return $('//*[@id="login-form_email_help"]/div');
	}

	get errorMessagePasswordTooShort() {
		return $('//*[@id="login-form_password_help"]/div');
	}

	get errorMessageMustAgreeWithTOC() {
		return $('//*[@id="signup-form_agreeWithTOC_help"]/div');
	}

	async signUp(name, lastName, displayName, email, password) {
		await homePage.signupButton.click();
		await this.inputFirstName.setValue(name);
		await this.inputLastName.setValue(lastName);
		await this.inputDisplayName.setValue(displayName);
		await this.inputEmail.setValue(email);
		await this.inputPassword.setValue(password);
		await this.agreeWithTOCButton.click();
		await this.signupButton.click();
		await expect(loginPage.loginHeader).toBeDisplayed();
	}

	async signUpWithSameCredentials(name, lastName, displayName, email, password) {
		await homePage.signupButton.click();
		await this.inputFirstName.setValue(name);
		await this.inputLastName.setValue(lastName);
		await this.inputDisplayName.setValue(displayName);
		await this.inputEmail.setValue(email);
		await this.inputPassword.setValue(password);
		await this.agreeWithTOCButton.click();
		await this.signupButton.click();
		await expect(this.errorMessageUserAlreadyExists).toBeDisplayed();
	}

	async signUpWithInvalidEmailAddress(name, lastName, displayName, email, errorMessage) {
		await homePage.signupButton.click();
		await this.inputFirstName.setValue(name);
		await this.inputLastName.setValue(lastName);
		await this.inputDisplayName.setValue(displayName);
		await this.inputEmail.setValue(email);
		await expect(this.errorMessageInvalidEmailAddress).toBeDisplayed();
		await expect(this.errorMessageInvalidEmailAddress).toHaveText(errorMessage);
	}

	async signUpWithShortPassword(name, lastName, displayName, email, password, errorMessage) {
		await homePage.signupButton.click();
		await this.inputFirstName.setValue(name);
		await this.inputLastName.setValue(lastName);
		await this.inputDisplayName.setValue(displayName);
		await this.inputEmail.setValue(email);
		await this.inputPassword.setValue(password);
		await expect(this.errorMessagePasswordTooShort).toBeDisplayed();
		await expect(this.errorMessagePasswordTooShort).toHaveText(errorMessage);
	}

	async signUpWithoutCheckingTOC(name, lastName, displayName, email, password, errorMessage) {
		await homePage.signupButton.click();
		await this.inputFirstName.setValue(name);
		await this.inputLastName.setValue(lastName);
		await this.inputDisplayName.setValue(displayName);
		await this.inputEmail.setValue(email);
		await this.inputPassword.setValue(password);
		await this.signupButton.click();
		await expect(this.errorMessageMustAgreeWithTOC).toBeDisplayed();
		await expect(this.errorMessageMustAgreeWithTOC).toHaveText(errorMessage);
	}

	/**
	 * overwrite specific options to adapt it to page object
	 */
	open() {
		return super.open("");
	}
}

module.exports = new SignupPage();
