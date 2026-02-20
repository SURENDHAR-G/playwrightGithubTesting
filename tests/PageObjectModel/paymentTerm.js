import { expect } from '@playwright/test';

export class paymentTerm
{
     constructor(page)
     {
        this.page = page;
        this.paymentTermPrepaid = "//div[@id='parent']/descendant::div[@class='d-flex flex-column scs-info-container_text pl-3'][1]"
     }
     async selectPaymentTerm()
     {
        await this.page.locator(this.paymentTermPrepaid).click();
     }
}    
