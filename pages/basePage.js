const {locator, Page} = require ("@playwright/test")
exports.BasePage = class BasePage{


    constructor(page){
        this.page = page
    }

    async navigateTo(url){
        await this.page.goto(url)
    }
    
    async popupClose(){
        const popup = this.page.locator("span.commonModal__close")
        await popup.click()
    }

    async search(element){
        await element.click()
    }



}