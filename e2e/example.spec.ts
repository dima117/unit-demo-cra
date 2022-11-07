import { test, expect } from "@playwright/test";

test('по адресу /about должна открываться страница "о проекте"', async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByTestId('page-title')).toHaveText('About');
});

test("если добавить элемент, он появляется в списке", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("input-add").type("Сделать домашку");
  await page.getByTestId("button-add").click();

  const list = page.getByTestId("list");
  const items = list.getByTestId("list-item");
  const allTexts = await items.allTextContents();

  await expect(allTexts).toContain("Сделать домашку");
});
