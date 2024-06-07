const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SignupPage = require('../pageobjects/signup.page')
const HomePage = require('../pageobjects/home.page')

describe('Eventport application', () => {
    it('Should sign up with valid credentials', async () => {
        await SignupPage.open()

        await SignupPage.signUp('Arzemina', 'Brackovic', 'arzemina_b', 'arzemina.brackovic@stu.ibu.edu.ba', 'password8!')
    })
    it('Should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('arzemina.brackovic@gmail.com', 'superadminpass!')
    })
    it("Verify user can't sign up with same credentials", async () => {
        await SignupPage.open()

        await SignupPage.signUpWithSameCredentials('Arzemina', 'Brackovic', 'arzemina_b', 'arzemina.brackovic@stu.ibu.edu.ba', 'password8!')
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
