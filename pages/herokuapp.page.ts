import { expect, Page } from '@playwright/test'
import { BasePage } from './base.page'
import { Button } from './types/page-factory/buttons'

export enum links {
    windows = "windows"
}

export class HerokuappPage extends BasePage {

    private readonly clickHereButtonLocator: Button

    private clickHereLinkSelector: string = '.example > a'
    private link: string = 'https://the-internet.herokuapp.com/'

    constructor(public page: Page) {
        super(page)

        this.clickHereButtonLocator = new Button({ page, locator: this.clickHereLinkSelector, name: 'Click Here' })
    }

    async openPage(link?: string) {
        const newLink: string = link ? this.link + link : this.link
        await this.visit(newLink)
    }

    async openNewWindow() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.clickHereButtonLocator.click()
        ])
        await newPage.waitForLoadState('networkidle')
        return this.page = newPage
    }

}