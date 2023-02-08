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
            // await expect(locator).toHaveValue(value)
            return locator
        })
    }
}