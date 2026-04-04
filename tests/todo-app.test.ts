import { expect, test } from '@playwright/test'

test('I want to add a new To-Do', async ({ page }) => {
  // Visit the homepage
  await page.goto('/')

  // There is already a to-do in the page
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible()

  // Click _on a button_ to add the new item
  await page.getByRole('button', { name: 'New' }).click()

  // The item is added to the page
  // ... and will be able to receive text
  await expect(page.getByPlaceholder('What needs to be done?')).toHaveCount(2)
})
