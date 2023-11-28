import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./base_page";

class HomePage extends BasePage {
    orangeHrmLogo: Locator
    userNameTextField: Locator
    passwordTextField: Locator
    loginButton: Locator
    constructor(page: Page) {
        super(page)
        this.orangeHrmLogo =  page.getByRole('img', { name: 'company-branding' })
        this.userNameTextField = page.getByPlaceholder('Username')
        this.passwordTextField = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'Login' })

    }
    async navigateOrangeHrmUrl(url: string){
        await this.page.goto(url)
    }

    async verifyOrangeHrmLogoIsVisible() {
        await expect(this.orangeHrmLogo).toBeVisible()
    }

    async loginAtOrangeHrm(userName: string, password: string) {
        await this.userNameTextField.click()
        await this.userNameTextField.fill(userName)
        await this.passwordTextField.click()
        await this.passwordTextField.fill(password)
        await this.loginButton.click()
    }
}
export default HomePage
