const {test,expect, chromium} = require("@playwright/test");

test.skip("OrangeHRM",async({page})=> 
{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    var bool = await page.locator("//img[@alt='company-branding']").isEnabled();
    console.log(bool);
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.click("//button[@type='submit']")
    await page.waitForTimeout(5000);
    var bool1 = await page.locator("//img[@alt='client brand banner']").isEnabled();
    console.log(bool1);
    await page.locator("//span[text()='PIM']").click();

})

test.skip("Alert ok",async({page})=>
{
    page.goto("https://testautomationpractice.blogspot.com/")
    
    page.on('dialog', async dialog=>
    {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain("I am an alert box!")
        await dialog.accept();
    })
    await page.locator('//button[@onclick="myFunctionAlert()"]').click();
    await page.waitForTimeout(5000)
    
})
test.skip("Confirm Alert ok and cancel",async({page})=>
{
    page.goto("https://testautomationpractice.blogspot.com/")
    page.on('dialog', async dialog=>
    {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain("Press a button!")
        await dialog.accept()
    })
    await page.locator('//button[@id="confirmBtn"]').click();
        await expect(page.locator("//p[@id='demo']")).toHaveText("You pressed OK!"); 
    await page.waitForTimeout(5000)
    
})
test.skip("prompt alert", async ({page}) =>
{
    page.goto("https://testautomationpractice.blogspot.com/")
    page.on("dialog", async dialog =>
    {
        expect(dialog.type()).toContain("prompt")
        expect(dialog.message()).toContain("Please enter your name:");
        expect(dialog.defaultValue()).toContain("Harry Potter")
        await dialog.accept("Surendhar")
    })

    await page.click("//button[@id='promptBtn']")
    await expect(page.locator('//p[@id="demo"]')).toHaveText("Hello Surendhar! How are you today?")
    await page.waitForTimeout(10000);
})
test.skip("handling multiple window", async()=>
{
    const browser = await chromium.launch()
    const context = await browser.newContext()

    const page1 = await context.newPage()
    const page2 = await context.newPage()

    const allPages = context.pages()
    console.log(allPages.length);
    
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    await expect(page1).toHaveTitle("OrangeHRM")

    await page2.goto("https://www.orangehrm.com/")
    await expect(page2).toHaveTitle("Human Resources Management Software | HRMS | OrangeHRM")

    await browser.close();
})

test.skip("handling multiple window in same link", async()=>
{
    const browser = await chromium.launch()
    const context = await browser.newContext()

    const page1 = await context.newPage()
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")

    const pagePromise = context.waitForEvent('page')
    await page1.locator("//a[text()='OrangeHRM, Inc']").click();
     
    const newPage = await pagePromise;
    await expect(newPage.locator("//h1[text()='Streamline All Your HR Needs on One '] ")).toHaveText("Streamline All Your HR Needs on One Intuitive Platform")

    await newPage.waitForTimeout(10000);
    await browser.close()
})
test.skip("UFH Automation", async()=>
{
    const browser = await chromium.launch()
    const context = await browser.newContext()

    const page = await context.newPage()

    await page.goto("https://www.ups.com/us/en/supplychain/home");

    const pagePromise = context.waitForEvent('page');

    await page.locator("//a[text()='Ship Your Freight']").click();
    
    const newpage = await pagePromise;
    await page.waitForLoadState('load')
    await page.waitForSelector("//h1[text()='Freight Forwarding Made Easy']")
    const heading = newpage.locator("//h1[text()='Freight Forwarding Made Easy']")
    await expect(heading).toBeVisible()
    await expect(newpage.locator("//h1[text()='Freight Forwarding Made Easy']")).toHaveText("Freight Forwarding Made Easy");
})
test.only('test', async ({ page }) => {
    // await page.goto('https://www.ups.com/us/en/supplychain/home');
    // const page1Promise = page.waitForEvent('popup');
    // await page.getByRole('link', { name: 'Ship Your Freight' }).click();
    // const page1 = await page1Promise;
    // //await page1.goto('https://scsapps.ups.com/forwardinghub/us/en/index?tx=17706215201520940');
    // const heading = await page1.getByRole('heading', { name: 'Freight Forwarding Made Easy' }).textContent();
    // await expect(page1.getByRole('heading', { name: 'Freight Forwarding Made Easy' })).toBeVisible();
    // await expect(page1.getByRole('heading', { name: 'Freight Forwarding Made Easy' })).toHaveText("Freight Forwarding Made Easy")
    // await page1.waitForTimeout(5000);
    // await page1.click("//nav[@class='upsgff-navbar-vertical ng-star-inserted']/descendant::a[1]")
    await page.goto('https://scsappsuat.ups.com/forwardinghub/us/en/quotes/ngflow?tx=17707199563291016')
    await page.click("//span[text()=' Ocean FCL ']");
    await page.mouse.wheel(0, 500);

    //from country
    await page.waitForSelector('//input[@id="fromCountry"]',{state : 'visible'})
    await expect(page.locator('//input[@id="fromCountry"]')).toBeVisible();
    await page.locator('//input[@id="fromCountry"]').fill('United')
    await page.waitForSelector('//ul[@class="p-autocomplete-items ng-star-inserted"]/child::li/div',{ state: 'visible', timeout: 15000 })
    const allOptionsFroFromCountry = await page.$$('//ul[@class="p-autocomplete-items ng-star-inserted"]/child::li/div')
    //await page1.waitForTimeout(5000);
    for(var option of allOptionsFroFromCountry)
    {
        var textContent = await option.textContent()
        console.log(textContent);
        if(textContent.includes('United States Of America'))
        {

            await option.click()
            break;
        }
    }
    
    // To country
    await page.waitForSelector('//input[@id="toCountry"]')
    await expect(page.locator('//input[@id="toCountry"]')).toBeVisible();
    await page.locator('//input[@id="toCountry"]').fill('Aus')
    await page.waitForSelector('//ul[@class="p-autocomplete-items ng-star-inserted"]/child::li/div',{ state: 'visible', timeout: 15000 })
    const allOptionsForToCountry = await page.$$('//ul[@class="p-autocomplete-items ng-star-inserted"]/child::li/div')
    //await page1.waitForTimeout(5000);
    for(var option of allOptionsForToCountry)
    {
        var textContent = (await option.textContent())?.trim() ?? '';
        console.log(textContent);
        if(textContent.includes('Australia'))
        {

            await option.click()
        }
    }
     //From country City

     await page.waitForSelector('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[3]',{ state: 'visible' })
     await expect(page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[3]')).toBeVisible();
     await page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[3]').fill('alta')
     //await page.waitForTimeout(15000);
     //await page1.waitForSelector('//ul[@aria-label="Option List"]/li/span')
 
     //const listOfFromCity = page1.locator('//ul[@aria-label="Option List"]/li/span');
     //await expect(listOfFromCity).toBeVisible();
     await page.waitForSelector('//ul[contains(@class,"p-autocomplete-items")]/li/div', { state: 'visible', timeout: 15000 });
     const allOptionsForFromCountryCity = await page.$$('//ul[@aria-label="Option List"]/li/span')
 
     //await page1.waitForTimeout(5000);
     for(var option of allOptionsForFromCountryCity)
     {
         var textContent = (await option.textContent())?.trim() ?? '';
         console.log(textContent);
         if(textContent.includes('ALTA, CA 95701'))
         {
 
            await option.click()
         }
     }
    

    // To Country city

    await page.waitForSelector('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[6]')
    await expect(page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[6]')).toBeVisible();
    await page.locator('//div[@class="row od-form ups-scs-form ng-star-inserted"]/descendant::input[6]').fill('535')
    //await page1.waitForSelector('//ul[@id="pn_id_32_list"]/li/span')

    //const listOfToCity = page1.locator('//ul[@id="pn_id_32_list"]/li/span');
    //await expect(listOfToCity).toBeVisible({ timeout: 10000 });

    const allOptionsForToCountryCity = await page.$$('//ul[@id="pn_id_32_list"]/li/span')
    //await page1.waitForTimeout(5000);
    for(var option of allOptionsForToCountryCity)
    {
        var textContent = await option.textContent()
        console.log(textContent);
        if(textContent.includes('BAKARA, SA 5354'))
        {

            await option.click()
        }
    }
   
  });
