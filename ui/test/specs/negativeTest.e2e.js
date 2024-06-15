const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SignupPage = require('../pageobjects/signup.page')
const HomePage = require('../pageobjects/home.page')

let errorMessageInvalidEmailAddress = 'Please enter a valid email address!'
let errorMessagePasswordTooShort = 'Password must be at least 6 characters!'
let errorMessageAgreeWithTOC = 'Please agree with TOC!'
let firstName = 'Arzemina'
let lastName = 'Brackovic'
let displayName = 'arzemina_b'
let email = 'arzemina.brackovic@stu.ibu.edu.ba'
let correctPassword = 'password8!'
let incorrectPassword = '123'

describe('Eventport application', () => {
    it("Verify user can't sign up with same credentials", async () => {
        await SignupPage.open()

        await SignupPage.signUpWithSameCredentials(firstName, lastName, displayName, email, correctPassword)
    })

    it("Verify user can't sign up with invalid email address", async () => {
        await SignupPage.open()

        await SignupPage.signUpWithInvalidEmailAddress(firstName, lastName, displayName, email, errorMessageInvalidEmailAddress)
    })

    it("Verify user can't sign up with password that is isn't at least 6 characters long", async () => {
        await SignupPage.open()

        await SignupPage.signUpWithShortPassword(firstName, lastName, displayName, email, incorrectPassword, errorMessagePasswordTooShort)
    })

    it("Verify user can't sign up without agreeing with TOC", async () => {
        await SignupPage.open()

        await SignupPage.signUpWithoutCheckingTOC(firstName, lastName, displayName, email, correctPassword, errorMessageAgreeWithTOC)
    })

    it("Verify user can't login with invalid email address", async () => {
        await LoginPage.open()

        await LoginPage.loginWithInvalidEmailAddress(firstName, errorMessageInvalidEmailAddress)
    })

    it("Verify user can't login with password that isn't at least 6 characters long", async () => {
        await LoginPage.open()

        await LoginPage.loginWithShortPassword(email, incorrectPassword, errorMessagePasswordTooShort)
    })

})
