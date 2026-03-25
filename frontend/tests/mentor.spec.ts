import { test, expect } from '@playwright/test';

test.describe('PsycheScale AI Mentor Journey', () => {
  test('Interact with AI Chat Interface', async ({ page }) => {
    // Navigate to the local Vite dev server
    await page.goto('/');

    // Navigate to Mentor page
    await page.getByRole('link', { name: /AI Mentor/i }).click();

    // Verify header loads
    await expect(page.getByText('Athena (AI Career Mentor)')).toBeVisible();

    // Verify initial chat loads
    await expect(page.getByText(/Welcome back!/i)).toBeVisible();

    // Interact with Chat Input
    const chatInput = page.getByPlaceholder('Ask your mentor for tailored advice...');
    await chatInput.fill('How can I use my high Extraversion to lead the new project?');
    
    // Press Send
    await page.getByRole('button', { name: 'Send Message' }).click();

    // Verify user message appears in list
    await expect(page.getByText('How can I use my high Extraversion to lead the new project?')).toBeVisible();
    
    // Verify input clears
    await expect(chatInput).toHaveValue('');
  });
});
