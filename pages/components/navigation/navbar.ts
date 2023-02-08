import { Page } from '@playwright/test'
import { Button } from '../../types/page-factory/buttons'
import { Link } from '../../types/page-factory/links'
import { SearchModal } from '../../modals/search-modal'

enum navBar {
    api = 'API',
    docs = 'Docs',
    search = 'Search'
}

export class Navbar {
    readonly searchModal: SearchModal

    private readonly apiLink: Link
    private readonly docsLink: Link
    private readonly searchButton: Button

    private linkLocator: string = "//a[text()='API']"
    private docsLocator: string = "//a[text()='Docs']"
    private searchButtonLocator: string = 'button.DocSearch-Button'

    constructor(public page: Page) {
        this.searchModal = new SearchModal(page)
        this.apiLink = new Link({ page, locator: this.linkLocator, name: navBar.api })
        this.docsLink = new Link({ page, locator: this.docsLocator, name: navBar.docs })
        this.searchButton = new Button({ page, locator: this.searchButtonLocator, name: navBar.search })
    }

    async visitDocs(): Promise<void> {
        await this.docsLink.click()
    }

    async visitApi(): Promise<void> {
        await this.apiLink.click()
    }

    async openSearch(): Promise<void> {
        await this.searchButton.shouldBeVisible()
        await this.searchButton.hover()
        await this.searchButton.click()
        await this.searchModal.modalIsOpened()
    }
}