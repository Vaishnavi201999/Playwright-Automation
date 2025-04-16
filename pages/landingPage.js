const { BasePage } = require("./basePage")
exports.LandingPage = class LandingPage extends BasePage{

    constructor(page, adults, childrens, infants, travelClass){
        super(page)
        this.page = page;
        this.popup = page.locator("span.commonModal__close")
        this.source = page.locator("#fromCity")
        this.sourceLoc = page.getByPlaceholder("From");
        this.targetLoc = page.locator("//li[@data-suggestion-index='0']")
        this.destination = page.locator("#toCity")
        this.destinationLoc = page.getByPlaceholder("To");
        this.currentDates = page.locator("//div[@aria-disabled='false']")
        this.nextMonth = page.locator("//span[@aria-label='Next Month']")
        this.travellers = page.locator("//label[@for = 'travellers']")
        this.adults = page.locator(`//p[@data-cy = 'adultRange']/following-sibling::ul/li[text() = '${adults}']`)
        this.childrens = page.locator(`//p[@data-cy = 'childrenRange']/following-sibling::ul/li[text() = '${childrens}']`)
        this.infants = page.locator(`//p[@data-cy = 'infantRange']/following-sibling::ul/li[text() = '${infants}']`)
        this.travelClass = page.locator(`//li[text() = '${travelClass}']`)
        this.applyBtn = page.locator("//button[text() = 'APPLY']")
        this.searchBtn = page.locator("//a[text() = 'Search']")
    }

    async location(){
        await this.source.click()
        await this.sourceLoc.fill("Mum")
        await this.targetLoc.click()
        await this.destination.click()
        await this.destinationLoc.fill("Lon") 
        await this.page.waitForTimeout(3000)
        await this.targetLoc.click()

    }

    async datePicker(date, dateSelected) {
        while (!dateSelected) {
            const count = await this.currentDates.count()
            for (let i = 0; i < count; i++) {
                const cd = await this.currentDates.nth(i).getAttribute("aria-label")
                if (cd.includes(date)) {
                    await this.currentDates.nth(i).click()
                    dateSelected = true
                    break;
                }
            }
            if(!dateSelected){
                        await this.nextMonth.click()
            }
        }
    }

    async travellerSelection(){
        await this.travellers.click()
        await this.adults.click()
        await this.childrens.click()
        await this.infants.click()
        await this.travelClass.click()
        await this.applyBtn.click()
    }
    
    async searchFlight(){
        await this.search(this.searchBtn)
    }

}