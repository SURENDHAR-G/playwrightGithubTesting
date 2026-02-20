import {test} from "@playwright/test"
import {expect} from "@playwright/test"
import { timingSafeEqual } from "crypto";
export class Commodity{

    constructor(page)
    {
        this.page = page;
        this.commodityName = "//input[@id='comDesc']"
        //this.commodityNameCotton = "//ul[@id='pn_id_3_list']/li[1]/div"
        this.commodityCotton = this.page.getByRole('option',{name : '100% Hand Printed Cotton Woven Sheeting',timeout : 15000})
        this.cargoValue = this.page.locator("//input[@formcontrolname='cargoValue']")
        this.currency = this.page.getByRole('combobox',{name:'USD'})
        this.currencyValue = this.page.getByRole('option',{name:'USD'})
        this.kgRadioButton = this.page.locator('fieldset > p-radiobutton > .p-radiobutton > .p-radiobutton-box',{state : 'visible',timeout:15000})
        this.dimensionType = this.page.getByRole('group', { name: 'Cargo Dimensions' }).getByLabel('dropdown trigger')
        this.dimensionTypeName = this.page.getByRole('option',{name:'Loose/Boxes'})
        this.dimensionQuantity = this.page.getByRole('textbox',{name:'Quantity'})
       
        this.dimensionWeight = this.page.getByRole('textbox', { name: 'Weight in Kilograms' })
       
        this.dimensionLength = this.page.getByRole('textbox', { name: 'Length in Centimeteres' })
       
        this.dimensionWidth = this.page.getByRole('textbox', { name: 'Width (in Centimeteres)' })
        
        this.dimensionHeight = this.page.getByRole('textbox', { name: 'Height (in Centimeteres)' })

        
        this.containerDropdown = this.page.getByRole('combobox',{name:'Container Size'})
        this.containerSize = this.page.getByRole('StaticText',{name : 'Compare Specialty Equipment (Open Tops, Flat Racks, Refrigerated, Garments)'})
        this.containerCount = this.page.getByRole('textbox', { name: 'Number of Each Container Type' })
        this.cargo = this.page.locator('//div[@class="special-handling"]/descendant::div[@class="p-radiobutton-box"]')
        this.submit = this.page.getByRole('button',{name:'Submit'})
    }
        async commodityInformation(commodityNameInput,cargoValueInput)
        {
            
            //  //await this.commodityName.waitFor({ state: 'visible', timeout: 15000 });
            //  await expect(this.commodityName).toBeEnabled();
            //  await this.page.waitForSelector(commodityName);
             await this.page.locator(this.commodityName).click()
             await this.page.locator(this.commodityName).fill(commodityNameInput)
             
             //await this.page.waitForSelector(commodityNameCotton)

             await this.commodityCotton.click()
             await this.cargoValue.waitFor({ state: 'visible', timeout: 15000 })

             await this.cargoValue.click()
             await this.cargoValue.fill(cargoValueInput)

             await this.currency.waitFor({state:'visible', timeout:15000})
             await this.currency.click();
             await this.currencyValue.click()
        }
        async selectDimension(Quantity,weight,Length,Width,Height)
        {
             //Dimensions
             
            // const item = this.page.locator(this.kgRadioButton);
            // await item.waitFor({ state: 'attached',timeout:15000 });
            // await item.scrollIntoViewIfNeeded();
            // await expect(item).toBeVisible();

            //  await this.kgRadioButton.waitFor({ state: 'visible', timeout: 15000 })
            //  await this.page.locator(this.kgRadioButton).scrollIntoViewIfNeeded();
             await this.kgRadioButton.first().click()

             await this.dimensionType.waitFor({ state: 'visible', timeout: 15000 })
             await this.dimensionType.click()

             await this.dimensionTypeName.waitFor({ state: 'visible', timeout: 15000 })
             await this.dimensionTypeName.click()

             await this.dimensionQuantity.waitFor({ state: 'visible', timeout: 15000 })
             await this.dimensionQuantity.click()
             await this.dimensionQuantity.fill(Quantity)

             await this.dimensionWeight.waitFor({ state: 'visible', timeout: 15000 })
             await this.dimensionWeight.click()
             await this.dimensionWeight.fill(weight)
             
             await this.dimensionLength.fill(Length)
             await this.dimensionWidth.fill(Width)
             await this.dimensionHeight.fill(Height)

        }
        async selectCargo()
        {
            //await this.containerDropdown.click()
            //await this.containerSize.click()
            //await this.containerCount.click()
            //await this.containerCount.fill('1')
            await this.cargo.click()
            await this.submit.click()
        }
           
}