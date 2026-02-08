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

test.only("handling multiple window in same link", async()=>
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