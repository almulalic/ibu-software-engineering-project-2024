const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SignupPage = require('../pageobjects/signup.page')
const HomePage = require('../pageobjects/home.page')

describe('Eventport application', () => {
    it('Verify user can sign up with valid credentials', async () => {
        await SignupPage.open()

        await SignupPage.signUp('Arzemina', 'Brackovic', 'arzemina_b', 'arzemina.brackovic+2@gmail.com', 'password8!')
    })

    it('Verify user can login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('arzemina.brackovic+1@gmail.com', 'password8!')
    })

    it('Search events by name', async () => {
        await HomePage.open()

        await HomePage.findEventsByName('Fashion Show')
    })

    it('Search events by category', async () => {
        await HomePage.open()

        await HomePage.findEventsByCity('Tirana')
    })
})
