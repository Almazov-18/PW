import test, { expect } from '@playwright/test'
import { LocatorProps } from './component'
import { Component } from './component'

export class ListItem extends Component {

    get typeOf(): string {
        return 'list item'
    }

    async getListOfItem(value: string | string[] | number | number[], locatorProps: LocatorProps = {}) {
        await test.step(`Getting that ${ this.typeOf } "${ this.componentName }" list of value "${ value }"`, async () => {
            const locator = this.getLocator(locatorProps)
            return locator
        })
    }
    
    async getAllTextContents(locatorProps: LocatorProps = {}): Promise<any[]> {
        await this.page.waitForLoadState('domcontentloaded')
        return await test.step(`Get all elements from the ${ this.typeOf } with name "${ this.locator }"`, async () => {
            const locator = this.getLocatorArray(locatorProps)
            return await locator.allTextContents()
        })
    }
}