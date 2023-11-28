import { Locator, Page } from "@playwright/test";
import BasePage from "./base_page";
import Utilities from "../utilities/utilities_helper"; 
import { expect } from '@playwright/test';

class PimPage extends BasePage{
    utilities: Utilities
    pimTitleText: Locator
    addEmployeeLink: Locator
    employeeListLink: Locator
    // Basic details
    firstNameTextField: Locator
    middleNameTextField: Locator
    lastNameTextField: Locator
    employeeId: Locator
    profilePictureLink: Locator
    saveButton: Locator
    cancelButton: Locator
    // Personal details
    nickNameTextField: Locator
    otherIdTextField: Locator
    driversLicenseTextField: Locator
    licenseNumberTextField: Locator
    licenseExpiryDate: Locator
    ssnNumberTextField: Locator
    sinNumberTextField: Locator
    nationalityDropdown: Locator
    maritalStatusDropdown: Locator
    dobTextField: Locator
    genderMaleRadioButton: Locator
    genderFemaleRadioButton: Locator
    militryServiceTextField: Locator
    smokerCheckBox: Locator
    personalDetailsSaveButton: Locator
    employeeName: Locator
    searchButton: Locator

    constructor(page: Page) {
        super(page)
        this.utilities = new Utilities()
        this.pimTitleText = page.getByRole('heading', { name: 'PIM' })
        this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee' })
        this.employeeListLink = page.getByRole('link', { name: 'Employee List' })
        // Basic details
        this.firstNameTextField = page.getByPlaceholder('First Name')
        this.middleNameTextField = page.getByPlaceholder('Middle Name')
        this.lastNameTextField = page.getByPlaceholder('Last Name')
        this.employeeId = page.locator('form').getByRole('textbox').nth(4)
        this.profilePictureLink = page.locator('form').getByRole('img', { name: 'profile picture' })
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.cancelButton = page.getByRole('button', { name: 'Cancel' })
         // Personal details
        this.nickNameTextField = page.locator('div').filter({ hasText: /^Employee Full NameNickname$/ }).getByRole('textbox').nth(3)
        this.otherIdTextField = page.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').nth(1)
        this.licenseNumberTextField = page.locator('div').filter({ hasText: /^Driver's License Number$/ }).getByRole('textbox').first()
        this.licenseExpiryDate = page.getByPlaceholder('yyyy-mm-dd').first()
        this.ssnNumberTextField = page.locator('div').filter({ hasText: /^SSN NumberSIN Number$/ }).getByRole('textbox').first()
        this.sinNumberTextField = page.locator('div').filter({ hasText: /^SSN NumberSIN Number$/ }).getByRole('textbox').nth(1)
        this.nationalityDropdown = page.locator('.oxd-select-text').first()
        this.maritalStatusDropdown = page.getByText('-- Select --').first()
        this.dobTextField = page.getByPlaceholder('yyyy-mm-dd').nth(1)
        this.genderMaleRadioButton = page.getByText('Male', { exact: true })
        this.genderFemaleRadioButton = page.getByText('Female', { exact: true })
        this.militryServiceTextField = page.locator('div').filter({ hasText: /^Military Service$/ }).getByRole('textbox').first()
        this.smokerCheckBox = page.getByText('Yes')
        this.personalDetailsSaveButton = page.locator('form').filter({ hasText: 'Employee Full' }).getByRole('button')
        this.employeeName = page.getByPlaceholder('Type for hints...').first()
        this.searchButton = page.getByRole('button', { name: 'Search' })
    }

    async verifyTitleTextIsVisible() {
        await expect(this.pimTitleText).toBeVisible()
    }

    async clickAddEmployeeLink() {
        await expect(this.addEmployeeLink).toBeVisible()
        await this.addEmployeeLink.click()
    }

    async clickEmployeeListLink() {
        await expect(this.employeeListLink).toBeVisible()
        await this.employeeListLink.click()
    }

    async addEmployee(firstName: string, middleName: string, lastName: string, employeeID: string) {
        await this.firstNameTextField.click()
        await this.firstNameTextField.fill(firstName)
        await this.middleNameTextField.click()
        await this.middleNameTextField.fill(middleName)
        await this.lastNameTextField.click()
        await this.lastNameTextField.fill(lastName)
        await this.employeeId.click()
        await this.employeeId.fill(employeeID)
        await expect(this.saveButton).toBeVisible()
        await this.saveButton.click()
    }

    async addPersonalDetails(nickName: string, otherId: string, 
        licenseNumber: string, licenseExpDate: string, 
        ssnNumber: string, sinNumber: string, country: string, 
        maritalStatus: string, dateOfBirth: string, gender: string, 
        militaryServiceId: string, isSmoker: string) {
        await this.nickNameTextField.click()
        await this.nickNameTextField.fill(nickName)
        await this.otherIdTextField.click()
        await this.otherIdTextField.fill(otherId)
        await this.licenseNumberTextField.click()
        await this.licenseNumberTextField.fill(licenseNumber)
        await this.licenseExpiryDate.click()
        await this.licenseExpiryDate.fill(licenseExpDate)
        await this.ssnNumberTextField.click()
        await this.ssnNumberTextField.fill(ssnNumber)
        await this.sinNumberTextField.click()
        await this.sinNumberTextField.fill(sinNumber)
        await this.nationalityDropdown.click()
        await this.page.getByRole('option', { name: country }).click()
        await this.maritalStatusDropdown.click()
        await this.page.getByRole('option', {name: maritalStatus}).click()
        await this.dobTextField.click()
        await this.dobTextField.fill(dateOfBirth)
        if (gender.match("Male")) {
            await this.genderMaleRadioButton.click()
        } else {
            await this.genderFemaleRadioButton.click()
        }
        await this.militryServiceTextField.click()
        await this.militryServiceTextField.fill(militaryServiceId)
        if (isSmoker.match("Yes")) {
            await this.smokerCheckBox.click()
        } 
        await this.personalDetailsSaveButton.click()
    }

    async searchEmployee(employeeFullName: string) {
        await expect(this.employeeName).toBeVisible()
        await this.employeeName.click()
        await this.employeeName.fill(employeeFullName)
        await expect(this.searchButton).toBeVisible()
        await this.searchButton.click()
    }

    async verifyPersonalDetails(employeeID: string, firstName: string, middleName: string, lastName: string){
        await expect(this.page.getByRole('cell', { name: employeeID })).toBeVisible()
        await expect(this.page.getByRole('cell', { name: firstName + " " + middleName }).first()).toBeVisible()
        await expect(this.page.getByRole('cell', { name: lastName }).first()).toBeVisible()
    }
}
export default PimPage