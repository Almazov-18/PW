import { expect, Page } from '@playwright/test'
import { BasePage } from './base.page'
import { Link } from './types/page-factory/links'
import { ListItem } from './types/page-factory/list-item'

export enum links {
    windows = "windows"
}

export class WindowHerokuappPage extends BasePage {

    private readonly newWindow: Link
    private readonly newWindowBody: ListItem

    private newWindowBodyText: string = '.example > h3'
    private newWindowLink: string = 'https://the-internet.herokuapp.com/windows/new'


    constructor(public page: Page) {
        super(page)
        this.newWindow = new Link({ page, locator: this.newWindowLink })
        this.newWindowBody = new ListItem({ page, locator: this.newWindowBodyText, name: 'New window' })
    }

    async verifyBodyText() {
        await this.newWindow.verifyPageUrl(this.newWindowLink)
        await this.newWindowBody.shouldHaveText('New Window')
    }

}