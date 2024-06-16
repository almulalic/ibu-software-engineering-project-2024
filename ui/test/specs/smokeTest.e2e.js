const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SignupPage = require('../pageobjects/signup.page')
const HomePage = require('../pageobjects/home.page')
const EventsPage = require('../pageobjects/events.page')

let firstName = 'Arzemina'
let lastName = 'Brackovic'
let email1 = 'arzemina.brackovic+2@gmail.com'
let email2 = 'arzemina.brackovic+1@gmail.com'
let displayName = 'arzemina_b'
let password = 'password8!'
let eventName = 'Fashion Show'
let eventCity = 'Tirana'
let eventCategory = 'Fashion'

describe('Eventport application - Smoke Tests', () => {
    it('Verify user can sign up with valid credentials', async () => {
        await SignupPage.open()

        await SignupPage.signUp(isRegression, firstName, lastName, email1, displayName, password)
    })

    it('Verify user can login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login(email2, password)
    })

    it('Search events by name', async () => {
        await HomePage.open()

        await HomePage.findEventsByName(eventName)
    })

    it('Search events by city', async () => {
        await HomePage.open()

        await HomePage.findEventsByCity(eventCity)
    })

    it('Search events by category', async () => {
        await HomePage.open()

        await HomePage.findEventsByCategory(eventCategory)
    })
})
