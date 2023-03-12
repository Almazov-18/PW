import { Fixtures } from '@playwright/test'
import { PlaywrightHomePage } from '../pages/playwright-home.page'
import { PlaywrightLanguagesPage } from '../pages/playwright-languages-page'
import { TablePage } from '../pages/table.page'
import { ContextPagesFixture } from './context-pages'
import { HerokuappPage } from '../pages/herokuapp.page';
import { WindowHerokuappPage } from '../pages/widnow.herokuapp.page';

export type PlaywrightPagesFixture = {
    playwrightHomePage: PlaywrightHomePage
    playwrightLanguagesPage: PlaywrightLanguagesPage,
    tablePage: TablePage,
    herokuappPage: HerokuappPage,
    windowHerokuappPage: WindowHerokuappPage
}

export const playwrightPagesFixture: Fixtures<PlaywrightPagesFixture, ContextPagesFixture> = {
    playwrightHomePage: async ({ contextPage }, use) => {
        const playwrightHomePage = new PlaywrightHomePage(contextPage)
        await use(playwrightHomePage)
    },
    playwrightLanguagesPage: async ({ contextPage }, use) => {
        const playwrightLanguagesPage = new PlaywrightLanguagesPage(contextPage)
        await use(playwrightLanguagesPage)
    },
    tablePage: async ({ contextPage }, use) => {
        const tablePage = new TablePage(contextPage)
        await use(tablePage)
    },
    herokuappPage: async ({ contextPage }, use) => {
        const herokuappPage = new HerokuappPage(contextPage)
        await use(herokuappPage)
    },
    windowHerokuappPage: async ({ contextPage }, use) => {
        const windowHerokuappPage = new WindowHerokuappPage(contextPage)
        await use(windowHerokuappPage)
    }
}