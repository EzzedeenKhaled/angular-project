import { test, expect } from '@playwright/test';

test.describe('App Tests', () => {
  
  // Test 1: Root redirects to login
  test('should redirect to login page', async ({ page }) => {
    await page.goto('/');
    console.log('Current URL:', page.url());
    await expect(page).toHaveURL('/login');
  });

  // Test 2: Can navigate to signup
  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/signup');
    await expect(page).toHaveURL('/signup');
  });

  // Test 3: Protected routes redirect to login
  test('should redirect to login when accessing protected routes', async ({ page }) => {
    await page.goto('/weather');
    await expect(page).toHaveURL('/login');
    
    await page.goto('/shop');
    await expect(page).toHaveURL('/login');
  });

  // Test 4: Can login successfully
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 't@t.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');
    
    // Should redirect to weather
    await page.waitForURL('/weather', { timeout: 5000 });
  });

  // Test 5: Can access protected routes after login
  test('should access weather and shop after login', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 't@t.com');
    await page.fill('input[type="password"]', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('/weather', { timeout: 5000 });
    
    // Access shop
    await page.goto('/shop');
    await expect(page).toHaveURL('/shop');
  });
});