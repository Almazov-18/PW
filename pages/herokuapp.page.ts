import { expect, Page } from '@playwright/test'
import { BasePage } from './base.page'
import { Button } from './types/page-factory/buttons'
import { Input } from './types/page-factory/input'
import { Link } from './types/page-factory/links'
import { ListItem } from './types/page-factory/list-item'

export enum links {
    windows = "windows"
}

export class HerokuappPage extends BasePage {

    private readonly clickHereButtonLocator: Button
    // private readonly newWindow: Link
    // private readonly newWindowBody: ListItem

    private clickHereLinkSelector: string = '.example > a'
    // private newWindowBodyText: string = '.example > h3'
    // private newWindowLink: string = 'https://the-internet.herokuapp.com/windows/new'
    private link: string = 'https://the-internet.herokuapp.com/'

    constructor(public page: Page) {
        super(page)

        this.clickHereButtonLocator = new Button({ page, locator: this.clickHereLinkSelector, name: 'Click Here' })
        // this.newWindow = new Link({ page, locator: this.newWindowLink })
        // this.newWindowBody = new ListItem({ page, locator: this.newWindowBodyText, name: 'New window' })
    }

    async openPage(link?: string) {
        const newLink: string = link ? this.link + link : this.link
        await this.visit(newLink)
    }

    async openNewWindow() {
        this.clickHereButtonLocator.click()
    }

    // async verifyBodyText() {
    //     await this.newWindow.verifyPageUrl(this.newWindowLink)
    //     await this.newWindowBody.shouldHaveText('New Window')
    // }

}