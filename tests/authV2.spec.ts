import { test, expect } from '@playwright/test';

test.describe('App Tests v2', () => {
  
  // Test 1: Try to login with non existing account, and signup needed
  test('should login with existing account or signup if new', async ({ page }) => {
    // Using non existing account details
    const testEmail = 'aaa@aaa.com'; 
    const testPassword = '1234567';
    
    // Try to login first
    await page.goto('/login');
    await page.fill('input#email', testEmail);
    await page.fill('input#password', testPassword);
    await page.click('button.btn:has-text("Sign In")');
    
    // Wait a bit to see if login succeeds
    await page.waitForTimeout(3000);
    
    // Check if we're still on login page (login failed)
    const currentUrl = page.url();
    
    if (currentUrl.includes('/login')) {
      // Login failed, need to signup, Click "Sign up" link
      await page.click('a[routerLink="/signup"]');
      await expect(page).toHaveURL('/signup');
      
      // Fill signup form
      await page.fill('input#name', 'Test User');
      await page.fill('input#email', testEmail);
      await page.fill('input#password', testPassword);
      await page.fill('input[name="confirmPassword"]', testPassword);
      
      await page.click('button.btn:has-text("Sign Up")');
      await page.waitForURL('/weather', { timeout: 3000 });
    }
  });

  // Test 2: Search for a city and verify temperature is displayed
  test('should search for a city and display temperature', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input#email', 'aaa@aaa.com');
    await page.fill('input#password', '1234567');
    await page.click('button.btn:has-text("Sign In")');
    
    // Verify redirect to weather page
    await page.waitForURL('/weather', { timeout: 3000 });
    await expect(page).toHaveURL('/weather');
    
    // Find the search input using mat-input
    const searchInput = page.locator('input[matInput][placeholder="Enter city name..."]');
    await expect(searchInput).toBeVisible({ timeout: 3000 });
    
    // Search for a city
    await searchInput.fill('London');
    await page.click('button.search-btn:has-text("Search")');
    
    // Wait for weather data to load
    await page.waitForTimeout(3000);
    
    // Verify temperature is displayed - look for the temp-value class
    const temperatureElement = page.locator('.temp-value');
    await expect(temperatureElement).toBeVisible({ timeout: 3000 });
    
    // Verify location name is displayed
    const locationName = page.locator('.location-header h2');
    await expect(locationName).toBeVisible();
  });

  // Test 3: Navigate to shop and add items to cart and verify cart count
  test('should add items to cart and verify count', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input#email', 'aaa@aaa.com');
    await page.fill('input#password', '1234567');
    await page.click('button.btn:has-text("Sign In")');
    await page.waitForURL('/weather', { timeout: 3000 });
    
    // Navigate to shop page
    await page.goto('/shop');
    await expect(page).toHaveURL('/shop');
    
    // Wait for products to load (wait for loading spinner to disappear)
    await page.waitForSelector('.loading', { state: 'hidden', timeout: 5000 });
    
    // Wait until at least one product card is visible
    const productCards = page.locator('app-product-card');
    await expect(productCards.first()).toBeVisible({ timeout: 5000 });

    const productCount = await productCards.count();
    expect(productCount).toBeGreaterThan(0);
    
    // Add 3 items to cart
    const itemsToAdd = 3;
    
    for (let i = 0; i < itemsToAdd; i++) {
      // Each product card has an "Add to Cart" button
      await productCards.nth(i).locator('button').click();
      await page.waitForTimeout(1500); // Wait between clicks
    }
    
    // Wait for cart to update
    await page.waitForTimeout(2000);
    
    // Find cart badge element in navbar
    const cartBadge = page.locator('span.cart-badge');
    await expect(cartBadge).toBeVisible({ timeout: 3000 });
    
    // Verify cart count matches items added
    const cartText = await cartBadge.textContent();
    const count = parseInt(cartText || '0');   
    
    expect(count).toBe(itemsToAdd);
  });

  // Test 4: Test logout functionality
  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input#email', 'aaa@aaa.com');
    await page.fill('input#password', '1234567');
    await page.click('button.btn:has-text("Sign In")');
    await page.waitForURL('/weather', { timeout: 3000 });
    
    // Find logout button in navbar
    const logoutButton = page.locator('button.logout-btn');
    await expect(logoutButton).toBeVisible({ timeout: 3000 });
    
    // Click logout
    await logoutButton.click();
    
    // Should redirect to login page
    await page.waitForURL('/login', { timeout: 3000 });
    await expect(page).toHaveURL('/login');
    
    // Verify cannot access protected routes anymore
    await page.goto('/weather');
    await expect(page).toHaveURL('/login');
    
    await page.goto('/shop');
    await expect(page).toHaveURL('/login');
  });
});