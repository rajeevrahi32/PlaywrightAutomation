import { test, expect } from '@playwright/test'
import HomePage from '../page-object/home_page'
import DashboardPage from '../page-object/dashboard_page'
import Utilities from '../utilities/utilities_helper'
import PimPage from '../page-object/pim_page'

const testData = JSON.parse(JSON.stringify(require('../test-data/test_data.json')))

test.describe('Orange HRM test automation', () => {
  let homePage: HomePage
  let dashboardPage: DashboardPage
  let pimPage: PimPage
  let utilities: Utilities

  test.beforeEach(async({page}, testInfo) => {
      console.log(`Initiating the test: ${testInfo.title}`);
      homePage = new HomePage(page)
      dashboardPage = new DashboardPage(page)
      pimPage = new PimPage(page)
      utilities = new Utilities()
  })

  test.afterEach(async({}, testInfo) => {
      console.log(`Finished ${testInfo.title} with status: ${testInfo.status?.toString().toUpperCase()}`);
  })

  test.afterAll(async() => {
      console.log('Tests completed!!');
  })

  test('Login at Orange HRM, add employee details and search added employee', async({page}) => {
    let employeeID = (await utilities.generateRandomNumber()).toString()

    // Step1: Navigate to Orange HRM URL on browser
    await homePage.navigateOrangeHrmUrl(testData.url)
    await page.pause()

    // Step2: Verify Orange HRM logo is visible
    await homePage.verifyOrangeHrmLogoIsVisible()

    //Step4: Login at Orange HRM
    await homePage.loginAtOrangeHrm(testData.userName, testData.password)

    //Step5: Verify user is logged in
    await dashboardPage.verifyUserIsLoggedIn()

    //Step5: Add employee
    await dashboardPage.clickPIM()
    await pimPage.verifyTitleTextIsVisible()
    await pimPage.clickAddEmployeeLink()
    await pimPage.addEmployee(testData.firstName, testData.middleName, testData.lastName, employeeID)

    //Step6: Add personal details
    await pimPage.addPersonalDetails(testData.nickName, testData.otherId, testData.licenseNumber, 
      testData.licenseExpDate, testData.ssnNumber, testData.sinNumber, 
      testData.nationality, testData.maritalStatus, testData.dateOfBirth, 
      testData.gender, testData.militaryService, testData.smoker)

    //Step7: Search added employee
    await pimPage.clickEmployeeListLink()  
    await pimPage.searchEmployee(testData.firstName + " " + testData.middleName + " " + testData.lastName)

    //Step8: Verify employee exists
    await pimPage.verifyPersonalDetails(employeeID, testData.firstName, testData.middleName, testData.lastName)
  })

  test('Create first employee', async({page}) => {
    let employeeID = (await utilities.generateRandomNumber()).toString()

    // Step1: Navigate to Orange HRM URL on browser
    await homePage.navigateOrangeHrmUrl(testData.url)

    // Step2: Verify Orange HRM logo is visible
    await homePage.verifyOrangeHrmLogoIsVisible()

    //Step4: Login at Orange HRM
    await homePage.loginAtOrangeHrm(testData.userName, testData.password)

    //Step5: Verify user is logged in
    await dashboardPage.verifyUserIsLoggedIn()

    //Step5: Add employee
    await dashboardPage.clickPIM()
    await pimPage.verifyTitleTextIsVisible()
    await pimPage.clickAddEmployeeLink()
    await pimPage.addEmployee(testData.fullName[0].firstName, testData.fullName[0].middleName, testData.fullName[0].lastName, employeeID)
  })

  test('Create second employee', async({page}) => {
    let employeeID = (await utilities.generateRandomNumber()).toString()

    // Step1: Navigate to Orange HRM URL on browser
    await homePage.navigateOrangeHrmUrl(testData.url)

    // Step2: Verify Orange HRM logo is visible
    await homePage.verifyOrangeHrmLogoIsVisible()
    //await page.pause()

    //Step4: Login at Orange HRM
    await homePage.loginAtOrangeHrm(testData.userName, testData.password)

    //Step5: Verify user is logged in
    await dashboardPage.verifyUserIsLoggedIn()

    //Step5: Add employee
    await dashboardPage.clickPIM()
    await pimPage.verifyTitleTextIsVisible()
    await pimPage.clickAddEmployeeLink()
    await pimPage.addEmployee(testData.fullName[1].firstName, testData.fullName[1].middleName, testData.fullName[1].lastName, employeeID)
  })

  test('Create third employee', async({page}) => {
    let employeeID = (await utilities.generateRandomNumber()).toString()

    // Step1: Navigate to Orange HRM URL on browser
    await homePage.navigateOrangeHrmUrl(testData.url)

    // Step2: Verify Orange HRM logo is visible
    await homePage.verifyOrangeHrmLogoIsVisible()
    //await page.pause()

    //Step4: Login at Orange HRM
    await homePage.loginAtOrangeHrm(testData.userName, testData.password)

    //Step5: Verify user is logged in
    await dashboardPage.verifyUserIsLoggedIn()

    //Step5: Add employee
    await dashboardPage.clickPIM()
    await pimPage.verifyTitleTextIsVisible()
    await pimPage.clickAddEmployeeLink()
    await pimPage.addEmployee(testData.fullName[2].firstName, testData.fullName[2].middleName, testData.fullName[2].lastName, employeeID)
  })
})
