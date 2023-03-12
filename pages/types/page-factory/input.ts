import test, { expect } from '@playwright/test'
import { LocatorProps } from './component'
import { Component } from './component'

type FillProps = { validateValue?: boolean } & LocatorProps

export class Input extends Component {

    get typeOf(): string {
        return 'input'
    }

    async fill(value: string, fillProps: FillProps = {}) {
        const { validateValue, ...locatorProps } = fillProps
        await test.step(`Fill ${ this.typeOf } "${ this.componentName }" to value "${ value }"`, async () => {
            const locator = this.getLocator(locatorProps)
            await locator.fill(value)
            if (validateValue) {
                await this.shouldHaveValue(value, locatorProps)
            }
        })
    }

    async type(value: string, fillProps: FillProps = {}) {
        const { validateValue, ...locatorProps } = fillProps
        await test.step(`Type ${ this.typeOf } "${ this.componentName }" to value "${ value }"`, async () => {
            const locator = this.getLocator(locatorProps)
            await locator.type(value)
            if (validateValue) {
                await this.shouldHaveValue(value, locatorProps)
            }
        })
    }

}