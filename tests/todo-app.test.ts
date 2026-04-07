import { expect, test } from '@playwright/test'

test.describe('The To-Do application', () => {
  test('I want to add a new To-Do', async ({ page }) => {
    // Visit the homepage
    await page.goto('/')

    // There is already a to-do in the page
    await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible()
    await expect(page.getByRole('checkbox')).not.toBeChecked()

    // Click _on a button_ to add the new item
    await page.getByRole('button', { name: 'New' }).click()

    // The item is added to the page
    await expect(page.getByPlaceholder('What needs to be done?')).toHaveCount(2)
    await expect(page.getByRole('checkbox')).toHaveCount(2)
  })

  test('I want to cross off a To-Do when it is done', async ({ page }) => {
    await page.goto('/')

    const todoText = page.getByPlaceholder('What needs to be done?')

    await todoText.fill('Prepare the workshop')
    await todoText.blur()

    await expect(page.getByRole('deletion')).not.toBeVisible()
    await expect(todoText).toHaveValue('Prepare the workshop')

    await page.getByRole('checkbox').click()

    await expect(page.getByRole('checkbox')).toBeChecked()
    await expect(page.getByRole('deletion')).toBeVisible()
    // await expect(page.getByText('Prepare the workshop')).toBeVisible()
    // We need to change this to be more specific, as with the label is also present in the DOM
    // await expect(page.getByRole('deletion', { name: 'Prepare the workshop' })).toBeVisible()
  })

  test('I want to move "done" To-Dos to the end of the list', async ({ page }) => {
    await page.goto('/')

    const newToDoButton = page.getByRole('button', { name: 'New' })
    const toDoList = page.getByRole('list')

    await toDoList.getByPlaceholder('What needs to be done?').fill('This is the first item')

    await newToDoButton.click()
    await newToDoButton.click()

    const toDoItems = toDoList.getByRole('listitem')
    await expect(toDoItems).toHaveCount(3)

    await toDoList.getByPlaceholder('What needs to be done?').nth(1).fill('This is the second item')
    await toDoList.getByPlaceholder('What needs to be done?').nth(2).fill('This is the third item')

    const itemToMarkAsDone = toDoList.getByRole('checkbox').nth(1)
    await itemToMarkAsDone.check()

    await expect(toDoItems.getByRole('textbox')).toHaveCount(2)
    await expect(toDoItems.getByRole('deletion')).toHaveCount(1)

    await expect(toDoItems.last().getByRole('deletion')).toBeVisible()
  })

  test('I want to delete To-Dos from the list', async ({ page }) => {
    await page.goto('/')

    const newToDoButton = page.getByRole('main').getByRole('button', { name: 'New' })
    const toDoList = page.getByRole('main').getByRole('list')

    await toDoList.getByPlaceholder('What needs to be done?').fill('This one we will mark as done and delete')

    await newToDoButton.click()
    await newToDoButton.click()
    await newToDoButton.click()

    const toDoItems = toDoList.getByRole('listitem')

    await toDoList.getByPlaceholder('What needs to be done?').nth(1).fill('This one we will keep')
    await toDoList.getByPlaceholder('What needs to be done?').nth(2).fill('This one we will delete')
    await toDoList.getByPlaceholder('What needs to be done?').nth(3).fill('This one we also keep')

    await expect(toDoItems).toHaveCount(4)

    await toDoList.getByRole('checkbox').first().check()

    const deleteButtons = await toDoList.getByRole('button', { name: '🗑️' })

    await deleteButtons.last().click()
    await expect(toDoItems).toHaveCount(3)

    await deleteButtons.nth(1).click()
    await expect(toDoItems).toHaveCount(2)

    const toDoText = page.getByPlaceholder('What needs to be done?')

    await expect(toDoText.first()).toHaveValue('This one we will keep')
    await expect(toDoText.nth(1)).toHaveValue('This one we also keep')
  })

  test('I want to bring back a To-Do that was marked as done', async ({ page }) => {
    await page.goto('/')

    const todoText = page.getByPlaceholder('What needs to be done?')

    await todoText.fill('Prepare the workshop')
    await todoText.blur()

    await page.getByRole('checkbox').click()

    await expect(page.getByLabel('Prepare the workshop')).toBeChecked()

    await page.getByLabel('Prepare the workshop').click()
  })
})
