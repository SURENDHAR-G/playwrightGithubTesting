import { test, expect } from '@playwright/test';
import { paymentTerm } from './PageObjectModel/paymentTerm';
import { Commodity } from './PageObjectModel/Commodity';
test('UPS SCS - Ocean FCL route selection', async ({ page }) => {

    await page.goto('https://scsappsuat.ups.com/forwardinghub/us/en/quotes/ngflow?tx=17707199563291016');

    //await page.getByRole('button', { name: /reject all|decline|deny/i }).click().catch(() => {});

    // // keep your popup approach, but make it atomic
    // const pagePromise = page.waitForEvent('popup');
    // await page.getByRole('link', { name: 'Ship Your Freight' }).click();
    // const page = await pagePromise;
    
    // // heading checks
    // const heading = await page.getByRole('heading', { name: 'Freight Forwarding Made Easy' }).textContent();
    // await expect(page.getByRole('heading', { name: 'Freight Forwarding Made Easy' })).toBeVisible();
    // await expect(page.getByRole('heading', { name: 'Freight Forwarding Made Easy' })).toHaveText('Freight Forwarding Made Easy');
    
    // await page.waitForTimeout(5000); // keeping as-is per your approach
    // await page.click("//nav[@class='upsgff-navbar-vertical ng-star-inserted']/descendant::a[1]");

    //await page.click("//span[text()=' Ocean FCL ']");
    await page.click("//span[text()=' Air ']")
    await page.mouse.wheel(0, 500);
    
    // ======================== FROM COUNTRY ========================
    await page.waitForSelector('//input[@id="fromCountry"]', { state: 'visible' });
    await expect(page.locator('//input[@id="fromCountry"]')).toBeVisible();
    await page.locator('//input[@id="fromCountry"]').fill('United');
    
    // wait for visible suggestions (same XPath family, more tolerant on classes)
    await page.waitForSelector('//ul[contains(@class,"p-autocomplete-items")]/li/div', { state: 'visible', timeout: 15000 });
    let allOptionsFroFromCountry = await page.$$('//ul[contains(@class,"p-autocomplete-items")]/li/div');
    
    for (const option of allOptionsFroFromCountry) {
      const textContent = (await option.textContent())?.trim() ?? '';
      console.log(textContent);
      if (textContent.includes('United States Of America')) {
        await option.click(); // IMPORTANT: await
        break;                // IMPORTANT: stop after clicking
      }
    }
       // ======================== TO COUNTRY ========================
       await page.waitForSelector('//input[@id="toCountry"]', { state: 'visible' });
       await expect(page.locator('//input[@id="toCountry"]')).toBeVisible();
       await page.locator('//input[@id="toCountry"]').fill('Aus');
       
       // same suggestion list wait (class can have extra tokens, keep XPath)
       await page.waitForSelector('//ul[contains(@class,"p-autocomplete-items")]/li/div', { state: 'visible', timeout: 15000 });
       let allOptionsForToCountry = await page.$$('//ul[contains(@class,"p-autocomplete-items")]/li/div');
       
       for (const option of allOptionsForToCountry) {
         const textContent = (await option.textContent())?.trim() ?? '';
         console.log(textContent);
         if (textContent.includes('Australia')) {
           await option.click();
           break;
         }
       }
    
    // ======================== FROM COUNTRY CITY ========================
    await page.waitForSelector('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[3]', { state: 'visible' });
    await expect(page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[3]')).toBeVisible();
    await page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[3]').fill('alta');
    
    // wait for the options in the common "Option List" panel
    await page.waitForSelector('//ul[@aria-label="Option List"]/li/span', { state: 'visible', timeout: 15000 });
    let allOptionsForFromCountryCity = await page.$$('//ul[@aria-label="Option List"]/li/span');
    
    for (const option of allOptionsForFromCountryCity) {
      const textContent = (await option.textContent())?.trim() ?? '';
      console.log(textContent);
      if (textContent.includes('ALTA, CA 95701')) {
        await option.click();
        break;
      }
    }
    
    
    // ======================== TO COUNTRY CITY ========================
    await page.waitForSelector('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[6]', { state: 'visible', timeout: 15000  });
    await expect(page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[6]')).toBeVisible();
    await page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[6]').fill('535');
    
    // prefer waiting for a visible list rather than static id (keep your XPath style, add fallback)
    
    await page.waitForSelector('//ul[@aria-label="Option List"]/li/span', { state: 'visible', timeout: 15000 });
    
    let allOptionsForToCountryCity = await page.$$('//ul[@aria-label="Option List"]/li/span');
    for (const option of allOptionsForToCountryCity) {
      const textContent = (await option.textContent())?.trim() ?? '';
      console.log(textContent);
      if (textContent.includes('BAKARA, SA 5354')) {
        await option.click();
        break;
      }
    }
    await page.mouse.wheel(0, 500);
    //PaymentTerm
     
    const pt  = new paymentTerm(page)
    await pt.selectPaymentTerm();

    //Commodity selection
    await page.mouse.wheel(0, 500);
    const cdty = new Commodity(page)
    await cdty.commodityInformation('cotton','700')

    await page.mouse.wheel(0, 500);
    await cdty.selectDimension('2','200','100','100','100')
    await cdty.selectCargo()

});