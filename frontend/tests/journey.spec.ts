import { test, expect } from '@playwright/test';

test.describe('PsycheScale User Journey', () => {
  test('Complete Likert scale assessment and view results', async ({ page }) => {
    // Navigate to the local Vite dev server
    await page.goto('/');

    // 1. Splash / Landing Page (Home)
    // The logo text is split across child nodes, check the footer text instead
    await expect(page.getByText('PsycheScale 2026 Platform Prototype')).toBeVisible();

    // 2. Start Assessment
    await expect(page.getByText('Discover Your Superpowers')).toBeVisible();
    
    // Click on the Big Five assessment to start
    await page.getByRole('button', { name: 'Big Five (120)' }).click();

    // 3. Answer Questions (Likert Scale)
    // We expect the first question to appear
    await expect(page.getByRole('radio').first()).toBeVisible();

    // Loop through questions until 'Complete Assessment' appears
    let attempt = 0;
    while (attempt < 10) {
      attempt++;
      
      // Pick Strongly Agree (index 4 - rightmost option)
      const options = await page.getByRole('radio').all();
      if (options.length >= 5) {
        await options[4].click({ force: true }); 
      }

      // Check if we are on the last question
      const isLast = await page.getByRole('button', { name: /Complete Assessment|View Report/i }).isVisible();
      if (isLast) {
        await page.getByRole('button', { name: /Complete Assessment|View Report/i }).click({ force: true });
        break;
      } else {
        // Component has a setTimeout(onNext, 400) which auto-advances - wait for it
        await page.waitForTimeout(500); 
      }
    }

    // 4. Verification on Results Dashboard
    await page.waitForURL('**/results');
    
    // Hero Archetype section visible
    await expect(page.getByText('Your Archetype')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('The Architect')).toBeVisible();
    
    // Model tabs visible
    await expect(page.getByRole('button', { name: 'MBTI' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Big Five' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'HEXACO' })).toBeVisible();
    await expect(page.getByRole('button', { name: '16pf' })).toBeVisible();
    
    // MBTI tab content visible (active by default)
    await expect(page.getByText('Superpowers')).toBeVisible();
    await expect(page.getByText('Burnout Triggers')).toBeVisible();
    await expect(page.getByText('Career Alignment')).toBeVisible();
    
    // Switch to Big Five tab and verify content
    await page.getByRole('button', { name: 'Big Five' }).click();
    await expect(page.getByText('O.C.E.A.N. Dimensionality')).toBeVisible();
    // 'Openness' appears in both the trait list AND the radar SVG — use first()
    await expect(page.getByText('Openness').first()).toBeVisible();
    
    // Export button present
    await expect(page.getByRole('button', { name: /Export JSON Report/i })).toBeVisible();
  });
});
