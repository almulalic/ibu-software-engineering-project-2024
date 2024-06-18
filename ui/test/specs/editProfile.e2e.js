const { browser } = require("@wdio/globals");
const LoginPage = require("../pageobjects/login.page");
const EditProfilePage = require("../pageobjects/editProfile.page");

let email = "tester@test.com";
let password = "testerpassword123";
let nameUpdate = "NameUpdate";
let lastNameUpdate = "LastNameUpdate";
let displayNameUpdate = "DisplayNameUpdate";
let emailUpdate = "arzemina.brackovic+14@gmail.com";
let displayNameThatAlreadyExists = "amulalic1";
let emailThatAlreadyExists = "almir.mulalic.am@gmail.com";
let usernameAlreadyExistsErrorMessage = "400: User with that username already exists";
let emailAlreadyExistsErrorMessage = "400: User with that email already exists";

describe("Eventport application - Regression Tests", () => {
	beforeAll(async () => {
		await LoginPage.open();
		await LoginPage.login(email, password);
	});

	it("Edit first name", async () => {
		await EditProfilePage.editFirstName(nameUpdate);
		await browser.pause(1000);
	});

	it("Edit last name", async () => {
		await EditProfilePage.editLastName(lastNameUpdate);
		await browser.pause(1000);
	});

	it("Edit display name with name that already exists", async () => {
		await EditProfilePage.editDisplayName(displayNameThatAlreadyExists);
		await EditProfilePage.saveChanges();
		await browser.pause(3000);
		await EditProfilePage.getErrorMessageCredentialsAlreadyExists(usernameAlreadyExistsErrorMessage);
	});

	it("Edit display name to something unique", async () => {
		await EditProfilePage.editDisplayName(displayNameUpdate);
	});

	it("Edit email address with email that already exists", async () => {
		await EditProfilePage.editEmailAddress(emailThatAlreadyExists);
		await EditProfilePage.saveChanges();
		await browser.pause(3000);
		await EditProfilePage.getErrorMessageCredentialsAlreadyExists(emailAlreadyExistsErrorMessage);
	});

	it("Edit email address to something unique", async () => {
		await EditProfilePage.editEmailAddress(emailUpdate);
	});

	afterAll(async () => {
		await EditProfilePage.saveChanges();
	});
});
