import { expect, test } from '@playwright/test'

test('I want to add a new To-Do', async ({ page }) => {
  // Visit the homepage
  await page.goto('/')

  // Click something to add the new item
  await page.getByText('New').click()

  // The item is added to the page
  await expect(page.getByText('What needs to be done?')).toBeVisible()
})
