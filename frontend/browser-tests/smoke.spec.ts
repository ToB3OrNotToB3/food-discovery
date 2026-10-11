import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const problems = results.violations.flatMap((violation) =>
    violation.nodes.map((node) => `${violation.id}: ${node.target.join(", ")} — ${node.failureSummary}`),
  );
  expect(problems).toEqual([]);
}

test("desktop discovery filters and restaurant links work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Okay, what’s the craving?" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to food" })).toBeFocused();
  await expectNoAccessibilityViolations(page);

  await page.getByRole("button", { name: "South Indian" }).click();
  await expect(page.getByRole("heading", { name: "Dosa Social" })).toBeVisible();
  await page.getByRole("textbox", { name: "Search dishes, places or areas" }).fill("burger");
  await expect(page.getByRole("heading", { name: "Nothing matches this craving. Yet." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByRole("link", { name: "Details for Bun Theory" }).click();
  await expect(page).toHaveURL(/\/restaurants\/bun-theory$/);
  await expectNoAccessibilityViolations(page);
});

test("mobile Clips screen is keyboard reachable and accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expectNoAccessibilityViolations(page);
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Clips" }).click();
  await expect(page).toHaveURL(/\/watch$/);

  const feed = page.getByLabel("Food video feed. Scroll or swipe for the next clip.");
  await expect(feed).toBeVisible();
  await feed.focus();
  await page.keyboard.press("ArrowDown");
  await expect.poll(() => feed.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await expectNoAccessibilityViolations(page);
});
