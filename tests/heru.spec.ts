import { searchTest as test } from './test'
import { links } from '../pages/herokuapp.page';


test('Verify all users on the main page', async ({ herokuappPage, windowHerokuappPage }) => {
    await herokuappPage.openPage(links.windows)
    await herokuappPage.openNewWindow()
    await windowHerokuappPage.verifyBodyText()
})