import { expect, test } from "@playwright/test";

test.describe("task dashboard", () => {
  test("displays the status filter and tasks", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("combobox", {
        name: "Filter tasks by status",
      }),
    ).toBeVisible();

    const taskCards = page.getByTestId("task-card");

    // Waiting for the first card also waits for the Suspense content.
    await expect(taskCards.first()).toBeVisible();

    expect(await taskCards.count()).toBeGreaterThan(0);
  });

  test("filters tasks by status", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("combobox", {
        name: "Filter tasks by status",
      })
      .click();

    await page
      .getByRole("option", {
        name: "In progress",
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/status=IN_PROGRESS/);

    const taskCards = page.getByTestId("task-card");
    const taskStatuses = taskCards.getByTestId("task-status");

    await expect(taskCards.first()).toBeVisible();
    await expect(taskStatuses.first()).toHaveText("In progress");

    const statusCount = await taskStatuses.count();

    expect(statusCount).toBeGreaterThan(0);

    await expect(taskStatuses).toHaveText(
      Array(statusCount).fill("In progress"),
    );
  });

  test("shows a 404 for an invalid status", async ({ page }) => {
    const response = await page.goto("/?status=INVALID_STATUS");

    expect(response?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex",
    );
  });
});
