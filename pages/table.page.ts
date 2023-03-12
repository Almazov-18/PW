import { expect, Page } from '@playwright/test'
import { BasePage } from './base.page'
import { Button } from './types/page-factory/buttons'
import { Input } from './types/page-factory/input'

export class TablePage extends BasePage {

    private readonly userContainerLocator: Button
    private readonly userNameLocator: Button
    private readonly userGenderLocator: Button
    private readonly userAddressLocator: Button
    private readonly searchInputLocator: Input

    private link: string = 'http://localhost:3000/'
    private userContainer: string | any = '[data-id="contact"]'
    private userName: string = '[data-id="name"]'
    private userGender: string = '[data-id="gender"]'
    private userAddress: string = '[data-id="address"]'
    private searchInputSelector: string | any = '[data-id="search"]'

    constructor(public page: Page) {
        super(page)
        this.userContainerLocator = new Button({ page, locator: this.userContainer })
        this.userNameLocator = new Button({ page, locator: this.userName })
        this.userGenderLocator = new Button({ page, locator: this.userGender })
        this.userAddressLocator = new Button({ page, locator: this.userAddress })
        this.searchInputLocator = new Input({ page, locator: this.searchInputSelector, name: 'Search input' })
    }

    async openTablePage() {
        await this.visit(this.link)
    }

    async getAllUserContainers() {
        return await this.userContainerLocator.getAllTextContents()
    }

    async getUserName() {
        return this.userNameLocator.getAllTextContents()
    }

    async getUserGender() {
        return this.userGenderLocator.getAllTextContents()
    }

    async getUserAddress() {
        return this.userAddressLocator.getAllTextContents()
    }

    async searchInput(inputText: string) {
        const searchInput = this.searchInputLocator
        await searchInput.click()
        await this.page.waitForLoadState()
        await this.page.keyboard.type(inputText)
        await searchInput.shouldHaveValue(inputText)
    }

    async verifyUserContacts(userList: any) {
        const userContainers = await this.getAllUserContainers()
        const userNames = await this.getUserName()
        const userGenders = await this.getUserGender()
        const userAddresses = await this.getUserAddress()

        userList.forEach((JSONUser: any, index: number) => {
            expect(JSONUser.name).toEqual(userNames[index])
            expect(JSONUser.gender).toEqual(userGenders[index])
            expect(`${ JSONUser.street }, ${ JSONUser.city }`).toEqual(userAddresses[index])
        })
        expect(userList.length).toEqual(userContainers.length)
    }

    async verifySearchInput(userList: any, text: any) {
        await this.searchInput(text.name)
        const userContainers = await this.getAllUserContainers()
        const userNames = await this.getUserName()
        const userGenders = await this.getUserGender()
        const userAddresses = await this.getUserAddress()

        userList.find((JSONUser: any) => {
            if (JSONUser.name === text.name) {
                expect([JSONUser.name]).toEqual(userNames)
                expect([JSONUser.gender]).toEqual(userGenders)
                expect([`${ JSONUser.street }, ${ JSONUser.city }`]).toEqual(userAddresses)
                expect([text].length).toEqual(userContainers.length)
            }
        })
    }
}