import { searchTest as test } from './test'
import userList from '../fixtures/assets/contacts.json'
const randomItem: any = userList[Math.floor(Math.random() * userList.length)]

test.describe('Run all tests for the table page', async () => {
    test.beforeEach(async ({ tablePage }) => {
        await tablePage.openTablePage()

    })

    test('Verify all users on the main page', async ({ tablePage }) => {
        await tablePage.verifyUserContacts(userList)
    })

    test('Verify the search input', async ({ tablePage }) => {
        await tablePage.verifySearchInput(userList, randomItem)
    })
})