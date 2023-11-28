import { Locator, Page } from "@playwright/test";
import BasePage from "./base_page";
import { expect } from '@playwright/test';

class DashboardPage extends BasePage{
    loggedInUserBanner: Locator
    loggedInUserProfilePicture: Locator
    pimLink: Locator

    constructor(page: Page) {
        super(page)
        this.loggedInUserBanner =  page.getByRole('banner')
        this.loggedInUserProfilePicture = page.getByRole('banner').getByRole('img', { name: 'profile picture' })
        this.pimLink = page.getByRole('link', { name: 'PIM' })
    }

    async verifyUserIsLoggedIn() {
        await expect(this.loggedInUserBanner).toBeVisible()
        await expect(this.loggedInUserProfilePicture).toBeVisible()
    }

    async clickPIM() {
        await this.pimLink.click()
    }
}
export default DashboardPage
