import { expect, Locator, Page, test } from "@playwright/test"
import { capitalizeFirstLetter } from "../../utils/generic"
import { locatorTemplateFormat } from "../../utils/page-factory"

export type ComponentProps = {
    page: Page
    locator: string
    name?: string
}
export type LocatorContext = { [key: string]: string | boolean | number }
export type LocatorProps = { locator?: string } & LocatorContext

export abstract class Component {
    public page: Page
    public locator: string
    private name: string | undefined

    constructor({ page, locator, name }: ComponentProps) {
        this.page = page
        this.locator = locator
        this.name = name
    }

    getLocator(props: LocatorProps = {}): Locator {
        const { locator, ...context } = props
        const withTemplate = locatorTemplateFormat(locator || this.locator, context)
        return this.page.locator(withTemplate)
    }

    get typeOf(): string {
        return "component"
    }

    get typeOfUpper(): string {
        return capitalizeFirstLetter(this.typeOf)
    }

    get componentName(): string {
        if (!this.name) {
            throw Error('Provide "name" property to use "componentName"')
        }
        return this.name
    }

    private getErrorMessage(action: string): string {
        return `The ${this.typeOf} with name "${this.componentName}" and locator ${this.locator} ${action}`
    }

    async shouldBeVisible(locatorProps: LocatorProps = {}): Promise<void> {
        await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
            const locator = this.getLocator(locatorProps)
            await expect(locator, {
                message: this.getErrorMessage("is not visible"),
            }).toBeVisible()
        })
    }

    async shouldHaveText(text: string, locatorProps: LocatorProps = {}): Promise<void> {
        await test.step(`${this.typeOfUpper} "${this.componentName}" should have text "${text}"`, async () => {
            const locator = this.getLocator(locatorProps)
            await expect(locator, {
                message: this.getErrorMessage(`does not have text "${text}"`),
            }).toContainText(text)
        })
    }

    async click(locatorProps: LocatorProps = {}): Promise<void> {
        await test.step(`Clicking the ${this.typeOf} with name "${this.componentName}"`, async () => {
            const locator = this.getLocator(locatorProps)
            await locator.click()
            // await this.page.waitForLoadState()
        })
    }

}