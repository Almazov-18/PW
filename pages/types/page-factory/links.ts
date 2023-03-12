import test, { expect } from '@playwright/test'
import { LocatorProps } from './component'
import { Component } from './component'

export class Link extends Component {
    get typeOf(): string {
        return 'link'
    }

    async verifyPageUrl(url: string): Promise<void> {
        await test.step(`Verifying the page url "${ url }"`, async () => {
            await this.page.waitForLoadState('load')
            const pageURL = this.page.url()
            expect(pageURL).toEqual(url)
        })
    }
}

