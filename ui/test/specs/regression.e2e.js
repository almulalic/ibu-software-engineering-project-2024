const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const SignupPage = require('../pageobjects/signup.page')
const HomePage = require('../pageobjects/home.page')
const EventsPage = require('../pageobjects/events.page')
const EditProfilePage = require('../pageobjects/editProfile.page')

let firstName = 'Arzemina'
let lastName = 'Brackovic'
let email1 = 'arzemina.brackovic+28@gmail.com'
let displayName = 'arzemina_b'
let password = 'password8!'
let nameUpdate = 'Update'
let emailUpdate = 'arzemina.brackovic+14@gmail.com'

describe('Eventport application - Regression Tests', () => {
    beforeAll(async () => {
        await SignupPage.open()
        await SignupPage.signUp(isSmoke=false, firstName, lastName, displayName, email1, password)
        await LoginPage.login(isSmoke = false, email1, password)
    })

    it('Edit event first name', async () => {
        await EditProfilePage.editFirstName(nameUpdate)
    })

    it('Edit event last name', async () => {
        await EditProfilePage.editLastName(nameUpdate)
    })

    it('Edit event display name', async () => {
        await EditProfilePage.editDisplayName(nameUpdate)
    })

    it('Edit event email address', async () => {
        await EditProfilePage.editEmailAddress(emailUpdate)
    })

    afterAll(async () => {
        await EditProfilePage.saveChanges()
    })
})
