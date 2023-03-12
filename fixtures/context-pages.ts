import { Fixtures, Page } from '@playwright/test'
import { mockStaticRecourses } from '../pages/utils/mocks/static-mock'

export type ContextPagesFixture = {
    contextPage: Page
}

export const contextPagesFixture: Fixtures<ContextPagesFixture> = {
    contextPage: async ({ page }, use) => {
        await mockStaticRecourses(page)
        await use(page)
    }
}
