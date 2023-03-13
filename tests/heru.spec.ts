import { searchTest as test } from './test'
import { links } from '../pages/herokuapp.page'
import { expect } from '@playwright/test'
import { WindowHerokuappPage } from '../pages/widnow.herokuapp.page';

test('Verify all users on the main page', async ({ herokuappPage, windowHerokuappPage }) => {
    await herokuappPage.openPage(links.windows)
    const newPage = await herokuappPage.openNewWindow()
    const newWindowHerokuappPage = new WindowHerokuappPage(newPage)
    await newWindowHerokuappPage.verifyBodyText()
})
