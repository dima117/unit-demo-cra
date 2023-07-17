import { test, expect } from "@playwright/test";

test('по адресу /about открывается страница "о проекте"', async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByTestId("page-title")).toHaveText("AboutAwdada");
});

test("если добавить элемент, он появляется в списке", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("input-add").type("Сделать домашкуawdawd");
  await page.getByTestId("button-add").click();

  const items = page.getByTestId("list-item");
  const allTexts = await items.allTextContents();

  await expect(allTexts).toContain("Сделать домашкуAdAWD");
});
