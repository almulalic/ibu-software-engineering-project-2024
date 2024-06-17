const LoginPage = require('../pageobjects/login.page')
const EditProfilePage = require('../pageobjects/editProfile.page')

let email = 'tester@test.com'
let password = 'testerpassword123'
let nameUpdate = 'Update'
let emailUpdate = 'arzemina.brackovic+14@gmail.com'
let displayNameThatAlreadyExists = 'amulalic1'
let usernameAlreadyExistsErrorMessage = '400: User with that username already exists'
let emailAlreadyExistsErrorMessage = '400: User with that email already exists'

describe('Eventport application - Regression Tests', () => {
    beforeAll(async () => {
        await LoginPage.open()
        await LoginPage.login(email, password)
    })

    it('Edit first name', async () => {
        await EditProfilePage.editFirstName(nameUpdate)
    })

    it('Edit last name', async () => {
        await EditProfilePage.editLastName(nameUpdate)
    })

    it('Edit display name', async () => {
        await EditProfilePage.editDisplayName(nameUpdate)
    })

    it('Edit email address', async () => {
        await EditProfilePage.editEmailAddress(emailUpdate)
    })

    it('Edit display name with name that already exists', async () => {
        await EditProfilePage.editDisplayName(displayNameThatAlreadyExists)
        await EditProfilePage.getErrorMessageCredentialsAlreadyExists(usernameAlreadyExistsErrorMessage)
    })

    it('Edit email address with email that already exists', async () => {
        await EditProfilePage.editEmailAddress(displayNameThatAlreadyExists)
        await EditProfilePage.getErrorMessageCredentialsAlreadyExists(emailAlreadyExistsErrorMessage)
    })

    afterAll(async () => {
        await EditProfilePage.saveChanges()
    })
})
