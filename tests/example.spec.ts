import { test, expect } from '@playwright/test'

test.only('has title', async ({ page }) => {
  await page.goto('https://inspirassion.com/en/prep/finish')

  // async function repeat(params: number) {
  //   for (let index = 1; index < params; index++) {
  //     console.log(`It's ${ index } time`)
      await page.waitForResponse(resp => resp.status() === 200)
  //     await page.reload()
  //   }
  // }

  // await repeat(5)
})


// Expect a title "to contain" a substring.
// await expect(page).toHaveTitle(/Playwright/)

test('get started link', async ({ page, request }) => {
  await page.goto('https://playwright.dev/')

  const firstRequest = request.request('https://playwright.dev/', {

  })
})
